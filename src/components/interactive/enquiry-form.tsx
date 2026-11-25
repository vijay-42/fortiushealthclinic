"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check, Lock } from "lucide-react";
import { useState } from "react";
import { whatsappLink } from "@/content/site";
import { Field } from "./booking";
import { cn } from "@/lib/utils";

/** Inline enquiry form — same fields as the original site (Name, Phone, Email, Message). */
export function EnquiryForm({ dark = false, source = "enquiry-form", concern }: { dark?: boolean; source?: string; concern?: string }) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "", company: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return setErr("Please enter your name.");
    if (!/^[+\d][\d\s-]{7,}$/.test(form.phone.trim())) return setErr("Please enter a valid phone number.");
    setErr("");
    setStatus("sending");
    try {
      const r = await fetch("/api/enquiry", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, source, concern }) });
      if (!r.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div key="ok" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-lime text-ink shadow-glow"><Check className="size-8" strokeWidth={3} /></span>
          <p className={cn("h-display mt-6 text-3xl", dark && "text-white")}>Thank you!</p>
          <p className={cn("mt-2", dark ? "text-white/70" : "text-muted")}>Our team will reach out to you shortly.</p>
          <a href={whatsappLink(`Hi Fortius, I just sent an enquiry. My name is ${form.name}.`)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-semibold text-lime-700 underline underline-offset-4">Prefer WhatsApp? Chat now</a>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate className="grid gap-4" exit={{ opacity: 0 }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field dark={dark} label="Name" required value={form.name} onChange={(v) => setForm({ ...form, name: v })} autoComplete="name" />
            <Field dark={dark} label="Phone number" required type="tel" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} autoComplete="tel" />
          </div>
          <Field dark={dark} label="Email ID" type="email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} autoComplete="email" />
          <Field dark={dark} label="Message" textarea value={form.message} onChange={(v) => setForm({ ...form, message: v })} />
          <input tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
          {(err || status === "error") && <p role="alert" className="text-sm font-semibold text-red-500">{err || "Something went wrong — please call or WhatsApp us."}</p>}
          <button type="submit" disabled={status === "sending"} className="mt-2 inline-flex h-14 items-center justify-center gap-2 rounded-full bg-lime font-bold text-ink shadow-glow transition hover:bg-lime-600 hover:text-white disabled:opacity-60">
            {status === "sending" ? "Sending…" : "Consult Now to Fortius"} <ArrowRight className="size-5" />
          </button>
          <p className={cn("flex items-center justify-center gap-1.5 text-xs", dark ? "text-white/50" : "text-muted")}><Lock className="size-3.5" /> Your details are kept strictly confidential.</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
