"use client";

import { AnimatePresence, motion } from "motion/react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

type Img = { src: string; alt: string; cat: string };

export function GalleryGrid({ images, filters = true }: { images: readonly Img[]; filters?: boolean }) {
  const cats = useMemo(() => ["All", ...Array.from(new Set(images.map((i) => i.cat)))], [images]);
  const [cat, setCat] = useState("All");
  const [idx, setIdx] = useState<number | null>(null);
  const list = images.filter((i) => cat === "All" || i.cat === cat);

  const close = useCallback(() => setIdx(null), []);
  const move = useCallback((d: number) => setIdx((i) => (i === null ? i : (i + d + list.length) % list.length)), [list.length]);

  useEffect(() => {
    if (idx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [idx, close, move]);

  return (
    <>
      {filters && (
        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} className={cn("relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors", cat === c ? "text-white" : "bg-cream text-ink/70 hover:text-ink")}>
              {cat === c && <motion.span layoutId="gal-pill" className="absolute inset-0 rounded-full bg-ink" />}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>
      )}
      <motion.div layout className="columns-2 gap-4 md:columns-3 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {list.map((img, i) => (
            <motion.button
              layout
              key={img.src}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              onClick={() => setIdx(i)}
              className={cn("group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl", img.cat === "Awards" ? "bg-cream" : "bg-mist")}
              aria-label={`Open image: ${img.alt}`}
            >
              <Image src={img.src} alt={img.alt} width={600} height={img.cat === "Awards" ? 430 : i % 3 === 0 ? 760 : 600} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" className={cn("h-auto w-full transition duration-700 group-hover:scale-105", img.cat === "Awards" ? "object-contain p-4" : "object-cover")} />
              <span className="absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/70 via-transparent p-4 text-left text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                {img.alt}
                <Expand className="size-4" />
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {idx !== null && list[idx] && (
          <motion.div className="fixed inset-0 z-[95] flex flex-col bg-ink/95 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label="Image viewer">
            <div className="flex items-center justify-between p-5 text-white">
              <span className="text-sm text-white/60">{idx + 1} / {list.length} · {list[idx].alt}</span>
              <button onClick={close} className="grid size-12 place-items-center rounded-full bg-white/10" aria-label="Close"><X /></button>
            </div>
            <div className="relative flex-1" onClick={close}>
              <AnimatePresence mode="wait">
                <motion.div key={list[idx].src} className="absolute inset-4 sm:inset-x-24" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}>
                  <Image src={list[idx].src} alt={list[idx].alt} fill sizes="100vw" className="object-contain" />
                </motion.div>
              </AnimatePresence>
              <button onClick={(e) => { e.stopPropagation(); move(-1); }} className="absolute top-1/2 left-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-lime hover:text-ink" aria-label="Previous"><ChevronLeft /></button>
              <button onClick={(e) => { e.stopPropagation(); move(1); }} className="absolute top-1/2 right-4 grid size-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-lime hover:text-ink" aria-label="Next"><ChevronRight /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
