"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowLeft, ArrowRight, CalendarCheck, Lock, Phone, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { site } from "@/content/site";
import { categories, treatments, type CategoryId } from "@/content/treatments";
import { Icon } from "@/components/ui/icon";
import { useBooking } from "@/components/interactive/booking";
import { cn } from "@/lib/utils";

const symptoms: Record<CategoryId, { text: string; slug: string; urgent?: boolean }[]> = {
  performance: [
    { text: "Trouble getting or keeping an erection", slug: "erectile-dysfunction" },
    { text: "Finishing too quickly", slug: "premature-ejaculation" },
    { text: "Taking too long or unable to finish", slug: "delayed-ejaculation" },
    { text: "Low desire, energy or drive", slug: "low-testosterone" },
    { text: "Painful, dry or unusual ejaculation", slug: "ejaculatory-disorders" },
  ],
  fertility: [
    { text: "Trying to conceive for over a year", slug: "male-infertility" },
    { text: "Semen report shows no sperm", slug: "infertility-azoospermia" },
    { text: "Report shows a low sperm count", slug: "sperm-count" },
    { text: "Report shows poor sperm movement", slug: "sperm-motility" },
    { text: "Swollen veins or ache in the scrotum", slug: "varicocele" },
  ],
  procedures: [
    { text: "Tight, painful or infected foreskin", slug: "circumcision" },
    { text: "Curved or bent erection", slug: "peyronies-disease" },
    { text: "Concerned about size or girth", slug: "penile-enlargement" },
    { text: "An erection lasting for hours, without arousal", slug: "priapism", urgent: true },
  ],
  wellbeing: [
    { text: "Intimacy or relationship difficulties", slug: "couple-problems" },
    { text: "Compulsive porn use I can’t control", slug: "porn-addiction" },
    { text: "Discharge, sores, itching or a risky encounter", slug: "std" },
  ],
};

const catIcon: Record<CategoryId, string> = { performance: "Zap", fertility: "Baby", procedures: "Scissors", wellbeing: "HeartHandshake" };

export function CareFinder() {
  const [cat, setCat] = useState<CategoryId | null>(null);
  const [pick, setPick] = useState<{ slug: string; urgent?: boolean } | null>(null);
  const { open } = useBooking();
  const step = pick ? 2 : cat ? 1 : 0;
  const result = pick ? treatments.find((t) => t.slug === pick.slug)! : null;
  const reset = () => { setCat(null); setPick(null); };

  return (
    <section id="care-finder" className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <div className="pointer-events-none absolute -top-32 right-0 size-[40rem] rounded-full bg-lime/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 size-[30rem] rounded-full bg-orange/10 blur-3xl" />
      <div className="grain absolute inset-0" />

      <div className="container-x relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow-dark">Care Finder · new</span>
          <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
            Not sure where to start? <span className="text-lime">Find the right care</span> in 3 taps.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-white/70">
            Many men find it hard to put a concern into words. Pick what feels closest and we’ll point you to the right treatment and specialist.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-white/70">
            <Lock className="size-4 text-lime" /> Private — runs in your browser, nothing is stored or sent.
          </p>

          <ol className="mt-10 hidden gap-4 lg:grid">
            {["Choose an area", "Pick what you’re experiencing", "See your recommended care"].map((s, i) => (
              <li key={s} className={cn("flex items-center gap-4 transition-opacity", step >= i ? "opacity-100" : "opacity-40")}>
                <span className={cn("grid size-9 place-items-center rounded-full text-sm font-bold", step > i ? "bg-lime text-ink" : step === i ? "bg-white text-ink" : "bg-white/10")}>{i + 1}</span>
                <span className="font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-h-[30rem] rounded-[2.5rem] border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-10">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="cats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}>
                <p className="text-sm font-semibold text-white/60">Step 1 of 3</p>
                <h3 className="h-display mt-2 text-3xl">What would you like help with?</h3>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {categories.map((c, i) => (
                    <motion.button
                      key={c.id}
                      type="button"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.06 }}
                      onClick={() => setCat(c.id)}
                      className="group flex flex-col items-start rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition hover:-translate-y-1 hover:border-lime/60 hover:bg-white/10"
                    >
                      <span className="grid size-12 place-items-center rounded-2xl bg-lime/15 text-lime transition group-hover:bg-lime group-hover:text-ink"><Icon name={catIcon[c.id]} className="size-5" /></span>
                      <span className="mt-5 text-lg font-bold">{c.label}</span>
                      <span className="mt-1 text-sm text-white/60">{c.blurb}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && cat && (
              <motion.div key="sym" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}>
                <button type="button" onClick={() => setCat(null)} className="inline-flex items-center gap-2 text-sm font-semibold text-white/60 hover:text-white"><ArrowLeft className="size-4" /> Step 2 of 3</button>
                <h3 className="h-display mt-2 text-3xl">Which feels closest?</h3>
                <div className="mt-8 grid gap-3">
                  {symptoms[cat].map((s, i) => (
                    <motion.button
                      key={s.slug}
                      type="button"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => setPick(s)}
                      className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-left font-semibold transition hover:border-lime/60 hover:bg-white/10"
                    >
                      {s.text}
                      <ArrowRight className="size-5 shrink-0 text-lime transition group-hover:translate-x-1" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 2 && result && (
              <motion.div key="res" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                <p className="text-sm font-semibold text-white/60">Step 3 of 3 · Recommended care</p>
                {pick?.urgent && (
                  <div className="mt-4 flex gap-3 rounded-2xl border border-orange/40 bg-orange/15 p-4 text-sm">
                    <AlertTriangle className="size-5 shrink-0 text-orange" />
                    <p><strong>This can be a medical emergency.</strong> An erection lasting more than 4 hours needs urgent care — please call the clinic now or visit the nearest emergency department.</p>
                  </div>
                )}
                <div className="mt-5 flex items-center gap-4">
                  <span className="grid size-16 place-items-center rounded-2xl bg-lime text-ink"><Icon name={result.icon} className="size-7" /></span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-lime uppercase">{categories.find((c) => c.id === result.category)?.label}</p>
                    <h3 className="h-display text-3xl sm:text-4xl">{result.name}</h3>
                  </div>
                </div>
                <p className="mt-5 leading-relaxed text-white/75">{result.summary}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {pick?.urgent ? (
                    <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center gap-2 rounded-full bg-orange px-6 font-bold text-ink"><Phone className="size-4" /> Call {site.phone.display}</a>
                  ) : (
                    <button type="button" onClick={() => open({ concern: result.slug })} className="inline-flex h-12 items-center gap-2 rounded-full bg-lime px-6 font-bold text-ink transition hover:bg-white"><CalendarCheck className="size-4" /> Book a private consultation</button>
                  )}
                  <Link href={`/treatments/${result.slug}`} className="inline-flex h-12 items-center gap-2 rounded-full border border-white/20 px-6 font-semibold transition hover:border-lime hover:text-lime">Read about {result.name} <ArrowRight className="size-4" /></Link>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/50">
                  <p>This is a guide, not a diagnosis. Our doctors will assess you in person.</p>
                  <button type="button" onClick={reset} className="inline-flex items-center gap-2 font-semibold text-white/80 hover:text-white"><RotateCcw className="size-4" /> Start over</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
