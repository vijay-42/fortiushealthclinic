import type { Metadata } from "next";
import { testimonials, videoTestimonials } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { RevealItem, Stagger } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { BookButton } from "@/components/interactive/booking";

export const metadata: Metadata = { title: "Patient Testimonials", description: "Read what patients from Bangalore, Mumbai, Dubai, Bahrain and Egypt say about their treatment at Fortius Health Clinic.", alternates: { canonical: "/testimonials" } };

export default function TestimonialsPage() {
  const all = [...testimonials, ...videoTestimonials];
  return (
    <>
      <PageHero eyebrow="Testimonial" title={<>Let’s see what our patients <span className="text-white/50">say about us</span></>} text="Real stories from men and couples who trusted Fortius with their health." image="/images/gallery/interior-3.jpg" crumbs={[{ label: "Testimonials" }]}>
        <BookButton className="inline-flex h-12 items-center rounded-md bg-lime px-6 font-bold text-white">Start your own story</BookButton>
      </PageHero>
      <section className="py-16 lg:py-24">
        <Stagger className="container-x columns-1 gap-5 md:columns-2 lg:columns-3" gap={0.05}>
          {all.map((t) => <RevealItem key={t.name} className="mb-5 break-inside-avoid"><TestimonialCard t={t} /></RevealItem>)}
        </Stagger>
      </section>
    </>
  );
}
