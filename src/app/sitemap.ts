import type { MetadataRoute } from "next";
import { variants } from "@/content";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, priority: 0.5 },
    ...variants.map((v) => ({ url: `${siteUrl}/${v.slug}`, priority: 1 })),
    { url: `${siteUrl}/benchmark`, priority: 0.3 },
  ];
}
