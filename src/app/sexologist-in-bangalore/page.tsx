import {
  ArrowRight, BadgeCheck, CalendarCheck, Check, ChartNoAxesColumnIncreasing, Lock, MapPin, Mail, Phone, ShieldCheck, Star, Stethoscope, UserCheck, Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { doctor, gallery, site, testimonials, whatsappLink } from "@/content/site";
import type { Faq } from "@/content/site";
import { BookButton } from "@/components/interactive/booking";
import { BannerSlider } from "@/components/interactive/banner-slider";
import { EnquiryForm } from "@/components/interactive/enquiry-form";
import { Accolades } from "@/components/sections/accolades";
import { FaqList } from "@/components/ui/faq";
import { JsonLd } from "@/components/ui/json-ld";
import { Marquee } from "@/components/ui/marquee";
import { Reveal, RevealItem, Stagger } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export const metadata: Metadata = {
  title: "Sexologist in Bangalore — Trusted Sexual Health Clinic | Fortius",
  description:
    "Consult an experienced sexologist in Bangalore at Fortius Health Clinic. Confidential, personalised treatment for erectile dysfunction, premature ejaculation, male infertility, STDs and more.",
  alternates: { canonical: "/sexologist-in-bangalore" },
};

const banners = [
  { src: "/images/lp/hero-banner-5.webp", alt: "Struggling with erectile dysfunction? Regain confidence and reignite intimacy with expert guidance", concern: "erectile-dysfunction" },
  { src: "/images/lp/hero-banner-1.webp", alt: "Stay safe, stay informed — comprehensive testing and solutions for STIs, HIV and HSV", concern: "std" },
  { src: "/images/lp/hero-banner-2.webp", alt: "Breaking free from porn addiction — reclaim control and build a healthier intimate life", concern: "porn-addiction" },
  { src: "/images/lp/hero-banner-4.webp", alt: "Revive and elevate your relationship — solutions for foreplay, lasting longer, sexless marriages and more", concern: "couple-problems" },
  { src: "/images/lp/hero-banner-3.webp", alt: "Mindful masturbation for a balanced life", concern: "general" },
  { src: "/images/lp/hero-banner-6.webp", alt: "Explore, discover, indulge — your journey to fulfilling sexual wellness begins here", concern: "general" },
];

const trust = [
  { value: "10K+", label: "Patients" },
  { value: "13+", label: "Years of experience" },
  { value: "4.1/5", label: "Overall rating" },
  { value: "98%", label: "Improved result" },
];

const pillars = [
  { icon: ShieldCheck, title: "100% Confidential", text: "Private records, never shared." },
  { icon: ChartNoAxesColumnIncreasing, title: "99% Success Ratio", text: "Evidence-based, verifiable outcomes." },
  { icon: UserCheck, title: "In-clinic Expertise", text: "Face-to-face care from an experienced specialist." },
  { icon: BadgeCheck, title: "Evidence-based", text: "Treatments grounded in proven medical research." },
];

const protocol = [
  { title: "Appointment", text: "Book an appointment with hassle-free one-touch appointment." },
  { title: "Consultation", text: "Choose direct consultation at clinic." },
  { title: "Treatment", text: "After consultation, an experienced sexologist will diagnose and initiate the treatment." },
  { title: "Satisfactory Results", text: "Regular follow ups and medical support till the condition is rectified." },
];

const conditions = [
  { slug: "erectile-dysfunction", name: "Erectile Dysfunction", image: "/images/lp/erectile-dysfunction.webp", text: "Our advanced impotence treatment stimulates and improves blood circulation to ensure that the blood supply to the penis remains unhindered and consistent. This enhances the firmness and duration of erections, helping you regain control and confidence." },
  { slug: "infertility-azoospermia", name: "Infertility / Azoospermia", image: "/images/lp/infertility-azoospermia.webp", text: "Through careful monitoring of cervical mucus changes and injecting them into the body, we use innovative techniques targeting the vascular system. This male infertility treatment helps determine the root cause and effectively addresses infertility issues." },
  { slug: "premature-ejaculation", name: "Premature Ejaculation", image: "/images/lp/premature-ejaculation.webp", text: "By combining traditional methods with modern solutions, our premature ejaculation treatment offers a tailored approach to extend ejaculation duration and improve control during intercourse, providing long-term results and satisfaction." },
];

const services = [
  { slug: "male-infertility", name: "Male Infertility", text: "Male infertility is often attributed to low sperm production, irregular sperm function, and physical blockages that hinder sperm delivery. Contributing factors may include lifestyle choices, chronic health issues, and past injuries. At our sexologist clinic, we offer a range of customized treatments designed to meet your unique needs, ensuring you receive the highest quality care." },
  { slug: "erectile-dysfunction", name: "Erectile Dysfunction", text: "Erectile Dysfunction (ED) occurs when a male is unable to sustain or achieve an erection during sexual activities, commonly known as impotence. Our sexual dysfunction specialists are dedicated to providing effective treatment options that target underlying blood flow issues, helping you regain confidence and achieve lasting results." },
  { slug: "ejaculatory-disorders", name: "Ejaculatory Disorder", text: "Ejaculatory disorders, including premature, delayed, or retrograde ejaculation, can lead to both emotional and physical distress. Our clinic specializes in effective solutions for premature ejaculation, empowering you to take charge of your sexual health and enhancing satisfaction in your intimate relationships." },
  { slug: "varicocele", name: "Varicocele Treatment", text: "Varicocele refers to the swelling of veins within the scrotum, which can significantly impact male fertility and cause discomfort. Our expert treatments aim to improve sperm quality and alleviate any discomfort, ensuring your reproductive health is effectively restored and maintained." },
  { slug: "priapism", name: "Priapism Treatment", text: "Priapism is characterized by a prolonged and painful erection that can cause permanent damage if not addressed promptly. Our clinic provides urgent interventions to alleviate priapism, safeguarding your long-term sexual health and comfort." },
  { slug: "std", name: "STI/STD Treatment", text: "Sexually transmitted infections (STIs) and diseases (STDs) can have serious implications for your overall health. We offer comprehensive testing and treatment services to effectively manage these infections, ensuring you receive timely care and can maintain a healthy, active sexual life." },
  { slug: "peyronies-disease", name: "Peyronie’s Disease / Penile Curvature", text: "Peyronie’s disease leads to an abnormal curvature of the penis, resulting in discomfort and difficulties during intercourse. Our clinic offers innovative treatments to address penile curvature, improving both function and appearance for a more satisfying sexual experience." },
  { slug: "low-testosterone", name: "Low Testosterone / Hypogonadism", text: "Low testosterone levels, also known as hypogonadism, can lead to diminished energy, libido, and overall vitality. Our hormonal therapies are designed to restore testosterone levels, enhancing your energy, sexual desire, and overall quality of life." },
  { slug: "couple-problems", name: "Couple Problems Therapy", text: "Challenges in relationships, particularly related to sexual health and fertility, can put a strain on partnerships. Our specialized therapies for couples focus on these issues holistically, promoting improved intimacy, communication, and resolution of fertility challenges, ultimately strengthening your bond." },
];

const faqs: Faq[] = [
  { q: "When to see a doctor for erectile dysfunction?", a: "Men should consult a doctor for erectile dysfunction if it persists for more than a few weeks, affects relationships, or is accompanied by other symptoms such as pain during intercourse or changes in libido. Early intervention can help identify underlying health issues." },
  { q: "What is male sexologist called?", a: "A male sexologist is often referred to simply as a \"sexologist.\" They specialize in diagnosing and treating sexual dysfunctions and disorders, focusing on both physical and psychological aspects of sexual health." },
  { q: "What problems do sexologists treat?", a: "Sexologists treat a variety of sexual health issues, including erectile dysfunction, premature ejaculation, delayed ejaculation, low libido, sexual trauma, and difficulties with intimacy. They also address psychological factors affecting sexual performance." },
  { q: "When should a man consult a sexologist?", a: "A man should consult a sexologist when experiencing persistent sexual problems such as erectile dysfunction, premature ejaculation, or anxiety related to sexual performance. Seeking help early can improve sexual health and relationship satisfaction." },
  { q: "What is an STD doctor called?", a: "A doctor specializing in sexually transmitted diseases (STDs) is typically called an \"infectious disease specialist\" or \"urologist\" for male patients. They diagnose and treat STDs through various methods including testing and medication." },
  { q: "Should I go to a sexologist?", a: "Visiting a sexologist can be beneficial if you face sexual health issues that affect your quality of life or relationships. They provide specialized care for both physical and emotional aspects of sexual dysfunction." },
  { q: "What is the real cure for premature ejaculation?", a: "Effective treatments for premature ejaculation include behavioral techniques, topical anesthetics, and prescription medications. Consulting a healthcare provider can help tailor the right approach based on individual needs." },
  { q: "How to fix delayed ejaculation?", a: "Delayed ejaculation can be addressed through therapy to reduce anxiety, pelvic floor exercises to improve control, or medications that enhance sexual function. A healthcare professional can provide personalized recommendations." },
  { q: "What is the fastest way to cure premature ejaculation?", a: "The fastest way to manage premature ejaculation often involves behavioral techniques like the \"stop-start\" method or using desensitizing creams. Medications may also be prescribed for quicker results." },
  { q: "Can a sexologist treat STDs?", a: "While sexologists primarily focus on sexual dysfunctions, they can provide education and guidance related to STDs. However, specific treatment for STDs is usually handled by infectious disease specialists or urologists." },
];

const reviewers = ["Ganaesh Kajare", "Syed Shoaib", "Ashok Kumar", "Bisha Singh"];

function CallBand() {
  return (
    <section className="bg-lime-800 py-14 text-white">
      <div className="container-x flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <h2 className="h-display text-3xl sm:text-4xl">Your First Step Towards <span className="text-lime-200">Starting a Family</span></h2>
        <div className="flex flex-wrap gap-3">
          <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center gap-2 rounded-md bg-white px-6 font-semibold text-ink transition hover:bg-lime-50">
            <Phone className="size-4" /> {site.phone.display}
          </a>
          <BookButton className="inline-flex h-12 items-center gap-2 rounded-md border border-white/30 px-6 font-semibold transition hover:border-white">
            <CalendarCheck className="size-4" /> Book Appointment
          </BookButton>
        </div>
      </div>
    </section>
  );
}

export default function SexologistInBangalorePage() {
  const reviews = reviewers.map((n) => testimonials.find((t) => t.name === n)).filter((t) => t !== undefined);
  const hq = site.branches[0];

  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }} />

      {/* Hero + lead form */}
      <section className="relative -mt-[4.5rem] bg-cream pt-28 pb-14 lg:pt-32 lg:pb-20">
        <div className="container-x grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <Reveal>
            <span className="eyebrow">Sexual health clinic · Bangalore</span>
            <h1 className="h-display mt-5 text-[2.5rem] leading-[1.02] sm:text-6xl lg:text-[3.6rem]">
              Trusted Sexologist <span className="text-lime-700">in Bangalore</span>
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
              Confidential, personalised care from {doctor.name} — {doctor.credentials} — at Fortius Health Clinic, Richards Town &amp; HSR Layout.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <BookButton className="inline-flex h-12 items-center gap-2 rounded-md bg-lime px-6 font-semibold text-white transition hover:bg-lime-700">
                <CalendarCheck className="size-4" /> Book Appointment
              </BookButton>
              <a href={`tel:${site.phone.tel}`} className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/15 px-6 font-semibold transition hover:border-ink/40 hover:bg-white">
                <Phone className="size-4" /> {site.phone.display}
              </a>
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
              {trust.map((t) => (
                <div key={t.label} className="bg-white p-4">
                  <dt className="sr-only">{t.label}</dt>
                  <dd className="h-display text-2xl sm:text-3xl">{t.value}</dd>
                  <dd className="mt-0.5 text-xs text-muted sm:text-sm">{t.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={0.1} id="enquiry">
            <div className="rounded-xl bg-ink p-6 shadow-lift sm:p-8">
              <p className="text-xs font-bold tracking-[0.14em] text-lime-300 uppercase">Free callback</p>
              <h2 className="h-display mt-1 text-2xl text-white sm:text-3xl">Why thousands of patients trust us</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-white/60"><Lock className="size-3.5" /> Your details stay 100% confidential.</p>
              <div className="mt-6"><EnquiryForm dark source="lp-sexologist-in-bangalore" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Campaign banners */}
      <section className="pt-14 lg:pt-20">
        <div className="container-x"><Reveal><BannerSlider slides={banners} /></Reveal></div>
      </section>

      {/* About */}
      <section id="about" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <SectionHeading eyebrow="About us" title={<>Tailored Solutions for <span className="text-muted">Your Sexual Health</span></>} />
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">
                At Fortius Health Clinic, we are committed to enhancing your well-being with personalized treatments that address sexual health concerns and skin conditions. As a trusted sexologist in Bangalore and a dedicated sexual health clinic in Bangalore, our approach focuses on holistic healing, ensuring every patient receives the highest-quality sexual health treatment in Bangalore, along with herbal solutions tailored to their individual needs.
              </p>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p) => (
              <RevealItem key={p.title}>
                <div className="h-full rounded-xl border border-line p-6">
                  <span className="grid size-11 place-items-center rounded-md bg-lime-50 text-lime-700"><p.icon className="size-5" /></span>
                  <p className="mt-5 text-lg font-semibold">{p.title}</p>
                  <p className="mt-1 text-sm text-muted">{p.text}</p>
                </div>
              </RevealItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 grid gap-4 sm:grid-cols-[1.4fr_1fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-auto sm:min-h-72">
              <Image src="/images/gallery/exterior-2.jpg" alt="Fortius Health Clinic building, Richards Town" fill sizes="(min-width:640px) 58vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-cream p-7">
              <p className="leading-relaxed text-ink-soft">With years of expertise, we have built a reputation for providing effective remedies that deliver real results. Our clinic stands as a trusted name, continuously evolving with advanced techniques to help individuals regain confidence and improve their overall health.</p>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                <Image src="/images/gallery/interior-2.jpg" alt="Patient lounge at Fortius Health Clinic" fill sizes="(min-width:640px) 40vw, 100vw" className="object-cover" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Shockwave therapy */}
      <section className="bg-ink py-20 text-white lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_0.8fr_1fr] lg:items-center">
          <Reveal>
            <span className="eyebrow-dark">What is Li-ESWT?</span>
            <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">Shockwave Therapy for <span className="text-lime-300">Erectile Dysfunction</span></h2>
            <p className="mt-6 leading-relaxed text-white/70">Low-intensity shockwave therapy (Li-ESWT) is a non-surgical treatment option for erectile dysfunction caused by reduced blood flow. It uses gentle acoustic waves to support healthy blood circulation in the treated area. The procedure is non-invasive and does not require medication or downtime. Our doctors will assess whether this therapy is suitable for you during your consultation.</p>
          </Reveal>
          <Reveal delay={0.1} className="mx-auto w-full max-w-xs rounded-xl bg-white p-6">
            <div className="relative aspect-[275/392]">
              <Image src="/images/lp/ed1000-shockwave.webp" alt="ED1000 low-intensity shockwave therapy device" fill sizes="280px" className="object-contain" />
            </div>
          </Reveal>
          <Reveal delay={0.2} className="grid gap-8">
            {[
              { title: "Treatment Benefits", items: ["Works by supporting the body's natural process of forming new blood vessels", "May help men who have not responded well to oral medication", "Gentle, controlled energy levels for a comfortable treatment experience", "Non-invasive procedure with minimal discomfort"] },
              { title: "Why Patients Choose This Therapy", items: ["Drug-free treatment option", "Non-surgical, with no incisions or injections", "Short sessions with no hospital stay", "Aims to improve blood flow for longer-lasting results", "Suitability assessed by our doctor during consultation"] },
            ].map((g) => (
              <div key={g.title}>
                <h3 className="text-lg font-semibold">{g.title}</h3>
                <ul className="mt-3 grid gap-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-sm text-white/75"><Check className="mt-0.5 size-4 shrink-0 text-lime-300" /> {it}</li>
                  ))}
                </ul>
              </div>
            ))}
            <BookButton concern="erectile-dysfunction" className="inline-flex h-12 w-fit items-center gap-2 rounded-md bg-lime px-6 font-semibold text-white transition hover:bg-lime-600">
              <CalendarCheck className="size-4" /> Ask about shockwave therapy
            </BookButton>
          </Reveal>
        </div>
      </section>

      {/* Privacy & protocol */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <SectionHeading eyebrow="Our consultation protocol" title={<>Your Privacy Matters <span className="text-muted">to Us the Most</span></>} />
            <Reveal delay={0.1}><p className="flex items-start gap-3 leading-relaxed text-muted"><Lock className="mt-1 size-4 shrink-0 text-lime-700" /> Your personal information is safe &amp; secure with us, with no space for privacy breach at any cost from our clinic premises &amp; database.</p></Reveal>
          </div>
          <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {protocol.map((p, i) => (
              <RevealItem key={p.title} className="bg-white p-7">
                <span className="h-display text-4xl text-lime-700">0{i + 1}</span>
                <p className="mt-6 text-lg font-semibold">{p.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p.text}</p>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Conditions we treat */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="Treatments" title={<>Conditions <span className="text-muted">We Treat</span></>} />
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {conditions.map((c) => (
              <RevealItem key={c.slug}>
                <Link href={`/treatments/${c.slug}`} className="group flex h-full flex-col overflow-hidden rounded-xl bg-white ring-1 ring-line transition hover:shadow-lift">
                  <div className="relative aspect-[415/261] overflow-hidden">
                    <Image src={c.image} alt={c.name} fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-xl font-semibold">{c.name}</h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{c.text}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Learn more <ArrowRight className="size-4 transition group-hover:translate-x-1" /></span>
                  </div>
                </Link>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      <CallBand />

      {/* Services */}
      <section id="services" className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <SectionHeading eyebrow="Services" title={<>Male Sexual Health Services at Fortius Health Clinic – <span className="text-muted">Trusted Sexologist in Bangalore</span></>} titleClassName="lg:text-[2.6rem]! lg:leading-[1.1]!" />
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">At Fortius Health Clinic, we understand the impact of male sexual health concerns on overall well-being. Our experienced team, including a trusted sexologist in Bangalore, provides personalized care for conditions such as erectile dysfunction, premature ejaculation, and male infertility. As a dedicated sexual health clinic in Bangalore, we focus on comprehensive assessments, holistic care, and tailored solutions. Our goal is to provide effective sexual health treatment in Bangalore, helping you restore confidence, improve sexual wellness, and enhance your quality of life through compassionate, patient-focused care.</p>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <RevealItem key={s.slug}>
                <Link href={`/treatments/${s.slug}`} className="group flex h-full flex-col rounded-xl border border-line p-6 transition hover:border-ink">
                  <span className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{s.name}</h3>
                    <ArrowRight className="size-4 shrink-0 text-muted transition group-hover:translate-x-1 group-hover:text-ink" />
                  </span>
                  <p className="mt-3 line-clamp-5 text-sm leading-relaxed text-muted">{s.text}</p>
                </Link>
              </RevealItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Doctor */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading align="center" title={<>Consult an Experienced Sexologist in Bangalore <span className="text-muted">for Sexual Wellness</span></>} titleClassName="lg:text-[2.9rem]! lg:leading-[1.1]!" className="mb-14" />
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
            <Reveal className="relative">
              <div className="relative aspect-[562/496] overflow-hidden rounded-xl">
                <Image src={doctor.awardImage} alt={`${doctor.name} receiving the Pride of Nation award`} fill sizes="(min-width:1024px) 45vw, 90vw" className="object-cover object-top" />
              </div>
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-lg bg-white px-5 py-3 shadow-lift">
                <span className="h-display text-4xl text-orange-600">13+</span>
                <span className="text-sm leading-tight text-muted">Years of<br />experience</span>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <span className="eyebrow">About the Doctor</span>
              <h3 className="h-display mt-5 text-4xl leading-none sm:text-5xl">{doctor.name}</h3>
              <p className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-bold text-ink-soft"><Stethoscope className="size-4 text-lime-700" /> {doctor.credentials}</p>
              <p className="mt-6 leading-relaxed text-muted">{doctor.bio}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <BookButton className="inline-flex h-12 items-center gap-2 rounded-md bg-ink px-6 font-semibold text-white transition hover:bg-lime-700"><CalendarCheck className="size-4" /> Book with Dr. Jameel</BookButton>
                <Link href="/doctors" className="inline-flex h-12 items-center gap-2 rounded-md border border-ink/15 px-6 font-semibold transition hover:border-ink/40 hover:bg-white">Full profile <ArrowRight className="size-4" /></Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Accolades />

      {/* Gallery */}
      <section className="border-y border-line bg-cream py-16">
        <div className="container-x mb-8 flex items-end justify-between gap-4">
          <SectionHeading eyebrow="Our gallery" title="Clinic Infrastructure Gallery" titleClassName="lg:text-[2.6rem]!" />
          <Link href="/gallery" className="shrink-0 text-sm font-semibold underline underline-offset-4">View all</Link>
        </div>
        <Marquee duration={50}>
          {gallery.map((g) => (
            <div key={g.src} className="relative h-56 w-72 shrink-0 overflow-hidden rounded-lg sm:h-64 sm:w-80">
              <Image src={g.src} alt={g.alt} fill sizes="320px" className="object-cover" />
            </div>
          ))}
        </Marquee>
      </section>

      {/* Countries */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <SectionHeading align="center" eyebrow="Providing our services in" title={<>Patients From <span className="text-muted">10+ Countries</span></>} />
          <Reveal delay={0.1} className="relative mx-auto mt-10 aspect-[1420/663] max-w-5xl">
            <Image src="/images/lp/countries.webp" alt="World map of countries where Fortius Health Clinic serves patients, including India, the Middle East, Bangladesh, Sri Lanka, Maldives, Malaysia and South Africa" fill sizes="(min-width:1024px) 64rem, 100vw" className="object-contain" />
          </Reveal>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-cream py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end lg:gap-16">
            <SectionHeading eyebrow="Testimonials" title={<>Our Special <span className="text-muted">Patients Say</span></>} />
            <Reveal delay={0.1}>
              <p className="leading-relaxed text-muted">At Fortius Health Clinic, our patients&apos; experiences matter most to us. Here, you&apos;ll find feedback from individuals who have received care from the best sexologist doctors in Bangalore. Their journeys reflect the dedication and expertise of our team in addressing various sexual health concerns.</p>
              <p className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold ring-1 ring-line">
                <span className="flex text-orange">{Array.from({ length: 5 }, (_, n) => <Star key={n} className="size-4 fill-current" />)}</span>
                4.7 rating · by 233 clients
              </p>
            </Reveal>
          </div>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-2">
            {reviews.map((t) => <RevealItem key={t.name}><TestimonialCard t={{ ...t, place: "Patient" }} /></RevealItem>)}
          </Stagger>
        </div>
      </section>

      <CallBand />

      {/* FAQ */}
      <section id="faqs" className="py-20 lg:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading eyebrow="FAQ" title={<>Frequently Asked <span className="text-muted">Questions</span></>} />
          <Reveal delay={0.1}><FaqList faqs={faqs} /></Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="bg-cream py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow">Contact us</span>
            <h2 className="h-display mt-5 text-4xl leading-[1.05] sm:text-5xl">Be Free, <span className="text-muted">Get in Touch</span></h2>
            <ul className="mt-10 grid gap-4">
              <li><a href={`tel:${site.phone.tel}`} className="flex items-center gap-4 rounded-lg bg-white p-5 ring-1 ring-line transition hover:ring-ink"><Phone className="size-5 text-lime-700" /><span className="font-semibold">{site.phone.display}</span></a></li>
              <li><a href={`mailto:${site.emails[0]}`} className="flex items-center gap-4 rounded-lg bg-white p-5 ring-1 ring-line transition hover:ring-ink"><Mail className="size-5 text-lime-700" /><span className="font-semibold">{site.emails[0]}</span></a></li>
              <li><a href={hq.directions} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 rounded-lg bg-white p-5 ring-1 ring-line transition hover:ring-ink"><MapPin className="mt-0.5 size-5 shrink-0 text-lime-700" /><span className="font-semibold">{hq.address}</span></a></li>
              <li><a href={whatsappLink("Hi Fortius, I'd like to book a consultation.")} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-lg bg-white p-5 ring-1 ring-line transition hover:ring-ink"><Users className="size-5 text-lime-700" /><span className="font-semibold">Chat on WhatsApp</span></a></li>
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-xl bg-ink p-7 sm:p-10">
              <p className="text-xs font-bold tracking-[0.14em] text-lime-300 uppercase">Enquiry form</p>
              <h2 className="h-display mt-1 text-3xl text-white sm:text-4xl">Book an Appointment with us</h2>
              <div className="mt-8"><EnquiryForm dark source="lp-sexologist-in-bangalore-contact" /></div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
