"use client";

import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function VideoCard({ title, poster, src, className }: { title: string; poster: string; src: string; className?: string }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={cn("group relative block w-full overflow-hidden rounded-[2rem] text-left", className)} aria-label={`Play video: ${title}`}>
        <div className="relative aspect-video">
          <Image src={poster} alt="" fill sizes="(min-width:1024px) 40vw, 90vw" className="object-cover transition duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
        </div>
        <span className="absolute top-1/2 left-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow-lift transition duration-500 group-hover:scale-110 group-hover:bg-lime">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-white/60" />
          <Play className="relative ml-1 size-7 fill-current" />
        </span>
        <span className="absolute bottom-5 left-6 font-semibold text-white">{title}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[95] grid place-items-center bg-ink/90 p-4 backdrop-blur" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} role="dialog" aria-modal="true" aria-label={title}>
            <button className="absolute top-5 right-5 grid size-12 place-items-center rounded-full bg-white/10 text-white" aria-label="Close video"><X /></button>
            <motion.video
              initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.92 }}
              src={src} poster={poster} controls autoPlay playsInline
              className="max-h-[85vh] w-full max-w-5xl rounded-3xl bg-black"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
