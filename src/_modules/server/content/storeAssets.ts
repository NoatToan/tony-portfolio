import { z } from 'zod';

import raw from './storeAssets.json';

/**
 * Store marketing assets (icon, screenshots, feature graphic, store URLs) for the mobile
 * variant's real apps, downloaded by a separate agent into `public/images/projects/<slug>/`
 * with metadata in `storeAssets.json` next to this file (see docs/DECISIONS.md). That file is
 * generated content, not hand-authored — this module is the only reader, and it degrades to "no
 * data for this slug" instead of failing the build when an entry doesn't validate.
 *
 * `storeAssets.json` is a static import (like `benchmark.ts`), not `fs.readFileSync` — the file
 * always ships with the build, so there's no file-tracing/missing-file risk to guard against, and
 * each entry still goes through its own `safeParse` so one bad entry degrades to `undefined`
 * instead of failing the whole module.
 */
export const zStoreAsset = z.object({
  name: z.string().optional(),
  developer: z.string().optional(),
  appStoreUrl: z.url().nullable().optional(),
  playStoreUrl: z.url().nullable().optional(),
  icon: z.string().optional(),
  screenshots: z.array(z.string()).optional(),
  /** Google Play 1024×500 banner, used as the project card's cover image when present. */
  featureGraphic: z.string().nullable().optional(),
  shortDescription: z.string().optional(),
  found: z.boolean().optional(),
});

export type StoreAsset = z.infer<typeof zStoreAsset>;

function loadStoreAssets(): Record<string, StoreAsset> {
  if (typeof raw !== 'object' || raw === null) return {};

  const result: Record<string, StoreAsset> = {};
  for (const [slug, value] of Object.entries(raw as Record<string, unknown>)) {
    const parsed = zStoreAsset.safeParse(value);
    if (parsed.success) result[slug] = parsed.data;
  }
  return result;
}

const STORE_ASSETS: Record<string, StoreAsset> = loadStoreAssets();

/** The asset for one slug, or `undefined` when absent, unparsable, or explicitly `found: false`. */
export function getStoreAsset(slug: string | undefined): StoreAsset | undefined {
  if (!slug) return undefined;
  const entry = STORE_ASSETS[slug];
  if (!entry || entry.found === false) return undefined;
  return entry;
}
