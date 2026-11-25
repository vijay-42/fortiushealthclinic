import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { conditionsShowcase } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { TreatmentExplorer } from "@/components/interactive/treatment-explorer";
import { CareFinder } from "@/components/sections/care-finder";

export const metadata: Metadata = {
  title: "Treatments & Services",
  description: "Explore men’s sexual health and fertility treatments at Fortius Health Clinic, Bangalore — erectile dysfunction, premature ejaculation, male infertility, varicocele, circumcision and more.",
  alternates: { canonical: "/treatments" },
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHero
        eyebrow="Treatments & Services"
        title={<>Care for every aspect of <span className="text-lime">men’s sexual health</span></>}
        text={conditionsShowcase.text}
        image="/images/gallery/interior-3.jpg"
        crumbs={[{ label: "Treatments" }]}
      >
        <Link href="#care-finder" className="inline-flex h-12 items-center gap-2 rounded-full bg-white/10 px-6 font-semibold backdrop-blur transition hover:bg-lime hover:text-ink">
          Not sure? Use the Care Finder <ArrowRight className="size-4" />
        </Link>
      </PageHero>
      <section className="py-16 lg:py-24">
        <div className="container-x"><TreatmentExplorer /></div>
      </section>
      <CareFinder />
    </>
  );
}
