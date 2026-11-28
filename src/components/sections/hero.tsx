"use client";

import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { ArrowRight, Award, CalendarCheck, ChevronLeft, ChevronRight, Globe2, HeartPulse, Lock, MapPin, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useBooking } from "@/components/interactive/booking";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

const trust = [
  { icon: Lock, label: "100% confidential consultations" },
  { icon: Award, label: "Award-winning sexologist" },
  { icon: Users, label: "10,000+ patients treated" },
  { icon: Globe2, label: "Patients from 10+ countries" },
  { icon: MapPin, label: "Richards Town & HSR Layout" },
  { icon: HeartPulse, label: "Personalised treatment plans" },
  { icon: ShieldCheck, label: "Safe, evidence-based care" },
];

type Slide = { src: string; alt: string; eyebrow: string; title: string; accent: string; short: string; text: string; link: { label: string; href: string } };

const slides: Slide[] = [
  {
    src: "/images/hero/reception.jpg", alt: "Fortius Health Clinic reception, Bangalore",
    eyebrow: "Sexual health clinic in Bangalore", title: "Best Sexologist Hospital", accent: "in Bangalore", short: "Sexologist in Bangalore",
    text: "Expert, confidential care for men’s sexual health by award-winning sexologist Dr. Mujahid Jameel.",
    link: { label: "Find the right care", href: "#care-finder" },
  },
  {
    src: "/images/team/reception-team.png", alt: "The Fortius care team at reception",
    eyebrow: "Our clinics", title: "A modern clinic with", accent: "a caring team", short: "Our clinics",
    text: "Two discreet clinics in Richards Town and HSR Layout, Bangalore, designed around your comfort and privacy.",
    link: { label: "About Fortius", href: "/about" },
  },
  {
    src: "/images/gallery/interior-2.jpg", alt: "Private patient lounge at Fortius",
    eyebrow: "Treatments", title: "Advanced care,", accent: "tailored to you", short: "Treatments",
    text: "Erectile dysfunction, premature ejaculation, male infertility, low testosterone and more.",
    link: { label: "View treatments", href: "/treatments" },
  },
  {
    src: "/images/team/dr-jameel-award.webp", alt: "Dr. Mujahid Jameel receiving the Pride of Nation award",
    eyebrow: "Recognition", title: "Most Trusted Sexologist", accent: "of the Year", short: "Awards",
    text: "Honoured by IBARC Asia International and named Best Sexologist by Asia Today.",
    link: { label: "View awards", href: "/awards" },
  },
  {
    src: "/images/gallery/exterior-2.jpg", alt: "Fortius Health Clinic building",
    eyebrow: "Patient stories", title: "Trusted by", accent: "10,000+ patients", short: "Patient stories",
    text: "Men and couples from more than 10 countries have chosen Fortius for their care.",
    link: { label: "Read patient stories", href: "/testimonials" },
  },
];

const N = slides.length;
const DURATION = 6500;
const GAP = 24;
const ease = [0.16, 1, 0.3, 1] as const;
const rel = (n: number, i: number) => ((n - i + N + Math.floor(N / 2)) % N) - Math.floor(N / 2);

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.45 } } };
const rise: Variants = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease } } };

function Title({ s, as }: { s: Slide; as: "h1" | "p" }) {
  const T = as;
  return (
    <T className="h-display text-[2.1rem] leading-[1.06] text-ink md:text-4xl xl:text-[2.75rem]">
      {s.title} <span className="text-lime-700">{s.accent}</span>
    </T>
  );
}

function Actions({ s, onBook }: { s: Slide; onBook: () => void }) {
  return (
    <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
      <button type="button" onClick={onBook} className="inline-flex h-12 items-center gap-2 rounded-md bg-lime-700 px-6 font-semibold text-white transition hover:bg-lime-800">
        <CalendarCheck className="size-4" /> Book an Appointment
      </button>
      <Link href={s.link.href} className="group inline-flex items-center gap-2 font-semibold text-ink">
        <span className="border-b-2 border-orange pb-0.5">{s.link.label}</span>
        <ArrowRight className="size-4 transition group-hover:translate-x-1" />
      </Link>
    </div>
  );
}

