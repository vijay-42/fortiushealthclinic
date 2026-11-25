"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { categories, treatments, type CategoryId } from "@/content/treatments";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

export function TreatmentExplorer() {
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.toLowerCase().trim();
    return treatments.filter((t) => (cat === "all" || t.category === cat) && (!s || [t.name, t.summary, ...t.keywords].join(" ").toLowerCase().includes(s)));
  }, [cat, q]);

  return (
    <div>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:px-0">
          {[{ id: "all" as const, label: "All treatments" }, ...categories].map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={cn("relative shrink-0 rounded-full px-5 py-3 text-sm font-semibold transition-colors", cat === c.id ? "text-white" : "bg-cream text-ink/70 hover:text-ink")}
            >
              {cat === c.id && <motion.span layoutId="tx-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>
        <label className="relative block lg:w-80">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a symptom or condition" aria-label="Search treatments" className="h-12 w-full rounded-full border border-line bg-white pr-4 pl-11 outline-none focus:border-lime focus:ring-4 focus:ring-lime/20" />
        </label>
      </div>

      <motion.div layout className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((t) => (
            <motion.div key={t.slug} layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
              <Link href={`/treatments/${t.slug}`} className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-white transition duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-lift">
                {t.image ? (
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image src={t.image} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/50 to-transparent" />
                  </div>
                ) : (
                  <div className="relative grid aspect-[16/9] place-items-center overflow-hidden bg-gradient-to-br from-mist via-lime-50 to-lime-100">
                    <Icon name={t.icon} className="size-16 text-lime-700/30 transition duration-700 group-hover:scale-125 group-hover:rotate-6" strokeWidth={1.2} />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">{categories.find((c) => c.id === t.category)?.label}</span>
                    <span className="grid size-10 place-items-center rounded-full border border-line transition group-hover:rotate-45 group-hover:border-ink group-hover:bg-ink group-hover:text-white"><ArrowUpRight className="size-4" /></span>
                  </div>
                  <h2 className="h-display mt-3 text-2xl">{t.name}</h2>
                  <p className="mt-2 line-clamp-3 text-muted">{t.summary}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {list.length === 0 && <p className="py-16 text-center text-muted">No treatments match “{q}”. Try the Care Finder or call us — we’re happy to help.</p>}
    </div>
  );
}
