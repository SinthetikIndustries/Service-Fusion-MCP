import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerEquipmentTools } from "../../src/tools/equipment.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function callRecordingClient(record: { path?: string; params?: Record<string, string> }[]): ServiceFusionClient {
  return {
    get: async <T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      record.push({ path, params });
      if (path === "customers") {
        return { data: [{ id: 7, customer_name: "Acme Corp" }] as T, pagination: null };
      }
      if (path.includes("/equipment/")) {
        return { data: { id: 3, type: "Rooftop Unit" } as T, pagination: null };
      }
      return { data: [{ id: 3, type: "Rooftop Unit" }] as T, pagination: { totalCount: 1, pageCount: 1, currentPage: 1, perPage: 50 } };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("get_equipment resolves customer_name to id then lists equipment", async () => {
  const calls: { path?: string }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEquipmentTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_equipment", { customer_name: "Acme" })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "customers");
  assert.equal(calls[1].path, "customers/7/equipment");
  assert.match(result.content[0].text, /Rooftop Unit/);
});

test("get_equipment with customer_id skips name resolution", async () => {
  const calls: { path?: string }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEquipmentTools(server, callRecordingClient(calls));

  await callTool(server, "get_equipment", { customer_id: 7 });
  assert.equal(calls[0].path, "customers/7/equipment");
});

test("get_equipment with equipment_id fetches single record", async () => {
  const calls: { path?: string }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEquipmentTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_equipment", { customer_id: 7, equipment_id: 3 })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "customers/7/equipment/3");
  assert.match(result.content[0].text, /Rooftop Unit/);
});

test("get_equipment reports an error when no customer matches the name", async () => {
  const calls: { path?: string }[] = [];
  const client = {
    get: async <T>(path: string): Promise<ApiResponse<T>> => {
      calls.push({ path });
      if (path === "customers") {
        return { data: [] as T, pagination: null };
      }
      return { data: [] as T, pagination: null };
    },
  } as unknown as ServiceFusionClient;
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEquipmentTools(server, client);

  const result = (await callTool(server, "get_equipment", { customer_name: "Nonexistent Co" })) as { content: { text: string }[]; isError?: boolean };
  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /No customer found/i);
});

test("get_equipment lists candidates when multiple customers match without an exact name", async () => {
  const calls: { path?: string }[] = [];
  const client = {
    get: async <T>(path: string): Promise<ApiResponse<T>> => {
      calls.push({ path });
      if (path === "customers") {
        return {
          data: [
            { id: 7, customer_name: "Acme Plumbing" },
            { id: 8, customer_name: "Acme Electric" },
          ] as T,
          pagination: null,
        };
      }
      return { data: [] as T, pagination: null };
    },
  } as unknown as ServiceFusionClient;
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerEquipmentTools(server, client);

  const result = (await callTool(server, "get_equipment", { customer_name: "Acme" })) as { content: { text: string }[]; isError?: boolean };
  assert.match(result.content[0].text, /Multiple customers match/i);
  assert.match(result.content[0].text, /Acme Plumbing/);
  assert.match(result.content[0].text, /Acme Electric/);
  // Only the customer search should have run — no equipment lookup should have been made for either candidate.
  assert.equal(calls.length, 1);
});
