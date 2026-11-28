"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Clock, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Item = {
  slug: string; title: string; excerpt: string; date: string; categories: string[];
  image: { src: string } | null; imageAlt: string; readMinutes: number;
};

const PAGE = 12;
const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export function BlogExplorer({ posts, topics }: { posts: Item[]; topics: string[] }) {
  const [topic, setTopic] = useState("All");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);

  const list = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return posts.filter((p) => {
      if (topic !== "All" && !p.categories.includes(topic)) return false;
      const hay = (p.title + " " + p.excerpt + " " + p.categories.join(" ")).toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
  }, [posts, topic, q]);

  const pick = (t: string) => { setTopic(t); setShown(PAGE); };

  return (
    <div>
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:flex-wrap lg:px-0">
          {["All", ...topics].map((t) => (
            <button key={t} onClick={() => pick(t)} aria-pressed={topic === t}
              className={cn("relative shrink-0 rounded-md px-4 py-2.5 text-sm font-semibold transition-colors", topic === t ? "text-white" : "bg-cream text-ink/70 hover:text-ink")}>
              {topic === t && <motion.span layoutId="blog-pill" className="absolute inset-0 rounded-md bg-lime-700" transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
        <label className="relative block w-full shrink-0 lg:w-72">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          <input value={q} onChange={(e) => { setQ(e.target.value); setShown(PAGE); }} placeholder="Search articles"
            className="h-12 w-full rounded-md border border-line bg-white pr-10 pl-11 text-sm outline-none transition focus:border-lime focus:ring-4 focus:ring-lime/20" />
          {q && <button onClick={() => setQ("")} className="absolute top-1/2 right-3 -translate-y-1/2 text-muted hover:text-ink" aria-label="Clear search"><X className="size-4" /></button>}
        </label>
      </div>

      <p className="mt-6 text-sm text-muted">{list.length} article{list.length === 1 ? "" : "s"}{topic !== "All" && <> in <span className="font-semibold text-ink">{topic}</span></>}</p>

      {list.length === 0 ? (
        <div className="mt-10 rounded-xl bg-cream p-12 text-center">
          <p className="h-display text-2xl">No articles found</p>
          <p className="mt-2 text-muted">Try a different word or topic.</p>
        </div>
      ) : (
        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.slice(0, shown).map((p) => (
              <motion.div key={p.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.35 }}>
                <Link href={`/blog/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white transition duration-500 hover:-translate-y-1 hover:shadow-lift">
                  <div className="relative aspect-[1050/550] overflow-hidden bg-mist">
                    {p.image && <Image src={p.image.src} alt={p.imageAlt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[0.7rem] font-bold tracking-[0.14em] text-lime-700 uppercase">{p.categories.slice(0, 2).join(" · ")}</p>
                    <h2 className="mt-2 text-lg leading-snug font-bold group-hover:text-lime-800">{p.title}</h2>
                    <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <div className="mt-auto flex items-center justify-between pt-5 text-xs text-muted">
                      <span className="flex items-center gap-3">{fmt(p.date)} <span className="flex items-center gap-1"><Clock className="size-3.5" /> {p.readMinutes} min read</span></span>
                      <ArrowUpRight className="size-4 text-ink transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {shown < list.length && (
        <div className="mt-12 text-center">
          <button onClick={() => setShown((s) => s + PAGE)} className="inline-flex h-12 items-center rounded-md border border-ink/20 px-7 font-semibold transition hover:border-lime-700 hover:text-lime-700">
            Load more articles ({list.length - shown} left)
          </button>
        </div>
      )}
    </div>
  );
}
