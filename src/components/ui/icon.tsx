import {
  Activity, Baby, BadgeCheck, GitBranch, Gauge, HeartHandshake, HeartPulse, Hourglass, Leaf,
  Maximize2, Microscope, MonitorX, Scissors, ShieldCheck, ShieldPlus, Siren, Spline, Timer, Users,
  Waves, Zap, type LucideIcon, type LucideProps,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Activity, Baby, BadgeCheck, GitBranch, Gauge, HeartHandshake, HeartPulse, Hourglass, Leaf,
  Maximize2, Microscope, MonitorX, Scissors, ShieldCheck, ShieldPlus, Siren, Spline, Timer, Users,
  Waves, Zap,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = map[name] ?? Activity;
  return <C aria-hidden {...props} />;
}
