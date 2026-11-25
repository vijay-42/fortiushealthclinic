"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import type { Faq } from "@/content/site";
import { cn } from "@/lib/utils";

export function FaqList({ faqs, dark = false }: { faqs: Faq[]; dark?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();
  return (
    <div className={cn("divide-y rounded-3xl border", dark ? "divide-white/10 border-white/10 bg-white/5" : "divide-line border-line bg-white")}>
      {faqs.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className={cn("flex w-full items-center gap-5 px-6 py-5 text-left text-[1.05rem] font-semibold sm:px-8 sm:py-6", dark ? "text-white" : "text-ink")}
              >
                <span className="flex-1">{f.q}</span>
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-full transition-all duration-500", isOpen ? "rotate-45 bg-lime text-ink" : dark ? "bg-white/10 text-white" : "bg-mist text-ink")}>
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className={cn("px-6 pb-6 leading-relaxed sm:px-8 sm:pr-20", dark ? "text-white/70" : "text-muted")}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
