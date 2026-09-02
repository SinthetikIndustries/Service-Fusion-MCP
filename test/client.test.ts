import { test } from "node:test";
import assert from "node:assert/strict";
import { MockAgent, setGlobalDispatcher } from "undici";
import { ServiceFusionClient, ServiceFusionApiError } from "../src/client.js";
import { ServiceFusionAuth } from "../src/auth.js";

function fakeAuth(token = "tok-1"): ServiceFusionAuth {
  return {
    getAccessToken: async () => token,
    invalidateToken: () => {},
  } as unknown as ServiceFusionAuth;
}

function setupMockAgent(): { agent: MockAgent; pool: ReturnType<MockAgent["get"]> } {
  const agent = new MockAgent();
  agent.disableNetConnect();
  setGlobalDispatcher(agent);
  const pool = agent.get("https://api.example.com");
  return { agent, pool };
}

test("GET unwraps { items: [...] } envelope and parses pagination headers", async () => {
  const { pool } = setupMockAgent();
  pool
    .intercept({ path: /\/v1\/jobs.*/, method: "GET" })
    .reply(
      200,
      { items: [{ id: 1 }, { id: 2 }] },
      {
        headers: {
          "X-Pagination-Total-Count": "2",
          "X-Pagination-Page-Count": "1",
          "X-Pagination-Current-Page": "1",
          "X-Pagination-Per-Page": "50",
        },
      },
    );

  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });
  const result = await client.get<{ id: number }[]>("jobs", { sort: "-start_date" });

  assert.deepEqual(result.data, [{ id: 1 }, { id: 2 }]);
  assert.deepEqual(result.pagination, {
    totalCount: 2,
    pageCount: 1,
    currentPage: 1,
    perPage: 50,
  });
});

test("GET on jobs defaults sort=-start_date when caller omits it", async () => {
  const { pool } = setupMockAgent();
  let capturedPath = "";
  pool
    .intercept({ path: /\/v1\/jobs.*/, method: "GET" })
    .reply((req) => {
      capturedPath = req.path;
      return { statusCode: 200, data: { items: [] } };
    });

  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });
  await client.get("jobs", {});

  assert.ok(capturedPath.includes("sort=-start_date"), capturedPath);
});

test("POST sends JSON body and returns created record", async () => {
  const { pool } = setupMockAgent();
  pool
    .intercept({ path: /\/v1\/customers.*/, method: "POST" })
    .reply(201, { id: 42, customer_name: "Acme" });

  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });
  const result = await client.post<{ id: number }>("customers", {
    customer_name: "Acme",
  });

  assert.equal(result.data.id, 42);
});

test("401 triggers one token invalidation and retry, then succeeds", async () => {
  const { pool } = setupMockAgent();
  pool
    .intercept({ path: /\/v1\/me.*/, method: "GET" })
    .reply(401, "expired")
    .times(1);
  pool
    .intercept({ path: /\/v1\/me.*/, method: "GET" })
    .reply(200, { items: [] })
    .times(1);

  let invalidateCalls = 0;
  const auth = {
    getAccessToken: async () => "tok",
    invalidateToken: () => {
      invalidateCalls++;
    },
  } as unknown as ServiceFusionAuth;

  const client = new ServiceFusionClient(auth, {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });
  const result = await client.get("me");

  assert.equal(invalidateCalls, 1);
  assert.deepEqual(result.data, []);
});

test("non-401/429 error status throws ServiceFusionApiError with response body", async () => {
  const { pool } = setupMockAgent();
  pool
    .intercept({ path: /\/v1\/customers.*/, method: "POST" })
    .reply(403, "Forbidden: insufficient permissions");

  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });

  await assert.rejects(
    () => client.post("customers", { customer_name: "Acme" }),
    (err: unknown) => {
      assert.ok(err instanceof ServiceFusionApiError);
      assert.equal(err.statusCode, 403);
      assert.match(err.responseBody, /Forbidden/);
      return true;
    },
  );
});

test("GET on jobs defaults sort=-start_date when params argument is omitted entirely", async () => {
  const { pool } = setupMockAgent();
  let capturedPath = "";
  pool
    .intercept({ path: /\/v1\/jobs.*/, method: "GET" })
    .reply((req) => {
      capturedPath = req.path;
      return { statusCode: 200, data: { items: [] } };
    });

  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });
  await client.get("jobs");

  assert.ok(capturedPath.includes("sort=-start_date"), capturedPath);
});

test("sustained 429s exhaust retries and throw ServiceFusionApiError with statusCode 429", async () => {
  const { pool } = setupMockAgent();
  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });

  pool
    .intercept({ path: /\/v1\/jobs.*/, method: "GET" })
    .reply(429, "still rate limited", { headers: { "Retry-After": "0" } })
    .times(10);

  await assert.rejects(
    () => client.get("jobs", { sort: "id" }),
    (err: unknown) => {
      assert.ok(err instanceof ServiceFusionApiError);
      assert.equal(err.statusCode, 429);
      assert.match(err.responseBody, /still rate limited/);
      return true;
    },
  );
});

test("429 is retried using Retry-After header then succeeds", async () => {
  const { pool } = setupMockAgent();
  pool
    .intercept({ path: /\/v1\/jobs.*/, method: "GET" })
    .reply(429, "rate limited", { headers: { "Retry-After": "0" } })
    .times(1);
  pool
    .intercept({ path: /\/v1\/jobs.*/, method: "GET" })
    .reply(200, { items: [{ id: 1 }] })
    .times(1);

  const client = new ServiceFusionClient(fakeAuth(), {
    baseUrl: "https://api.example.com/v1",
    retryBaseDelayMs: 1,
  });
  const result = await client.get<{ id: number }[]>("jobs", { sort: "id" });

  assert.deepEqual(result.data, [{ id: 1 }]);
});
