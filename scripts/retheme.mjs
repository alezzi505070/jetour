// One-shot light-theme migration: ordered literal replacements across src/.
// Node (not PowerShell) so UTF-8 Arabic content survives untouched.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");

// Order matters: earlier rules must not create text later rules would mangle.
const RULES = [
  // crimson -> blue accent
  ["text-gradient-crimson", "text-gradient-accent"],
  ["crimson", "accent"],
  ["rgba(225,15,42", "rgba(37,99,235"],
  // text colors: dark ink on light surfaces; colored-button text stays white
  ["text-white", "text-ink"],
  ["text-night-950", "text-white"],
  // hairlines and subtle fills flip from white-on-dark to ink-on-light
  ["border-white/", "border-ink/"],
  ["bg-white/", "bg-ink/"],
  ["via-white/", "via-ink/"],
  // shadows go from black to blue-tinted
  ["bg-black/70", "bg-ink/25"],
  ["shadow-black/40", "shadow-accent-900/10"],
  ["shadow-black/60", "shadow-accent-900/20"],
  ["rgba(0,0,0,0.65)", "rgba(23,52,118,0.30)"],
  ["rgba(0,0,0,0.6)", "rgba(23,52,118,0.28)"],
  ["rgba(0,0,0,0.55)", "rgba(23,52,118,0.25)"],
  // outlined display text strokes
  ["rgba(255,255,255,0.07)", "rgba(15,35,75,0.10)"],
  ["rgba(255,255,255,0.16)", "rgba(15,35,75,0.16)"],
  // status hues need darker variants on white
  ["text-emerald-400", "text-emerald-600"],
  ["text-sky-300", "text-sky-700"],
  ["text-accent-400", "text-accent-600"],
];

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(tsx?|css)$/.test(name) ? [full] : [];
  });
}

let totalFiles = 0;
let totalHits = 0;
for (const file of walk(ROOT)) {
  const before = readFileSync(file, "utf8");
  let after = before;
  for (const [from, to] of RULES) after = after.split(from).join(to);
  if (after !== before) {
    writeFileSync(file, after, "utf8");
    totalFiles++;
    for (const [from] of RULES) {
      const count = before.split(from).length - 1;
      totalHits += count;
    }
    console.log("updated:", file.replace(ROOT, "src"));
  }
}
console.log(`done — ${totalFiles} files changed, ~${totalHits} replacements`);
