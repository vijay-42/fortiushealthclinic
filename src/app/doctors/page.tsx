import { ArrowRight, Award, CalendarCheck, GraduationCap, MapPin, MessageCircle, Phone, UserRound } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { aboutFaqs, accolade, certificates, doctor, site, team, whatsappLink } from "@/content/site";
import { treatments } from "@/content/treatments";
import { PageHero } from "@/components/sections/page-hero";
import { BookButton } from "@/components/interactive/booking";
import { FaqList } from "@/components/ui/faq";
import { Icon } from "@/components/ui/icon";
import { JsonLd } from "@/components/ui/json-ld";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Dr. Mujahid Jameel — Sexologist in Bangalore | Our Doctors",
  description:
    "Meet Dr. Mujahid Jameel (MD(AM) BUMS, DAF, CHEF, PGDYT), founder and chief sexologist at Fortius Health Clinic, Bangalore — 13+ years treating ED, STD, infertility, circumcision and more.",
  alternates: { canonical: "/doctors" },
};

// Areas named in Dr. Jameel's bio and FAQ on the live site.
const focus = ["erectile-dysfunction", "std", "circumcision", "infertility-azoospermia", "male-infertility", "couple-problems"];

const facts = [
  { value: "13+", label: "Years of experience" },
  { value: "2009", label: "Practice established" },
  { value: "10K+", label: "Patients treated" },
  { value: "10+", label: "Countries served" },
];

