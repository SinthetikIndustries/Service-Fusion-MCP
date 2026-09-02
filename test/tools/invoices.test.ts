import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerInvoiceTools } from "../../src/tools/invoices.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function callRecordingClient(record: { path?: string; params?: Record<string, string> }[]): ServiceFusionClient {
  return {
    get: async <T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      record.push({ path, params });
      if (path.startsWith("invoices/")) {
        return { data: { id: 1, number: "INV-1", customer: "Acme Corp", total: 500 } as T, pagination: null };
      }
      return {
        data: [
          { id: 1, number: "INV-1", customer: "Acme Corp", total: 500 },
          { id: 2, number: "INV-2", customer: "Beta LLC", total: 250 },
        ] as T,
        pagination: { totalCount: 2, pageCount: 1, currentPage: 1, perPage: 20 },
      };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("search_invoices never sends a filters[] query param (API documents none)", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerInvoiceTools(server, callRecordingClient(calls));

  await callTool(server, "search_invoices", { customer_name: "Acme" });

  const filterKeys = Object.keys(calls[0].params ?? {}).filter((k) => k.startsWith("filters["));
  assert.deepEqual(filterKeys, []);
});

test("search_invoices applies client-side customer_name substring match", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerInvoiceTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "search_invoices", { customer_name: "acme" })) as { content: { text: string }[] };
  assert.match(result.content[0].text, /Acme Corp/);
  assert.doesNotMatch(result.content[0].text, /Beta LLC/);
});

test("get_invoice_details fetches by id", async () => {
  const calls: { path?: string }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerInvoiceTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_invoice_details", { invoice_id: 1 })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "invoices/1");
  assert.match(result.content[0].text, /INV-1/);
});
