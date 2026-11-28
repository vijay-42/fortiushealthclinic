"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowLeft, ArrowRight, CalendarCheck, Check, Lock, Phone, RotateCcw } from "lucide-react";
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

type Q = { id: "duration" | "frequency" | "prior"; title: string; options: { id: string; label: string; note?: string }[] };

const questions: Q[] = [
  {
    id: "duration", title: "How long has this been going on?",
    options: [
      { id: "recent", label: "Less than 3 months", note: "Recent changes are common and often respond well to early, simple care." },
      { id: "months", label: "3 to 12 months", note: "As this has continued for a few months, a proper assessment can help find the cause." },
      { id: "year", label: "Over a year", note: "As this has been going on for over a year, we suggest booking a consultation soon rather than waiting." },
    ],
  },
  {
    id: "frequency", title: "How often does it happen?",
    options: [
      { id: "sometimes", label: "Now and then" },
      { id: "often", label: "Often", note: "Because it happens often, a full check-up is a good first step." },
      { id: "always", label: "Almost every time", note: "Because it happens almost every time, a full check-up, including any relevant tests, is a good first step." },
    ],
  },
  {
    id: "prior", title: "Have you had treatment for this before?",
    options: [
      { id: "no", label: "No, this is my first time", note: "A first consultation is a relaxed conversation. Nothing is decided without your agreement." },
      { id: "nohelp", label: "Yes, but it didn’t help", note: "Dr. Jameel can review what you’ve already tried and suggest a different approach." },
      { id: "ongoing", label: "Yes, I’m on treatment now", note: "Bring your current prescriptions so we can build on your existing plan." },
    ],
  },
];

const stepLabels = ["Choose an area", "What you’re experiencing", "How long", "How often", "Previous treatment"];
const TOTAL = 5;

