import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";

interface InvoiceRecord {
  id: number;
  number: string;
  customer?: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerInvoiceTools(server: McpServer, client: ServiceFusionClient): void {
  server.registerTool(
    "search_invoices",
    {
      title: "Search Invoices",
      description:
        "List invoices, sorted and paginated. NOTE: Service Fusion's /invoices endpoint documents no server-side filters — customer_name, if provided, is applied as a client-side substring match against the fetched page, not a server-side query.",
      inputSchema: {
        customer_name: z.string().optional().describe("Client-side substring filter on the customer field (case-insensitive). Not sent to the API."),
        sort: z.string().optional().describe("Sort field, prefix '-' for descending. Default: '-date'."),
        page: z.number().int().min(1).optional().describe("Page number (default: 1)."),
        per_page: z.number().int().min(1).max(50).optional().describe("Results per page (default: 20, max: 50)."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const params: Record<string, string> = {
          sort: args.sort ?? "-date",
          page: String(args.page ?? 1),
          "per-page": String(args.per_page ?? 20),
        };

        const response = await client.get<InvoiceRecord[]>("invoices", params);
        let invoices = response.data;
        if (!Array.isArray(invoices)) invoices = [];

        if (args.customer_name) {
          const needle = args.customer_name.toLowerCase();
          invoices = invoices.filter((inv) => (inv.customer ?? "").toString().toLowerCase().includes(needle));
        }

        if (invoices.length === 0) {
          return { content: [{ type: "text" as const, text: "No invoices found." }] };
        }

        let text = `Found ${invoices.length} invoice(s) on this page${args.customer_name ? ` matching "${args.customer_name}"` : ""}:\n`;
        const pagination = response.pagination;
        if (pagination && pagination.pageCount > 1) {
          text += `Page ${pagination.currentPage} of ${pagination.pageCount} (${pagination.totalCount} total across all pages — client-side filter only applies to this page)\n`;
        }
        text += "\n" + JSON.stringify(invoices, null, 2);
        return { content: [{ type: "text" as const, text }] };
      } catch (error) {
        return errorResult(`Error fetching invoices: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_invoice_details",
    {
      title: "Get Invoice Details",
      description: "Get a single invoice's full record by internal ID.",
      inputSchema: {
        invoice_id: z.number().int().positive().describe("Internal numeric invoice ID."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ invoice_id }) => {
      try {
        const response = await client.get<InvoiceRecord>(`invoices/${invoice_id}`);
        return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
      } catch (error) {
        return errorResult(`Error fetching invoice ${invoice_id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
