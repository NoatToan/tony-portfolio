import type { MetadataRoute } from 'next';

import { routeLinks } from '@/_modules/config/routeLinks';
import { SITE_URL } from '@/_modules/config/site';
import { variants } from '@/_modules/server/content';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, priority: 0.5 },
    ...variants.map((variant) => ({ url: `${SITE_URL}${routeLinks.variant(variant.slug)}`, priority: 1 })),
    { url: `${SITE_URL}${routeLinks.benchmark}`, priority: 0.3 },
  ];
}
