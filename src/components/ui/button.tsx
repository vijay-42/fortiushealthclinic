"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "dark" | "ghost" | "light" | "outline";

const styles: Record<Variant, string> = {
  primary: "bg-lime text-white hover:bg-lime-700",
  dark: "bg-lime-700 text-white hover:bg-lime-800",
  ghost: "text-ink hover:bg-ink/5",
  light: "bg-white text-ink shadow-soft hover:bg-lime-50",
  outline: "border border-ink/15 text-ink hover:border-ink/40 hover:bg-white",
};

type Common = { variant?: Variant; size?: "md" | "lg" | "sm"; className?: string; children: React.ReactNode; magnetic?: boolean };
type AsLink = Common & { href: string; external?: boolean; onClick?: never; type?: never };
type AsButton = Common & { href?: undefined; onClick?: () => void; type?: "button" | "submit"; disabled?: boolean };

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", size = "md", className, children, magnetic = false } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (!magnetic || reduce || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.18);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.28);
  };
  const reset = () => { x.set(0); y.set(0); };

  const cls = cn(
    "group relative inline-flex items-center justify-center gap-2 rounded-md font-semibold whitespace-nowrap transition-colors duration-300 disabled:opacity-60",
    size === "lg" && "h-14 px-7 text-base",
    size === "md" && "h-12 px-6 text-[0.95rem]",
    size === "sm" && "h-10 px-4 text-sm",
    styles[variant],
    className,
  );

  const content = (
    <motion.span style={{ x, y }} className={cls} ref={ref} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );

  if (props.href !== undefined) {
    return props.external ? (
      <a href={props.href} target="_blank" rel="noopener noreferrer" className="inline-flex">{content}</a>
    ) : (
      <Link href={props.href} className="inline-flex">{content}</Link>
    );
  }
  return (
    <button type={props.type ?? "button"} onClick={props.onClick} disabled={props.disabled} className="inline-flex rounded-md">
      {content}
    </button>
  );
}
