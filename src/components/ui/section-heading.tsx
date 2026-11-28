"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function SectionHeading({
  eyebrow, title, text, align = "left", dark = false, className, titleClassName, as = "h2",
}: {
  eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; align?: "left" | "center"; dark?: boolean; className?: string; titleClassName?: string; as?: "h1" | "h2";
}) {
  const reduce = useReducedMotion();
  const H = motion[as];
  const vp = { once: true, margin: "-60px" } as const;
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <motion.span
          initial={reduce ? false : { opacity: 0, x: align === "center" ? 0 : -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={vp}
          transition={{ duration: 0.7, ease }}
          className={dark ? "eyebrow-dark" : "eyebrow"}
        >
          {eyebrow}
        </motion.span>
      )}
      <motion.div className="overflow-hidden pb-1" initial={reduce ? false : "hidden"} whileInView="show" viewport={vp}>
        <H
          variants={{ hidden: { y: "105%", opacity: 0 }, show: { y: 0, opacity: 1 } }}
          transition={{ duration: 1, delay: 0.08, ease }}
          className={cn("h-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]", dark ? "text-white" : "text-ink", titleClassName)}
        >
          {title}
        </H>
      </motion.div>
      {text && (
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted")}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
