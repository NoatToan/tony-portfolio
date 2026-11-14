import { z } from 'zod';

import { EFormFactor } from '@/_modules/config/enums';

import raw from './benchmark.json';

const zLighthouseResult = z.object({
  path: z.string(),
  url: z.string(),
  formFactor: z.nativeEnum(EFormFactor),
  scores: z.object({
    performance: z.number(),
    accessibility: z.number(),
    bestPractices: z.number(),
    seo: z.number(),
  }),
  metrics: z.object({
    fcp: z.number(),
    lcp: z.number(),
    tbt: z.number(),
    cls: z.number(),
    si: z.number(),
  }),
});

const zRouteBuildStat = z.object({
  path: z.string(),
  firstLoadJsGzip: z.number(),
  firstLoadJsRaw: z.number(),
  files: z.number(),
});

const zBenchmarkData = z.object({
  measuredAt: z.string().nullable(),
  baseUrl: z.string().nullable(),
  lighthouseVersion: z.string().nullable(),
  runsPerPage: z.number(),
  pages: z.array(zLighthouseResult),
  build: z
    .object({
      measuredAt: z.string(),
      nextVersion: z.string(),
      routes: z.array(zRouteBuildStat),
    })
    .nullable(),
});

export type LighthouseResult = z.infer<typeof zLighthouseResult>;
export type RouteBuildStat = z.infer<typeof zRouteBuildStat>;
export type BenchmarkData = z.infer<typeof zBenchmarkData>;

export const benchmark: BenchmarkData = zBenchmarkData.parse(raw);

export function resultsFor(path: string) {
  return benchmark.pages.filter((page) => page.path === path);
}

export function buildStatFor(path: string) {
  return benchmark.build?.routes.find((route) => route.path === path) ?? null;
}

/** `iso` is a fixed, already-recorded timestamp — deterministic on server and client. */
export function formatMeasuredDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
}
