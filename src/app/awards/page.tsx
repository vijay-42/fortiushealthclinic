import { Award } from "lucide-react";
import type { Metadata } from "next";
import { accolade, certificates } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/interactive/gallery-grid";
import { Reveal } from "@/components/ui/reveal";
import { VideoCard } from "@/components/ui/video-modal";

export const metadata: Metadata = { title: "Awards & Certificates", description: "Dr. Mujahid Jameel — “Most Trusted Sexologist of the Year” (IBARC Asia International) and “Best Sexologist” (Asia Today). View our awards and certificates.", alternates: { canonical: "/awards" } };

export default function AwardsPage() {
  return (
    <>
      <PageHero eyebrow="Awards" title={<>Our Awards &amp; <span className="text-lime-700">Certificates</span></>} text={accolade.text} image="/images/banners/award2.webp" crumbs={[{ label: "About", href: "/about" }, { label: "Awards" }]} />
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {[["Most Trusted Sexologist of the Year", "IBARC Asia International"], ["Best Sexologist", "Asia Today"]].map(([t, by], i) => (
              <Reveal key={t} delay={i * 0.1} className="flex items-center gap-5 rounded-xl bg-block p-7 text-ink">
                <span className="grid size-16 shrink-0 place-items-center rounded-lg bg-lime text-white"><Award className="size-7" /></span>
                <div><p className="h-display text-2xl">“{t}”</p><p className="mt-1 text-muted">{by}</p></div>
              </Reveal>
            ))}
          </div>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {accolade.videos.map((v) => <Reveal key={v.src}><VideoCard {...v} /></Reveal>)}
          </div>
          <h2 className="h-display mt-24 mb-10 text-center text-4xl sm:text-5xl">Certificates</h2>
          <GalleryGrid images={certificates} filters={false} />
        </div>
      </section>
    </>
  );
}
