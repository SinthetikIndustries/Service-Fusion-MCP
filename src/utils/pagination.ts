import type { ServiceFusionClient } from "../client.js";

/**
 * Fetches every page of results for a given list endpoint, using the API's
 * max per-page size (50) to minimize round trips.
 */
export async function fetchAllPages<T>(
  client: ServiceFusionClient,
  path: string,
  params?: Record<string, string>,
): Promise<{ items: T[]; totalCount: number }> {
  const allItems: T[] = [];
  const baseParams = { ...params, "per-page": "50" };

  const firstResponse = await client.get<T[]>(path, { ...baseParams, page: "1" });
  const firstData = firstResponse.data;
  if (Array.isArray(firstData)) {
    allItems.push(...firstData);
  }

  const pagination = firstResponse.pagination;
  if (!pagination || pagination.pageCount <= 1) {
    return { items: allItems, totalCount: pagination?.totalCount ?? allItems.length };
  }

  for (let page = 2; page <= pagination.pageCount; page++) {
    const response = await client.get<T[]>(path, { ...baseParams, page: String(page) });
    if (Array.isArray(response.data)) {
      allItems.push(...response.data);
    }
  }

  return { items: allItems, totalCount: pagination.totalCount };
}
