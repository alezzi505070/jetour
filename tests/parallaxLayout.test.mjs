import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const parallaxSource = readFileSync(new URL("../src/components/motion/Parallax.tsx", import.meta.url), "utf8");

test("Parallax does not override caller-provided positioning classes", () => {
  assert.equal(parallaxSource.includes('cn(className ?? "relative")'), true);
});
