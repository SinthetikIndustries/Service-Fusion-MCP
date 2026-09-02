import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";
import { buildFilterParams } from "../utils/filters.js";

interface EstimateRecord {
  id: number;
  number: string;
  status: string;
  customer_name: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerEstimateTools(server: McpServer, client: ServiceFusionClient): void {
  server.registerTool(
    "search_estimates",
    {
      title: "Search Estimates",
      description: "Search estimates with filters: status, customer, contact, address, category, source, PO number, dates.",
      inputSchema: {
        status: z.string().optional().describe("Estimate status(es), comma-separated (full match)."),
        customer_name: z.string().optional().describe("Customer name (partial match)."),
        contact_first_name: z.string().optional().describe("Contact first name (partial match)."),
        contact_last_name: z.string().optional().describe("Contact last name (partial match)."),
        address: z.string().optional().describe("Address (partial match)."),
        city: z.string().optional().describe("City (full match)."),
        zip_code: z.string().optional().describe("Zip code (full match)."),
        category: z.string().optional().describe("Category(ies), comma-separated (full match)."),
        source: z.string().optional().describe("Lead source(s), comma-separated (full match)."),
        number: z.string().optional().describe("Estimate number (partial match)."),
        po_number: z.string().optional().describe("PO number (partial match)."),
        start_date_gte: z.string().optional().describe("Starting on/after this date (YYYY-MM-DD)."),
        start_date_lte: z.string().optional().describe("Starting on/before this date (YYYY-MM-DD)."),
        page: z.number().int().min(1).optional().describe("Page number (default: 1)."),
        per_page: z.number().int().min(1).max(50).optional().describe("Results per page (default: 20, max: 50)."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const filters: Record<string, unknown> = {
          status: args.status,
          customer_name: args.customer_name,
          contact_first_name: args.contact_first_name,
          contact_last_name: args.contact_last_name,
          address: args.address,
          city: args.city,
          zip_code: args.zip_code,
          category: args.category,
          source: args.source,
          number: args.number,
          po_number: args.po_number,
        };
        if (args.start_date_gte || args.start_date_lte) {
          filters.start_date = { gte: args.start_date_gte, lte: args.start_date_lte };
        }

        const params: Record<string, string> = {
          ...buildFilterParams(filters),
          sort: "-start_date",
          page: String(args.page ?? 1),
          "per-page": String(args.per_page ?? 20),
        };

        const response = await client.get<EstimateRecord[]>("estimates", params);
        const estimates = response.data;
        if (!Array.isArray(estimates) || estimates.length === 0) {
          return { content: [{ type: "text" as const, text: "No estimates found matching the search criteria." }] };
        }

        const pagination = response.pagination;
        let text = `Found ${pagination?.totalCount ?? estimates.length} estimate(s):\n`;
        if (pagination && pagination.pageCount > 1) {
          text += `Page ${pagination.currentPage} of ${pagination.pageCount} (${pagination.totalCount} total)\n`;
        }
        text += "\n" + JSON.stringify(estimates, null, 2);
        return { content: [{ type: "text" as const, text }] };
      } catch (error) {
        return errorResult(`Error searching estimates: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_estimate_details",
    {
      title: "Get Estimate Details",
      description: "Get complete details for a single estimate by internal ID, including line items, techs, notes, and payments.",
      inputSchema: {
        estimate_id: z.number().int().positive().describe("Internal numeric estimate ID."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ estimate_id }) => {
      try {
        const response = await client.get<EstimateRecord>(`estimates/${estimate_id}`, {
          expand: "agents,custom_fields,equipment,techs_assigned,tasks,notes,products,services,other_charges,payments,tags",
        });
        const estimate = response.data;
        const summary = `Estimate #${estimate.number ?? estimate_id} — ${estimate.status ?? "Unknown"} — ${estimate.customer_name ?? "Unknown Customer"}`;
        return { content: [{ type: "text" as const, text: `${summary}\n\n${JSON.stringify(estimate, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching estimate ${estimate_id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "create_estimate",
    {
      title: "Create Estimate",
      description: "Create a new estimate. Requires an exact customer name and category.",
      inputSchema: {
        customer_name: z.string().min(1).describe("Exact customer name. Use search_customers to find it."),
        category: z.string().min(1).describe("Estimate category (exact match)."),
        description: z.string().optional().describe("Estimate description."),
        start_date: z.string().optional().describe("Proposed start date/time (ISO 8601)."),
        source: z.string().optional().describe("Lead source (exact match). Use get_sources."),
        street_1: z.string().optional().describe("Site street address."),
        city: z.string().optional().describe("Site city."),
        state_prov: z.string().optional().describe("Site state/province."),
        postal_code: z.string().optional().describe("Site postal code."),
        po_number: z.string().optional().describe("Customer PO number."),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const payload: Record<string, unknown> = { customer_name: args.customer_name, category: args.category };
        for (const key of ["description", "start_date", "source", "street_1", "city", "state_prov", "postal_code", "po_number"] as const) {
          if (args[key]) payload[key] = args[key];
        }

        const response = await client.post<EstimateRecord>("estimates", payload);
        const estimate = response.data;
        return {
          content: [
            {
              type: "text" as const,
              text: `Estimate created successfully: #${estimate.number ?? estimate.id} — ${estimate.customer_name}\n\n${JSON.stringify(estimate, null, 2)}`,
            },
          ],
        };
      } catch (error) {
        return errorResult(`Error creating estimate: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
