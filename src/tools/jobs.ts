import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { ServiceFusionClient } from "../client.js";
import { buildFilterParams } from "../utils/filters.js";
import { fetchAllPages } from "../utils/pagination.js";

const JOB_LIST_EXPAND = "techs_assigned";
const JOB_DETAIL_EXPAND = [
  "techs_assigned", "tasks", "notes", "equipment",
  "products", "services", "other_charges", "labor_charges",
  "expenses", "payments", "invoices", "visits", "visits.techs_assigned",
  "pictures", "documents",
].join(",");

interface JobRecord {
  id: number;
  number: string;
  status: string;
  customer_name: string;
  [key: string]: unknown;
}

function errorResult(message: string) {
  return { content: [{ type: "text" as const, text: message }], isError: true };
}

function formatJobList(jobs: JobRecord[], summary: string, pagination?: { currentPage: number; pageCount: number; totalCount: number } | null) {
  let text = summary + "\n\n";
  if (pagination && pagination.pageCount > 1) {
    text += `Page ${pagination.currentPage} of ${pagination.pageCount} (${pagination.totalCount} total)\n\n`;
  }
  text += JSON.stringify(jobs, null, 2);
  return { content: [{ type: "text" as const, text }] };
}

export function registerJobTools(server: McpServer, client: ServiceFusionClient): void {
  server.registerTool(
    "get_todays_jobs",
    {
      title: "Get Today's Jobs",
      description: "Get all jobs scheduled for today, including assigned technicians.",
      inputSchema: {
        status: z.string().optional().describe("Filter by job status. Comma-separated for multiple. Omit for all statuses."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ status }) => {
      try {
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
        const filters: Record<string, unknown> = { start_date: { gte: today, lte: today }, status };
        const params: Record<string, string> = {
          ...buildFilterParams(filters),
          expand: JOB_LIST_EXPAND,
          sort: "start_date,customer_name",
        };
        const { items, totalCount } = await fetchAllPages<JobRecord>(client, "jobs", params);
        if (items.length === 0) {
          return { content: [{ type: "text" as const, text: `No jobs found for today (${today}).` }] };
        }
        return formatJobList(items, `Found ${totalCount} job(s) for today (${today}):`);
      } catch (error) {
        return errorResult(`Error fetching today's jobs: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "search_jobs",
    {
      title: "Search Jobs",
      description: "Search jobs with flexible filters: status, customer, address, contact, category, source, dates, job/PO number.",
      inputSchema: {
        status: z.string().optional().describe("Job status(es), comma-separated (full match)."),
        customer_name: z.string().optional().describe("Customer name (partial match)."),
        contact_first_name: z.string().optional().describe("Contact first name (partial match)."),
        contact_last_name: z.string().optional().describe("Contact last name (partial match)."),
        address: z.string().optional().describe("Job address (partial match)."),
        city: z.string().optional().describe("City (full match)."),
        zip_code: z.string().optional().describe("Zip code (full match)."),
        phone: z.string().optional().describe("Phone number (partial match)."),
        email: z.string().optional().describe("Email address (full match)."),
        category: z.string().optional().describe("Job category(ies), comma-separated (full match)."),
        source: z.string().optional().describe("Lead source(s), comma-separated (full match)."),
        number: z.string().optional().describe("Job number (partial match)."),
        po_number: z.string().optional().describe("PO number (partial match)."),
        start_date_gte: z.string().optional().describe("Jobs starting on/after this date (YYYY-MM-DD)."),
        start_date_lte: z.string().optional().describe("Jobs starting on/before this date (YYYY-MM-DD)."),
        end_date_gte: z.string().optional().describe("Jobs ending on/after this date (YYYY-MM-DD)."),
        end_date_lte: z.string().optional().describe("Jobs ending on/before this date (YYYY-MM-DD)."),
        sort: z.string().optional().describe("Sort field, prefix '-' for descending. Default: '-start_date'."),
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
          phone: args.phone,
          email: args.email,
          category: args.category,
          source: args.source,
          number: args.number,
          po_number: args.po_number,
        };
        if (args.start_date_gte || args.start_date_lte) {
          filters.start_date = { gte: args.start_date_gte, lte: args.start_date_lte };
        }
        if (args.end_date_gte || args.end_date_lte) {
          filters.end_date = { gte: args.end_date_gte, lte: args.end_date_lte };
        }

        const params: Record<string, string> = {
          ...buildFilterParams(filters),
          expand: JOB_LIST_EXPAND,
          sort: args.sort ?? "-start_date",
          page: String(args.page ?? 1),
          "per-page": String(args.per_page ?? 20),
        };

        const response = await client.get<JobRecord[]>("jobs", params);
        const jobs = response.data;
        if (!Array.isArray(jobs) || jobs.length === 0) {
          return { content: [{ type: "text" as const, text: "No jobs found matching the search criteria." }] };
        }
        return formatJobList(jobs, `Found ${response.pagination?.totalCount ?? jobs.length} job(s):`, response.pagination);
      } catch (error) {
        return errorResult(`Error searching jobs: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_job_details",
    {
      title: "Get Job Details",
      description: "Get complete details for a single job by internal ID or display number, including techs, tasks, notes, charges, and visit history.",
      inputSchema: {
        job_id: z.number().int().positive().optional().describe("Internal numeric job ID. Provide this OR job_number."),
        job_number: z.string().optional().describe("Display job number. Provide this OR job_id."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async (args) => {
      try {
        if (!args.job_id && !args.job_number) {
          return errorResult("Provide either job_id or job_number.");
        }
        let resolvedId = args.job_id;
        if (!resolvedId && args.job_number) {
          // Service Fusion's filters[number] is a partial match, so a lookup for "100"
          // can also match "1005", "2100xyz", etc. Fetch a few candidates so we can
          // detect ambiguity instead of blindly trusting whichever one the API returns first.
          const search = await client.get<JobRecord[]>("jobs", { "filters[number]": args.job_number, "per-page": "10" });
          const matches = search.data;
          if (!Array.isArray(matches) || matches.length === 0) {
            return errorResult(`No job found with number "${args.job_number}".`);
          }
          if (matches.length === 1) {
            resolvedId = matches[0].id;
          } else {
            const exact = matches.filter((m) => m.number === args.job_number);
            if (exact.length === 1) {
              resolvedId = exact[0].id;
            } else {
              const candidates = matches.map((m) => m.number).join(", ");
              return errorResult(
                `Multiple jobs match number "${args.job_number}": ${candidates}. Use job_id instead, or refine the search.`,
              );
            }
          }
        }

        const response = await client.get<JobRecord>(`jobs/${resolvedId}`, { expand: JOB_DETAIL_EXPAND });
        const job = response.data;
        const summary = `Job #${job.number ?? resolvedId} — ${job.status ?? "Unknown"} — ${job.customer_name ?? "Unknown Customer"}`;
        return { content: [{ type: "text" as const, text: `${summary}\n\n${JSON.stringify(job, null, 2)}` }] };
      } catch (error) {
        return errorResult(`Error fetching job: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "get_customer_jobs",
    {
      title: "Get Customer Jobs",
      description: "Get all jobs for a customer by name, sorted by most recent first. Use search_customers first to find the exact name.",
      inputSchema: {
        customer_name: z.string().describe("Customer name (partial match)."),
        status: z.string().optional().describe("Filter by job status, comma-separated."),
      },
      annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    },
    async ({ customer_name, status }) => {
      try {
        const params: Record<string, string> = {
          ...buildFilterParams({ customer_name, status }),
          expand: JOB_LIST_EXPAND,
          sort: "-start_date",
        };
        const { items, totalCount } = await fetchAllPages<JobRecord>(client, "jobs", params);
        if (items.length === 0) {
          return { content: [{ type: "text" as const, text: `No jobs found for customer "${customer_name}".` }] };
        }
        return formatJobList(items, `Found ${totalCount} job(s) for "${customer_name}":`);
      } catch (error) {
        return errorResult(`Error fetching jobs for customer "${customer_name}": ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );

  server.registerTool(
    "create_job",
    {
      title: "Create Job",
      description: "Create a new service job. Requires an exact customer name, category, and status.",
      inputSchema: {
        customer_name: z.string().min(1).describe("Exact customer name. Use search_customers to find it."),
        category: z.string().min(1).describe("Job category (exact match). Use get_job_categories."),
        status: z.string().min(1).describe("Job status (exact match). Use get_job_statuses."),
        description: z.string().optional().describe("Job description."),
        start_date: z.string().optional().describe("Scheduled start (ISO 8601)."),
        end_date: z.string().optional().describe("Scheduled end (ISO 8601)."),
        source: z.string().optional().describe("Lead source (exact match). Use get_sources."),
        street_1: z.string().optional().describe("Job site street address."),
        city: z.string().optional().describe("Job site city."),
        state_prov: z.string().optional().describe("Job site state/province."),
        postal_code: z.string().optional().describe("Job site postal code."),
        po_number: z.string().optional().describe("Customer PO number."),
        payment_type: z.string().optional().describe("Payment type. Use get_payment_types."),
      },
      annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: false },
    },
    async (args) => {
      try {
        const payload: Record<string, unknown> = {
          customer_name: args.customer_name,
          category: args.category,
          status: args.status,
        };
        for (const key of ["description", "start_date", "end_date", "source", "street_1", "city", "state_prov", "postal_code", "po_number", "payment_type"] as const) {
          if (args[key]) payload[key] = args[key];
        }

        const response = await client.post<JobRecord>("jobs", payload);
        const job = response.data;
        return {
          content: [
            {
              type: "text" as const,
              text: `Job created successfully: Job #${job.number ?? job.id} — ${job.status} — ${job.customer_name}\n\n${JSON.stringify(job, null, 2)}`,
            },
          ],
        };
      } catch (error) {
        return errorResult(`Error creating job: ${error instanceof Error ? error.message : String(error)}`);
      }
    },
  );
}
