import type { Metadata } from "next";
import { site } from "@/content/site";
import { getPosts } from "@/lib/blog";
import { PageHero } from "@/components/sections/page-hero";
import { BlogExplorer } from "@/components/interactive/blog-explorer";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata: Metadata = {
  title: "Blog — Men's Sexual Health Articles",
  description: "Expert articles from Fortius Health Clinic, Bangalore on erectile dysfunction, male fertility, testosterone, premature ejaculation and men's sexual health.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getPosts();
  const counts = posts.flatMap((p) => p.categories).reduce<Record<string, number>>((a, c) => ((a[c] = (a[c] ?? 0) + 1), a), {});
  const topics = Object.entries(counts).filter(([, n]) => n >= 4).sort((a, b) => b[1] - a[1]).map(([c]) => c);

  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org", "@type": "Blog", name: `${site.name} Blog`, url: `${site.url}/blog`,
        blogPost: posts.slice(0, 20).map((p) => ({ "@type": "BlogPosting", headline: p.title, url: `${site.url}/blog/${p.slug}`, datePublished: p.date })),
      }} />
      <PageHero
        eyebrow="Blog"
        title={<>Men’s health, <span className="text-lime-700">explained simply</span></>}
        text="Clear, doctor-reviewed answers to the questions men often hesitate to ask — from erectile dysfunction and fertility to testosterone and everyday sexual wellness."
        image="/images/gallery/interior-3.jpg"
        crumbs={[{ label: "Blog" }]}
      />
      <section className="container-x py-16 lg:py-24">
        <BlogExplorer posts={posts} topics={topics} />
      </section>
    </>
  );
}
