import { ArrowRight, ArrowUpRight, CalendarCheck, GraduationCap, Lock, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { doctor, site, whatsappLink } from "@/content/site";
import { categories, getTreatment, sectionId, treatments } from "@/content/treatments";
import { PageHero } from "@/components/sections/page-hero";
import { BookButton } from "@/components/interactive/booking";
import { ReadingProgress, Toc } from "@/components/interactive/toc";
import { FaqList } from "@/components/ui/faq";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const t = getTreatment((await params).slug);
  if (!t) return {};
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: { canonical: `/treatments/${t.slug}` },
    openGraph: { title: t.title, description: t.description, images: t.image ? [t.image] : undefined },
  };
}

export default async function TreatmentPage({ params }: PageProps<"/treatments/[slug]">) {
  const t = getTreatment((await params).slug);
  if (!t) notFound();

  const cat = categories.find((c) => c.id === t.category)!;
  const toc = [
    ...t.sections.filter((s) => s.heading).map((s) => ({ id: sectionId(s.heading), label: s.heading.replace(/[:?]$/, "") })),
    ...(t.faqs.length ? [{ id: "faqs", label: "FAQs" }] : []),
  ];
  const related = treatments.filter((r) => r.category === t.category && r.slug !== t.slug).slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          name: t.title,
          description: t.description,
          url: `${site.url}/treatments/${t.slug}`,
          about: { "@type": "MedicalCondition", name: t.name },
          reviewedBy: { "@type": "Physician", name: doctor.name },
        }}
      />
      {t.faqs.length > 0 && (
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: t.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      )}

      <PageHero
        eyebrow={cat.label}
        title={<>{t.name} <span className="text-white/50">Treatment</span> in Bangalore</>}
        text={t.tagline}
        image={t.image ?? "/images/gallery/interior-4.jpg"}
        crumbs={[{ label: "Treatments", href: "/treatments" }, { label: t.name }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton concern={t.slug} className="inline-flex h-14 items-center gap-2 rounded-md bg-lime px-7 font-bold text-white transition hover:bg-lime-700">
            <CalendarCheck className="size-5" /> Book an Appointment
          </BookButton>
          <a href={whatsappLink(`Hi Fortius, I'd like to consult about ${t.name}.`)} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-2 rounded-md border border-white/20 px-7 font-semibold transition hover:border-lime hover:text-lime-300">
            <MessageCircle className="size-5" /> Ask on WhatsApp
          </a>
        </div>
      </PageHero>

      <div className="container-x grid gap-12 py-16 lg:grid-cols-[13rem_1fr_19rem] lg:gap-14 lg:py-24">
        {/* TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            {toc.length > 0 && <Toc items={toc} />}
          </div>
        </aside>

        {/* Article */}
        <article className="min-w-0">
          {toc.length > 1 && (
            <div className="no-scrollbar -mx-5 mb-10 flex gap-2 overflow-x-auto px-5 lg:hidden">
              {toc.map((i) => (
                <a key={i.id} href={`#${i.id}`} className="shrink-0 rounded-md border border-line px-4 py-2 text-sm font-semibold">{i.label}</a>
              ))}
            </div>
          )}

          {t.intro.length > 0 && (
            <Reveal className="mb-12">
              {t.intro.map((p) => <p key={p} className="h-display text-2xl leading-snug text-ink sm:text-[1.75rem]">{p}</p>)}
            </Reveal>
          )}

          {t.image && (
            <Reveal className="relative mb-14 aspect-[16/9] overflow-hidden rounded-xl">
              <Image src={t.image} alt={t.name} fill sizes="(min-width:1024px) 50vw, 90vw" className="object-cover" />
            </Reveal>
          )}

          <div className="prose-fortius">
            {t.sections.map((s, i) => (
              <Reveal key={(s.heading || "s") + i} as="section" className="mb-12 scroll-mt-28" id={s.heading ? sectionId(s.heading) : undefined}>
                {s.heading && (
                  <h2 className="h-display mb-5 flex items-start gap-4 text-3xl leading-tight text-ink sm:text-[2.1rem]">
                    <span className="mt-1.5 grid size-9 shrink-0 place-items-center rounded-md bg-lime-100 font-sans text-sm font-bold text-lime-800">{String(i + 1).padStart(2, "0")}</span>
                    {s.heading}
                  </h2>
                )}
                {s.blocks.map((b, j) =>
                  b.type === "p" ? (
                    <p key={j}>{b.text}</p>
                  ) : (
                    <ul key={j} className={b.items.length > 5 ? "sm:grid-cols-2" : ""}>
                      {b.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  ),
                )}
              </Reveal>
            ))}
          </div>

          {/* Inline CTA */}
          <Reveal className="relative my-14 overflow-hidden rounded-xl bg-block p-8 text-ink sm:p-10">
            <p className="h-display relative text-3xl">Get free counselling from Fortius health clinic experts.</p>
            <p className="relative mt-3 text-ink-soft">Confidential consultation for {t.name.toLowerCase()} at Richards Town or HSR Layout.</p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <BookButton concern={t.slug} className="inline-flex h-12 items-center gap-2 rounded-md bg-lime px-6 font-bold text-white">Book now <ArrowRight className="size-4" /></BookButton>
              <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/20 px-6 font-semibold"><Phone className="size-4" /> {site.phone.display}</a>
            </div>
          </Reveal>

          {t.faqs.length > 0 && (
            <section id="faqs" className="scroll-mt-28">
              <h2 className="h-display mb-8 text-4xl">FAQs</h2>
              <FaqList faqs={t.faqs} />
            </section>
          )}
        </article>

        {/* Sidebar */}
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
              <Link href="/doctors" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-lime-800">About Dr. Jameel <ArrowUpRight className="size-4" /></Link>
            </div>
            <div className="rounded-xl bg-lime-50 p-6">
              <p className="flex items-center gap-2 text-sm font-bold text-lime-800"><Lock className="size-4" /> 100% confidential</p>
              <p className="h-display mt-2 text-2xl">Talk to a specialist today</p>
              <BookButton concern={t.slug} className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-lime-700 font-semibold text-white transition hover:bg-lime hover:text-white">
                <CalendarCheck className="size-4" /> Book appointment
              </BookButton>
              <a href={`tel:${site.phone.tel}`} className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-white font-semibold"><Phone className="size-4" /> Call now</a>
            </div>
            <div className="hidden rounded-xl border border-line p-6 lg:block">
              <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">Quick links</p>
              <ul className="mt-4 grid gap-1">
                {treatments.filter((r) => r.slug !== t.slug).slice(0, 8).map((r) => (
                  <li key={r.slug}><Link href={`/treatments/${r.slug}`} className="block rounded-lg px-2 py-1.5 text-sm font-semibold text-ink-soft transition hover:bg-mist">{r.name}</Link></li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="bg-cream py-20">
          <div className="container-x">
            <h2 className="h-display text-4xl">Related treatments</h2>
            <Stagger className="mt-10 grid gap-5 md:grid-cols-3">
              {related.map((r) => (
                <RevealItem key={r.slug}>
                  <Link href={`/treatments/${r.slug}`} className="group flex h-full flex-col rounded-xl bg-white p-7 transition hover:-translate-y-1 hover:shadow-lift">
                    <span className="grid size-12 place-items-center rounded-lg bg-lime-50 text-lime-800 transition group-hover:bg-lime group-hover:text-white"><Icon name={r.icon} className="size-5" /></span>
                    <h3 className="h-display mt-6 text-2xl">{r.name}</h3>
                    <p className="mt-2 line-clamp-3 text-muted">{r.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-2 pt-6 font-bold">Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
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
