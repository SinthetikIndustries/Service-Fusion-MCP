import { test } from "node:test";
import assert from "node:assert/strict";
import { StaticCache } from "../../src/utils/cache.js";

test("returns null for missing key", () => {
  const cache = new StaticCache<string>();
  assert.equal(cache.get("missing"), null);
});

test("returns stored value before expiry", () => {
  const cache = new StaticCache<string>(1000);
  cache.set("k", "v");
  assert.equal(cache.get("k"), "v");
});

test("returns null after expiry", async () => {
  const cache = new StaticCache<string>(10);
  cache.set("k", "v");
  await new Promise((r) => setTimeout(r, 20));
  assert.equal(cache.get("k"), null);
});

test("invalidate removes a key", () => {
  const cache = new StaticCache<string>(1000);
  cache.set("k", "v");
  cache.invalidate("k");
  assert.equal(cache.get("k"), null);
});

test("clear removes all keys", () => {
  const cache = new StaticCache<string>(1000);
  cache.set("a", "1");
  cache.set("b", "2");
  cache.clear();
  assert.equal(cache.get("a"), null);
  assert.equal(cache.get("b"), null);
});
