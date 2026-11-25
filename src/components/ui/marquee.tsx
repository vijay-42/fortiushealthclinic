import { cn } from "@/lib/utils";

/** CSS-only infinite marquee. Pauses on hover. */
export function Marquee({ children, reverse, duration = 60, className }: { children: React.ReactNode; reverse?: boolean; duration?: number; className?: string }) {
  return (
    <div className={cn("group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]", className)}>
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 animate-marquee items-stretch gap-6 pr-6 group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: `${duration}s`, animationDirection: reverse ? "reverse" : "normal" }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
