import raw from "@/data/benchmark.json";

export type FormFactor = "mobile" | "desktop";

export interface LighthouseResult {
  path: string;
  url: string;
  formFactor: FormFactor;
  scores: { performance: number; accessibility: number; bestPractices: number; seo: number };
  /** Milliseconds, except cls (unitless). */
  metrics: { fcp: number; lcp: number; tbt: number; cls: number; si: number };
}

export interface RouteBuildStat {
  path: string;
  /** Gzipped JS referenced by the prerendered HTML, in bytes. */
  firstLoadJsGzip: number;
  firstLoadJsRaw: number;
  files: number;
}

export interface BenchmarkData {
  measuredAt: string | null;
  baseUrl: string | null;
  lighthouseVersion: string | null;
  runsPerPage: number;
  pages: LighthouseResult[];
  build: { measuredAt: string; nextVersion: string; routes: RouteBuildStat[] } | null;
}

export const benchmark = raw as BenchmarkData;

export function resultsFor(path: string) {
  return benchmark.pages.filter((p) => p.path === path);
}

export function buildStatFor(path: string) {
  return benchmark.build?.routes.find((r) => r.path === path) ?? null;
}

export function formatKb(bytes: number) {
  return `${(bytes / 1024).toFixed(1)} kB`;
}

export function formatMs(ms: number) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)} s` : `${Math.round(ms)} ms`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Lighthouse score bands. */
export function scoreTone(score: number): "good" | "ok" | "poor" {
  return score >= 90 ? "good" : score >= 50 ? "ok" : "poor";
}
