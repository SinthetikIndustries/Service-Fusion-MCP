import { test } from "node:test";
import assert from "node:assert/strict";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { registerDocsTools } from "../../src/tools/docs.js";

async function callTool(server: McpServer, name: string, args: Record<string, unknown> = {}) {
  const tools = (server as unknown as { _registeredTools: Record<string, { handler: (a: unknown) => Promise<unknown> }> })._registeredTools;
  return tools[name].handler(args);
}

test("get_api_docs with section='index' lists available sections", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerDocsTools(server);

  const result = (await callTool(server, "get_api_docs", { section: "index" })) as { content: { text: string }[] };
  assert.match(result.content[0].text, /jobs/);
  assert.match(result.content[0].text, /customers/);
  assert.match(result.content[0].text, /estimates/);
});

test("get_api_docs with section='jobs' returns the /jobs endpoint docs", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerDocsTools(server);

  const result = (await callTool(server, "get_api_docs", { section: "jobs" })) as { content: { text: string }[] };
  assert.match(result.content[0].text, /\/jobs/);
});

test("get_api_docs with section='job-statuses' returns the /job-statuses endpoint docs", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerDocsTools(server);

  const result = (await callTool(server, "get_api_docs", { section: "job-statuses" })) as { content: { text: string }[] };
  assert.match(result.content[0].text, /\/job-statuses/);
});

test("get_api_docs with an unknown section returns an error", async () => {
  const server = new McpServer({ name: "test", version: "0.0.0" });
  registerDocsTools(server);

  const result = (await callTool(server, "get_api_docs", { section: "not-a-real-section" })) as { content: { text: string }[]; isError?: boolean };
  assert.equal(result.isError, true);
});
