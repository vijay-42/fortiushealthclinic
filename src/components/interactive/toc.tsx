"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return <motion.div style={{ scaleX }} className="fixed inset-x-0 top-0 z-[60] h-1 origin-left bg-gradient-to-r from-lime to-orange" />;
}

export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);
  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter(Boolean) as HTMLElement[];
    const obs = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (vis[0]) setActive(vis[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((e) => obs.observe(e));
    return () => obs.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page">
      <p className="text-xs font-bold tracking-[0.14em] text-muted uppercase">On this page</p>
      <ul className="relative mt-4 grid gap-1 border-l border-line">
        {items.map((i) => (
          <li key={i.id} className="relative">
            {active === i.id && <motion.span layoutId="toc-bar" className="absolute top-0 -left-px h-full w-0.5 bg-lime-700" />}
            <a href={`#${i.id}`} className={cn("block py-1.5 pl-4 text-sm leading-snug transition", active === i.id ? "font-bold text-ink" : "text-muted hover:text-ink")}>
              {i.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
