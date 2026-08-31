#!/usr/bin/env node
/**
 * Guard: no dollar figures in public-facing content.
 *
 * The Owner's standing decision (2026-08-22, reaffirmed 2026-08-31) is that
 * PAL's Academy publishes no rates anywhere a prospect or a crawler can read
 * them — packages are quoted on the free consultation. Stale figures that leaked
 * into Google's index are still being repeated back by AI answer engines months
 * later, which is exactly the cost of getting this wrong once.
 *
 * This fails the build if a price re-enters marketing copy, metadata, or JSON-LD.
 * Portal/admin/API code is exempt: those are authenticated surfaces where real
 * invoice amounts legitimately appear.
 *
 * Run: npm run check:prices
 */
import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const ROOTS = ["app", "lib", "components", "public"];
const EXEMPT = [
  "app/portal", "app/admin", "app/api", "app/auth",
  "components/portal", "components/admin",
  "lib/store", "lib/supabase", "lib/auth", "lib/email"
];
const EXTS = /\.(tsx?|jsx?|mjs|json|md|txt|xml|html)$/;

// A currency amount: $75, $1,125, $375.00 — but not "$$" or a bare "$".
const PRICE = /\$\s?\d[\d,]*(\.\d{2})?/g;
// Written-out rates that dodge the dollar sign.
const RATE = /\b\d{2,4}\s?(dollars|CAD)\b|\b\d{2,4}\s?(per|\/)\s?(hour|hr|session|month)\b/gi;

async function walk(dir, out = []) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    const rel = relative(ROOT, full);
    if (EXEMPT.some((x) => rel.startsWith(x))) continue;
    if (e.isDirectory()) await walk(full, out);
    else if (EXTS.test(e.name)) out.push(full);
  }
  return out;
}

const findings = [];
for (const root of ROOTS) {
  for (const file of await walk(join(ROOT, root))) {
    const text = readFileSync(file, "utf8");
    text.split("\n").forEach((line, i) => {
      for (const re of [PRICE, RATE]) {
        re.lastIndex = 0;
        const m = re.exec(line);
        if (m) findings.push(`${relative(ROOT, file)}:${i + 1}  ${m[0].trim()}   ${line.trim().slice(0, 100)}`);
      }
    });
  }
}

if (findings.length) {
  console.error("\n✖ Public price figures found — PAL's Academy publishes no rates.\n");
  findings.forEach((f) => console.error("  " + f));
  console.error(`\n${findings.length} finding(s). Quote packages on the consultation instead.\n`);
  process.exit(1);
}
console.log("✔ No public price figures found.");
