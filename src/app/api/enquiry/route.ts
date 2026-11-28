import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^[+\d][\d\s-]{7,20}$/),
  email: z.union([z.literal(""), z.email()]).optional(),
  message: z.string().max(2000).optional(),
  concern: z.string().max(100).optional(),
  branch: z.string().max(100).optional(),
  source: z.string().max(50).optional(),
  preferred: z.string().max(100).optional(),
  company: z.string().optional(), // honeypot
});

/**
 * Receives enquiries from the booking drawer and contact forms.
 * Delivery: set ENQUIRY_WEBHOOK_URL (e.g. a Zapier/Make/Google Apps Script/CRM webhook)
 * and every valid enquiry is POSTed there as JSON.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ ok: false, error: "Please check the form fields." }, { status: 422 });
  }

  const data = parsed.data;
  // Silently accept bot submissions without delivering them.
  if (data.company) return Response.json({ ok: true });

  const enquiry = {
    name: data.name,
    phone: data.phone,
    email: data.email || "",
    message: data.message || "",
    concern: data.concern || "General",
    branch: data.branch || "",
    preferred: data.preferred || "",
    source: data.source || "website",
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(enquiry),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[enquiry] delivery failed", err);
      return Response.json({ ok: false, error: "Could not deliver enquiry" }, { status: 502 });
    }
  } else {
    console.warn("[enquiry] ENQUIRY_WEBHOOK_URL not set — enquiry not delivered:", enquiry.concern, enquiry.branch);
  }

  return Response.json({ ok: true });
}
