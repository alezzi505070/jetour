import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const aboutSource = readFileSync(new URL("../src/app/[locale]/about/page.tsx", import.meta.url), "utf8");

test("about page image band uses a visible public image", () => {
  assert.equal(aboutSource.includes('/images/lifestyle/home_2.jpg'), true);
  assert.equal(aboutSource.includes("from-night-950/65"), true);
  assert.equal(aboutSource.includes("to-night-950/25"), true);
});
