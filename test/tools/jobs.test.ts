import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerJobTools } from "../../src/tools/jobs.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function callRecordingClient(record: { path?: string; params?: Record<string, string>; body?: unknown }[], listData: unknown[] = [{ id: 1, number: "1001", status: "Scheduled", customer_name: "Acme" }]): ServiceFusionClient {
  return {
    get: async <T>(path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      record.push({ path, params });
      if (path.startsWith("jobs/")) {
        const id = Number(path.slice("jobs/".length));
        const match = (listData as { id: number }[]).find((item) => item.id === id);
        return { data: (match ?? listData[0]) as T, pagination: null };
      }
      return { data: listData as T, pagination: { totalCount: listData.length, pageCount: 1, currentPage: 1, perPage: 50 } };
    },
    post: async <T>(path: string, body: unknown): Promise<ApiResponse<T>> => {
      record.push({ path, body });
      return { data: { id: 2, number: "1002", status: "Scheduled", customer_name: "Acme" } as T, pagination: null };
    },
  } as unknown as ServiceFusionClient;
}

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("search_jobs does not send a sub_status filter param", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerJobTools(server, callRecordingClient(calls));

  await callTool(server, "search_jobs", { status: "Open" });

  const filterKeys = Object.keys(calls[0].params ?? {});
  assert.ok(!filterKeys.some((k) => k.includes("sub_status")));
});

test("search_jobs sends filters[zip_code] for zip_code arg", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerJobTools(server, callRecordingClient(calls));

  await callTool(server, "search_jobs", { zip_code: "27284" });

  assert.equal(calls[0].params?.["filters[zip_code]"], "27284");
});

test("get_job_details resolves job_number to an id then fetches details", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerJobTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "get_job_details", { job_number: "1001" })) as { content: { text: string }[] };
  assert.equal(calls[0].path, "jobs");
  assert.equal(calls[1].path, "jobs/1");
  assert.match(result.content[0].text, /Acme/);
});

test("get_job_details returns an error when job_number partial-matches multiple jobs with no exact match", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const listData = [
    { id: 1, number: "1005", status: "Scheduled", customer_name: "Acme" },
    { id: 2, number: "2100xyz", status: "Scheduled", customer_name: "Beta" },
  ];
  registerJobTools(server, callRecordingClient(calls, listData));

  const result = (await callTool(server, "get_job_details", { job_number: "100" })) as { content: { text: string }[]; isError?: boolean };

  assert.equal(result.isError, true);
  assert.match(result.content[0].text, /Multiple jobs match/);
  assert.match(result.content[0].text, /1005/);
  assert.match(result.content[0].text, /2100xyz/);
  // Must not proceed to fetch job details for an arbitrarily chosen match.
  assert.equal(calls.length, 1);
});

test("get_job_details uses the exact match when job_number partial-matches multiple jobs but one is exact", async () => {
  const calls: { path?: string; params?: Record<string, string> }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  const listData = [
    { id: 1, number: "1005", status: "Scheduled", customer_name: "Acme" },
    { id: 2, number: "100", status: "Scheduled", customer_name: "Beta" },
  ];
  registerJobTools(server, callRecordingClient(calls, listData));

  const result = (await callTool(server, "get_job_details", { job_number: "100" })) as { content: { text: string }[] };

  assert.equal(calls[0].path, "jobs");
  assert.equal(calls[1].path, "jobs/2");
  assert.match(result.content[0].text, /Beta/);
});

test("create_job posts required fields", async () => {
  const calls: { path?: string; body?: unknown }[] = [];
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerJobTools(server, callRecordingClient(calls));

  const result = (await callTool(server, "create_job", {
    customer_name: "Acme",
    category: "Residential Service",
    status: "Scheduled",
  })) as { content: { text: string }[] };

  assert.equal(calls[0].path, "jobs");
  assert.match(result.content[0].text, /Job created/);
});
