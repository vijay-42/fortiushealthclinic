import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import policies from "@/content/policies.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/doctors", "/treatments", "/awards", "/gallery", "/testimonials", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...treatments.map((t) => ({ url: `${site.url}/treatments/${t.slug}`, lastModified: now, priority: 0.9 })),
    ...Object.keys(policies).map((p) => ({ url: `${site.url}/${p}`, lastModified: now, priority: 0.2 })),
  ];
}
