import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerCalendarTools } from "../../src/tools/calendar.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function callRecordingClient(record: { path?: string; params?: Record<string, string> }[]): ServiceFusionClient {
  return {
    get: async <T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      record.push({ path, params });
      if (path.startsWith("calendar-tasks/")) {
        return { data: { id: 1, type: "reminder", description: "Follow up call", start_date: "2026-07-06" } as T, pagination: null };
      }
      return {
        data: [{ id: 1, type: "reminder", description: "Follow up call", start_date: "2026-07-06" }] as T,
        pagination: { totalCount: 1, pageCount: 1, currentPage: 1, perPage: 20 },
      };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("get_calendar_tasks never sends a filters[] query param (API documents none)", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerCalendarTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_calendar_tasks", {})) as { content: { text: string }[] };

  const filterKeys = Object.keys(calls[0].params ?? {}).filter((k) => k.startsWith("filters["));
  assert.deepEqual(filterKeys, []);
  assert.match(result.content[0].text, /Follow up call/);
});

test("get_calendar_task_details fetches by id with repeat expand", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerCalendarTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_calendar_task_details", { calendar_task_id: 1 })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "calendar-tasks/1");
  assert.equal(calls[0].params?.expand, "repeat");
  assert.match(result.content[0].text, /Follow up call/);
});
