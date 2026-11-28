"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Award, CalendarCheck, Globe2, HeartPulse, Lock, MapPin, ShieldCheck, Sparkles, Star, Users } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { doctor, site } from "@/content/site";
import { useBooking } from "@/components/interactive/booking";
import { Button } from "@/components/ui/button";
import { Blobs, Float, Scribble } from "@/components/ui/fx";
import { Marquee } from "@/components/ui/marquee";

const trust = [
  { icon: Lock, label: "100% confidential consultations" },
  { icon: Award, label: "Award-winning sexologist" },
  { icon: Users, label: "10,000+ patients treated" },
  { icon: Globe2, label: "Patients from 10+ countries" },
  { icon: MapPin, label: "Richards Town & HSR Layout" },
  { icon: HeartPulse, label: "Personalised treatment plans" },
  { icon: ShieldCheck, label: "Safe, evidence-based care" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 30]);
  const { open } = useBooking();

  const words = ["Best", "Sexologist", "Hospital"];

  return (
    <section ref={ref} className="relative -mt-[4.5rem] overflow-hidden bg-cream pt-28 lg:pt-32">
      <Blobs />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
        <div>
          <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="eyebrow before:hidden">
            {site.heroTitle}
          </motion.span>

          <h1 className="h-display mt-5 text-[2.4rem] leading-[1.02] sm:text-6xl lg:text-[3.6rem]">
            {words.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-2 align-bottom">
                <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease }}>
                  {w}&nbsp;
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span className="relative inline-block text-lime-700" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.38, ease }}>
                in Bangalore
                <Scribble delay={1.1} />
              </motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5, ease }} className="mt-5 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
            {site.heroText}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6, ease }} className="mt-7 flex flex-wrap gap-3">
            <Button magnetic onClick={() => open()}><CalendarCheck className="size-5" /> Book an Appointment</Button>
            <Button variant="outline" href="#care-finder">Find the right care <ArrowRight className="size-4 transition group-hover:translate-x-1" /></Button>
          </motion.div>

          <motion.ul initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.85 }} className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink-soft">
            <li className="flex items-center gap-2"><Lock className="size-4 text-lime-700" /> Data security &amp; confidentiality</li>
            <li className="flex items-center gap-2"><Award className="size-4 text-lime-700" /> Award-winning sexologist</li>
            <li className="flex items-center gap-2"><Sparkles className="size-4 text-lime-700" /> 13+ years experience</li>
          </motion.ul>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.94, clipPath: "inset(12% 12% 12% 12% round 24px)" }}
          animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 12px)" }}
          transition={{ duration: 1.4, ease }}
          className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-mist shadow-lift lg:aspect-[5/4]"
        >
          <motion.div style={{ y: yImg, scale: 1.08 }} className="absolute inset-0">
            <Image src="/images/hero/reception.jpg" alt="Fortius Health Clinic reception, Bangalore" fill priority sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover object-[center_70%]" />
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

          {/* Floating badges */}
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1, ease }} className="absolute -top-5 right-4 z-10 hidden sm:block lg:-right-6">
            <Float y={8}>
              <div className="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lift">
                <span className="grid size-10 place-items-center rounded-md bg-orange/15 text-orange-600"><Users className="size-5" /></span>
                <div><p className="h-display text-xl leading-none">10K+</p><p className="mt-0.5 text-xs font-semibold text-muted">Patients treated</p></div>
              </div>
            </Float>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 1.15, ease }} className="absolute top-1/3 -left-8 z-10 hidden lg:block">
            <Float y={10} delay={1.2}>
              <div className="rounded-lg bg-white px-4 py-3 shadow-lift">
                <div className="flex gap-0.5 text-orange">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3.5 fill-current" />)}</div>
                <p className="mt-1.5 text-sm font-bold">13+ years of care</p>
                <p className="text-xs text-muted">Trusted by families</p>
              </div>
            </Float>
          </motion.div>
        </div>
      </div>

      {/* Trust strip */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 1.2 }} className="relative mt-12 border-y border-ink/5 bg-white/60 py-4 backdrop-blur lg:mt-14">
        <Marquee duration={45}>
          {trust.map(({ icon: I, label }) => (
            <span key={label} className="flex shrink-0 items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-ink-soft">
              <I className="size-4 text-lime-700" /> {label} <span className="ml-4 size-1.5 rounded-full bg-orange" />
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
