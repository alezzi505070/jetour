import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const offersSource = readFileSync(new URL("../src/app/[locale]/offers/page.tsx", import.meta.url), "utf8");

test("offers page includes a real photographic visual anchor", () => {
  assert.equal(offersSource.includes('import Image from "@/components/ui/Image"'), true);
  assert.equal(offersSource.includes('/images/lifestyle/sanaa-jetour-street.png'), true);
  assert.equal(offersSource.includes("bg-gradient-to-t from-night-950/85"), true);
  assert.equal(offersSource.includes("lg:grid-cols-[0.95fr_1.05fr]"), true);
});
