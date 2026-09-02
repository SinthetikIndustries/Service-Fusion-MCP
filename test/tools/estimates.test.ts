import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerEstimateTools } from "../../src/tools/estimates.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function callRecordingClient(record: { path?: string; params?: Record<string, string>; body?: unknown }[]): ServiceFusionClient {
  return {
    get: async <T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      record.push({ path, params });
      if (path.startsWith("estimates/")) {
        return { data: { id: 1, number: "E-100", status: "Estimate Requested", customer_name: "Acme" } as T, pagination: null };
      }
      return {
        data: [{ id: 1, number: "E-100", status: "Estimate Requested", customer_name: "Acme" }] as T,
        pagination: { totalCount: 1, pageCount: 1, currentPage: 1, perPage: 20 },
      };
    },
    post: async <T>(path: string, body: unknown): Promise<ApiResponse<T>> => {
      record.push({ path, body });
      return { data: { id: 2, number: "E-101", status: "Estimate Requested", customer_name: "Acme" } as T, pagination: null };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("search_estimates sends filters[customer_name] and filters[status]", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEstimateTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "search_estimates", { customer_name: "Acme", status: "Estimate Requested" })) as { content: { text: string }[] };

  assert.equal(calls[0].path, "estimates");
  assert.equal(calls[0].params?.["filters[customer_name]"], "Acme");
  assert.equal(calls[0].params?.["filters[status]"], "Estimate Requested");
  assert.match(result.content[0].text, /Acme/);
});

test("get_estimate_details fetches by id", async () => {
  const calls: { path?: string }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEstimateTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_estimate_details", { estimate_id: 1 })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "estimates/1");
  assert.match(result.content[0].text, /E-100/);
});

test("create_estimate posts required fields", async () => {
  const calls: { path?: string; body?: unknown }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEstimateTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "create_estimate", { customer_name: "Acme", category: "Residential Service" })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "estimates");
  assert.match(result.content[0].text, /Estimate created/);
});
