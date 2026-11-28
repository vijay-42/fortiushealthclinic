"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { CalendarCheck, Lock, MessageCircle, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import { SocialIcon } from "@/components/ui/social-icon";
import { useBooking } from "@/components/interactive/booking";

/** Mobile: action dock that hides while scrolling down. Desktop: "Ask privately" floating button. */
export function MobileDock() {
  const { open } = useBooking();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [shown, setShown] = useState(false);
  const [menu, setMenu] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 300);
    setShown(y > 500);
  });

  useEffect(() => {
    if (!menu) return;
    const onDown = (e: PointerEvent) => { if (box.current && !box.current.contains(e.target as Node)) setMenu(false); };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("pointerdown", onDown); window.removeEventListener("keydown", onKey); };
  }, [menu]);

  return (
    <>
      <motion.div
        animate={{ y: hidden ? "130%" : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="fixed inset-x-3 bottom-3 z-40 lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="glass flex items-center gap-2 rounded-lg p-1.5 shadow-lift">
          <a href={`tel:${site.phone.tel}`} className="grid size-12 shrink-0 place-items-center rounded-full bg-mist active:scale-95" aria-label="Call the clinic">
            <Phone className="size-5" />
          </a>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="grid size-12 shrink-0 place-items-center rounded-full bg-[#25D366] text-white active:scale-95" aria-label="Chat on WhatsApp">
            <SocialIcon name="WhatsApp" className="size-5" />
          </a>
          <button onClick={() => open()} className="flex h-12 flex-1 items-center justify-center gap-2 rounded-md bg-lime-700 font-semibold text-white active:scale-[0.98]">
            <CalendarCheck className="size-4" /> Book Appointment
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {shown && (
          <motion.div
            ref={box}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 lg:flex"
          >
            <AnimatePresence>
              {menu && (
                <motion.div
                  initial={{ opacity: 0, y: 16, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 16, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 360, damping: 28 }}
                  style={{ transformOrigin: "bottom right" }}
                  className="w-80 overflow-hidden rounded-xl bg-white shadow-lift ring-1 ring-line"
                  role="dialog"
                  aria-label="Contact options"
                >
                  <div className="bg-block p-5">
                    <p className="h-display text-xl">Ask us privately</p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-soft"><Lock className="size-3.5 text-lime-700" /> Your conversation stays confidential.</p>
                  </div>
                  <div className="grid gap-2 p-3">
                    {[
                      { href: whatsappLink(), label: "Chat on WhatsApp", sub: "Usually the quickest reply", icon: <SocialIcon name="WhatsApp" className="size-5" />, cls: "bg-[#25D366] text-white", ext: true },
                      { href: `tel:${site.phone.tel}`, label: "Call the clinic", sub: site.phone.display, icon: <Phone className="size-5" />, cls: "bg-lime-50 text-lime-700" },
                    ].map((o, i) => (
                      <motion.a key={o.label} href={o.href} target={o.ext ? "_blank" : undefined} rel={o.ext ? "noopener noreferrer" : undefined}
                        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.05 + i * 0.05 }}
                        className="flex items-center gap-3 rounded-lg p-3 transition hover:bg-cream">
                        <span className={`grid size-11 place-items-center rounded-full ${o.cls}`}>{o.icon}</span>
                        <span><span className="block font-bold">{o.label}</span><span className="text-sm text-muted">{o.sub}</span></span>
                      </motion.a>
                    ))}
                    <motion.button type="button" onClick={() => { setMenu(false); open(); }}
                      initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                      className="mt-1 flex h-12 items-center justify-center gap-2 rounded-md bg-lime-700 font-semibold text-white transition hover:bg-lime-800">
                      <CalendarCheck className="size-4" /> Book an appointment
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex h-14 items-center gap-2.5 rounded-full bg-lime-700 pr-6 pl-5 font-semibold text-white shadow-lift"
            >
              {!menu && (
                <span className="absolute -top-0.5 -right-0.5 flex size-3.5">
                  <span className="absolute inset-0 animate-ping rounded-full bg-orange opacity-75" />
                  <span className="relative size-3.5 rounded-full border-2 border-white bg-orange" />
                </span>
              )}
              <span className="relative grid size-6 place-items-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={menu ? "x" : "chat"} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    {menu ? <X className="size-5" /> : <MessageCircle className="size-5" />}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="relative">{menu ? "Close" : "Ask privately"}</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
