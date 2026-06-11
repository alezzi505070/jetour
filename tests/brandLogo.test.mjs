import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const headerSource = readFileSync(new URL("../src/components/layout/Header.tsx", import.meta.url), "utf8");
const footerSource = readFileSync(new URL("../src/components/layout/Footer.tsx", import.meta.url), "utf8");

test("header and footer use the NATCO JETOUR image logo", () => {
  const logoPath = "/images/brand/natco-jetour-logo.png";

  assert.equal(headerSource.includes(logoPath), true);
  assert.equal(footerSource.includes(logoPath), true);
  assert.equal(headerSource.includes('alt=""'), true);
  assert.equal(footerSource.includes('alt=""'), true);
});
