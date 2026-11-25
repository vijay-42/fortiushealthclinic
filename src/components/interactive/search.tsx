"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CornerDownLeft, FileText, HelpCircle, Search, Stethoscope } from "lucide-react";
import { useRouter } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { aboutFaqs, homeFaqs } from "@/content/site";
import { treatments } from "@/content/treatments";
import { cn } from "@/lib/utils";

type Item = { kind: "Treatment" | "Page" | "FAQ"; title: string; sub?: string; href: string; haystack: string };

const pages: [string, string][] = [
  ["Home", "/"], ["About Us", "/about"], ["All Treatments", "/treatments"], ["Awards & Certificates", "/awards"],
  ["Gallery", "/gallery"], ["Testimonials", "/testimonials"], ["Contact & Directions", "/contact"],
];

const index: Item[] = [
  ...treatments.map((t) => ({ kind: "Treatment" as const, title: t.name, sub: t.tagline, href: `/treatments/${t.slug}`, haystack: [t.name, t.tagline, ...t.keywords].join(" ").toLowerCase() })),
  ...pages.map(([title, href]) => ({ kind: "Page" as const, title, href, haystack: title.toLowerCase() })),
  ...homeFaqs.map((f) => ({ kind: "FAQ" as const, title: f.q, sub: f.a, href: "/#faqs", haystack: (f.q + " " + f.a).toLowerCase() })),
  ...aboutFaqs.map((f) => ({ kind: "FAQ" as const, title: f.q, sub: f.a, href: "/about#faqs", haystack: (f.q + " " + f.a).toLowerCase() })),
  ...treatments.flatMap((t) => t.faqs.map((f) => ({ kind: "FAQ" as const, title: f.q, sub: t.name, href: `/treatments/${t.slug}#faqs`, haystack: (f.q + " " + t.name).toLowerCase() }))),
];

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useSearch = () => useContext(Ctx);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); setOpen((o) => !o); }
      if (e.key === "/" && !/input|textarea/i.test((e.target as HTMLElement).tagName)) { e.preventDefault(); setOpen(true); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const value = useMemo(() => ({ open: () => setOpen(true) }), []);
  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>{open && <Palette onClose={() => setOpen(false)} />}</AnimatePresence>
    </Ctx.Provider>
  );
}

const icons = { Treatment: Stethoscope, Page: FileText, FAQ: HelpCircle };

function Palette({ onClose }: { onClose: () => void }) {
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const router = useRouter();
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const terms = q.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return index.filter((i) => i.kind !== "FAQ").slice(0, 12);
    return index
      .map((i) => ({ i, score: terms.reduce((s, t) => s + (i.title.toLowerCase().includes(t) ? 3 : i.haystack.includes(t) ? 1 : -99), 0) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score || (a.i.kind === "Treatment" ? -1 : 1))
      .slice(0, 14)
      .map((r) => r.i);
  }, [q]);

  const go = useCallback((item?: Item) => {
    if (!item) return;
    onClose();
    router.push(item.href);
  }, [onClose, router]);

  useEffect(() => {
    input.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    list.current?.querySelector(`[data-idx="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
    else if (e.key === "Enter") { e.preventDefault(); go(results[active]); }
  };

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <motion.button aria-label="Close search" className="absolute inset-0 bg-ink/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: -16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-lift"
        onKeyDown={onKey}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <Search className="size-5 text-muted" />
          <input
            ref={input}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            placeholder="Search treatments, symptoms or questions…"
            className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-muted/70"
            role="combobox"
            aria-expanded
            aria-controls="search-results"
            aria-activedescendant={`sr-${active}`}
          />
          <kbd className="rounded-md border border-line px-2 py-1 text-xs text-muted">ESC</kbd>
        </div>
        <ul ref={list} id="search-results" role="listbox" data-lenis-prevent className="max-h-[55vh] overflow-y-auto p-2">
          {results.length === 0 && <li className="px-4 py-10 text-center text-muted">No matches. Try “erection”, “sperm” or “counselling”.</li>}
          {results.map((r, i) => {
            const I = icons[r.kind];
            return (
              <li key={r.kind + r.href + r.title} id={`sr-${i}`} role="option" aria-selected={i === active} data-idx={i}>
                <button
                  type="button"
                  onMouseMove={() => setActive(i)}
                  onClick={() => go(r)}
                  className={cn("flex w-full items-center gap-4 rounded-lg px-4 py-3 text-left transition-colors", i === active && "bg-lime-50")}
                >
                  <span className={cn("grid size-10 shrink-0 place-items-center rounded-md", i === active ? "bg-lime text-white" : "bg-mist text-muted")}><I className="size-[18px]" /></span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-semibold">{r.title}</span>
                    {r.sub && <span className="block truncate text-sm text-muted">{r.sub}</span>}
                  </span>
                  <span className="text-[0.7rem] font-bold tracking-wider text-muted uppercase">{r.kind}</span>
                  {i === active ? <CornerDownLeft className="size-4 text-lime-700" /> : <ArrowRight className="size-4 text-transparent" />}
                </button>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-4 border-t border-line bg-cream px-5 py-3 text-xs text-muted">
          <span><kbd className="font-sans">↑↓</kbd> navigate</span>
          <span><kbd className="font-sans">↵</kbd> open</span>
          <span className="ml-auto">Searches stay on your device</span>
        </div>
      </motion.div>
    </div>
  );
}
