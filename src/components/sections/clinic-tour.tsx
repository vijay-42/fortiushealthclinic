"use client";

import { motion, useScroll, useSpring } from "motion/react";
import { ArrowLeft, ArrowRight, Hand } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { SectionHeading } from "@/components/ui/section-heading";

const stops = [
  { src: "/images/gallery/exterior-2.jpg", title: "Welcome to Fortius", text: "Easy to find, with the clinic and pharmacy under one roof." },
  { src: "/images/hero/reception.jpg", title: "Reception", text: "A calm front desk where our team greets you discreetly." },
  { src: "/images/gallery/interior-3.jpg", title: "Private corridor", text: "Consultation rooms sit away from the waiting area." },
  { src: "/images/gallery/interior-2.jpg", title: "Patient lounge", text: "Comfortable, spaced-out seating so you can wait in peace." },
  { src: "/images/gallery/interior-1.jpg", title: "In-house pharmacy", text: "Collect your prescribed medicines before you leave." },
  { src: "/images/gallery/interior-7.jpg", title: "In-clinic tests", text: "Many assessments are done right here, the same day." },
  { src: "/images/gallery/interior-4.jpg", title: "Quiet seating", text: "A quiet corner to relax before or after your consultation." },
  { src: "/images/gallery/exterior-4.jpg", title: "Open into the evening", text: "Convenient for appointments after work." },
];

export function ClinicTour() {
  const track = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: track });
  const progress = useSpring(scrollXProgress, { stiffness: 160, damping: 30 });
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);

  const go = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 320) + 20), behavior: "smooth" });
  };

  const onDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !track.current) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
    track.current.style.scrollSnapType = "none";
  };
  const onMove = (e: React.PointerEvent) => {
    if (!drag.current || !track.current) return;
    const dx = e.clientX - drag.current.x;
    if (Math.abs(dx) > 4) drag.current.moved = true;
    track.current.scrollLeft = drag.current.left - dx;
  };
  const onUp = () => {
    if (!track.current) return;
    track.current.style.scrollSnapType = "";
    drag.current = null;
  };

  return (
    <section className="overflow-hidden bg-lime-50 py-24 lg:py-32">
      <div className="container-x flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Clinic tour" title={<>Step inside <span className="text-accent">before you visit</span></>} text="Knowing where you’re going makes the first visit easier. Take a quick look around our clinic." />
        <div className="flex items-center gap-3">
          <span className="mr-2 hidden items-center gap-2 text-sm font-semibold text-muted sm:flex"><Hand className="size-4" /> Drag to explore</span>
          {([-1, 1] as const).map((d) => (
            <motion.button key={d} type="button" whileTap={{ scale: 0.92 }} onClick={() => go(d)} aria-label={d < 0 ? "Previous photo" : "Next photo"}
              className="grid size-12 place-items-center rounded-full border border-ink/15 bg-white transition hover:border-lime-700 hover:bg-lime-700 hover:text-white">
              {d < 0 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
            </motion.button>
          ))}
        </div>
      </div>

      <div
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        className="no-scrollbar mt-12 flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 select-none active:cursor-grabbing"
        style={{ paddingInline: "var(--edge)", scrollPaddingInline: "var(--edge)", ["--edge" as string]: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))" }}
      >
        {stops.map((s, i) => (
          <motion.figure
            key={s.src}
            data-card
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, delay: Math.min(i, 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group w-[78vw] shrink-0 snap-start sm:w-[22rem]"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-mist">
              <Image src={s.src} alt={s.title} fill draggable={false} sizes="(min-width:640px) 352px, 78vw" className="object-cover transition duration-700 group-hover:scale-105" />
              <span className="absolute top-4 left-4 rounded-md bg-white px-2.5 py-1 text-xs font-bold text-lime-700">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <figcaption className="mt-4">
              <p className="text-lg font-bold">{s.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.text}</p>
            </figcaption>
          </motion.figure>
        ))}
        <span aria-hidden className="w-1 shrink-0" />
      </div>

      <div className="container-x mt-8">
        <div className="h-1 overflow-hidden rounded-full bg-ink/10">
          <motion.div style={{ scaleX: progress }} className="h-full origin-left rounded-full bg-lime" />
        </div>
      </div>
    </section>
  );
}
