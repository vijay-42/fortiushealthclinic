import { ArrowRight, Quote } from "lucide-react";
import Image from "next/image";
import { about, doctor, site, stats } from "@/content/site";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { Button } from "@/components/ui/button";

export function AboutIntro() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="grid grid-cols-5 grid-rows-6 gap-4" style={{ height: "min(38rem, 120vw)" }}>
            <div className="relative col-span-3 row-span-4 overflow-hidden rounded-[2rem]">
              <Image src="/images/gallery/interior-2.jpg" alt="Fortius patient lounge" fill sizes="(min-width:1024px) 30vw, 60vw" className="object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[2rem]">
              <Image src="/images/gallery/interior-1.jpg" alt="Fortius waiting area" fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover transition duration-700 hover:scale-105" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[2rem]">
              <Image src={doctor.awardImage} alt="Dr. Mujahid Jameel receiving the Pride of Nation award" fill sizes="(min-width:1024px) 20vw, 40vw" className="object-cover object-top" />
            </div>
            <div className="col-span-3 row-span-2 hidden flex-col justify-center rounded-[2rem] bg-ink p-6 text-white sm:flex">
              <Quote className="size-6 text-lime" />
              <p className="mt-2 text-[0.95rem] leading-relaxed text-white/80">{about.quote}</p>
              <p className="h-display mt-2 text-lg text-lime">{doctor.name}</p>
            </div>
            <div className="relative col-span-3 row-span-2 overflow-hidden rounded-[2rem] sm:hidden">
              <Image src="/images/gallery/interior-3.jpg" alt="" fill sizes="60vw" className="object-cover" />
            </div>
          </div>
          <div className="mt-4 rounded-[2rem] bg-ink p-6 text-white sm:hidden">
            <Quote className="size-6 text-lime" />
            <p className="mt-2 text-sm leading-relaxed text-white/80">{about.quote}</p>
            <p className="h-display mt-2 text-lg text-lime">{doctor.name}</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">About Us</span>
            <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.4rem]">
              Comprehensive care for <span className="text-lime-700">men’s sexual health</span> &amp; vitality
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-muted">{about.homeIntro[0]}</p>
            <p className="mt-4 leading-relaxed text-muted">{about.homeIntro[1]}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white p-5">
                <p className="h-display text-3xl text-ink sm:text-4xl"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals} /></p>
                <p className="mt-1 text-xs font-semibold text-muted">{s.label}</p>
              </div>
            ))}
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <Button href="/about" variant="dark">Know More about {site.name.split(" ")[0]} <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
