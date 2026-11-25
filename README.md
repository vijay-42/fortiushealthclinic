# Fortius Health Clinic — Next.js website

Redesign of https://www.fortiushealthclinic.co/ — same content and images, new layout, motion and interactions. See [PLAN.md](PLAN.md) for the full renovation plan.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Enquiry delivery (required before launch)

Forms POST to `/api/enquiry`, which validates input and forwards each enquiry as JSON to `ENQUIRY_WEBHOOK_URL`
(Zapier, Make, a Google Apps Script that writes to Sheets, or your CRM's webhook). Without it, enquiries are only logged.

```bash
# .env.local
ENQUIRY_WEBHOOK_URL=https://hooks.example.com/...
```

## Where things live

| Path | What |
|---|---|
| `src/content/site.ts` | Clinic info, branches, doctor, stats, testimonials, FAQs, gallery |
| `src/content/treatments.ts` + `treatments-content.json` | 17 treatment pages (content extracted from the live site) |
| `src/content/policies.json` | Legal pages |
| `src/lib/blog.ts` | Live WordPress posts (6-hour cache) with offline fallback |
| `next.config.ts` | 301 redirects from every old `.html` URL |

Award videos stream from the existing Bunny CDN (23 MB / 41 MB — too large to bundle).
