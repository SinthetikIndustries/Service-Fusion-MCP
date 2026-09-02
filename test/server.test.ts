import { test } from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../src/server.js";
import type { ServiceFusionClient } from "../src/client.js";

test("createServer registers all 24 tools exactly once", () => {
  const fakeClient = {} as ServiceFusionClient;
  const server = createServer(fakeClient);

  const tools = (server as unknown as { _registeredTools: Record<string, unknown> })._registeredTools;
  const names = Object.keys(tools);

  const expected = [
    "get_todays_jobs", "search_jobs", "get_job_details", "get_customer_jobs", "create_job",
    "search_customers", "get_customer_details", "create_customer",
    "search_estimates", "get_estimate_details", "create_estimate",
    "search_invoices", "get_invoice_details",
    "get_calendar_tasks", "get_calendar_task_details",
    "get_equipment",
    "get_techs", "get_tech_details",
    "get_job_categories", "get_job_statuses", "get_sources", "get_payment_types", "get_me",
    "get_api_docs",
  ];

  for (const name of expected) {
    assert.ok(names.includes(name), `expected tool ${name} to be registered`);
  }
  assert.equal(names.length, expected.length);
});
