import { ArrowRight } from "lucide-react";
import { testimonials } from "@/content/site";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Button } from "@/components/ui/button";

export function TestimonialsMarquee() {
  const a = testimonials.filter((_, i) => i % 2 === 0);
  const b = testimonials.filter((_, i) => i % 2 === 1);
  return (
    <section className="relative overflow-hidden bg-block py-24 text-ink lg:py-32">
      <div className="container-x relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
        <SectionHeading eyebrow="Testimonial" title={<>What patients say <span className="text-gradient">about Fortius</span></>} />
        <Button href="/testimonials" variant="light">Read all stories <ArrowRight className="size-4" /></Button>
      </div>
      <div className="relative mt-14 grid gap-6">
        <Marquee duration={90}>
          {a.map((t) => <TestimonialCard key={t.name} t={t} className="w-[22rem] shrink-0 sm:w-[26rem]" />)}
        </Marquee>
        <Marquee duration={100} reverse>
          {b.map((t) => <TestimonialCard key={t.name} t={t} className="w-[22rem] shrink-0 sm:w-[26rem]" />)}
        </Marquee>
      </div>
    </section>
  );
}
