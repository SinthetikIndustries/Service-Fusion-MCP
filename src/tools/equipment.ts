import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";

interface EquipmentRecord {
  id: number;
  [key: string]: unknown;
}

interface CustomerRecord {
  id: number;
  customer_name: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerEquipmentTools(server: McpServer, client: ServiceFusionClient): void {
  server.registerTool(
    "get_equipment",
    {
      title: "Get Equipment",
      description:
        "Get equipment records for a customer (type, make, model, serial, warranty, custom fields). Requires customer_id or customer_name. Optionally fetch a single record via equipment_id.",
      inputSchema: {
        customer_name: z.string().optional().describe("Customer name (partial match), resolved to customer_id internally. Either this or customer_id is required."),
        customer_id: z.number().int().positive().optional().describe("Customer ID (skips name resolution). Either this or customer_name is required."),
        equipment_id: z.number().int().positive().optional().describe("Specific equipment ID to fetch a single record."),
        page: z.number().int().min(1).optional().describe("Page number (default: 1)."),
        per_page: z.number().int().min(1).max(50).optional().describe("Results per page (default: 50, max: 50)."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        let customerId = args.customer_id;

        if (!customerId) {
          if (!args.customer_name) {
            return errorResult("Either customer_name or customer_id is required to look up equipment.");
          }

          const search = await client.get<CustomerRecord[]>("customers", {
            "filters[name]": args.customer_name,
            "per-page": "10",
          });
          const matches = search.data;
          if (!Array.isArray(matches) || matches.length === 0) {
            return errorResult(`No customer found matching "${args.customer_name}".`);
          }
          if (matches.length > 1) {
            const exact = matches.find((c) => c.customer_name.toLowerCase() === args.customer_name!.toLowerCase());
            if (exact) {
              customerId = exact.id;
            } else {
              const list = matches.map((c) => `  - ${c.customer_name} (ID: ${c.id})`).join("\n");
              return { content: [{ type: "text" as const, text: `Multiple customers match "${args.customer_name}":\n${list}\n\nUse a more specific name or provide customer_id directly.` }] };
            }
          } else {
            customerId = matches[0].id;
          }
        }

        if (args.equipment_id) {
          const response = await client.get<EquipmentRecord>(`customers/${customerId}/equipment/${args.equipment_id}`, { expand: "custom_fields" });
          return { content: [{ type: "text" as const, text: `Equipment record #${args.equipment_id}:\n\n${JSON.stringify(response.data, null, 2)}` }] };
        }

        const params: Record<string, string> = {
          expand: "custom_fields",
          page: String(args.page ?? 1),
          "per-page": String(args.per_page ?? 50),
        };
        const response = await client.get<EquipmentRecord[]>(`customers/${customerId}/equipment`, params);
        const equipment = response.data;
        if (!Array.isArray(equipment) || equipment.length === 0) {
          return { content: [{ type: "text" as const, text: `No equipment records found for customer ID ${customerId}.` }] };
        }

        const pagination = response.pagination;
        let text = `Found ${pagination?.totalCount ?? equipment.length} equipment record(s) for customer ID ${customerId}:\n`;
        if (pagination && pagination.pageCount > 1) {
          text += `Page ${pagination.currentPage} of ${pagination.pageCount} (${pagination.totalCount} total)\n`;
        }
        text += "\n" + JSON.stringify(equipment, null, 2);
        return { content: [{ type: "text" as const, text }] };
      } catch (error) {
        return errorResult(`Error fetching equipment: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
