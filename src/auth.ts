import "dotenv/config";

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface CachedToken {
  accessToken: string;
  expiresAt: number;
}

export class ServiceFusionAuthError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly responseBody: string,
  ) {
    super(`Service Fusion auth error (${statusCode}): ${responseBody}`);
    this.name = "ServiceFusionAuthError";
  }
}

export class ServiceFusionAuth {
  private clientId: string;
  private clientSecret: string;
  private tokenUrl: string;
  private cachedToken: CachedToken | null = null;
  private tokenRefreshPromise: Promise<string> | null = null;

  /** Refresh 5 minutes before actual expiry. */
  private static readonly EXPIRY_BUFFER_MS = 5 * 60 * 1000;
  /** Default TTL if the token response omits expires_in. */
  private static readonly DEFAULT_TTL_SECONDS = 3600;

  constructor(config?: {
    clientId?: string;
    clientSecret?: string;
    tokenUrl?: string;
  }) {
    this.clientId = config?.clientId ?? process.env.SF_CLIENT_ID ?? "";
    this.clientSecret =
      config?.clientSecret ?? process.env.SF_CLIENT_SECRET ?? "";
    this.tokenUrl =
      config?.tokenUrl ??
      process.env.SF_TOKEN_URL ??
      "https://api.servicefusion.com/oauth/access_token";

    if (!this.clientId || !this.clientSecret) {
      throw new Error(
        "Missing Service Fusion credentials. Set SF_CLIENT_ID and SF_CLIENT_SECRET in your .env file.",
      );
    }
  }

  /**
   * Returns a valid access token, fetching or refreshing as needed.
   * Concurrent callers share a single in-flight token request.
   */
  async getAccessToken(): Promise<string> {
    if (this.cachedToken && !this.isTokenExpired()) {
      return this.cachedToken.accessToken;
    }

    if (this.tokenRefreshPromise) {
      return this.tokenRefreshPromise;
    }

    this.tokenRefreshPromise = this.fetchNewToken()
      .then((token) => {
        this.cachedToken = token;
        return token.accessToken;
      })
      .finally(() => {
        this.tokenRefreshPromise = null;
      });

    return this.tokenRefreshPromise;
  }

  /** Invalidates the cached token, forcing the next call to fetch a fresh one. Used on 401. */
  invalidateToken(): void {
    this.cachedToken = null;
  }

  private isTokenExpired(): boolean {
    if (!this.cachedToken) return true;
    return Date.now() >= this.cachedToken.expiresAt;
  }

  private async fetchNewToken(): Promise<CachedToken> {
    const response = await fetch(this.tokenUrl, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      throw new ServiceFusionAuthError(response.status, body);
    }

    const data = (await response.json()) as TokenResponse;
    const ttlSeconds = data.expires_in ?? ServiceFusionAuth.DEFAULT_TTL_SECONDS;
    const expiresAt =
      Date.now() + ttlSeconds * 1000 - ServiceFusionAuth.EXPIRY_BUFFER_MS;

    return { accessToken: data.access_token, expiresAt };
  }
}

let authInstance: ServiceFusionAuth | null = null;

export function getAuth(): ServiceFusionAuth {
  if (!authInstance) {
    authInstance = new ServiceFusionAuth();
  }
  return authInstance;
}
