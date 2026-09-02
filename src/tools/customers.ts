import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient, ServiceFusionApiError as ApiErrorType } from "../client.js";
import { ServiceFusionApiError } from "../client.js";
import { buildFilterParams } from "../utils/filters.js";

interface CustomerRecord {
  id: number;
  customer_name: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerCustomerTools(server: McpServer, client: ServiceFusionClient): void {
  server.registerTool(
    "search_customers",
    {
      title: "Search Customers",
      description:
        "Search for customers by name, contact name, phone, email, address, city, or zip/postal code. Returns matching customer records.",
      inputSchema: {
        name: z.string().optional().describe("Customer/company name (partial match)."),
        contact_first_name: z.string().optional().describe("Contact first name (partial match)."),
        contact_last_name: z.string().optional().describe("Contact last name (partial match)."),
        phone: z.string().optional().describe("Phone number (partial match)."),
        email: z.string().optional().describe("Email address (full match)."),
        address: z.string().optional().describe("Street address (partial match)."),
        city: z.string().optional().describe("City (full match)."),
        zip_code: z.string().optional().describe("Zip/postal code (full match)."),
        page: z.number().int().min(1).optional().describe("Page number (default: 1)."),
        per_page: z.number().int().min(1).max(50).optional().describe("Results per page (default: 20, max: 50)."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const filters: Record<string, unknown> = {
          name: args.name,
          contact_first_name: args.contact_first_name,
          contact_last_name: args.contact_last_name,
          phone: args.phone,
          email: args.email,
          address: args.address,
          city: args.city,
          // Service Fusion documents this filter as `postal_code`, not `zip_code`.
          postal_code: args.zip_code,
        };

        const params: Record<string, string> = {
          ...buildFilterParams(filters),
          sort: "name",
          page: String(args.page ?? 1),
          "per-page": String(args.per_page ?? 20),
        };

        const response = await client.get<CustomerRecord[]>("customers", params);
        const customers = response.data;

        if (!Array.isArray(customers) || customers.length === 0) {
          return { content: [{ type: "text" as const, text: "No customers found matching the search criteria." }] };
        }

        const pagination = response.pagination;
        let text = `Found ${pagination?.totalCount ?? customers.length} customer(s):\n`;
        if (pagination && pagination.pageCount > 1) {
          text += `Page ${pagination.currentPage} of ${pagination.pageCount} (${pagination.totalCount} total)\n`;
        }
        text += "\n" + JSON.stringify(customers, null, 2);

        return { content: [{ type: "text" as const, text }] };
      } catch (error) {
        return errorResult(`Error searching customers: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_customer_details",
    {
      title: "Get Customer Details",
      description: "Get a single customer's full record by internal ID, including contacts, locations, and custom fields.",
      inputSchema: {
        customer_id: z.number().int().positive().describe("Internal numeric customer ID."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ customer_id }) => {
      try {
        const response = await client.get<CustomerRecord>(`customers/${customer_id}`, {
          expand: "contacts,contacts.phones,contacts.emails,locations,custom_fields",
        });
        return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
      } catch (error) {
        return errorResult(`Error fetching customer ${customer_id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "create_customer",
    {
      title: "Create Customer",
      description:
        "Create a new customer record. Contacts/locations can't be set here — Service Fusion publishes no item schema for those fields; add them via the web UI instead. A 403 response means these credentials lack permission to create customers, and the same web UI must be used.",
      inputSchema: {
        customer_name: z.string().min(1).describe("Customer or company name."),
        referral_source: z.string().optional().describe("Lead/referral source (exact match). Use get_sources for valid values."),
        payment_type: z.string().optional().describe("Default payment type. Use get_payment_types for valid values."),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const payload: Record<string, unknown> = { customer_name: args.customer_name };
        for (const key of ["referral_source", "payment_type"] as const) {
          if (args[key]) payload[key] = args[key];
        }

        const response = await client.post<CustomerRecord>("customers", payload);
        const customer = response.data;
        return {
          content: [
            {
              type: "text" as const,
              text: `Customer created: ID ${customer.id} — ${customer.customer_name}\n\n${JSON.stringify(customer, null, 2)}`,
            },
          ],
        };
      } catch (error) {
        if (error instanceof ServiceFusionApiError) {
          const apiError = error as ApiErrorType;
          if (apiError.statusCode === 403) {
            return errorResult(
              "Failed to create customer: 403 Forbidden. Current API credentials lack permission to create customers — use the Service Fusion web UI instead.",
            );
          }
          return errorResult(`Failed to create customer (HTTP ${apiError.statusCode}): ${apiError.responseBody}`);
        }
        return errorResult(`Error creating customer: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
