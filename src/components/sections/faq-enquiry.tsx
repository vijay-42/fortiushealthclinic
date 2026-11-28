import Image from "next/image";
import type { Faq } from "@/content/site";
import { FaqList } from "@/components/ui/faq";
import { Reveal } from "@/components/ui/reveal";
import { EnquiryForm } from "@/components/interactive/enquiry-form";
import { JsonLd } from "@/components/ui/json-ld";

export function FaqEnquiry({ faqs }: { faqs: Faq[] }) {
  return (
    <section id="faqs" className="bg-cream py-24 lg:py-32">
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
      <div className="container-x grid gap-14 lg:grid-cols-2">
        <div>
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">Frequently Asked <span className="text-gradient">Questions</span></h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-10"><FaqList faqs={faqs} /></Reveal>
        </div>
        <Reveal delay={0.15} id="enquiry">
          <div className="relative overflow-hidden rounded-xl bg-block p-7 sm:p-10">
            <div className="relative flex items-center gap-4">
              <Image src="/images/team/reception-team.png" alt="" width={80} height={80} className="size-16 rounded-lg object-cover" />
              <div>
                <p className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">Enquiry form</p>
                <h2 className="h-display mt-1 text-3xl text-ink sm:text-4xl">Ready to get started with Fortius</h2>
              </div>
            </div>
            <div className="relative mt-8"><EnquiryForm source="home-enquiry" /></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
