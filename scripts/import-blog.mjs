// Imports every post from the WordPress blog into src/content/blog.json and
// saves featured images to public/images/blog. Re-run any time: `node scripts/import-blog.mjs`
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const API = "https://www.fortiushealthclinic.co/blog/wp-json/wp/v2/posts";
const ROOT = path.resolve(import.meta.dirname, "..");
const IMG_DIR = path.join(ROOT, "public/images/blog");
const UA = { "User-Agent": "Mozilla/5.0 (compatible; FortiusImport/1.0)" };

// Old .html pages → new routes (mirrors next.config redirects).
const pages = {
  "": "/", "index": "/", "about": "/about", "awards": "/awards", "gallery": "/gallery", "testimonial": "/testimonials",
  "contact": "/contact", "contact-us": "/contact",
  "erectile": "/treatments/erectile-dysfunction", "premature-ejaculation": "/treatments/premature-ejaculation",
  "delayed-ejaculation": "/treatments/delayed-ejaculation", "ejaculatory-disorders": "/treatments/ejaculatory-disorders",
  "low-testesterone": "/treatments/low-testosterone", "infertility": "/treatments/infertility-azoospermia",
  "male-infertility": "/treatments/male-infertility", "sperm-count": "/treatments/sperm-count",
  "sperm-motility": "/treatments/sperm-motility", "varicocele": "/treatments/varicocele", "circumcision": "/treatments/circumcision",
  "penile-enlargement": "/treatments/penile-enlargement", "peyronies-disease": "/treatments/peyronies-disease",
  "priapism": "/treatments/priapism", "couple-problems": "/treatments/couple-problems", "porn-addiction": "/treatments/porn-addiction",
  "std": "/treatments/std",
};

const entities = (s) =>
  s.replace(/&#8217;|&rsquo;/g, "’").replace(/&#8216;|&lsquo;/g, "‘").replace(/&#8220;|&ldquo;/g, "“").replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#8211;|&ndash;/g, "–").replace(/&#8212;|&mdash;/g, "—").replace(/&#8230;|&hellip;/g, "…").replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;|&#160;/g, " ").replace(/&quot;|&#034;/g, "\"").replace(/&#039;|&#39;/g, "'");
const text = (s) => entities(s.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
const slugify = (s) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 60);

function rewriteHref(href) {
  const m = href.match(/^https?:\/\/(?:www\.)?fortiushealthclinic\.(?:com|co)(\/.*)?$/i);
  if (!m) return null;
  const p = (m[1] || "/").split(/[?#]/)[0];
  const blog = p.match(/^\/blog\/(?!category\/|page\/|wp-)([a-z0-9-]+)\/?$/i);
  if (blog) return `/blog/${blog[1].toLowerCase()}`;
  if (/^\/blog\/?$/.test(p)) return "/blog";
  const html = p.match(/^\/([a-z0-9-]*)(?:\.html)?\/?$/i);
  if (html && pages[html[1].toLowerCase()] !== undefined) return pages[html[1].toLowerCase()];
  return "/";
}

function clean(html) {
  const toc = [];
  const used = new Set();
  let out = html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<\/?(span|figure|tbody|thead|font)[^>]*>/gi, (t) => (/^<\/?(tbody|thead)/i.test(t) ? t.replace(/\s[^>]*>/, ">") : ""))
    .replace(/<h1(\s[^>]*)?>/gi, "<h2>").replace(/<\/h1>/gi, "</h2>")
    .replace(/<h5(\s[^>]*)?>/gi, "<h4>").replace(/<\/h5>/gi, "</h4>")
    // drop every attribute except href on <a>
    .replace(/<(?!a\s)([a-z0-9]+)\s[^>]*?(\/?)>/gi, "<$1$2>")
    .replace(/<a\s[^>]*?href="([^"]*)"[^>]*>/gi, (_, href) => {
      const internal = rewriteHref(entities(href));
      return internal ? `<a href="${internal}">` : `<a href="${href}" target="_blank" rel="noopener noreferrer nofollow">`;
    })
    .replace(/<a\s(?![^>]*href)[^>]*>/gi, "<a>")
    .replace(/<p>\s*(&nbsp;|\s)*<\/p>/gi, "")
    .replace(/<(strong|b)>\s*<\/\1>/gi, "");
  // headings inside <strong>: unwrap so headings stay clean
  out = out.replace(/<(h[234])>([\s\S]*?)<\/\1>/gi, (_, h, inner) => {
    const label = text(inner);
    if (!label) return "";
    const body = inner.replace(/<\/?(strong|b|u)>/gi, "");
    if (h.toLowerCase() === "h2") {
      let id = slugify(label) || "section";
      while (used.has(id)) id += "-x";
      used.add(id);
      toc.push({ id, label });
      return `<h2 id="${id}">${body}</h2>`;
    }
    return `<${h}>${body}</${h}>`;
  });
  out = out.replace(/\n{2,}/g, "\n").trim();
  return { html: out, toc };
}

