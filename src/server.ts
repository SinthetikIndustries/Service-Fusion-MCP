import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "./client.js";
import { registerJobTools } from "./tools/jobs.js";
import { registerCustomerTools } from "./tools/customers.js";
import { registerEstimateTools } from "./tools/estimates.js";
import { registerInvoiceTools } from "./tools/invoices.js";
import { registerCalendarTools } from "./tools/calendar.js";
import { registerEquipmentTools } from "./tools/equipment.js";
import { registerTechTools } from "./tools/techs.js";
import { registerReferenceTools } from "./tools/reference.js";
import { registerDocsTools } from "./tools/docs.js";

export function createServer(client: ServiceFusionClient): McpServer {
  const server = new McpServer(
    { name: "service-fusion", version: "1.0.0" },
    { capabilities: { logging: {} } },
  );

  registerJobTools(server, client);
  registerCustomerTools(server, client);
  registerEstimateTools(server, client);
  registerInvoiceTools(server, client);
  registerCalendarTools(server, client);
  registerEquipmentTools(server, client);
  registerTechTools(server, client);
  registerReferenceTools(server, client);
  registerDocsTools(server);

  return server;
}
