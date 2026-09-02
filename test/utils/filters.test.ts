import { test } from "node:test";
import assert from "node:assert/strict";
import { buildFilterParams } from "../../src/utils/filters.js";

test("simple string value", () => {
  assert.deepEqual(buildFilterParams({ status: "Open" }), {
    "filters[status]": "Open",
  });
});

test("array value joins with comma", () => {
  assert.deepEqual(buildFilterParams({ status: ["Open", "Scheduled"] }), {
    "filters[status]": "Open,Scheduled",
  });
});

test("range object produces bracketed operator keys", () => {
  assert.deepEqual(
    buildFilterParams({ start_date: { gte: "2026-02-17", lte: "2026-03-01" } }),
    {
      "filters[start_date][gte]": "2026-02-17",
      "filters[start_date][lte]": "2026-03-01",
    },
  );
});

test("undefined, null, and empty string values are skipped", () => {
  assert.deepEqual(
    buildFilterParams({ a: undefined, b: null, c: "", d: "kept" }),
    { "filters[d]": "kept" },
  );
});

test("numeric value is stringified", () => {
  assert.deepEqual(buildFilterParams({ zip_code: 27284 }), {
    "filters[zip_code]": "27284",
  });
});
