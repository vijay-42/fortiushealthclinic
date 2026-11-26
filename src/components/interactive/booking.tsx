"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Check, Lock, MapPin, MessageCircle, Phone, X } from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { site, whatsappLink } from "@/content/site";
import { treatments } from "@/content/treatments";
import { cn } from "@/lib/utils";

type OpenOpts = { concern?: string };
const Ctx = createContext<{ open: (o?: OpenOpts) => void }>({ open: () => {} });
export const useBooking = () => useContext(Ctx);

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<{ open: boolean; concern?: string }>({ open: false });
  const open = useCallback((o?: OpenOpts) => setState({ open: true, concern: o?.concern }), []);
  const value = useMemo(() => ({ open }), [open]);
  return (
    <Ctx.Provider value={value}>
      {children}
      <AnimatePresence>
        {state.open && <BookingDrawer initialConcern={state.concern} onClose={() => setState({ open: false })} />}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

/** Small client wrapper so server components can render a "Book" trigger. */
export function BookButton({ concern, className, children }: { concern?: string; className?: string; children: React.ReactNode }) {
  const { open } = useBooking();
  return (
    <button type="button" onClick={() => open({ concern })} className={className}>
      {children}
    </button>
  );
}

const steps = ["Concern", "Clinic", "Details"] as const;

function BookingDrawer({ initialConcern, onClose }: { initialConcern?: string; onClose: () => void }) {
  const [step, setStep] = useState(initialConcern ? 1 : 0);
  const [concern, setConcern] = useState<string>(initialConcern ?? "");
  const [branch, setBranch] = useState<string>(site.branches[0].id);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    panel.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const concernName = treatments.find((t) => t.slug === concern)?.name ?? (concern === "general" ? "General consultation" : "");
  const branchObj = site.branches.find((b) => b.id === branch)!;

  const waText = `Hi Fortius, I'd like to book a consultation.\nConcern: ${concernName || "General"}\nClinic: ${branchObj.name}${form.name ? `\nName: ${form.name}` : ""}`;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your name.");
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) return setError("Please enter a valid phone number.");
    setError("");
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, concern: concernName || "General", branch: branchObj.name, source: "booking-drawer" }),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="fixed inset-0 z-[80] flex justify-end" role="dialog" aria-modal="true" aria-label="Book an appointment">
      <motion.button
        aria-label="Close"
        className="absolute inset-0 bg-ink/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        ref={panel}
        tabIndex={-1}
        data-lenis-prevent
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 260, damping: 32 }}
        className="relative flex h-full w-full max-w-xl flex-col overflow-y-auto bg-cream outline-none sm:rounded-l-xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-cream/90 px-6 py-5 sm:px-8">
          <div>
            <p className="text-xs font-bold tracking-[0.14em] text-lime-700 uppercase">Book an appointment</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-muted"><Lock className="size-3.5" /> 100% confidential</p>
          </div>
          <button onClick={onClose} className="grid size-11 place-items-center rounded-full bg-white shadow-soft transition hover:rotate-90" aria-label="Close booking">
            <X className="size-5" />
          </button>
        </div>

        {status === "done" ? (
          <div className="flex flex-1 flex-col items-center justify-center px-8 py-16 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} className="grid size-20 place-items-center rounded-full bg-lime text-white">
              <Check className="size-10" strokeWidth={3} />
            </motion.div>
            <h3 className="h-display mt-8 text-3xl">Thank you, {form.name.split(" ")[0]}.</h3>
            <p className="mt-3 max-w-sm text-muted">Our team will call you shortly on {form.phone} to confirm your appointment at our {branchObj.name} clinic.</p>
            <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#25D366] px-6 py-3 font-semibold text-white">
              <MessageCircle className="size-5" /> Continue on WhatsApp
            </a>
            <button onClick={onClose} className="mt-4 text-sm font-semibold text-muted underline underline-offset-4">Close</button>
          </div>
        ) : (
          <div className="flex-1 px-6 py-8 sm:px-8">
            {/* Stepper */}
            <ol className="mb-8 flex items-center gap-2">
              {steps.map((s, i) => (
                <li key={s} className="flex flex-1 items-center gap-2">
                  <span className={cn("grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors", i < step ? "bg-lime text-white" : i === step ? "bg-lime-700 text-white" : "bg-white text-muted")}>
                    {i < step ? <Check className="size-4" strokeWidth={3} /> : i + 1}
                  </span>
                  <span className={cn("text-sm font-semibold", i === step ? "text-ink" : "text-muted")}>{s}</span>
                  {i < steps.length - 1 && <span className={cn("h-px flex-1", i < step ? "bg-lime" : "bg-line")} />}
                </li>
              ))}
            </ol>

            <AnimatePresence mode="wait">
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h3 className="h-display text-3xl">What would you like help with?</h3>
                  <p className="mt-2 text-muted">Choose the closest match — you can discuss everything privately with the doctor.</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {[...treatments.map((t) => ({ id: t.slug, label: t.name })), { id: "general", label: "Not sure / General" }].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => { setConcern(c.id); setStep(1); }}
                        className={cn("rounded-md border px-4 py-2.5 text-sm font-semibold transition", concern === c.id ? "border-lime-700 bg-lime-700 text-white" : "border-line bg-white hover:border-lime hover:bg-lime-50")}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                  <h3 className="h-display text-3xl">Which clinic suits you?</h3>
                  {concernName && <p className="mt-2 text-muted">For: <strong className="text-ink">{concernName}</strong></p>}
                  <div className="mt-6 grid gap-3">
                    {site.branches.map((b) => (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setBranch(b.id)}
                        className={cn("flex gap-4 rounded-lg border-2 bg-white p-5 text-left transition", branch === b.id ? "border-lime" : "border-transparent shadow-soft hover:border-lime-200")}
                      >
                        <span className={cn("grid size-11 shrink-0 place-items-center rounded-md", branch === b.id ? "bg-lime text-white" : "bg-mist")}><MapPin className="size-5" /></span>
                        <span>
                          <span className="flex items-center gap-2 font-bold">{b.name} <span className="rounded-md bg-mist px-2 py-0.5 text-[0.7rem] font-semibold text-muted uppercase">{b.label}</span></span>
                          <span className="mt-1 block text-sm text-muted">{b.address}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-8 flex justify-between">
                    <button type="button" onClick={() => setStep(0)} className="inline-flex items-center gap-2 font-semibold text-muted"><ArrowLeft className="size-4" /> Back</button>
                    <button type="button" onClick={() => setStep(2)} className="inline-flex h-12 items-center gap-2 rounded-md bg-lime-700 px-6 font-semibold text-white">Continue <ArrowRight className="size-4" /></button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.form key="s2" onSubmit={submit} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} noValidate>
                  <h3 className="h-display text-3xl">Your details</h3>
                  <p className="mt-2 text-muted">{concernName || "General consultation"} · {branchObj.name}</p>
                  <div className="mt-6 grid gap-4">
                    <Field label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
                    <Field label="Phone number" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} autoComplete="tel" />
                    <Field label="Email ID" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} autoComplete="email" />
                    <Field label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
                    {/* honeypot */}
                    <input tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} name="company" />
                  </div>
                  {error && <p className="mt-4 text-sm font-semibold text-red-600" role="alert">{error}</p>}
                  {status === "error" && <p className="mt-4 text-sm font-semibold text-red-600" role="alert">Something went wrong. Please call us or use WhatsApp.</p>}
                  <button type="submit" disabled={status === "sending"} className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2 rounded-md bg-lime font-bold text-white transition hover:bg-lime-600 hover:text-white disabled:opacity-60">
                    {status === "sending" ? "Sending…" : "Consult Now to Fortius"} <ArrowRight className="size-5" />
                  </button>
                  <div className="my-5 flex items-center gap-3 text-xs font-semibold text-muted uppercase"><span className="h-px flex-1 bg-line" /> or <span className="h-px flex-1 bg-line" /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#25D366] font-semibold text-white"><MessageCircle className="size-5" /> WhatsApp</a>
                    <a href={`tel:${branchObj.phone.tel}`} className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-white font-semibold shadow-soft"><Phone className="size-4" /> Call clinic</a>
                  </div>
                  <button type="button" onClick={() => setStep(1)} className="mt-6 inline-flex items-center gap-2 font-semibold text-muted"><ArrowLeft className="size-4" /> Back</button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export function Field({
  label, value, onChange, type = "text", textarea, required, autoComplete, dark,
}: {
  label: string; value: string; onChange: (v: string) => void; type?: string; textarea?: boolean; required?: boolean; autoComplete?: string; dark?: boolean;
}) {
  const cls = cn(
    "peer w-full rounded-lg border px-4 pt-6 pb-2 outline-none transition placeholder-transparent focus:ring-4",
    dark ? "border-white/15 bg-white/5 text-white focus:border-lime focus:ring-lime/20" : "border-line bg-white text-ink focus:border-lime focus:ring-lime/20",
  );
  return (
    <label className="relative block">
      {textarea ? (
        <textarea rows={4} placeholder={label} value={value} onChange={(e) => onChange(e.target.value)} className={cn(cls, "resize-none")} />
      ) : (
        <input type={type} placeholder={label} value={value} required={required} autoComplete={autoComplete} onChange={(e) => onChange(e.target.value)} className={cls} />
      )}
      <span className={cn("pointer-events-none absolute top-2 left-4 text-xs font-semibold transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold", dark ? "text-white/60" : "text-muted")}>
        {label}{required && " *"}
      </span>
    </label>
  );
}
