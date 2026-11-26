import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { SocialIcon } from "@/components/ui/social-icon";
import { BookButton } from "@/components/interactive/booking";

export function Footer() {
  return (
    <footer className="relative mt-24 overflow-hidden bg-ink text-white">

      {/* CTA band */}
      <div className="container-x relative">
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 py-16 lg:flex-row lg:items-end">
          <h2 className="h-display max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Ready to get started <span className="text-white/50">with Fortius?</span>
          </h2>
          <div className="flex flex-wrap gap-3">
            <BookButton className="inline-flex h-14 items-center gap-2 rounded-md bg-lime px-7 font-bold text-white transition hover:bg-lime-700">
              Book an Appointment <ArrowUpRight className="size-5" />
            </BookButton>
            <a href={`tel:${site.phone.tel}`} className="inline-flex h-14 items-center gap-2 rounded-md border border-white/20 px-7 font-semibold transition hover:border-lime hover:text-lime-300">
              <Phone className="size-4" /> {site.phone.display}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.3fr]">
        <div>
          <span className="inline-block rounded-lg bg-white px-4 py-3">
            <Image src="/images/brand/logo.png" alt="Fortius Health Clinic" width={176} height={82} className="h-14 w-auto" />
          </span>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/60">{site.footerBlurb}</p>
          <div className="mt-6 flex gap-2">
            {site.socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="grid size-11 place-items-center rounded-full bg-white/5 transition hover:-translate-y-0.5 hover:bg-lime hover:text-white">
                <SocialIcon name={s.name} className="size-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.14em] text-lime-300 uppercase">Site Map</h3>
          <ul className="mt-5 grid gap-3 text-white/70">
            {[["Home", "/"], ["About Us", "/about"], ["Our Doctors", "/doctors"], ["Treatments", "/treatments"], ["Gallery", "/gallery"], ["Awards", "/awards"], ["Testimonials", "/testimonials"], ["Contact", "/contact"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="transition hover:text-lime-300">{l}</Link></li>
            ))}
            <li><a href={site.blogUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-lime-300">Blog</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.14em] text-lime-300 uppercase">Services</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 text-white/70">
            {treatments.filter((t) => ["erectile-dysfunction", "infertility-azoospermia", "couple-problems", "male-infertility", "sperm-count", "sperm-motility", "premature-ejaculation"].includes(t.slug)).map((t) => (
              <li key={t.slug}><Link href={`/treatments/${t.slug}`} className="transition hover:text-lime-300">{t.name}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.14em] text-lime-300 uppercase">Connect with us</h3>
          <ul className="mt-5 grid gap-5 text-sm text-white/70">
            {site.branches.map((b) => (
              <li key={b.id} className="flex gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-lime-300" />
                <span><strong className="block text-white">{b.name}</strong>{b.address}<a href={`tel:${b.phone.tel}`} className="mt-1 block text-white transition hover:text-lime-300">{b.phone.display}</a></span>
              </li>
            ))}
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-lime-300" />
              <span className="grid">{site.emails.map((e) => <a key={e} href={`mailto:${e}`} className="transition hover:text-lime-300">{e}</a>)}</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 pb-28 text-xs text-white/50 md:flex-row md:items-center md:justify-between lg:pb-6">
          <p>Copyright © {new Date().getFullYear()} {site.name} | All Rights Reserved</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {[["Terms & Conditions", "/terms-and-conditions"], ["Privacy Policy", "/privacy-policy"], ["Cancellation & Refund Policy", "/cancellation-and-refund-policy"], ["Shipping & Delivery Policy", "/shipping-and-delivery-policy"]].map(([l, h]) => (
              <li key={h}><Link href={h} className="transition hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
