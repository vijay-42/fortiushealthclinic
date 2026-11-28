import { ArrowUpRight } from "lucide-react";
import { categories, treatments } from "@/content/treatments";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { FlipCard } from "@/components/interactive/flip-card";

const featured = ["erectile-dysfunction", "infertility-azoospermia", "couple-problems", "premature-ejaculation", "male-infertility", "low-testosterone"];

const servicesIntro =
  "At Fortius Health Clinic, we understand the impact of male sexual health concerns on overall well-being. Our experienced team, including a trusted sexologist in Bangalore, provides personalized care for conditions such as erectile dysfunction, premature ejaculation, and male infertility. As a dedicated sexual health clinic in Bangalore, we focus on comprehensive assessments, holistic care, and tailored solutions. Our goal is to provide effective sexual health treatment in Bangalore, helping you restore confidence, improve sexual wellness, and enhance your quality of life through compassionate, patient-focused care.";

export function ServicesGrid() {
  const items = featured.map((s) => treatments.find((t) => t.slug === s)!);
  return (
    <section className="relative overflow-hidden bg-cream py-24 lg:py-32">
      <div className="container-x relative">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
          <SectionHeading eyebrow="Services" title={<>Male Sexual Health Services at Fortius Health Clinic – <span className="text-accent">Trusted Sexologist in Bangalore</span></>} titleClassName="lg:text-[2.6rem]! lg:leading-[1.1]!" />
          <Reveal delay={0.1}>
            <p className="leading-relaxed text-muted">{servicesIntro}</p>
            <div className="mt-6"><Button href="/treatments" variant="outline">All 17 treatments <ArrowUpRight className="size-4" /></Button></div>
          </Reveal>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <RevealItem key={t.slug}>
              <FlipCard slug={t.slug} name={t.name} category={categories.find((c) => c.id === t.category)?.label ?? ""} icon={t.icon} image={t.image} summary={t.summary} />
            </RevealItem>
          ))}
        </Stagger>
        <p className="mt-6 text-center text-sm text-muted">Hover or tap a card to see how we help.</p>
      </div>
    </section>
  );
}
