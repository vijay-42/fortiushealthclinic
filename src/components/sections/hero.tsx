"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Award, CalendarCheck, Lock, Sparkles } from "lucide-react";
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
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const { open } = useBooking();

  const words = ["Best", "Sexologist", "Hospital"];

  return (
    <section ref={ref} className="relative -mt-[5.25rem] overflow-hidden bg-cream pt-32 pb-20 lg:pt-40 lg:pb-28">
      {/* Ambient shapes */}
      <div className="pointer-events-none absolute -top-40 -left-40 size-[36rem] rounded-full bg-lime/25 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-20 size-[28rem] rounded-full bg-orange/15 blur-3xl" />
      <svg className="pointer-events-none absolute inset-x-0 bottom-0 w-full text-white" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
        <path fill="currentColor" d="M0 80c240 40 480 40 720 10s480-60 720-10v40H0z" />
      </svg>

      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow">
            <span className="size-1.5 rounded-full bg-lime-700" /> {site.heroTitle}
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

        {/* Visual collage */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
          <motion.div
            style={{ y: yImg }}
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, ease }}
            className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-lift sm:aspect-[5/5] lg:aspect-[4/5]"
          >
            <Image src="/images/gallery/exterior-2.jpg" alt="Fortius Health Clinic building, Bangalore" fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 text-white">
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-lime-200 uppercase">Two clinics</p>
                <p className="h-display mt-1 text-2xl">Richards Town · HSR Layout</p>
              </div>
            </div>
          </motion.div>

          {/* Doctor card */}
          <motion.div
            style={{ y: yCard }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6, ease }}
            className="glass absolute top-10 -left-4 flex w-64 items-center gap-3 rounded-3xl p-3 pr-5 shadow-lift sm:-left-10"
          >
            <Image src={doctor.image} alt={doctor.name} width={64} height={64} className="size-14 rounded-2xl object-cover" />
            <div>
              <p className="font-bold leading-tight">{doctor.name}</p>
              <p className="text-xs text-muted">{doctor.role}</p>
            </div>
          </motion.div>

          {/* Award badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="absolute -right-3 bottom-28 w-56 animate-float rounded-3xl bg-ink p-5 text-white shadow-lift sm:-right-8"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-lime text-ink"><Award className="size-5" /></span>
            <p className="mt-3 text-sm leading-snug font-semibold">“Most Trusted Sexologist of the Year”</p>
            <p className="mt-1 text-xs text-white/60">IBARC Asia International</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
