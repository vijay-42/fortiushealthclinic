"use client";

import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const ease = [0.16, 1, 0.3, 1] as const;

export function PageHero({
  eyebrow, title, text, image, crumbs = [], children,
}: {
  eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; image?: string; crumbs?: { label: string; href?: string }[]; children?: React.ReactNode;
}) {
  return (
    <section className="relative -mt-[4.5rem] overflow-hidden bg-block pt-36 pb-20 text-ink lg:pt-44 lg:pb-28">
      {image && (
        <motion.div initial={{ scale: 1.1, opacity: 0 }} animate={{ scale: 1, opacity: 0.35 }} transition={{ duration: 1.6, ease }} className="absolute inset-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover" />
        </motion.div>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-block via-block/90 to-block/60" />
      <div className="container-x relative">
        <motion.nav initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }} aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          <Link href="/" className="hover:text-lime-700">Home</Link>
          {crumbs.map((c) => (
            <span key={c.label} className="flex items-center gap-1.5">
              <ChevronRight className="size-3.5" />
              {c.href ? <Link href={c.href} className="hover:text-lime-700">{c.label}</Link> : <span className="text-ink">{c.label}</span>}
            </span>
          ))}
        </motion.nav>
        {eyebrow && (
          <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1, ease }} className="eyebrow mt-8">{eyebrow}</motion.span>
        )}
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15, ease }} className="h-display mt-5 max-w-4xl text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
          {title}
        </motion.h1>
        {text && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease }} className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{text}</motion.p>
        )}
        {children && <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.35, ease }} className="mt-9">{children}</motion.div>}
      </div>
    </section>
  );
}
