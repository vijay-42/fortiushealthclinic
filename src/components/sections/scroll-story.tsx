"use client";

import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { Award, HeartHandshake, Lock } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { doctor } from "@/content/site";

const chapters = [
  {
    icon: Lock, kicker: "01 · Privacy", title: "Completely confidential",
    text: "Private consultation rooms, a discreet front desk and secure records. What you share stays between you and your doctor.",
    image: "/images/gallery/interior-3.jpg", alt: "Private corridor to the consultation rooms",
  },
  {
    icon: Award, kicker: "02 · Expertise", title: "Led by an award-winning expert",
    text: `${doctor.name} brings 13+ years of focused experience in men’s sexual health, recognised with national and international awards.`,
    image: doctor.awardImage, alt: `${doctor.name} receiving an award`,
  },
  {
    icon: HeartHandshake, kicker: "03 · Personal care", title: "A plan made only for you",
    text: "No one-size-fits-all. After a careful assessment, your treatment is shaped around your health, your goals and your pace, with our team beside you at every follow-up.",
    image: "/images/team/reception-team.png", alt: "The Fortius care team",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function ScrollStory() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [i, setI] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setI(Math.min(chapters.length - 1, Math.floor(v * chapters.length))));
  const c = chapters[i];

  return (
    <>
      {/* Desktop: pinned story */}
      <section ref={ref} className="relative hidden lg:block" style={{ height: `${chapters.length * 90 + 30}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-x grid w-full items-center gap-16 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <span className="eyebrow">Why men choose Fortius</span>
              <div className="relative mt-8 min-h-[19rem]">
                <AnimatePresence mode="wait">
                  <motion.div key={i} initial={reduce ? false : { opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }} transition={{ duration: 0.55, ease }}>
                    <span className="grid size-14 place-items-center rounded-xl bg-lime-50 text-lime-700"><c.icon className="size-6" /></span>
                    <p className="mt-6 text-sm font-bold tracking-[0.14em] text-orange-600 uppercase">{c.kicker}</p>
                    <h2 className="h-display mt-3 text-5xl leading-[1.05] xl:text-6xl">{c.title}</h2>
                    <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{c.text}</p>
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="mt-10 flex items-center gap-3">
                {chapters.map((ch, n) => (
                  <span key={ch.title} className="relative h-1.5 w-16 overflow-hidden rounded-full bg-ink/10">
                    <motion.span className="absolute inset-0 origin-left rounded-full bg-lime" animate={{ scaleX: n <= i ? 1 : 0 }} transition={{ duration: 0.5, ease }} />
                  </span>
                ))}
                <span className="ml-2 text-sm font-semibold text-muted tabular-nums">{i + 1} / {chapters.length}</span>
              </div>
            </div>

            <div className="relative aspect-[5/4] overflow-hidden rounded-xl bg-mist shadow-lift">
              <AnimatePresence initial={false}>
                <motion.div key={c.image} className="absolute inset-0" initial={reduce ? false : { clipPath: "inset(0 0 100% 0)", scale: 1.15 }} animate={{ clipPath: "inset(0 0 0% 0)", scale: 1 }} exit={{ opacity: 1 }} transition={{ duration: 0.9, ease }}>
                  <Image src={c.image} alt={c.alt} fill sizes="50vw" className="object-cover" />
                </motion.div>
              </AnimatePresence>
              <motion.span key={`b${i}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }} className="absolute bottom-5 left-5 flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-soft">
                <c.icon className="size-4 text-lime-700" /> {c.title}
              </motion.span>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile: stacked */}
      <section className="py-20 lg:hidden">
        <div className="container-x">
          <span className="eyebrow">Why men choose Fortius</span>
          <div className="mt-8 grid gap-10">
            {chapters.map((ch) => (
              <motion.div key={ch.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.7, ease }}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist">
                  <Image src={ch.image} alt={ch.alt} fill sizes="90vw" className="object-cover" />
                </div>
                <p className="mt-5 text-xs font-bold tracking-[0.14em] text-orange-600 uppercase">{ch.kicker}</p>
                <h3 className="h-display mt-2 text-3xl">{ch.title}</h3>
                <p className="mt-3 leading-relaxed text-muted">{ch.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
