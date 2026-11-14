#!/usr/bin/env node
/**
 * Measures the site and writes src/_modules/server/benchmark/benchmark.json.
 *
 *   npm run bench                     # build stats + Lighthouse against production
 *   BENCH_URL=https://… npm run bench # other base URL
 *   BENCH_RUNS=1 npm run bench        # faster, single run per page/device
 *   BENCH_SKIP_BUILD=1 npm run bench  # reuse the existing .next build for JS stats
 *
 * Nothing here is hardcoded: scores come from Lighthouse, sizes from the build.
 */
import { execSync } from "node:child_process";
import { existsSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import { gzipSync } from "node:zlib";
import * as chromeLauncher from "chrome-launcher";
import lighthouse from "lighthouse";
import desktopConfig from "lighthouse/core/config/desktop-config.js";

const root = path.resolve(import.meta.dirname, "..");
const outFile = path.join(root, "src/_modules/server/benchmark/benchmark.json");
const baseUrl = (process.env.BENCH_URL ?? "https://tony-portfolio-seven.vercel.app").replace(/\/$/, "");
const runs = Number(process.env.BENCH_RUNS ?? 3);
const PAGES = ["/", "/fullstack", "/mobile"];

// ---------- 1. First-load JS per route, from the production build ----------
function buildStats() {
  if (!process.env.BENCH_SKIP_BUILD) {
    console.log("› next build");
    execSync("npx next build", { cwd: root, stdio: "inherit" });
  }
  const appDir = path.join(root, ".next/server/app");
  const routes = PAGES.map((p) => {
    const htmlFile = path.join(appDir, p === "/" ? "index.html" : `${p.slice(1)}.html`);
    if (!existsSync(htmlFile)) throw new Error(`Missing prerendered HTML: ${htmlFile}`);
    const html = readFileSync(htmlFile, "utf8");
    const srcs = [...new Set([...html.matchAll(/<script[^>]+src="([^"]+\.js)"/g)].map((m) => m[1]))];
    let raw = 0;
    let gz = 0;
    for (const src of srcs) {
      const file = path.join(root, ".next", src.replace(/^\/_next\//, ""));
      const buf = readFileSync(file);
      raw += statSync(file).size;
      gz += gzipSync(buf, { level: 9 }).length;
    }
    return { path: p, firstLoadJsGzip: gz, firstLoadJsRaw: raw, files: srcs.length };
  });
  const nextVersion = JSON.parse(readFileSync(path.join(root, "node_modules/next/package.json"), "utf8")).version;
  return { measuredAt: new Date().toISOString(), nextVersion, routes };
}

// ---------- 2. Lighthouse against the deployed site ----------
const median = (xs) => [...xs].sort((a, b) => a - b)[Math.floor(xs.length / 2)];

async function lighthouseRuns() {
  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless=new", "--no-sandbox"] });
  const results = [];
  let lighthouseVersion = null;
  try {
    for (const p of PAGES) {
      for (const formFactor of ["mobile", "desktop"]) {
        const url = `${baseUrl}${p}`;
        const samples = [];
        for (let i = 0; i < runs; i++) {
          const res = await lighthouse(
            url,
            { port: chrome.port, output: "json", logLevel: "error" },
            formFactor === "desktop" ? desktopConfig : undefined,
          );
          const lhr = res.lhr;
          lighthouseVersion = lhr.lighthouseVersion;
          const a = lhr.audits;
          const s = {
            path: p,
            url,
            formFactor,
            scores: {
              performance: Math.round(lhr.categories.performance.score * 100),
              accessibility: Math.round(lhr.categories.accessibility.score * 100),
              bestPractices: Math.round(lhr.categories["best-practices"].score * 100),
              seo: Math.round(lhr.categories.seo.score * 100),
            },
            metrics: {
              fcp: a["first-contentful-paint"].numericValue,
              lcp: a["largest-contentful-paint"].numericValue,
              tbt: a["total-blocking-time"].numericValue,
              cls: a["cumulative-layout-shift"].numericValue,
              si: a["speed-index"].numericValue,
            },
          };
          samples.push(s);
          console.log(`  ${p.padEnd(11)} ${formFactor.padEnd(8)} run ${i + 1}: ${Object.values(s.scores).join("/")}`);
        }
        const m = median(samples.map((s) => s.scores.performance));
        results.push(samples.find((s) => s.scores.performance === m));
      }
    }
  } finally {
    chrome.kill();
  }
  return { results, lighthouseVersion };
}

const build = buildStats();
console.log("› build stats", build.routes);
console.log(`› lighthouse against ${baseUrl} (${runs} run(s) each)`);
const { results, lighthouseVersion } = await lighthouseRuns();

const data = {
  measuredAt: new Date().toISOString(),
  baseUrl,
  lighthouseVersion,
  runsPerPage: runs,
  pages: results,
  build,
};
writeFileSync(outFile, JSON.stringify(data, null, 2) + "\n");
console.log(`✓ wrote ${path.relative(root, outFile)}`);
