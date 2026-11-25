import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { treatments } from "@/content/treatments";
import { Icon } from "@/components/ui/icon";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const featured = ["erectile-dysfunction", "infertility-azoospermia", "couple-problems", "premature-ejaculation", "male-infertility", "low-testosterone"];

export function ServicesGrid() {
  const items = featured.map((s) => treatments.find((t) => t.slug === s)!);
  return (
    <section className="relative bg-cream py-24 lg:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading eyebrow="Services" title={<>We’re more than just a helpful <span className="text-muted">service clinic</span></>} />
          <Button href="/treatments" variant="outline">All 17 treatments <ArrowUpRight className="size-4" /></Button>
        </div>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <RevealItem key={t.slug} className={cn(i === 0 && "md:col-span-2 lg:col-span-1 lg:row-span-3", i === items.length - 1 && "lg:col-span-2")}>
              <Link
                href={`/treatments/${t.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-lift sm:p-8",
                  i === 0 ? "bg-ink text-white" : "bg-white",
                )}
              >
                <div className="flex items-start justify-between">
                  <span className={cn("grid size-14 place-items-center rounded-lg transition-all duration-500 group-hover:rotate-[-8deg] group-hover:scale-110", i === 0 ? "bg-lime text-white" : "bg-lime-50 text-lime-800 group-hover:bg-lime group-hover:text-white")}>
                    <Icon name={t.icon} className="size-6" />
                  </span>
                  <span className={cn("grid size-11 place-items-center rounded-full border transition-all duration-500 group-hover:rotate-45", i === 0 ? "border-white/20 group-hover:bg-lime group-hover:text-white" : "border-line group-hover:border-ink group-hover:bg-ink group-hover:text-white")}>
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <h3 className={cn("h-display mt-8 text-2xl sm:text-[1.7rem]", i === 0 && "sm:text-4xl")}>{t.name}</h3>
                <p className={cn("mt-3 leading-relaxed", i === 0 ? "text-white/70" : "text-muted", i !== 0 && "line-clamp-4")}>{t.summary}</p>
                {i === 0 && (
                  <div className="mt-auto pt-10">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image src="/images/conditions/ed-portrait.jpg" alt="" fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    </div>
                  </div>
                )}
              </Link>
            </RevealItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
