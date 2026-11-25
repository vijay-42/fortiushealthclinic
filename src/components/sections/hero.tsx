"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Award, CalendarCheck, Lock, MapPin, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { doctor, site } from "@/content/site";
import { useBooking } from "@/components/interactive/booking";
import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 60]);
  const { open } = useBooking();

  const words = ["Best", "Sexologist", "Hospital"];

  return (
    <section ref={ref} className="relative -mt-[4.5rem] overflow-hidden bg-cream pt-32 pb-20 lg:pt-40 lg:pb-28">
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
            {site.heroTitle}
          </motion.span>

          <h1 className="h-display mt-6 text-[2.9rem] leading-[0.98] sm:text-7xl lg:text-[4.6rem]">
            {words.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}>
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span className="inline-block text-lime-700" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.38, ease }}>
                in Bangalore
              </motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {site.heroText}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-9 flex flex-wrap gap-3">
            <Button size="lg" onClick={() => open()}><CalendarCheck className="size-5" /> Book an Appointment</Button>
            <Button size="lg" variant="outline" href="#care-finder">Find the right care <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Button>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.85 }} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm font-semibold text-ink-soft">
            <li className="flex items-center gap-2"><Lock className="size-4 text-lime-700" /> Data security &amp; confidentiality</li>
            <li className="flex items-center gap-2"><Award className="size-4 text-lime-700" /> Award-winning sexologist</li>
            <li className="flex items-center gap-2"><Sparkles className="size-4 text-lime-700" /> 13+ years experience</li>
          </motion.ul>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease }}
          className="relative mx-auto aspect-[4/5] w-full max-w-xl overflow-hidden rounded-xl bg-ink shadow-lift sm:aspect-square lg:aspect-[4/5] lg:max-w-none"
        >
          <motion.div style={{ y: yImg, scale: 1.12 }} className="absolute inset-0">
            <Image src="/images/hero/reception.jpg" alt="Fortius Health Clinic reception, Bangalore" fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink/60" />

          {/* Location label */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
            className="absolute top-4 left-4 flex items-center gap-2 rounded-md bg-white/95 px-3 py-2 text-[0.8rem] font-semibold text-ink sm:top-5 sm:left-5"
          >
            <MapPin className="size-3.5 text-lime-700" /> Richards Town &amp; HSR Layout
          </motion.div>

          {/* Doctor + award panel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            className="absolute inset-x-3 bottom-3 grid overflow-hidden rounded-lg bg-white shadow-lift sm:inset-x-5 sm:bottom-5 sm:grid-cols-2"
          >
            <div className="flex items-center gap-3 p-4">
              <Image src={doctor.image} alt={doctor.name} width={56} height={56} className="size-12 shrink-0 rounded-full object-cover" />
              <div className="min-w-0">
                <p className="truncate font-semibold leading-tight">{doctor.name}</p>
                <p className="mt-0.5 text-xs text-muted">{doctor.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 border-t border-line p-4 sm:border-t-0 sm:border-l">
              <span className="grid size-12 shrink-0 place-items-center rounded-md bg-lime-50 text-lime-700"><Award className="size-5" /></span>
              <div className="min-w-0">
                <p className="text-sm leading-snug font-semibold">Most Trusted Sexologist of the Year</p>
                <p className="mt-0.5 text-xs text-muted">IBARC Asia International</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
