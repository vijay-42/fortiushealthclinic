"use client";

import { ArrowRight, CalendarCheck, RotateCw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { useBooking } from "@/components/interactive/booking";
import { cn } from "@/lib/utils";

type Props = { slug: string; name: string; category: string; icon: string; image?: string; summary: string };

/** Treatment card that flips on hover (desktop) or tap (touch) to reveal details and actions. */
export function FlipCard({ slug, name, category, icon, image, summary }: Props) {
  const [flipped, setFlipped] = useState(false);
  const { open } = useBooking();

  return (
    <div className="group h-[25rem] [perspective:1400px]">
      <div
        className={cn(
          "relative size-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] [transform-style:preserve-3d]",
          "[@media(hover:hover)]:group-hover:[transform:rotateY(180deg)]",
          flipped && "[transform:rotateY(180deg)]",
        )}
      >
        {/* Front */}
        <button
          type="button"
          onClick={() => setFlipped(true)}
          aria-label={`Show details about ${name}`}
          className="absolute inset-0 overflow-hidden rounded-xl bg-mist text-left shadow-soft [backface-visibility:hidden]"
        >
          {image && <Image src={image} alt="" fill sizes="(min-width:1024px) 30vw, (min-width:768px) 45vw, 90vw" className="object-cover" />}
          <span className="absolute top-4 right-4 grid size-11 place-items-center rounded-full bg-white text-lime-700 shadow-soft"><RotateCw className="size-4" /></span>
          <span className="absolute inset-x-3 bottom-3 rounded-lg bg-white p-5">
            <span className="flex items-center gap-3">
              <span className="grid size-11 shrink-0 place-items-center rounded-md bg-lime-50 text-lime-700"><Icon name={icon} className="size-5" /></span>
              <span>
                <span className="block text-[0.7rem] font-bold tracking-[0.14em] text-orange-600 uppercase">{category}</span>
                <span className="h-display block text-xl leading-tight">{name}</span>
              </span>
            </span>
          </span>
        </button>

        {/* Back */}
        <div className="absolute inset-0 flex flex-col rounded-xl bg-block p-7 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex items-start justify-between">
            <span className="grid size-12 place-items-center rounded-lg bg-lime text-white"><Icon name={icon} className="size-6" /></span>
            <button type="button" onClick={() => setFlipped(false)} className="text-sm font-semibold text-muted underline-offset-4 hover:underline [@media(hover:hover)]:hidden">Back</button>
          </div>
          <h3 className="h-display mt-5 text-2xl">{name}</h3>
          <p className="mt-3 line-clamp-6 text-[0.95rem] leading-relaxed text-ink-soft">{summary}</p>
          <div className="mt-auto flex flex-wrap gap-2 pt-5">
            <button type="button" onClick={() => open({ concern: slug })} className="inline-flex h-11 items-center gap-2 rounded-md bg-lime-700 px-4 text-sm font-semibold text-white transition hover:bg-lime-800">
              <CalendarCheck className="size-4" /> Book
            </button>
            <Link href={`/treatments/${slug}`} className="inline-flex h-11 items-center gap-2 rounded-md border border-ink/20 bg-white px-4 text-sm font-semibold transition hover:border-lime-700 hover:text-lime-700">
              Learn more <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
