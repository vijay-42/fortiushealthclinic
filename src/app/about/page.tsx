import { CalendarCheck, GraduationCap, Globe2 } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { about, aboutFaqs, doctor, stats, videoTestimonials } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { FaqEnquiry } from "@/components/sections/faq-enquiry";
import { DoctorSpotlight } from "@/components/sections/doctor-spotlight";
import { BookButton } from "@/components/interactive/booking";
import { Counter } from "@/components/ui/counter";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { JsonLd } from "@/components/ui/json-ld";

export const metadata: Metadata = {
  title: "About Us — Best Sexologist in Bangalore",
  description: "Fortius Health Clinic, founded by award-winning sexologist Dr. Mujahid Jameel — 13+ years treating men’s sexual health for patients from India and the Middle East.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Physician", name: doctor.name, description: doctor.long, image: doctor.image, medicalSpecialty: "Sexual health", worksFor: { "@type": "MedicalClinic", name: "Fortius Health Clinic" } }} />
      <PageHero eyebrow="Best Sex Doctor In Bangalore" title={<>Best Sexologist <span className="text-white/50">in Bangalore</span></>} text={about.homeIntro[1]} image="/images/gallery/exterior-1.jpg" crumbs={[{ label: "About Us" }]} />

      <section className="py-24 lg:py-32">
        <div className="container-x grid items-center gap-16 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image src="/images/gallery/interior-4.jpg" alt="Fortius clinic lounge" fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover" />
            </div>
            <div className="absolute -right-4 -bottom-8 w-2/5 overflow-hidden rounded-lg border-8 border-white shadow-lift sm:-right-8">
              <div className="relative aspect-square"><Image src="/images/gallery/interior-1.jpg" alt="Fortius pharmacy" fill sizes="20vw" className="object-cover" /></div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <span className="eyebrow">Our success</span>
            <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">{about.pageTitle}</h2>
            {about.pageText.map((p) => <p key={p} className="mt-5 leading-relaxed text-muted">{p}</p>)}
          </Reveal>
        </div>

        <div className="container-x mt-24">
          <Stagger className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {stats.map((s, i) => (
              <RevealItem key={s.label}>
                <div className={i % 2 ? "rounded-xl border border-line bg-cream p-8" : "rounded-xl bg-block p-8 text-ink"}>
                  <p className="h-display text-5xl sm:text-6xl"><Counter value={s.value} suffix={s.suffix} decimals={s.decimals} /></p>
                  <p className={i % 2 ? "mt-2 font-semibold text-muted" : "mt-2 font-semibold text-white/60"}>{s.label}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section id="founder" className="scroll-mt-28 bg-cream py-24 lg:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <span className="eyebrow">Founder</span>
            <h2 className="h-display mt-5 text-5xl leading-none sm:text-6xl">{doctor.name}</h2>
            <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold"><GraduationCap className="size-4 text-lime-700" /> {doctor.credentials}</p>
            <p className="mt-6 text-lg leading-relaxed text-muted">{doctor.long}</p>
            <p className="mt-6 flex items-center gap-2 font-semibold"><Globe2 className="size-5 text-lime-700" /> Serving patients across India &amp; the Middle East</p>
            <BookButton className="mt-8 inline-flex h-14 items-center gap-2 rounded-md bg-lime-700 px-7 font-semibold text-white transition hover:bg-lime hover:text-white">
              <CalendarCheck className="size-5" /> Book an Appointment
            </BookButton>
          </Reveal>
          <Reveal delay={0.15} className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl bg-lime" />
            <div className="relative aspect-square overflow-hidden rounded-xl">
              <Image src={doctor.image} alt={doctor.name} fill sizes="(min-width:1024px) 30vw, 80vw" className="object-cover" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <span className="eyebrow">Video testimonial</span>
            <h2 className="h-display mt-5 text-4xl sm:text-5xl">What patients say about <span className="text-muted">Fortius</span></h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-6 md:grid-cols-2">
            {videoTestimonials.map((t) => <RevealItem key={t.name}><TestimonialCard t={t} /></RevealItem>)}
          </Stagger>
        </div>
      </section>

      <DoctorSpotlight />
      <FaqEnquiry faqs={aboutFaqs} />
    </>
  );
}
