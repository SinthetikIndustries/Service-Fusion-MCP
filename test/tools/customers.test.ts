import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCustomerTools } from "../../src/tools/customers.js";
import { ServiceFusionApiError } from "../../src/client.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function callRecordingClient(record: { path?: string; params?: Record<string, string>; body?: unknown }[]): ServiceFusionClient {
  return {
    get: async <T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      record.push({ path, params });
      return { data: [{ id: 1, customer_name: "Acme Corp" }] as T, pagination: { totalCount: 1, pageCount: 1, currentPage: 1, perPage: 20 } };
    },
    post: async <T>(path: string, body: unknown): Promise<ApiResponse<T>> => {
      record.push({ path, body });
      return { data: { id: 99, customer_name: "New Co" } as T, pagination: null };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("search_customers sends filters[postal_code], not filters[zip_code]", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerCustomerTools(server, callRecordingClient(calls));

  await callTool(server, "search_customers", { zip_code: "27284" });

  assert.equal(calls[0].params?.["filters[postal_code]"], "27284");
  assert.equal(calls[0].params?.["filters[zip_code]"], undefined);
});

test("search_customers sends filters[name] for name search", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerCustomerTools(server, callRecordingClient(calls));

  await callTool(server, "search_customers", { name: "Acme" });

  assert.equal(calls[0].params?.["filters[name]"], "Acme");
});

test("get_customer_details fetches by id", async () => {
  const calls: { path?: string }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerCustomerTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_customer_details", { customer_id: 1 })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "customers/1");
  assert.match(result.content[0].text, /Acme/);
});

test("create_customer posts to customers with customer_name", async () => {
  const calls: { path?: string; body?: unknown }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerCustomerTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "create_customer", { customer_name: "New Co" })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "customers");
  assert.equal((calls[0].body as { customer_name: string }).customer_name, "New Co");
  assert.match(result.content[0].text, /New Co/);
});

test("create_customer surfaces a 403 as a web-UI guidance message", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const client = {
    get: async () => {
      throw new Error("not used");
    },
    post: async () => {
      throw new ServiceFusionApiError(403, "Forbidden", "customers");
    },
  } as unknown as ServiceFusionClient;
  registerCustomerTools(server, client);

  const result = (await callTool(server, "create_customer", { customer_name: "New Co" })) as { content: { text: string }[]; isError?: boolean };
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /use the Service Fusion web UI instead/i);
});
