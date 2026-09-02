import { test } from "node:test";
import assert from "node:assert/strict";
import { fetchAllPages } from "../../src/utils/pagination.js";
import type { ServiceFusionClient, ApiResponse } from "../../src/client.js";

function fakeClient(pages: unknown[][]): ServiceFusionClient {
  let call = 0;
  return {
    get: async <T>(_path: string, params?: Record<string, string>): Promise<ApiResponse<T>> => {
      const page = parseInt(params?.page ?? "1", 10);
      call++;
      const items = pages[page - 1] ?? [];
      return {
        data: items as T,
        pagination: {
          totalCount: pages.flat().length,
          pageCount: pages.length,
          currentPage: page,
          perPage: 50,
        },
      };
    },
  } as unknown as ServiceFusionClient;
}

test("single page returns all items without extra calls", async () => {
  const client = fakeClient([[{ id: 1 }, { id: 2 }]]);
  const result = await fetchAllPages(client, "job-statuses");
  assert.equal(result.items.length, 2);
  assert.equal(result.totalCount, 2);
});

test("multiple pages are concatenated in order", async () => {
  const client = fakeClient([[{ id: 1 }], [{ id: 2 }], [{ id: 3 }]]);
  const result = await fetchAllPages(client, "jobs", { customer_name: "Acme" });
  assert.deepEqual(result.items, [{ id: 1 }, { id: 2 }, { id: 3 }]);
  assert.equal(result.totalCount, 3);
});

test("empty result set returns empty items and zero total", async () => {
  const client = fakeClient([[]]);
  const result = await fetchAllPages(client, "jobs");
  assert.deepEqual(result.items, []);
  assert.equal(result.totalCount, 0);
});
