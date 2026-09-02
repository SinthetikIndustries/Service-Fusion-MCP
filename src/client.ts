import { ServiceFusionAuth } from "./auth.js";

export interface PaginationInfo {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}

export interface ApiResponse<T = unknown> {
  data: T;
  pagination: PaginationInfo | null;
}

export class ServiceFusionApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly responseBody: string,
    public readonly endpoint: string,
  ) {
    super(`Service Fusion API error ${statusCode} on ${endpoint}: ${responseBody}`);
    this.name = "ServiceFusionApiError";
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface ClientConfig {
  baseUrl?: string;
  maxRetries?: number;
  retryBaseDelayMs?: number;
}

export class ServiceFusionClient {
  private auth: ServiceFusionAuth;
  private baseUrl: string;
  private maxRetries: number;
  private retryBaseDelayMs: number;

  constructor(auth: ServiceFusionAuth, config?: ClientConfig) {
    this.auth = auth;
    this.baseUrl =
      config?.baseUrl ?? process.env.SF_API_BASE_URL ?? "https://api.servicefusion.com/v1";
    this.maxRetries = config?.maxRetries ?? 3;
    this.retryBaseDelayMs = config?.retryBaseDelayMs ?? 1000;
  }

  async get<T = unknown>(
    path: string,
    params?: Record<string, string>,
  ): Promise<ApiResponse<T>> {
    // Reported (unverified against official Service Fusion docs) that /jobs list
    // queries without a sort param can hang. Cheap insurance: default one in.
    if (path === "jobs" && !params?.sort) {
      params = { ...params, sort: "-start_date" };
    }
    return this.request<T>("GET", path, { params });
  }

  async post<T = unknown>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>("POST", path, { body });
  }

  private async request<T>(
    method: "GET" | "POST",
    path: string,
    options?: { params?: Record<string, string>; body?: unknown },
  ): Promise<ApiResponse<T>> {
    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      const accessToken = await this.auth.getAccessToken();
      const url = this.buildUrl(path, options?.params, accessToken);

      const fetchOptions: RequestInit = {
        method,
        headers: {
          Accept: "application/json",
          ...(method === "POST" ? { "Content-Type": "application/json" } : {}),
        },
        ...(options?.body ? { body: JSON.stringify(options.body) } : {}),
      };

      let response: Response;
      try {
        response = await fetch(url, fetchOptions);
      } catch (err) {
        lastError = err instanceof Error ? err : new Error(String(err));
        if (attempt < this.maxRetries) {
          await sleep(this.retryBaseDelayMs * Math.pow(2, attempt));
          continue;
        }
        throw lastError;
      }

      if (response.ok) {
        const raw = await response.json();
        const data = (
          raw != null &&
          typeof raw === "object" &&
          "items" in raw &&
          Array.isArray((raw as Record<string, unknown>).items)
            ? (raw as Record<string, unknown>).items
            : raw
        ) as T;
        const pagination = this.extractPagination(response.headers);
        return { data, pagination };
      }

      if (response.status === 429) {
        if (attempt >= this.maxRetries) {
          const rateLimitBody = await response.text();
          throw new ServiceFusionApiError(429, rateLimitBody, path);
        }
        const retryAfterHeader = response.headers.get("Retry-After");
        const retryAfterMs = retryAfterHeader
          ? parseInt(retryAfterHeader, 10) * 1000
          : this.retryBaseDelayMs * Math.pow(2, attempt);
        const jitter = Math.random() * 250;
        await sleep(Math.max(retryAfterMs, 0) + jitter);
        continue;
      }

      if (response.status === 401 && attempt === 0) {
        this.auth.invalidateToken();
        continue;
      }

      const errorBody = await response.text();
      throw new ServiceFusionApiError(response.status, errorBody, path);
    }

    throw lastError ?? new Error(`Request to ${path} failed after max retries`);
  }

  private buildUrl(
    path: string,
    params?: Record<string, string>,
    accessToken?: string,
  ): string {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(cleanPath, this.baseUrl + "/");

    if (accessToken) {
      url.searchParams.set("access_token", accessToken);
    }
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
      }
    }

    return url.toString();
  }

  private extractPagination(headers: Headers): PaginationInfo | null {
    const totalCount = headers.get("X-Pagination-Total-Count");
    if (!totalCount) return null;

    return {
      totalCount: parseInt(totalCount, 10),
      pageCount: parseInt(headers.get("X-Pagination-Page-Count") ?? "0", 10),
      currentPage: parseInt(headers.get("X-Pagination-Current-Page") ?? "1", 10),
      perPage: parseInt(headers.get("X-Pagination-Per-Page") ?? "10", 10),
    };
  }
}

let clientInstance: ServiceFusionClient | null = null;

export function getClient(auth: ServiceFusionAuth): ServiceFusionClient {
  if (!clientInstance) {
    clientInstance = new ServiceFusionClient(auth);
  }
  return clientInstance;
}
