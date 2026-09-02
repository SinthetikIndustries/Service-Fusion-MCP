import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerReferenceTools } from "../../src/tools/reference.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function fakeClient(responses: Record<string, unknown>): ServiceFusionClient {
  return {
    get: async <T>(path: string): Promise<ApiResponse<T>> => ({
      data: (responses[path] ?? []) as T,
      pagination: { totalCount: (responses[path] as unknown[])?.length ?? 0, pageCount: 1, currentPage: 1, perPage: 50 },
    }),
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("get_payment_types returns payment type records", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const client = fakeClient({
    "payment-types": [{ id: 1, code: "CC", short_name: "Credit Card", type: "credit_card", is_custom: false }],
  });
  registerReferenceTools(server, client);

  const result = (await callTool(server, "get_payment_types")) as { content: { text: string }[] };
  assert.match(result.content[0].text, /Credit Card/);
});

test("get_job_categories returns category records", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const client = fakeClient({ "job-categories": [{ id: 1, name: "Residential Service" }] });
  registerReferenceTools(server, client);

  const result = (await callTool(server, "get_job_categories")) as { content: { text: string }[] };
  assert.match(result.content[0].text, /Residential Service/);
});

test("get_job_statuses caches results across calls", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  let callCount = 0;
  const client = {
    get: async <T>(path: string): Promise<import("../../src/client.js").ApiResponse<T>> => {
      callCount++;
      if (callCount === 1) {
        return {
          data: [{ id: 1, name: "Scheduled" }] as T,
          pagination: { totalCount: 1, pageCount: 1, currentPage: 1, perPage: 50 },
        };
      }
      throw new Error("should not refetch job statuses — cache should have been used");
    },
  } as unknown as ServiceFusionClient;
  registerReferenceTools(server, client);

  const first = (await callTool(server, "get_job_statuses")) as { content: { text: string }[] };
  assert.match(first.content[0].text, /Scheduled/);
  assert.doesNotMatch(first.content[0].text, /\(cached\)/);

  const second = (await callTool(server, "get_job_statuses")) as { content: { text: string }[] };
  assert.match(second.content[0].text, /Scheduled/);
  assert.match(second.content[0].text, /\(cached\)/);
  assert.equal(callCount, 1, "job statuses should only be fetched once due to caching");
});

test("get_me returns the current user record", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const client = fakeClient({ me: { id: 7, first_name: "Dana" } });
  registerReferenceTools(server, client);

  const result = (await callTool(server, "get_me")) as { content: { text: string }[] };
  assert.match(result.content[0].text, /Dana/);
});
