# SADAF Residences

Scroll-animated luxury real-estate demo (English, prices in SAR). Next.js 14 · TypeScript · Tailwind · GSAP ScrollTrigger · Lenis.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

- `/` Home: hero (day/night toggle, hotspots), dome reveal, reasons slider, expanding quote, concept parallax, horizontal scroll, route line, type slider, amenities, architecture mask, credits accordion, closing CTA, footer.
- `/apartments` Filterable list (`?type=Terrace` preselects a filter).
- `/apartments/[slug]` Residence detail.
- `/contact` Book a call form → `/api/contact`.

## Content

All copy, prices and image paths live in `src/lib/data.ts`. Images are in `public/images`.

## Contact form

Works with no setup (validates, returns success). To receive enquiries by email set `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL`. Set `NEXT_PUBLIC_WHATSAPP_NUMBER` to show a WhatsApp hand-off after submit. See `.env.example`.

## Deploy

Push to GitHub, import in Vercel with default Next.js settings.

Images are AI-generated illustrations; prices and details are illustrative.
