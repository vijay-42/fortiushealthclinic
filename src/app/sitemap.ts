import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import policies from "@/content/policies.json";
import blog from "@/content/blog-index.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/about", "/doctors", "/sexologist-in-bangalore", "/treatments", "/awards", "/gallery", "/testimonials", "/contact", "/blog"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...treatments.map((t) => ({ url: `${site.url}/treatments/${t.slug}`, lastModified: now, priority: 0.9 })),
    ...blog.map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: new Date(p.date), priority: 0.6 })),
    ...Object.keys(policies).map((p) => ({ url: `${site.url}/${p}`, lastModified: now, priority: 0.2 })),
  ];
}
