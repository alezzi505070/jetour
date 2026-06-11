import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const heroSource = readFileSync(new URL("../src/components/home/Hero.tsx", import.meta.url), "utf8");
const car360Source = readFileSync(new URL("../src/components/models/Car360.tsx", import.meta.url), "utf8");
const textRevealSource = readFileSync(new URL("../src/components/motion/TextReveal.tsx", import.meta.url), "utf8");
const counterSource = readFileSync(new URL("../src/components/motion/Counter.tsx", import.meta.url), "utf8");

test("homepage hero keeps the premium animated systems in the first viewport", () => {
  assert.equal(heroSource.includes('"use client"'), true);
  assert.equal(heroSource.includes("framer-motion"), true);
  assert.equal(heroSource.includes("Car360"), true);
  assert.equal(heroSource.includes("TextReveal"), true);
  assert.equal(heroSource.includes("Counter"), true);
});

test("homepage hero gates entrance animation on fonts and the first car frame", () => {
  assert.equal(heroSource.includes("heroReady"), true);
  assert.equal(heroSource.includes("fontsReady"), true);
  assert.equal(heroSource.includes("carReady"), true);
  assert.equal(heroSource.includes("onInitialFrameReady"), true);
  assert.equal(heroSource.includes("active={heroReady}"), true);
});

test("Car360 exposes an initial-frame callback after the canvas can draw", () => {
  assert.equal(car360Source.includes("onInitialFrameReady"), true);
  assert.equal(car360Source.includes("initialImg.decode"), true);
});

test("TextReveal and Counter can wait for the coordinated hero start", () => {
  assert.equal(textRevealSource.includes("active = true"), true);
  assert.equal(counterSource.includes("active = true"), true);
});
