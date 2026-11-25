import { Quote } from "lucide-react";
import type { Testimonial } from "@/content/site";
import { cn, initials } from "@/lib/utils";

export function TestimonialCard({ t, className, dark }: { t: Testimonial; className?: string; dark?: boolean }) {
  return (
    <figure className={cn("flex h-full flex-col rounded-xl p-7", dark ? "bg-white/5 text-white ring-1 ring-white/10" : "bg-white shadow-soft ring-1 ring-line", className)}>
      <Quote className={cn("size-8", dark ? "text-lime-300" : "text-lime-600")} />
      <blockquote className={cn("mt-4 flex-1 leading-relaxed", dark ? "text-white/80" : "text-ink-soft")}>“{t.quote}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className={cn("grid size-11 place-items-center rounded-full text-sm font-bold", dark ? "bg-lime text-white" : "bg-ink text-lime-300")}>{initials(t.name)}</span>
        <span className="flex-1">
          <span className="block font-bold">{t.name}</span>
          {t.place && <span className={cn("text-sm", dark ? "text-white/50" : "text-muted")}>{t.place}</span>}
        </span>
        {t.tag && <span className={cn("rounded-md px-3 py-1 text-xs font-semibold", dark ? "bg-white/10 text-white/70" : "bg-lime-50 text-lime-800")}>{t.tag}</span>}
      </figcaption>
    </figure>
  );
}