export default function DoctorsPage() {
  const specialities = focus.map((s) => treatments.find((t) => t.slug === s)!).filter(Boolean);
  const others = team.filter((m) => m.name !== doctor.name);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: doctor.name,
          description: doctor.long,
          image: `${site.url}${doctor.image}`,
          medicalSpecialty: "Sexual health",
          hasCredential: doctor.credentials,
          award: ["Most Trusted Sexologist of the Year — IBARC Asia International", "Best Sexologist — Asia Today"],
          telephone: site.phone.tel,
          worksFor: { "@type": "MedicalClinic", name: site.name, url: site.url },
        }}
      />

      <PageHero
        eyebrow="Our Doctors"
        title="Dr. Mujahid Jameel"
        text={`${doctor.role} · ${doctor.credentials}`}
        image="/images/gallery/interior-4.jpg"
        crumbs={[{ label: "About", href: "/about" }, { label: "Our Doctors" }]}
      >
        <div className="flex flex-wrap gap-3">
          <BookButton className="inline-flex h-12 items-center gap-2 rounded-md bg-lime px-6 font-semibold text-white transition hover:bg-lime-700">
            <CalendarCheck className="size-4" /> Book with Dr. Jameel
          </BookButton>
          <a href={whatsappLink("Hi Fortius, I'd like an appointment with Dr. Mujahid Jameel.")} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center gap-2 rounded-md border border-white/20 px-6 font-semibold transition hover:border-lime-300 hover:text-lime-300">
            <MessageCircle className="size-4" /> WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Profile */}
      <section className="py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[22rem_1fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <div className="relative mx-auto aspect-square w-64 overflow-hidden rounded-full ring-1 ring-line lg:w-full">
                <Image src={doctor.image} alt={doctor.name} fill sizes="(min-width:1024px) 22rem, 90vw" className="object-cover" />
              </div>
              <div className="mt-5 rounded-xl border border-line p-5">
                <p className="font-semibold">{doctor.name}</p>
                <p className="text-sm text-muted">{doctor.role}</p>
                <p className="mt-3 flex items-start gap-2 text-sm"><GraduationCap className="mt-0.5 size-4 shrink-0 text-lime-700" /> {doctor.credentials}</p>
                <div className="mt-5 grid gap-2">
                  <BookButton className="flex h-11 items-center justify-center gap-2 rounded-md bg-lime-700 text-sm font-semibold text-white transition hover:bg-lime-800">
                    <CalendarCheck className="size-4" /> Book appointment
                  </BookButton>
                  <a href={`tel:${site.phone.tel}`} className="flex h-11 items-center justify-center gap-2 rounded-md border border-line text-sm font-semibold transition hover:border-ink">
                    <Phone className="size-4" /> {site.phone.display}
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <span className="eyebrow">Profile</span>
              <h2 className="h-display mt-5 text-3xl leading-tight sm:text-4xl">A well-known sexologist in Bangalore, trusted in India and the Middle East.</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{doctor.long}</p>
              <p className="mt-4 leading-relaxed text-muted">{doctor.short}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-white p-5">
                  <p className="h-display text-3xl">{f.value}</p>
                  <p className="mt-1 text-sm text-muted">{f.label}</p>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <h3 className="h-display text-2xl">Areas of treatment</h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {specialities.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/treatments/${t.slug}`} className="group flex items-center gap-3 rounded-lg border border-line p-4 transition hover:border-ink">
                      <span className="grid size-10 shrink-0 place-items-center rounded-md bg-lime-50 text-lime-700"><Icon name={t.icon} className="size-5" /></span>
                      <span className="flex-1 font-semibold">{t.name}</span>
                      <ArrowRight className="size-4 text-muted transition group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
                <li className="flex items-center gap-3 rounded-lg border border-line p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-md bg-lime-50 text-lime-700"><UserRound className="size-5" /></span>
                  <span className="font-semibold">Pre-Marital Counselling</span>
                </li>
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <h3 className="h-display text-2xl">Awards &amp; recognition</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[["Most Trusted Sexologist of the Year", "IBARC Asia International"], ["Best Sexologist", "Asia Today"]].map(([t, by]) => (
                  <div key={t} className="flex items-start gap-3 rounded-lg bg-cream p-5">
                    <Award className="mt-0.5 size-5 shrink-0 text-orange-600" />
                    <div><p className="font-semibold">{t}</p><p className="text-sm text-muted">{by}</p></div>
                  </div>
                ))}
              </div>
              <div className="relative mt-3 aspect-[562/496] overflow-hidden rounded-lg">
                <Image src="/images/team/dr-jameel-award-clean.jpg" alt={`${doctor.name} receiving the Pride of Nation award`} fill sizes="(min-width:1024px) 50vw, 90vw" className="object-cover object-top" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{accolade.text}</p>
            </Reveal>

            <Reveal delay={0.1} className="mt-14">
              <h3 className="h-display text-2xl">Consults at</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {site.branches.map((b) => (
                  <a key={b.id} href={b.directions} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-line p-5 transition hover:border-ink">
                    <p className="flex items-center gap-2 font-semibold"><MapPin className="size-4 text-lime-700" /> {b.name} <span className="text-xs font-normal text-muted">· {b.label}</span></p>
                    <p className="mt-2 text-sm text-muted">{b.address}</p>
                    <p className="mt-2 text-sm font-semibold">{b.phone.display}</p>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Certificates */}
      <section className="border-y border-line bg-cream py-14">
        <div className="container-x mb-8 flex items-end justify-between gap-4">
          <h2 className="h-display text-2xl sm:text-3xl">Certificates</h2>
          <Link href="/awards" className="text-sm font-semibold underline underline-offset-4">View all awards</Link>
        </div>
        <Marquee duration={40}>
          {certificates.map((c) => (
            <div key={c.src} className="relative h-36 w-52 shrink-0 overflow-hidden rounded-lg border border-line bg-white sm:h-40 sm:w-56">
              <Image src={c.src} alt={c.alt} fill sizes="230px" className="object-contain p-3" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Team */}
      {others.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <span className="eyebrow">Our team</span>
              <h2 className="h-display mt-5 text-3xl sm:text-4xl">Best Counselor Teams</h2>
              <p className="mt-4 text-muted">Qualified Doctors for your service always, in order to make your process success.</p>
            </Reveal>
            <Stagger className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((m) => (
                <RevealItem key={m.name}>
                  <div className="flex items-center gap-4 rounded-xl border border-line p-5">
                    <span className="grid size-16 shrink-0 place-items-center rounded-full bg-cream text-lime-700"><UserRound className="size-7" strokeWidth={1.5} /></span>
                    <div><p className="font-semibold">{m.name}</p><p className="text-sm text-muted">{m.role}</p></div>
                  </div>
                </RevealItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* FAQs */}
      <section id="faqs" className="bg-cream py-20 lg:py-28">
        <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: aboutFaqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <span className="eyebrow">FAQs</span>
            <h2 className="h-display mt-5 text-3xl sm:text-4xl">Questions about consulting a sexologist</h2>
            <BookButton className="mt-8 inline-flex h-12 items-center gap-2 rounded-md bg-lime-700 px-6 font-semibold text-white transition hover:bg-lime-800">
              <CalendarCheck className="size-4" /> Book a confidential consultation
            </BookButton>
          </Reveal>
          <Reveal delay={0.1}><FaqList faqs={aboutFaqs} /></Reveal>
        </div>
      </section>
    </>
  );
}