export function Hero() {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [w, setW] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const section = useRef<HTMLElement>(null);
  const inView = useInView(section);
  const reduce = useReducedMotion();
  const { open } = useBooking();
  const paused = hover || !inView;
  const go = useCallback((d: number) => setI((v) => (v + d + N) % N), []);


  useEffect(() => {
    if (!inView) return;
    const onKey = (e: KeyboardEvent) => {
      const t = e.target;
      if (t instanceof Element && t.closest("input, textarea, select, [contenteditable], [role=dialog]")) return;
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, go]);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.offsetWidth));
    ro.observe(el);
    setW(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setTimeout(() => go(1), DURATION);
    return () => clearTimeout(t);
  }, [i, paused, reduce, go]);

  const s = slides[i];

  return (
    <section ref={section} className="relative -mt-[4.5rem] overflow-hidden bg-lime-50 pt-[5.5rem] lg:pt-24">
      <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {/* Track: the active slide is centred, neighbours peek in at the edges */}
        <div className="relative" aria-roledescription="carousel" aria-label="Highlights">
          <div ref={box} className="relative mx-auto h-[15rem] w-[calc(100vw-2.5rem)] max-w-[76rem] sm:h-[22rem] sm:w-[calc(100vw-8rem)] md:h-[28rem] lg:h-[31rem] lg:w-[calc(100vw-14rem)]">
            {slides.map((sl, n) => {
              const r = rel(n, i);
              const active = r === 0;
              const near = Math.abs(r) === 1;
              return (
                <motion.div
                  key={sl.src}
                  className="absolute inset-0"
                  initial={false}
                  animate={{ x: r * (w + GAP), opacity: Math.abs(r) > 1 ? 0 : active ? 1 : 0.45, scale: active ? 1 : 0.95 }}
                  whileHover={near ? { opacity: 0.6 } : undefined}
                  transition={{ duration: reduce ? 0 : 1.1, ease: [0.65, 0, 0.35, 1] }}
                  style={{ zIndex: active ? 2 : 1, pointerEvents: active || near ? "auto" : "none" }}
                  aria-hidden={!active}
                  onClick={near ? () => go(r) : undefined}
                >
                  <motion.div
                    className={cn("grid size-full grid-rows-1 overflow-hidden rounded-2xl bg-white shadow-lift ring-1 ring-ink/5 md:grid-cols-[1fr_1fr]", near && "cursor-pointer")}
                    drag={active ? "x" : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => { if (info.offset.x < -60) go(1); else if (info.offset.x > 60) go(-1); }}
                  >
                    {/* Text (tablet and up) */}
                    <div className="relative hidden flex-col justify-center px-10 md:flex lg:px-14 xl:px-16">
                      <motion.div key={active ? `on-${i}` : `off-${n}`} variants={stagger} initial={active && !reduce ? "hidden" : false} animate="show" aria-hidden={!active}>
                        <motion.p variants={rise} className="eyebrow">{sl.eyebrow}</motion.p>
                        <motion.div variants={rise} className="mt-4"><Title s={sl} as={n === 0 ? "h1" : "p"} /></motion.div>
                        <motion.p variants={rise} className="mt-4 max-w-md leading-relaxed text-muted lg:text-lg">{sl.text}</motion.p>
                        {active && <motion.div variants={rise}><Actions s={sl} onBook={() => open()} /></motion.div>}
                      </motion.div>
                    </div>
                    {/* Photo */}
                    <div className="relative h-full min-h-0 overflow-hidden bg-mist">
                      <div className="absolute inset-0">
                        <motion.div className="absolute inset-0" animate={{ scale: active && !reduce ? 1.04 : 1 }} transition={{ duration: active ? DURATION / 1000 + 1 : 0.6, ease: "linear" }}>
                          <Image src={sl.src} alt={sl.alt} fill priority={n === 0} loading="eager" draggable={false} sizes="(min-width:768px) 45vw, 100vw" className="pointer-events-none object-cover select-none" />
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Side arrows */}
            {([-1, 1] as const).map((d) => (
              <motion.button
                key={d}
                type="button"
                whileTap={{ scale: 0.9 }}
                onClick={() => go(d)}
                aria-label={d < 0 ? "Previous slide" : "Next slide"}
                className={cn("absolute top-1/2 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-lift ring-1 ring-line transition hover:bg-lime-700 hover:text-white hover:ring-lime-700 sm:size-12", d < 0 ? "left-2 sm:-left-6" : "right-2 sm:-right-6")}
              >
                {d < 0 ? <ChevronLeft className="size-5" /> : <ChevronRight className="size-5" />}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Text below the slide (mobile) */}
        <div className="mx-auto mt-6 w-[calc(100vw-2.5rem)] md:hidden">
          <AnimatePresence mode="wait">
            <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, ease }}>
              <p className="eyebrow">{s.eyebrow}</p>
              <div className="mt-3"><Title s={s} as={i === 0 ? "h1" : "p"} /></div>
              <p className="mt-3 leading-relaxed text-muted">{s.text}</p>
              <Actions s={s} onBook={() => open()} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Trust strip */}
      <div className="relative mt-10 bg-lime-700 py-4 lg:mt-12">
        <Marquee duration={45}>
          {trust.map(({ icon: I, label }) => (
            <span key={label} className="flex shrink-0 items-center gap-2.5 text-sm font-semibold whitespace-nowrap text-white">
              <I className="size-4 text-orange" /> {label} <span className="ml-4 size-1.5 rounded-full bg-orange" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