async function exists(f) { try { await access(f); return true; } catch { return false; } }

async function saveImage(url, slug) {
  const file = path.join(IMG_DIR, `${slug}.webp`);
  if (!(await exists(file))) {
    const res = await fetch(url, { headers: UA });
    if (!res.ok) throw new Error(`image ${res.status} ${url}`);
    await sharp(Buffer.from(await res.arrayBuffer())).resize({ width: 1200, withoutEnlargement: true }).webp({ quality: 80 }).toFile(file);
  }
  const { width, height } = await sharp(file).metadata();
  return { src: `/images/blog/${slug}.webp`, width, height };
}

const all = [];
for (let page = 1; ; page++) {
  const res = await fetch(`${API}?per_page=100&page=${page}&_embed=wp:featuredmedia,wp:term`, { headers: UA });
  if (res.status === 400) break;
  if (!res.ok) throw new Error(`posts ${res.status}`);
  const batch = await res.json();
  all.push(...batch);
  if (batch.length < 100) break;
}

await mkdir(IMG_DIR, { recursive: true });
const posts = [];
for (const p of all) {
  const media = p._embedded?.["wp:featuredmedia"]?.[0];
  const { html, toc } = clean(p.content.rendered);
  const words = text(html).split(" ").length;
  const yoast = p.yoast_head_json ?? {};
  const excerpt = text(p.excerpt.rendered).replace(/\s*\[?…\]?$|\(more\)/gi, "").trim();
  const cats = (p._embedded?.["wp:term"]?.[0] ?? []).map((t) => text(t.name)).map((n) => n.charAt(0).toUpperCase() + n.slice(1));
  posts.push({
    slug: p.slug,
    title: text(p.title.rendered),
    seoTitle: yoast.title ? text(yoast.title) : undefined,
    description: yoast.description ? text(yoast.description) : excerpt.slice(0, 160),
    excerpt: excerpt.length > 180 ? excerpt.slice(0, 177).trimEnd() + "…" : excerpt,
    date: p.date,
    modified: p.modified,
    categories: [...new Set(cats)],
    image: media?.source_url ? await saveImage(media.source_url, p.slug) : null,
    imageAlt: media?.alt_text ? text(media.alt_text) : text(p.title.rendered),
    readMinutes: Math.max(1, Math.round(words / 220)),
    toc,
    html,
  });
  process.stdout.write(".");
}
posts.sort((a, b) => b.date.localeCompare(a.date));
await writeFile(path.join(ROOT, "src/content/blog.json"), JSON.stringify(posts, null, 1) + "\n");
const index = posts.map(({ slug, title, excerpt, date, categories, image, imageAlt, readMinutes }) => ({ slug, title, excerpt, date, categories, image, imageAlt, readMinutes }));
await writeFile(path.join(ROOT, "src/content/blog-index.json"), JSON.stringify(index, null, 1) + "\n");
console.log(`\nImported ${posts.length} posts.`);
