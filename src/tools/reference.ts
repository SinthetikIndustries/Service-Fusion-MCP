import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";
import { fetchAllPages } from "../utils/pagination.js";
import { StaticCache } from "../utils/cache.js";

interface NamedRecord {
  id: number;
  name?: string;
  [key: string]: unknown;
}

interface PaymentTypeRecord {
  id: number;
  code: string;
  short_name: string;
  type: string;
  is_custom: boolean;
}

interface MeRecord {
  id: number;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerReferenceTools(server: McpServer, client: ServiceFusionClient): void {
  const categoryCache = new StaticCache<NamedRecord[]>();
  const statusCache = new StaticCache<NamedRecord[]>();
  const sourceCache = new StaticCache<NamedRecord[]>();
  const paymentTypeCache = new StaticCache<PaymentTypeRecord[]>();

  server.registerTool(
    "get_job_categories",
    {
      title: "Get Job Categories",
      description:
        "List all available job categories (e.g., 'Commercial Service', 'Residential Install'). Use these values when creating jobs/estimates or filtering by category. Cached 30 minutes.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      try {
        const cached = categoryCache.get("job-categories");
        if (cached) {
          return { content: [{ type: "text" as const, text: `${cached.length} job categories (cached):\n\n${JSON.stringify(cached, null, 2)}` }] };
        }
        const { items, totalCount } = await fetchAllPages<NamedRecord>(client, "job-categories");
        categoryCache.set("job-categories", items);
        return { content: [{ type: "text" as const, text: `${totalCount} job categories:\n\n${JSON.stringify(items, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching job categories: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_job_statuses",
    {
      title: "Get Job Statuses",
      description:
        "List all available job statuses. Useful for knowing valid status values when filtering or creating jobs. Cached 30 minutes.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      try {
        const cached = statusCache.get("job-statuses");
        if (cached) {
          return { content: [{ type: "text" as const, text: `${cached.length} job statuses (cached):\n\n${JSON.stringify(cached, null, 2)}` }] };
        }
        const { items, totalCount } = await fetchAllPages<NamedRecord>(client, "job-statuses");
        statusCache.set("job-statuses", items);
        return { content: [{ type: "text" as const, text: `${totalCount} job statuses:\n\n${JSON.stringify(items, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching job statuses: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_sources",
    {
      title: "Get Lead Sources",
      description: "List all available lead sources. Use these values when creating jobs, estimates, or customers. Cached 30 minutes.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      try {
        const cached = sourceCache.get("sources");
        if (cached) {
          return { content: [{ type: "text" as const, text: `${cached.length} lead sources (cached):\n\n${JSON.stringify(cached, null, 2)}` }] };
        }
        const { items, totalCount } = await fetchAllPages<NamedRecord>(client, "sources");
        sourceCache.set("sources", items);
        return { content: [{ type: "text" as const, text: `${totalCount} lead sources:\n\n${JSON.stringify(items, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching lead sources: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_payment_types",
    {
      title: "Get Payment Types",
      description:
        "List all available payment types (e.g., credit card, check, cash). Use these values for the payment_type field on create_job, create_customer, or create_estimate. Cached 30 minutes.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      try {
        const cached = paymentTypeCache.get("payment-types");
        if (cached) {
          return { content: [{ type: "text" as const, text: `${cached.length} payment types (cached):\n\n${JSON.stringify(cached, null, 2)}` }] };
        }
        const { items, totalCount } = await fetchAllPages<PaymentTypeRecord>(client, "payment-types");
        paymentTypeCache.set("payment-types", items);
        return { content: [{ type: "text" as const, text: `${totalCount} payment types:\n\n${JSON.stringify(items, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching payment types: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_me",
    {
      title: "Get Current User",
      description: "Get the currently authenticated user's info. Useful for verifying API connectivity and credentials.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      try {
        const response = await client.get<MeRecord>("me");
        return { content: [{ type: "text" as const, text: `Current user:\n\n${JSON.stringify(response.data, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching current user: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
