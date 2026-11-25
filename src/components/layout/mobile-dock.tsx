"use client";

import { CalendarCheck, Phone } from "lucide-react";
import { site, whatsappLink } from "@/content/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { useBooking } from "@/components/interactive/booking";

/** Mobile: sticky action dock. Desktop: floating WhatsApp + call buttons. */
export function MobileDock() {
  const { open } = useBooking();
  return (
    <>
      <div className="fixed inset-x-3 bottom-3 z-40 lg:hidden" style={{ paddingBottom: "env(safe-area-inset-bottom)" }}>
        <div className="glass flex items-center gap-2 rounded-full p-1.5 shadow-lift">
          <a href={`tel:${site.phone.tel}`} className="grid size-12 shrink-0 place-items-center rounded-full bg-mist" aria-label="Call the clinic">
            <Phone className="size-5" />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white" aria-label="Chat on WhatsApp">
            <SocialIcon name="WhatsApp" className="size-5" />
          </a>
          <button onClick={() => open()} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-ink font-semibold text-white">
            <CalendarCheck className="size-4" /> Book Appointment
          </button>
        </div>
      </div>

      <div className="fixed right-6 bottom-6 z-40 hidden flex-col gap-3 lg:flex">
        <a href={`tel:${site.phone.tel}`} aria-label="Call the clinic" className="group relative grid size-14 place-items-center rounded-full bg-ink text-white shadow-lift transition hover:scale-110">
          <Phone className="size-5" />
          <span className="pointer-events-none absolute right-full mr-3 rounded-full bg-ink px-3 py-1.5 text-sm font-semibold whitespace-nowrap opacity-0 transition group-hover:opacity-100">{site.phone.display}</span>
        </a>
        <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="relative grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lift transition hover:scale-110">
          <span className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]" />
          <SocialIcon name="WhatsApp" className="relative size-6" />
        </a>
      </div>
    </>
  );
}
