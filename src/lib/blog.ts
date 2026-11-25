import { site } from "@/content/site";

export type Post = { title: string; excerpt: string; href: string; image: string | null; categories: string[]; date?: string };

const decode = (s: string) =>
  s
    .replace(/<[^>]+>/g, "")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8216;|&lsquo;/g, "‘")
    .replace(/&#8220;|&#8221;|&quot;/g, "\"")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/\(more\)/gi, "")
    .replace(/\s+/g, " ")
    .trim();

const U = "https://www.fortiushealthclinic.co/blog/wp-content/uploads";

// Snapshot of the articles shown on the live home page — used if the WordPress API is unreachable.
export const fallbackPosts: Post[] = [
  { title: "Sex After Birth: When and How to Resume Intimacy Postpartum", excerpt: "Having sex after birth is not the same as before having a baby. Pregnancy and having a baby can change a lot in your body…", href: `${site.blogUrl}/sex-after-birth/`, image: `${U}/2025/02/Sex-After-Birth-768x402.webp`, categories: ["Sex After Birth"] },
  { title: "Why Do Guys Feel Bad After Ejaculating?", excerpt: "There is a common issue that most men report as they are having a bad feeling after an ejaculation, either alone or with…", href: `${site.blogUrl}/why-do-guys-feel-bad-after-ejaculating/`, image: `${U}/2025/02/Why-Do-Guys-Feel-Bad-After-Ejaculating-768x402.webp`, categories: ["Men's Sexual Health"] },
  { title: "How To Improve Sex Time?: 9 Tips For Men", excerpt: "The term stamina in the sexual health of a man stands for how many minutes you last in bed with your partner…", href: `${site.blogUrl}/how-to-improve-sex-time/`, image: `${U}/2025/02/How-To-Improve-Sex-Time-768x402.webp`, categories: ["Home Remedies"] },
  { title: "Does drinking water help you sexually?", excerpt: "Yes, drinking water benefits both men and women sexually. The role of water is vital in the performance of our overall health…", href: `${site.blogUrl}/does-drinking-water-help-you-sexually/`, image: `${U}/2025/02/Does-drinking-water-help-you-sexually-768x402.webp`, categories: ["Erectile Dysfunction"] },
  { title: "What Does Royal Honey Do Sexually and Dangers Associated?", excerpt: "Royal honey is not as natural a sexual supplement as you think and is very strictly recommended not to use…", href: `${site.blogUrl}/what-does-royal-honey-do-sexually-and-dangers-associated/`, image: `${U}/2025/01/What-Does-Royal-Honey-Do-Sexually-and-Dangers-Associated-768x402.webp`, categories: ["Male Fertility"] },
  { title: "Anastrozole For Men: Benefits, Dosage and Side effects", excerpt: "Anastrozole is a medication developed to treat breast cancer in postmenopausal women…", href: `${site.blogUrl}/anastrozole-for-men/`, image: `${U}/2025/01/Anastrozole-For-Men-768x402.webp`, categories: ["Testosterone"] },
  { title: "Watery Semen and Its Effect on Fertility", excerpt: "Most men stress about watery and thin semen. Sometimes, watery semen may occur due to frequent ejaculation, lifestyle factors…", href: `${site.blogUrl}/watery-semen-and-its-effect-on-fertility/`, image: `${U}/2025/01/Watery-Semen-and-Its-Effect-on-Fertility-768x402.webp`, categories: ["Seminal Fluid"] },
  { title: "Dry Orgasm: Causes and Treatments", excerpt: "When a man has his orgasm but does not ejaculate semen, it is a condition called dry orgasm…", href: `${site.blogUrl}/dry-orgasm/`, image: `${U}/2025/01/Dry-Orgasm-Causes-and-Treatments-768x402.webp`, categories: ["Seminal Fluid"] },
  { title: "Testosterone Pellets: Benefits and Side Effects", excerpt: "Testosterone Pellets is one form of testosterone replacement therapy where the small grain sized pellet is implanted…", href: `${site.blogUrl}/testosterone-pellets/`, image: `${U}/2024/12/Testosterone-Pellets-Benefits-and-Side-Effects-768x402.webp`, categories: ["Testosterone"] },
];

type WpPost = {
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string; media_details?: { sizes?: Record<string, { source_url: string }> } }[];
    "wp:term"?: { name: string }[][];
  };
};

/** Latest posts from the WordPress blog, cached and refreshed every 6 hours. */
export async function getLatestPosts(limit = 6): Promise<Post[]> {
  try {
    const res = await fetch(
      `${site.blogUrl}/wp-json/wp/v2/posts?per_page=${limit}&_embed=wp:featuredmedia,wp:term`,
      {
        next: { revalidate: 21600 },
        headers: { "User-Agent": "Mozilla/5.0 (compatible; FortiusSite/1.0)", Accept: "application/json" },
        signal: AbortSignal.timeout(6000),
      },
    );
    if (!res.ok) throw new Error(String(res.status));
    const data = (await res.json()) as WpPost[];
    if (!Array.isArray(data) || data.length === 0) throw new Error("empty");
    return data.map((p) => {
      const media = p._embedded?.["wp:featuredmedia"]?.[0];
      const image = media?.media_details?.sizes?.medium_large?.source_url ?? media?.source_url ?? null;
      const excerpt = decode(p.excerpt.rendered);
      return {
        title: decode(p.title.rendered),
        excerpt: excerpt.length > 150 ? excerpt.slice(0, 147).trimEnd() + "…" : excerpt,
        href: p.link,
        image,
        categories: (p._embedded?.["wp:term"]?.[0] ?? []).map((t) => decode(t.name)).slice(0, 2),
        date: p.date,
      };
    });
  } catch {
    return fallbackPosts.slice(0, limit);
  }
}
