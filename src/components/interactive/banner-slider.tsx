"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useBooking } from "./booking";
import { cn } from "@/lib/utils";

type Slide = { src: string; alt: string; concern?: string };

/** Auto-rotating campaign banners. Each banner opens the booking dialog. */
export function BannerSlider({ slides, interval = 5000 }: { slides: readonly Slide[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const { open } = useBooking();
  const go = (n: number) => setI((n + slides.length) % slides.length);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => setI((v) => (v + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [i, paused, reduce, interval, slides.length]);

  const s = slides[i];
  return (
    <div className="relative" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="relative aspect-[1850/850] overflow-hidden rounded-xl bg-mist ring-1 ring-line">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.button
            key={s.src}
            type="button"
            onClick={() => open({ concern: s.concern })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 cursor-pointer"
            aria-label={`${s.alt} — book an appointment`}
          >
            <Image src={s.src} alt={s.alt} fill sizes="(min-width:1280px) 1216px, 100vw" className="object-cover" priority={i === 0} />
          </motion.button>
        </AnimatePresence>
      </div>
      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex gap-1.5" role="tablist" aria-label="Banners">
          {slides.map((sl, n) => (
            <button key={sl.src} type="button" role="tab" aria-selected={n === i} aria-label={`Banner ${n + 1}`} onClick={() => go(n)} className={cn("h-1.5 rounded-full transition-all", n === i ? "w-8 bg-ink" : "w-3 bg-ink/20 hover:bg-ink/40")} />
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => go(i - 1)} aria-label="Previous banner" className="grid size-10 place-items-center rounded-md border border-line transition hover:border-ink"><ChevronLeft className="size-4" /></button>
          <button type="button" onClick={() => go(i + 1)} aria-label="Next banner" className="grid size-10 place-items-center rounded-md border border-line transition hover:border-ink"><ChevronRight className="size-4" /></button>
        </div>
      </div>
    </div>
  );
}
