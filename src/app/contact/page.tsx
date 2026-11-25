import { MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";
import { site, whatsappLink } from "@/content/site";
import { PageHero } from "@/components/sections/page-hero";
import { Branches } from "@/components/sections/branches";
import { EnquiryForm } from "@/components/interactive/enquiry-form";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = { title: "Contact — Famous Sexologist in Bangalore, Dr. Mujahid Jameel", description: "Contact Fortius Health Clinic — Clarke Road, Richards Town and HSR Layout, Bangalore. Call +91 99008 48660 or book online.", alternates: { canonical: "/contact" } };

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Get in touch" title={<>Famous Sexologist in Bangalore — <span className="text-white/50">Dr. Mujahid Jameel</span></>} image="/images/gallery/exterior-6.jpg" crumbs={[{ label: "Contact" }]}>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${site.phone.tel}`} className="inline-flex h-14 items-center gap-2 rounded-md bg-lime px-7 font-bold text-white"><Phone className="size-5" /> {site.phone.display}</a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex h-14 items-center gap-2 rounded-md border border-white/20 px-7 font-semibold"><MessageCircle className="size-5" /> WhatsApp</a>
        </div>
      </PageHero>
      <section id="form" className="scroll-mt-28 pt-20 lg:pt-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">Send message</span>
            <h2 className="h-display mt-5 text-4xl sm:text-5xl">We’re here to <span className="text-muted">listen</span></h2>
            <p className="mt-5 text-lg text-muted">Share as much or as little as you like. Every enquiry is handled discreetly by our clinical team.</p>
          </Reveal>
          <Reveal delay={0.1} className="rounded-xl border border-line bg-white p-6 shadow-soft sm:p-10"><EnquiryForm source="contact-page" /></Reveal>
        </div>
      </section>
      <Branches heading={false} />
    </>
  );
}
