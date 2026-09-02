import { z } from "zod";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REFERENCE_PATH = path.join(__dirname, "..", "..", "service-fusion-api-reference.md");

const SECTION_HEADINGS: Record<string, string> = {
  jobs: "## /jobs",
  customers: "## /customers",
  estimates: "## /estimates",
  invoices: "## /invoices",
  "calendar-tasks": "## /calendar-tasks",
  techs: "## /techs",
  equipment: "## /customers/{customer-id}/equipment",
  "job-categories": "## /job-categories",
  "job-statuses": "## /job-statuses",
  sources: "## /sources",
  "payment-types": "## /payment-types",
  "data-types": "## Data Types",
  authentication: "## Authentication",
  "known-issues": "## Known Issues",
  me: "## /me",
};

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

function extractSection(fullText: string, heading: string): string {
  const startIdx = fullText.indexOf(heading);
  if (startIdx === -1) return "";
  const rest = fullText.slice(startIdx + heading.length);
  const nextHeadingMatch = rest.match(/\n## (?!#)/);
  const endIdx = nextHeadingMatch ? nextHeadingMatch.index! : rest.length;
  return heading + rest.slice(0, endIdx);
}

export function registerDocsTools(server: McpServer): void {
  server.registerTool(
    "get_api_docs",
    {
      title: "Get API Documentation",
      description:
        "Look up the Service Fusion API reference. Sections: index, jobs, customers, estimates, invoices, calendar-tasks, techs, equipment, job-categories, job-statuses, sources, payment-types, data-types, authentication, known-issues, me, full. Each named section returns only the primary list/create endpoint doc for that resource — related sub-resource endpoints (e.g. /jobs/{job-id}) are not included. Use section='full' if you need sub-resource or {id}-endpoint detail.",
      inputSchema: {
        section: z.string().describe("Which section to retrieve. Use 'index' to see the list of valid sections, or 'full' for the entire reference."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ section }) => {
      try {
        const fullText = readFileSync(REFERENCE_PATH, "utf-8");

        if (section === "index") {
          const sections = Object.keys(SECTION_HEADINGS).join(", ");
          return { content: [{ type: "text" as const, text: `Available sections: ${sections}, full` }] };
        }
        if (section === "full") {
          return { content: [{ type: "text" as const, text: fullText }] };
        }

        const heading = SECTION_HEADINGS[section];
        if (!heading) {
          return errorResult(`Unknown section "${section}". Call with section="index" to see valid values.`);
        }

        const extracted = extractSection(fullText, heading);
        if (!extracted) {
          return errorResult(`Section "${section}" heading not found in the reference file.`);
        }
        return { content: [{ type: "text" as const, text: extracted }] };
      } catch (error) {
        return errorResult(`Error reading API docs: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
