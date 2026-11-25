import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow, title, text, align = "left", dark = false, className, titleClassName, as: H = "h2",
}: {
  eyebrow?: string; title: React.ReactNode; text?: React.ReactNode; align?: "left" | "center"; dark?: boolean; className?: string; titleClassName?: string; as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <span className={dark ? "eyebrow-dark" : "eyebrow"}>{eyebrow}</span>}
      <H className={cn("h-display mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-[3.5rem]", dark ? "text-white" : "text-ink", titleClassName)}>{title}</H>
      {text && <p className={cn("mt-5 text-lg leading-relaxed", dark ? "text-white/70" : "text-muted")}>{text}</p>}
    </Reveal>
  );
}
