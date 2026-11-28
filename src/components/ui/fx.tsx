"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Thin green→orange bar at the top of the viewport that fills as you scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div aria-hidden style={{ scaleX }} className="fixed inset-x-0 top-0 z-[90] h-[3px] origin-left bg-lime" />;
}

/** Card with a cursor-following glow and a gentle 3D tilt. */
export function SpotlightCard({ children, className, tilt = true }: { children: React.ReactNode; className?: string; tilt?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const rx = useSpring(0, { stiffness: 200, damping: 20 });
  const ry = useSpring(0, { stiffness: 200, damping: 20 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${mx}px ${my}px, rgb(95 146 23 / 0.16), transparent 70%)`;

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
    if (tilt && !reduce) {
      rx.set(((e.clientY - r.top) / r.height - 0.5) * -6);
      ry.set(((e.clientX - r.left) / r.width - 0.5) * 6);
    }
  };
  const onLeave = () => { mx.set(-400); my.set(-400); rx.set(0); ry.set(0); };

  return (
    <motion.div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }} className={cn("relative h-full", className)}>
      {children}
      <motion.span aria-hidden style={{ background: glow }} className="pointer-events-none absolute inset-0 z-10 rounded-[inherit]" />
    </motion.div>
  );
}

/** Wipes an image into view with a clip-path and a slow settle. */
export function ImageReveal({ children, className, direction = "up", delay = 0 }: { children: React.ReactNode; className?: string; direction?: "up" | "left" | "right"; delay?: number }) {
  const reduce = useReducedMotion();
  const from = { up: "inset(100% 0 0 0)", left: "inset(0 100% 0 0)", right: "inset(0 0 0 100%)" }[direction];
  return (
    <motion.div
      className={cn("relative overflow-hidden", className)}
      initial={reduce ? false : { clipPath: from }}
      whileInView={{ clipPath: "inset(0 0 0 0)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, delay, ease }}
    >
      <motion.div className="absolute inset-0" initial={reduce ? false : { scale: 1.25 }} whileInView={{ scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.6, delay, ease }}>
        {children}
      </motion.div>
    </motion.div>
  );
}

/** Moves children vertically as the element scrolls through the viewport. */
export function Parallax({ children, className, offset = 40 }: { children: React.ReactNode; className?: string; offset?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [offset, -offset]);
  return <motion.div ref={ref} style={{ y }} className={className}>{children}</motion.div>;
}

/** Gentle endless bob, for floating badges. */
export function Float({ children, className, delay = 0, y = 10 }: { children: React.ReactNode; className?: string; delay?: number; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div className={className} animate={reduce ? undefined : { y: [0, -y, 0] }} transition={{ duration: 5, delay, repeat: Infinity, ease: "easeInOut" }}>
      {children}
    </motion.div>
  );
}

/** Hand-drawn underline that draws itself under a word. */
export function Scribble({ className, delay = 0.9 }: { className?: string; delay?: number }) {
  return (
    <svg aria-hidden viewBox="0 0 300 20" preserveAspectRatio="none" className={cn("pointer-events-none absolute -bottom-1 left-0 h-[0.32em] w-full text-orange", className)}>
      <motion.path
        d="M4 14C60 6 140 3 296 9"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease }}
      />
    </svg>
  );
}
