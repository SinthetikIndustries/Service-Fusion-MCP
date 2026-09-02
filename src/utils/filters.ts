/**
 * Converts a structured filter object into Service Fusion's bracket-syntax
 * query parameters.
 *
 * - Simple value: { status: "Open" } -> { "filters[status]": "Open" }
 * - Array (comma-sep): { status: ["Open", "Scheduled"] } -> { "filters[status]": "Open,Scheduled" }
 * - Range object: { start_date: { gte: "2026-02-17" } } -> { "filters[start_date][gte]": "2026-02-17" }
 */
export function buildFilterParams(
  filters: Record<string, unknown>,
): Record<string, string> {
  const params: Record<string, string> = {};

  for (const [field, value] of Object.entries(filters)) {
    if (value === undefined || value === null || value === "") {
      continue;
    }

    if (typeof value === "string" || typeof value === "number") {
      params[`filters[${field}]`] = String(value);
    } else if (Array.isArray(value)) {
      params[`filters[${field}]`] = value.join(",");
    } else if (typeof value === "object") {
      const rangeObj = value as Record<string, string>;
      for (const [op, opValue] of Object.entries(rangeObj)) {
        if (opValue !== undefined && opValue !== null && opValue !== "") {
          params[`filters[${field}][${op}]`] = String(opValue);
        }
      }
    }
  }

  return params;
}
