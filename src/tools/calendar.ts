import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";

interface CalendarTaskRecord {
  id: number;
  type: string;
  description: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

export function registerCalendarTools(server: McpServer, client: ServiceFusionClient): void {
  server.registerTool(
    "get_calendar_tasks",
    {
      title: "Get Calendar Tasks",
      description:
        "List calendar tasks (reminders/appointments tied to users, customers, jobs, or estimates), sorted and paginated. NOTE: Service Fusion's /calendar-tasks endpoint documents no server-side filters — use the returned users_id/customers_id/jobs_id/estimates_id fields to correlate manually.",
      inputSchema: {
        sort: z.string().optional().describe("Sort field, prefix '-' for descending. Default: '-start_date'."),
        page: z.number().int().min(1).optional().describe("Page number (default: 1)."),
        per_page: z.number().int().min(1).max(50).optional().describe("Results per page (default: 20, max: 50)."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        const params: Record<string, string> = {
          sort: args.sort ?? "-start_date",
          page: String(args.page ?? 1),
          "per-page": String(args.per_page ?? 20),
        };
        const response = await client.get<CalendarTaskRecord[]>("calendar-tasks", params);
        const tasks = response.data;
        if (!Array.isArray(tasks) || tasks.length === 0) {
          return { content: [{ type: "text" as const, text: "No calendar tasks found." }] };
        }

        const pagination = response.pagination;
        let text = `Found ${pagination?.totalCount ?? tasks.length} calendar task(s):\n`;
        if (pagination && pagination.pageCount > 1) {
          text += `Page ${pagination.currentPage} of ${pagination.pageCount} (${pagination.totalCount} total)\n`;
        }
        text += "\n" + JSON.stringify(tasks, null, 2);
        return { content: [{ type: "text" as const, text }] };
      } catch (error) {
        return errorResult(`Error fetching calendar tasks: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_calendar_task_details",
    {
      title: "Get Calendar Task Details",
      description: "Get a single calendar task's full record by internal ID, including its repeat rule if any.",
      inputSchema: {
        calendar_task_id: z.number().int().positive().describe("Internal numeric calendar task ID."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ calendar_task_id }) => {
      try {
        const response = await client.get<CalendarTaskRecord>(`calendar-tasks/${calendar_task_id}`, { expand: "repeat" });
        return { content: [{ type: "text" as const, text: JSON.stringify(response.data, null, 2) }] };
      } catch (error) {
        return errorResult(`Error fetching calendar task ${calendar_task_id}: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
