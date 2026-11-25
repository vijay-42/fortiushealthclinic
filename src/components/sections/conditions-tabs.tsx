"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { conditionsShowcase } from "@/content/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";

export function ConditionsTabs() {
  const [active, setActive] = useState(0);
  const item = conditionsShowcase.items[active];
  return (
    <section className="py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading align="center" eyebrow={conditionsShowcase.eyebrow} title={<>Treatment options, <span className="text-muted">tailored to you</span></>} text={conditionsShowcase.text} />

        <div role="tablist" aria-label="Conditions" className="no-scrollbar mx-auto mt-12 flex w-fit max-w-full gap-1 overflow-x-auto rounded-lg border border-line bg-cream p-1.5">
          {conditionsShowcase.items.map((c, i) => (
            <button
              key={c.title}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={cn("relative shrink-0 rounded-md px-5 py-3 text-sm font-semibold transition-colors sm:px-6", active === i ? "text-white" : "text-ink/70 hover:text-ink")}
            >
              {active === i && <motion.span layoutId="cond-pill" className="absolute inset-0 rounded-md bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{c.title}</span>
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-center gap-10 rounded-xl bg-cream p-5 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-12" role="tabpanel">
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl lg:aspect-[5/5.2]">
            <AnimatePresence mode="popLayout">
              <motion.div key={item.image} className="absolute inset-0" initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <Image src={item.image} alt={item.title} fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.4 }}>
              <p className="text-sm font-bold tracking-[0.14em] text-lime-700 uppercase">Treatments available</p>
              <h3 className="h-display mt-3 text-4xl sm:text-5xl">{item.title}</h3>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {item.options.map((o, i) => (
                  <motion.li key={o} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }} className="flex items-center gap-3 rounded-lg bg-white px-4 py-3.5 font-semibold shadow-soft">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-lime text-white"><Check className="size-4" strokeWidth={3} /></span>
                    {o}
                  </motion.li>
                ))}
              </ul>
              <Link href={`/treatments/${item.slug}`} className="group mt-10 inline-flex items-center gap-2 font-bold text-ink">
                <span className="border-b-2 border-lime pb-0.5">Explore {item.title.toLowerCase()} care</span>
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
