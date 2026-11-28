import { ArrowRight, CalendarCheck, Clock, GraduationCap, Lock, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctor, site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { formatDate, getPost, getPosts, getRelatedPosts } from "@/lib/blog";
import { PageHero } from "@/components/sections/page-hero";
import { BookButton } from "@/components/interactive/booking";
import { ReadingProgress, Toc } from "@/components/interactive/toc";
import { JsonLd } from "@/components/ui/json-ld";
import { RevealItem, Stagger } from "@/components/ui/reveal";

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  const title = p.seoTitle ?? p.title;
  return {
    title: { absolute: title },
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: "article", title, description: p.description, publishedTime: p.date, modifiedTime: p.modified, images: p.image ? [p.image.src] : undefined },
  };
}

export default async function BlogPostPage({ params }: PageProps<"/blog/[slug]">) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const related = getRelatedPosts(p);

  return (
    <>
      <ReadingProgress />
      <JsonLd data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "BlogPosting", headline: p.title, description: p.description, datePublished: p.date, dateModified: p.modified,
            image: p.image ? `${site.url}${p.image.src}` : undefined, mainEntityOfPage: `${site.url}/blog/${p.slug}`,
            author: { "@type": "Organization", name: site.name, url: site.url },
            publisher: { "@type": "Organization", name: site.name, logo: { "@type": "ImageObject", url: `${site.url}/images/brand/logo.png` } },
          },
          {
            "@type": "BreadcrumbList", itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: site.url },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
              { "@type": "ListItem", position: 3, name: p.title },
            ],
          },
        ],
      }} />

      <PageHero eyebrow={p.categories[0] ?? "Blog"} title={p.title} crumbs={[{ label: "Blog", href: "/blog" }, { label: p.title }]}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-soft">
          <span>{formatDate(p.date)}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-4" /> {p.readMinutes} min read</span>
          <span>By {site.name}</span>
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-14 lg:grid-cols-[13rem_1fr_19rem] lg:gap-14 lg:py-20">
        <aside className="hidden lg:block">
          <div className="sticky top-28">{p.toc.length > 1 && <Toc items={p.toc} />}</div>
        </aside>

        <article className="min-w-0">
          {p.image && (
            <Image src={p.image.src} alt={p.imageAlt} width={p.image.width} height={p.image.height} priority sizes="(min-width:1024px) 50vw, 90vw" className="mb-10 w-full rounded-xl" />
          )}
          <div className="prose-fortius prose-blog" dangerouslySetInnerHTML={{ __html: p.html }} />

          {p.categories.length > 0 && (
            <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-line pt-8">
              <span className="mr-1 text-sm font-semibold text-muted">Topics:</span>
              {p.categories.map((c) => <span key={c} className="rounded-md bg-lime-50 px-3 py-1 text-sm font-semibold text-lime-800">{c}</span>)}
            </div>
          )}

          <div className="mt-10 rounded-xl bg-block p-8 sm:p-10">
            <p className="h-display text-3xl">Have a question about this?</p>
            <p className="mt-3 text-ink-soft">Speak to {doctor.name} in complete confidence at Richards Town or HSR Layout, Bangalore.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookButton className="inline-flex h-12 items-center gap-2 rounded-md bg-lime-700 px-6 font-bold text-white transition hover:bg-lime-800">Book a consultation <ArrowRight className="size-4" /></BookButton>
              <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/20 px-6 font-semibold"><Phone className="size-4" /> {site.phone.display}</a>
            </div>
          </div>
        </article>

        <aside>
          <div className="sticky top-28 grid gap-5">
            <div className="rounded-xl border border-line bg-white p-6">
              <div className="flex items-center gap-4">
                <Image src={doctor.image} alt={doctor.name} width={72} height={72} className="size-16 rounded-lg object-cover" />
                <div>
                  <p className="font-bold leading-tight">{doctor.name}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted"><GraduationCap className="size-3.5" /> {doctor.credentials}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{doctor.short}</p>
            </div>
            <div className="rounded-xl bg-lime-50 p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-lime-800"><Lock className="size-4" /> 100% confidential</p>
              <p className="h-display mt-2 text-2xl">Talk to a specialist today</p>
              <BookButton className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-lime-700 font-semibold text-white transition hover:bg-lime-800">
                <CalendarCheck className="size-4" /> Book appointment
              </BookButton>
              <a href={`tel:${site.phone.tel}`} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-white font-semibold"><Phone className="size-4" /> Call now</a>
            </div>
            <div className="hidden rounded-xl border border-line p-6 lg:block">
              <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Our treatments</p>
              <ul className="mt-4 grid gap-1">
                {treatments.slice(0, 8).map((t) => (
                  <li key={t.slug}><Link href={`/treatments/${t.slug}`} className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-ink-soft transition hover:bg-mist">{t.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-cream py-20">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <h2 className="h-display text-4xl">Related articles</h2>
              <Link href="/blog" className="hidden items-center gap-2 font-bold text-lime-800 sm:inline-flex">All articles <ArrowRight className="size-4" /></Link>
            </div>
            <Stagger className="mt-10 grid gap-6 md:grid-cols-3">
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <Link href={`/blog/${r.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl bg-white transition hover:-translate-y-1 hover:shadow-lift">
                    <div className="relative aspect-[1050/550] overflow-hidden bg-mist">
                      {r.image && <Image src={r.image.src} alt={r.imageAlt} fill sizes="(min-width:768px) 30vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-[0.7rem] font-bold tracking-[0.14em] text-lime-700 uppercase">{r.categories.slice(0, 2).join(" · ")}</p>
                      <h3 className="mt-2 text-lg leading-snug font-bold group-hover:text-lime-800">{r.title}</h3>
                      <span className="mt-auto inline-flex items-center gap-2 pt-5 text-sm font-bold">Read article <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
                    </div>
                  </Link>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}
    </>
  );
}
