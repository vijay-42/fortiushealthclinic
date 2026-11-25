import { Award, Trophy } from "lucide-react";
import Image from "next/image";
import { accolade, certificates } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { Marquee } from "@/components/ui/marquee";
import { VideoCard } from "@/components/ui/video-modal";
import { Button } from "@/components/ui/button";

export function Accolades() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <span className="eyebrow"><Trophy className="size-3.5" /> {accolade.eyebrow}</span>
          <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
            Most Trusted <span className="text-lime-700">Sexologist</span> of the Year
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">{accolade.text}</p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[["Most Trusted Sexologist of the Year", "IBARC Asia International"], ["Best Sexologist", "Asia Today"]].map(([t, by]) => (
              <div key={t} className="flex items-start gap-3 rounded-2xl border border-line p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-orange/15 text-orange-600"><Award className="size-5" /></span>
                <span><span className="block font-bold leading-tight">{t}</span><span className="text-sm text-muted">{by}</span></span>
              </div>
            ))}
          </div>
          <div className="mt-8"><Button href="/awards" variant="outline">View awards &amp; certificates</Button></div>
        </Reveal>
        <Reveal delay={0.15} className="grid gap-5 sm:grid-cols-2">
          {accolade.videos.map((v, i) => (
            <VideoCard key={v.src} {...v} className={i === 1 ? "sm:mt-16" : ""} />
          ))}
        </Reveal>
      </div>

      <Reveal className="mt-20">
        <Marquee duration={40}>
          {certificates.map((c) => (
            <div key={c.src} className="relative h-36 w-52 shrink-0 overflow-hidden rounded-2xl border border-line bg-white p-3 sm:h-44 sm:w-64">
              <Image src={c.src} alt={c.alt} fill sizes="260px" className="object-contain p-3" />
            </div>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}