export function CareFinder() {
  const [cat, setCat] = useState<CategoryId | null>(null);
  const [pick, setPick] = useState<{ slug: string; text: string; urgent?: boolean } | null>(null);
  const [answers, setAnswers] = useState<Partial<Record<Q["id"], string>>>({});
  const { open } = useBooking();

  const answered = questions.filter((q) => answers[q.id]).length;
  const step = !cat ? 0 : !pick ? 1 : pick.urgent ? TOTAL : 2 + answered;
  const done = step >= TOTAL;
  const result = pick ? treatments.find((t) => t.slug === pick.slug)! : null;
  const reset = () => { setCat(null); setPick(null); setAnswers({}); };
  const back = () => {
    if (step === 1) setCat(null);
    else if (step === 2) setPick(null);
    else if (step > 2 && !done) setAnswers((a) => { const n = { ...a }; delete n[questions[step - 3].id]; return n; });
  };
  const notes = questions.map((q) => q.options.find((o) => o.id === answers[q.id])?.note).filter(Boolean) as string[];
  const q = step >= 2 && !done ? questions[step - 2] : null;

  return (
    <section id="care-finder" className="relative overflow-hidden bg-block py-24 text-ink lg:py-32">
      <div className="container-x relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <span className="eyebrow">Private self-check</span>
          <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]">
            Not sure where to start? <span className="text-accent">Take the 1-minute check.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Many men find it hard to put a concern into words. Answer five quick questions and we’ll point you to the right treatment and what to expect.
          </p>
          <p className="mt-8 inline-flex items-center gap-2 rounded-md bg-white/60 px-4 py-2 text-sm text-ink-soft">
            <Lock className="size-4 text-lime-700" /> Private: runs in your browser, nothing is stored or sent.
          </p>

          <ol className="mt-10 hidden gap-4 lg:grid">
            {stepLabels.map((s, i) => (
              <li key={s} className={cn("flex items-center gap-4 transition-opacity duration-500", step >= i ? "opacity-100" : "opacity-40")}>
                <span className={cn("grid size-9 place-items-center rounded-full text-sm font-bold transition-colors duration-500", step > i ? "bg-lime text-white" : step === i ? "bg-white text-ink ring-2 ring-lime" : "bg-white/70")}>
                  {step > i ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                </span>
                <span className="font-semibold">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative min-h-[32rem] overflow-hidden rounded-xl border border-ink/10 bg-white/70 p-6 sm:p-10">
          {/* progress */}
          <div className="absolute inset-x-0 top-0 h-1.5 bg-ink/5">
            <motion.div className="h-full bg-lime" animate={{ width: `${(Math.min(step, TOTAL) / TOTAL) * 100}%` }} transition={{ type: "spring", stiffness: 120, damping: 22 }} />
          </div>

          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="cats" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.35 }}>
                <p className="text-sm font-semibold text-muted">Question 1 of {TOTAL}</p>
                <h3 className="h-display mt-2 text-3xl">What would you like help with?</h3>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {categories.map((c, i) => (
                    <motion.button key={c.id} type="button" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} whileTap={{ scale: 0.97 }}
                      onClick={() => setCat(c.id)}
                      className="group flex flex-col items-start rounded-lg border border-ink/10 bg-white/70 p-6 text-left transition hover:-translate-y-1 hover:border-lime hover:bg-white">
                      <span className="grid size-12 place-items-center rounded-lg bg-lime-50 text-lime-700 transition group-hover:bg-lime group-hover:text-white"><Icon name={catIcon[c.id]} className="size-5" /></span>
                      <span className="mt-5 text-lg font-bold">{c.label}</span>
                      <span className="mt-1 text-sm text-muted">{c.blurb}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && cat && (
              <motion.div key="sym" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                <button type="button" onClick={back} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft className="size-4" /> Question 2 of {TOTAL}</button>
                <h3 className="h-display mt-2 text-3xl">Which feels closest?</h3>
                <div className="mt-8 grid gap-3">
                  {symptoms[cat].map((s, i) => (
                    <motion.button key={s.slug} type="button" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setPick(s)}
                      className="group flex items-center justify-between gap-4 rounded-lg border border-ink/10 bg-white/70 px-5 py-4 text-left font-semibold transition hover:border-lime hover:bg-white">
                      {s.text}
                      <ArrowRight className="size-5 shrink-0 text-lime-700 transition group-hover:translate-x-1" />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {q && (
              <motion.div key={q.id} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>
                <button type="button" onClick={back} className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-ink"><ArrowLeft className="size-4" /> Question {step + 1} of {TOTAL}</button>
                <h3 className="h-display mt-2 text-3xl">{q.title}</h3>
                <div className="mt-8 grid gap-3">
                  {q.options.map((o, i) => (
                    <motion.button key={o.id} type="button" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setAnswers((a) => ({ ...a, [q.id]: o.id }))}
                      className="group flex items-center gap-4 rounded-lg border border-ink/10 bg-white/70 px-5 py-4 text-left font-semibold transition hover:border-lime hover:bg-white">
                      <span className="grid size-6 shrink-0 place-items-center rounded-full border-2 border-ink/20 transition group-hover:border-lime"><span className="size-2.5 scale-0 rounded-full bg-lime transition group-hover:scale-100" /></span>
                      {o.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {done && result && (
              <motion.div key="res" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}>
                <p className="text-sm font-semibold text-muted">Your recommended care</p>
                {pick?.urgent && (
                  <div className="mt-4 flex gap-3 rounded-lg border border-orange/40 bg-orange/15 p-4 text-sm">
                    <AlertTriangle className="size-5 shrink-0 text-orange-600" />
                    <p><strong>This can be a medical emergency.</strong> An erection lasting more than 4 hours needs urgent care. Please call the clinic now or visit the nearest emergency department.</p>
                  </div>
                )}
                <div className="mt-5 flex items-center gap-4">
                  <motion.span initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 240, damping: 14, delay: 0.1 }} className="grid size-16 place-items-center rounded-lg bg-lime text-white"><Icon name={result.icon} className="size-7" /></motion.span>
                  <div>
                    <p className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">{categories.find((c) => c.id === result.category)?.label}</p>
                    <h3 className="h-display text-3xl sm:text-4xl">{result.name}</h3>
                  </div>
                </div>
                {notes.length > 0 && (
                  <ul className="mt-6 grid gap-2.5">
                    {notes.map((n, i) => (
                      <motion.li key={n} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 + i * 0.1 }} className="flex gap-3 rounded-lg bg-lime-50 px-4 py-3 text-sm leading-relaxed text-ink-soft">
                        <Check className="mt-0.5 size-4 shrink-0 text-lime-700" strokeWidth={3} /> {n}
                      </motion.li>
                    ))}
                  </ul>
                )}
                {!notes.length && <p className="mt-5 leading-relaxed text-ink-soft">{result.summary}</p>}
                <div className="mt-8 flex flex-wrap gap-3">
                  {pick?.urgent ? (
                    <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center gap-2 rounded-md bg-orange px-6 font-bold text-ink"><Phone className="size-4" /> Call {site.phone.display}</a>
                  ) : (
                    <button type="button" onClick={() => open({ concern: result.slug })} className="inline-flex h-12 items-center gap-2 rounded-md bg-lime px-6 font-bold text-white transition hover:bg-lime-700"><CalendarCheck className="size-4" /> Book a private consultation</button>
                  )}
                  <Link href={`/treatments/${result.slug}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/20 px-6 font-semibold transition hover:border-lime hover:text-lime-700">About {result.name} <ArrowRight className="size-4" /></Link>
                </div>
                <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/10 pt-6 text-sm text-muted">
                  <p>This is a guide, not a diagnosis. Our doctors will assess you in person.</p>
                  <button type="button" onClick={reset} className="inline-flex items-center gap-2 font-semibold text-ink-soft hover:text-ink"><RotateCcw className="size-4" /> Start over</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
