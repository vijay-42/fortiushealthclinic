# Fortius Health Clinic — Website Renovation Plan

Rebuild of https://www.fortiushealthclinic.co/ in Next.js, keeping the **same content and images** while
modernising layout, UI/UX, motion and interactions.

## 1. Audit of the current site

| Area | Finding |
|---|---|
| Pages | Home, About, Awards, Gallery, Testimonials, Contact, 17 treatment pages, 4 policy pages, WordPress blog |
| Tech | Static HTML + Bootstrap + jQuery + Owl Carousel (~600 KB HTML per page, inline jQuery) |
| UX gaps | Dense text walls, no treatment index page, no search, enquiry form only at bottom, generic carousels, weak mobile CTAs |
| Broken | `low-testesterone.html` returns **404** although it is in the main menu |
| Content issues | Typos ("Dysfuntion", "Testesterone", "Oraganic", "Browser Our Articles"), doctor name spelled 3 ways (Jameel / Jammel / Jummel), Terms page duplicates the Privacy Policy |
| Images | 65 images on a Bunny CDN; several have decorations baked in; testimonials use a generic avatar |

## 2. Goals

1. Same content and imagery, re-presented with clear hierarchy and scannable layouts.
2. Trust + discretion first (men's sexual health is a sensitive purchase).
3. Every page one tap away from **Call / WhatsApp / Book**.
4. Fast (Core Web Vitals green), accessible (WCAG AA), SEO-preserving (old URLs redirect).

## 3. Design system

- **Palette** (from the logo): Ink `#0D1F17`, Brand lime `#8CC63F`, Lime-deep `#5E9A1F`, Orange `#F7941D`, Cream `#F6F7EF`.
- **Type**: Fraunces (display serif, warm & premium) + Manrope (UI/body).
- **Shape language**: large radii, soft glass cards, organic blob gradients echoing the logo leaf.
- **Motion**: Framer Motion (`motion`) + Lenis smooth scroll. Scroll-reveal, staggered grids, magnetic buttons,
  parallax hero, marquee testimonials, counters. All motion respects `prefers-reduced-motion`.

## 4. Information architecture

```
/                       Home
/about                  About + founder + stats + video testimonials + FAQs
/treatments             NEW — filterable index of all treatments
/treatments/[slug]      17 treatment pages (template-driven from structured content)
/awards                 Certificates + award videos
/gallery                Filterable gallery with lightbox
/testimonials           All patient stories
/contact                Branches, map, form
/blog                   → existing WordPress blog (live posts shown on Home)
/privacy-policy, /terms-and-conditions, /cancellation-and-refund-policy, /shipping-and-delivery-policy
```

Old URLs (`/erectile.html`, `/about.html`, …) **301-redirect** to the new routes to keep Google rankings.

## 5. Innovations

| Feature | Why |
|---|---|
| **Care Finder** — 3-tap symptom navigator that suggests the right treatment page (runs in browser, nothing stored) | Lowers the embarrassment barrier of "where do I start?" |
| **⌘K / search palette** across treatments and FAQs | Instant navigation through 17 treatments |
| **Smart booking drawer** — concern → branch → details; submit, or hand off to WhatsApp with a pre-filled message | Higher conversion, fewer abandoned forms |
| **Discreet tab mode** — tab title switches to neutral "Fortius Health Clinic" whenever the tab is in the background | Patient privacy on shared screens |
| **Sticky mobile action dock** (Call · WhatsApp · Book) | One-thumb conversion on mobile |
| **Treatment reading experience** — scroll-spy table of contents, reading progress bar, related treatments | Long medical copy becomes navigable |
| **Live blog feed** from WordPress REST API with ISR caching and offline fallback | Home page always fresh with zero manual work |
| **Structured data** — MedicalClinic, Physician, FAQPage JSON-LD | Rich results in Google |

## 6. Tech stack

Next.js 16 (App Router, RSC, static generation) · TypeScript · Tailwind CSS v4 · motion · Lenis · lucide-react · zod.
Content lives in typed data files under `src/content/` so it can later move to a CMS without touching UI.

## 7. Build phases

1. Content extraction → structured JSON/TS (done by script from the live site).
2. Design tokens, layout shell (header, mega-menu, footer, mobile dock).
3. Home page sections.
4. Treatment template + index; About, Awards, Gallery, Testimonials, Contact, policies.
5. Interactions: Care Finder, search palette, booking drawer, lightbox.
6. SEO: metadata per page, redirects, sitemap, robots, JSON-LD.
7. QA: build, lint, responsive check, reduced-motion check.

## 8. Needs input from the clinic before launch

- Enquiry delivery: set `ENQUIRY_WEBHOOK_URL` (or wire an email provider) — see README.
- Confirm Dr. Jaylon Dias and Dr. Rhiel Madsen (placeholder avatars on the current site) are real team members.
- Real Terms & Conditions text (current page is a copy of the Privacy Policy).
- Content for Low Testosterone page (live page is a 404; built from the home-page summary for now).
