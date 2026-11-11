import { readFileSync } from "node:fs";
import assert from "node:assert/strict";
const { menu, categories } = (await import(
  new URL("../lib/menu.ts", import.meta.url).href
)) as typeof import("../lib/menu");
const source = readFileSync(
  new URL("../docs/menu-source.txt", import.meta.url),
  "utf8",
);
const expected = [
  ...source.matchAll(/^([^\r\n]+?) — (\d+ (?:мл|г)) — (\d+) ₽\s*$/gm),
].map((m) => ({ name: m[1].trim(), volume: m[2], price: Number(m[3]) }));
assert.equal(expected.length, 28, "Source must contain 28 exact menu entries");
assert.equal(menu.length, 28);
assert.equal(categories.length, 10);
assert.equal(new Set(menu.map((p) => p.id)).size, 28);
for (const item of expected) {
  const actual = menu.find((p) => p.name === item.name);
  assert.ok(actual, item.name);
  assert.equal(actual.volume, item.volume, item.name);
  assert.equal(actual.price, item.price, item.name);
}
for (const p of menu) assert.ok(categories.some((c) => c.id === p.category));
console.log(
  "PASS: all 28 names, prices and volumes match the supplied request; 10 categories; unique product URLs.",
);
