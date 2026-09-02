import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerTechTools } from "../../src/tools/techs.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function fakeClient(handlers: {
  list?: unknown[];
  detail?: Record<string, unknown>;
}): ServiceFusionClient {
  return {
    get: async <T>(path: string): Promise<ApiResponse<T>> => {
      if (path === "techs") {
        return { data: (handlers.list ?? []) as T, pagination: { totalCount: (handlers.list ?? []).length, pageCount: 1, currentPage: 1, perPage: 50 } };
      }
      return { data: (handlers.detail ?? {}) as T, pagination: null };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("get_techs lists all technicians", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const client = fakeClient({ list: [{ id: 1, first_name: "Sam", last_name: "Rios" }] });
  registerTechTools(server, client);

  const result = (await callTool(server, "get_techs")) as { content: { text: string }[] };
  assert.match(result.content[0].text, /Sam/);
});

test("get_tech_details fetches a single technician by id", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const client = fakeClient({ detail: { id: 5, first_name: "Priya", last_name: "Nair" } });
  registerTechTools(server, client);

  const result = (await callTool(server, "get_tech_details", { tech_id: 5 })) as { content: { text: string }[] };
  assert.match(result.content[0].text, /Priya/);
});
