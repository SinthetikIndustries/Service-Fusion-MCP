import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";
import { fetchAllPages } from "../utils/pagination.js";
import { StaticCache } from "../utils/cache.js";

interface TechRecord {
  id: number;
  first_name: string;
  last_name: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerTechTools(server: McpServer, client: ServiceFusionClient): void {
  const techCache = new StaticCache<TechRecord[]>();

  server.registerTool(
    "get_techs",
    {
      title: "Get Technicians",
      description: "List all technicians. Returns names, contact info, and role flags. Cached 30 minutes.",
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async () => {
      try {
        const cached = techCache.get("techs");
        if (cached) {
          return { content: [{ type: "text" as const, text: `${cached.length} technicians (cached):\n\n${JSON.stringify(cached, null, 2)}` }] };
        }
        const { items, totalCount } = await fetchAllPages<TechRecord>(client, "techs");
        techCache.set("techs", items);
        return { content: [{ type: "text" as const, text: `${totalCount} technicians:\n\n${JSON.stringify(items, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching technicians: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_tech_details",
    {
      title: "Get Technician Details",
      description: "Get a single technician's full record by internal ID.",
      inputSchema: {
        tech_id: z.number().int().positive().describe("Internal numeric technician ID."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ tech_id }) => {
      try {
        const response = await client.get<TechRecord>(`techs/${tech_id}`);
        return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
      } catch (error) {
        return errorResult(`Error fetching technician ${tech_id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
