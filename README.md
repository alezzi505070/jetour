# JETOUR Yemen — Official Distributor Website

A bilingual (Arabic RTL / English LTR) premium automotive website for JETOUR Yemen
(NATCO Automotive), built from the "JETOUR Yemen Website Build Plan".

## Stack

- **Next.js 16** (App Router, SSG, middleware locale routing)
- **TypeScript** · **Tailwind CSS v4** · **Framer Motion 12**
- Fonts: Manrope (EN) + Tajawal (AR) via `next/font`

## Highlights

- **Interactive 3D hero** — official 36-frame 360° turntable (JETOUR T2), drag to
  rotate, idle auto-spin, mouse-tilt perspective stage, scroll choreography.
- **Cinematic motion system** — word-by-word headline reveals, scroll-linked
  parallax, animated counters, marquee strips, glassmorphism, film grain.
- Full **AR/EN** dictionaries with RTL mirroring (logical properties throughout).
- **9 model pages** (G700, T1, T1 i-DM, T2, T2 i-DM, Dashing, X70, X70 PLUS,
  X90 PLUS) with galleries, lightbox, specs, availability tags; G700 + T2 ship
  360° viewers.
- **Lead capture** — test drive / quote / service booking forms with validation,
  success animation and prefilled bilingual WhatsApp deep links (plan §19–20).
- SEO: per-page bilingual metadata, OG tags, AutoDealer/Product/FAQ schema,
  sitemap + robots.
- Accessibility: `prefers-reduced-motion` honoured globally, ARIA labels,
  keyboard-friendly lightbox.

## Develop

```bash
npm install
npm run dev    # http://localhost:3000
npm run build && npm start
```

Official imagery can be re-fetched with `bash scripts/download-assets.sh`
(resumable; pulls from jetourglobal.com).

## ⚠️ Verify before launch (plan §11, §21)

| Item | Where | Status |
|---|---|---|
| WhatsApp number (`967730999966`) | `src/data/site.ts` | **UNVERIFIED — replace** |
| Email (`info@natcoyemen.com`) | `src/data/site.ts` | Confirm with NATCO |
| Production domain | `src/data/site.ts` → `baseUrl` | Placeholder |
| Model availability tags | `src/data/models.ts` → `availability` | Provisional — confirm stock |
| Showroom address / map pin | `src/data/site.ts` | Head office confirmed; showroom pin approximate |
| Working hours | dictionaries → `contactPage.hours` | Assumed — confirm |
| Social links | `src/data/site.ts` | Placeholders |
| Specs per model | `src/data/models.ts` | Global approximations — replace with Yemen-spec sheets |
| Image usage rights | `public/images` | Sourced from jetourglobal.com — confirm distributor media rights |

Phone `+967-1-441500`, fax and Sana'a head-office address are confirmed from
NATCO's official site. The 1M km / 10-year warranty claim is sourced from the
April 2026 launch coverage and is labelled "confirm at purchase" site-wide.
