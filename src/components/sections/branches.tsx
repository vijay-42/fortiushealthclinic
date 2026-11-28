"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { useState } from "react";
import { site } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function Branches({ heading = true }: { heading?: boolean }) {
  const [active, setActive] = useState(0);
  const b = site.branches[active];
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        {heading && <SectionHeading eyebrow="Contact us" title={<>Be free, <span className="text-gradient">get in touch</span></>} />}
        <Reveal className={cn("grid gap-6 lg:grid-cols-[0.9fr_1.1fr]", heading && "mt-12")}>
          <div className="grid content-start gap-4">
            {site.branches.map((br, i) => (
              <button
                key={br.id}
                type="button"
                onClick={() => setActive(i)}
                aria-pressed={active === i}
                className={cn("relative rounded-xl border-2 p-6 text-left transition sm:p-7", active === i ? "border-lime bg-white shadow-lift" : "border-line bg-white hover:border-lime-200")}
              >
                {active === i && <motion.span layoutId="branch-dot" className="absolute top-7 right-7 size-3 rounded-full bg-lime ring-4 ring-lime/25" />}
                <p className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">{br.label}</p>
                <p className="h-display mt-2 text-2xl">{br.name}</p>
                <p className="mt-3 flex gap-2 text-muted"><MapPin className="mt-1 size-4 shrink-0" /> {br.address}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={`tel:${br.phone.tel}`} onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-md bg-lime-700 px-4 py-2 text-sm font-semibold text-white"><Phone className="size-3.5" /> {br.phone.display}</a>
                  <a href={br.directions} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="inline-flex items-center gap-2 rounded-md bg-mist px-4 py-2 text-sm font-semibold"><Navigation className="size-3.5" /> Directions</a>
                </div>
              </button>
            ))}
            <div className="flex items-start gap-3 rounded-xl bg-cream p-6">
              <Mail className="mt-0.5 size-5 text-lime-700" />
              <div className="grid">{site.emails.map((e) => <a key={e} href={`mailto:${e}`} className="font-semibold hover:text-lime-700">{e}</a>)}</div>
            </div>
          </div>
          <div className="relative min-h-[26rem] overflow-hidden rounded-xl border border-line bg-mist">
            <iframe key={b.id} src={b.map} title={`Map — ${site.name} ${b.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="absolute inset-0 size-full grayscale-[30%]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
