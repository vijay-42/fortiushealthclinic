"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight, CalendarCheck, ChevronDown, Menu, Phone, Search, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { categories, treatments } from "@/content/treatments";
import { Icon } from "@/components/ui/icon";
import { useBooking } from "@/components/interactive/booking";
import { useSearch } from "@/components/interactive/search";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const booking = useBooking();
  const search = useSearch();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev && !menu && !mobile);
  });

  // Close menus when the route changes (state adjustment during render, no effect needed).
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setMenu(null);
    setMobile(false);
  }
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const isItemActive = (item: (typeof nav)[number]) => isActive(item.href) || ("children" in item && item.children.some((c) => isActive(c.href)));

  return (
    <>
      {/* Top info bar */}
      <div className="hidden bg-ink text-[0.8rem] text-white/70 lg:block">
        <div className="container-x flex h-10 items-center justify-between">
          <p>Confidential men’s sexual health care · Richards Town &amp; HSR Layout, Bangalore</p>
          <div className="flex items-center gap-6">
            <a href={`mailto:${site.emails[0]}`} className="transition hover:text-lime-300">{site.emails[0]}</a>
            <a href={`tel:${site.phone.tel}`} className="flex items-center gap-1.5 font-semibold text-white transition hover:text-lime-300"><Phone className="size-3.5" /> {site.phone.display}</a>
          </div>
        </div>
      </div>

      <motion.header
        animate={{ y: hidden ? "-110%" : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50"
        onMouseLeave={() => setMenu(null)}
      >
        <div className={cn("border-b transition-colors duration-300", scrolled || menu || pathname !== "/" ? "border-line bg-white" : "border-transparent bg-transparent")}>
        <div className="container-x flex h-[4.5rem] items-center gap-4">
          <Link href="/" className="relative shrink-0" aria-label="Fortius Health Clinic — home">
            <Image src="/images/brand/logo.png" alt="Fortius Health Clinic" width={176} height={82} priority className="h-14 w-auto" />
          </Link>

          <nav className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((item) => {
              const hasMenu = "children" in item || ("mega" in item && item.mega);
              const external = "external" in item && item.external;
              return (
                <div key={item.label} className="relative" onMouseEnter={() => setMenu(hasMenu ? item.label : null)}>
                  {external ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 rounded-md px-3 py-2.5 text-[0.95rem] xl:px-4 font-semibold text-ink/80 transition hover:text-ink">
                      {item.label} <ArrowUpRight className="size-3.5 opacity-50" />
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      aria-expanded={hasMenu ? menu === item.label : undefined}
                      onFocus={() => setMenu(hasMenu ? item.label : null)}
                      className={cn("relative flex items-center gap-1 rounded-md px-3 py-2.5 text-[0.95rem] xl:px-4 font-semibold transition", isItemActive(item) ? "text-ink" : "text-ink/70 hover:text-ink")}
                    >
                      {item.label}
                      {hasMenu && <ChevronDown className={cn("size-4 transition-transform", menu === item.label && "rotate-180")} />}
                      {isItemActive(item) && <motion.span layoutId="nav-dot" className="absolute inset-x-3 -bottom-[0.9rem] xl:inset-x-4 h-0.5 bg-lime" />}
                    </Link>
                  )}
                  <AnimatePresence>
                    {menu === item.label && "children" in item && (
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="absolute top-full left-0 pt-3">
                        <div className="w-56 rounded-lg bg-white p-2 shadow-lift">
                          {item.children.map((c) => (
                            <Link key={c.href} href={c.href} className="block rounded-md px-4 py-3 font-semibold transition hover:bg-lime-50">{c.label}</Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <button onClick={search.open} className="group flex h-11 items-center gap-2 rounded-md border border-ink/10 bg-white/60 px-3 text-sm text-muted transition hover:border-ink/25 xl:pr-2 xl:pl-4" aria-label="Search (Ctrl+K)">
              <Search className="size-4" />
              <span className="hidden xl:inline">Search</span>
              <kbd className="hidden rounded-md bg-mist px-1.5 py-0.5 text-[0.7rem] font-semibold xl:inline">⌘K</kbd>
            </button>
            <button onClick={() => booking.open()} className="hidden h-11 items-center gap-2 rounded-md bg-ink px-5 text-sm font-semibold whitespace-nowrap text-white transition hover:bg-lime hover:text-white sm:flex">
              <CalendarCheck className="size-4" /> <span>Book<span className="lg:max-xl:hidden"> an Appointment</span></span>
            </button>
            <button onClick={() => setMobile(true)} className="grid size-11 place-items-center rounded-full bg-ink text-white lg:hidden" aria-label="Open menu">
              <Menu className="size-5" />
            </button>
          </div>
        </div>
        </div>

        {/* Treatments mega menu */}
        <AnimatePresence>
          {menu === "Treatments" && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.99 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="container-x grid grid-cols-4 gap-8 border-b border-line bg-white py-8 shadow-lift">
                {categories.map((c) => (
                  <div key={c.id}>
                    <p className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">{c.label}</p>
                    <p className="mt-1 text-xs text-muted">{c.blurb}</p>
                    <ul className="mt-4 grid gap-1">
                      {treatments.filter((t) => t.category === c.id).map((t) => (
                        <li key={t.slug}>
                          <Link href={`/treatments/${t.slug}`} className="group flex items-center gap-3 rounded-md px-2 py-2 transition hover:bg-lime-50">
                            <span className="grid size-8 place-items-center rounded-lg bg-mist text-lime-800 transition group-hover:bg-lime group-hover:text-white"><Icon name={t.icon} className="size-4" /></span>
                            <span className="text-[0.92rem] font-semibold">{t.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobile && (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col bg-ink text-white lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            data-lenis-prevent
          >
            <div className="flex h-20 items-center justify-between px-5">
              <span className="rounded-lg bg-white px-3 py-2"><Image src="/images/brand/logo.png" alt="Fortius Health Clinic" width={132} height={62} className="h-11 w-auto" /></span>
              <button onClick={() => setMobile(false)} className="grid size-11 place-items-center rounded-full bg-white/10" aria-label="Close menu"><X className="size-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 pb-10">
              <nav className="grid gap-1" aria-label="Mobile">
                {[
                  { label: "Home", href: "/" }, { label: "About Us", href: "/about" }, { label: "Our Doctors", href: "/doctors" }, { label: "Treatments", href: "/treatments" },
                  { label: "Awards", href: "/awards" }, { label: "Gallery", href: "/gallery" }, { label: "Testimonials", href: "/testimonials" },
                  { label: "Contact", href: "/contact" },
                ].map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
                    <Link href={l.href} className="h-display flex items-center justify-between border-b border-white/10 py-4 text-3xl">
                      {l.label} <ArrowRight className="size-5 text-lime-300" />
                    </Link>
                  </motion.div>
                ))}
                <a href={site.blogUrl} target="_blank" rel="noopener noreferrer" className="h-display flex items-center justify-between border-b border-white/10 py-4 text-3xl">Blog <ArrowUpRight className="size-5 text-lime-300" /></a>
              </nav>
              <p className="mt-8 text-xs font-bold tracking-[0.14em] text-lime-300 uppercase">Popular treatments</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {treatments.slice(0, 8).map((t) => (
                  <Link key={t.slug} href={`/treatments/${t.slug}`} className="rounded-md border border-white/15 px-3.5 py-2 text-sm">{t.name}</Link>
                ))}
              </div>
              <button onClick={() => { setMobile(false); booking.open(); }} className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-md bg-lime font-bold text-white">
                <CalendarCheck className="size-5" /> Book an Appointment
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
