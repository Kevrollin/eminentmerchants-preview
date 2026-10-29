# Eminent Merchants — website concept

A responsive single-page website concept for **Eminent Merchants Ltd**, car importers and dealers on the Meru–Maua Highway in Meru, Kenya.

It was built to show the owner how the business could look online. **The owner has not reviewed or approved it.** Production builds are marked `noindex` until you set the production URL and opt in to indexing (see [Deploying](#deploying)).

Built with React 19, Vite 8, TypeScript, Tailwind CSS 4 and lucide-react. The page is pre-rendered to static HTML at build time, so it loads with full content before JavaScript runs.

## Quick start

Requires Node.js 20.19+ or 22.12+ (built with Node 24).

```bash
npm install
npm run dev        # http://localhost:5173 — shows a small "Concept preview · dev only" badge
```

To see exactly what would be deployed:

```bash
npm run build
npm run preview    # http://localhost:4173
```

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` | Type-check, client build, server build, then pre-render to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | TypeScript only |
| `npm run lint` | oxlint |
| `npm run images` | Regenerate optimised images from `assets-src/` (needs `sharp`, installed as a dev dependency) |

## Project structure

```
assets-src/eminent/      Original photos and logo (not deployed)
public/                  Static files: favicon, social image, optimised images
  assets/eminent/        Generated WebP images and logo (brand/, vehicles/, yard/)
research/                Research notes, asset manifest, owner checklist, outreach message
scripts/
  images.config.mjs      Crop and plate-blur settings for each image
  optimize-images.mjs    Image pipeline (sharp)
  prerender.mjs          Injects rendered HTML, SEO tags, robots.txt and sitemap
src/
  content/               All business facts and copy (edit these, not the components)
    business.ts          Name, phone, WhatsApp, location, social links, hours, email
    site.ts              Navigation, hero, services, import steps, about, trust points
    vehicles.ts          Current stock (empty) and recent examples
  components/            Header, Hero, Services, Vehicles, ImportProcess, About, Contact, Footer…
  lib/contact.ts         WhatsApp, phone and SMS links; enquiry message builder
  seo/structuredData.ts  AutoDealer JSON-LD (verified fields only)
```

## Editing content

All text and facts live in `src/content/`. Components read from there, so most updates don't touch UI code.

- **Opening hours or email:** set `openingHours` or `email` in `business.ts`. Both are `null` until the owner confirms them; while `null`, the site asks visitors to call ahead and shows no email.
- **Live stock:** add vehicles to `currentStock` in `vehicles.ts`. The Vehicles section then switches from "Recently through our yard" to "Available now". Each card gets a WhatsApp enquiry button. A price shows only when `priceKes` is set.

  ```ts
  {
    id: 'fielder-2019-silver',
    title: '2019 Toyota Fielder Hybrid',
    specs: ['Station wagon', '1,500cc hybrid', 'Automatic'],
    status: 'available',
    statusDate: 'November 2026',
    priceKes: 1850000,            // only with the owner's approval
    image: photo('fielderYard', 'Silver Toyota Fielder Hybrid on the yard'), // key from images.config.mjs
  }
  ```

- **New or replacement photos:** put the original in `assets-src/eminent/…` and add or adjust its entry in `scripts/images.config.mjs`. Run `npm run images`; the new key is then available to `photo()`.

## How the enquiry form works

There is no backend and **nothing is stored or sent by the website**. The form validates the input, then opens a prefilled message the visitor can review and send themselves:

- **Continue in WhatsApp** opens `https://wa.me/254723332197?text=…` in a new tab.
- **Send as SMS** opens the device's messaging app (`sms:+254723332197?body=…`).

If the browser blocks the new tab, the form shows a direct link instead. Service links elsewhere ("Start an import enquiry", "Ask about this"…) preselect the right topic.

## Deploying

The output in `dist/` is static and works on any static host (Netlify, Vercel, Cloudflare Pages, cPanel…). **Do not publish it publicly until the owner approves the concept and the content in `research/owner-checklist.md` is confirmed.**

By default, `npm run build` produces a concept build:

- `<meta name="robots" content="noindex, nofollow">`
- `robots.txt` set to `Disallow: /`
- no canonical URL and no sitemap

For the approved production site:

```bash
SITE_URL=https://www.your-domain.co.ke ALLOW_INDEXING=true npm run build
```

That build:

- removes `noindex`
- adds the canonical link and `og:url`
- makes the social image URL absolute
- adds `url`, `logo` and `image` to the JSON-LD
- writes `robots.txt` with a sitemap reference and creates `sitemap.xml`

(On Windows PowerShell, set them first: `$env:SITE_URL='https://…'; $env:ALLOW_INDEXING='true'; npm run build`.)

## Quality checks performed

On 29 Oct 2026, against the production build in Chrome:

- **Viewports:** 360, 390, 768, 1024 and 1440 px. No horizontal overflow, no console errors or hydration warnings, every in-page link target exists, and all visible images load.
- **Enquiry form:**
  - Empty submit shows errors and focuses the first invalid field.
  - Errors clear as fields are fixed.
  - The WhatsApp link is correctly encoded (including `&`, `–` and line breaks).
  - The preview matches the sent text.
  - The status message is honest.
- **Mobile menu:** `aria-expanded`, focus moves into the menu, focus is trapped, Escape closes it and returns focus, links close it, and page scroll is locked while open.
- **Links and loading:**
  - All `tel:` and WhatsApp links point to +254 723 332 197.
  - The directions link uses the Maps coordinates.
  - External links have `rel="noopener"`.
  - The Google Map loads only on request.
  - The mobile call/WhatsApp bar appears after the hero and is `inert` while hidden.
- **Accessibility and rendering:** the skip link works, reduced motion disables smooth scrolling, and the page renders fully with JavaScript disabled.
- `npm run typecheck`, `npm run lint` and `npm run build` pass.

## Research and content sources

See `research/`:

- `eminent-merchants-research.md`: sources, verified facts, assumptions, open questions
- `asset-manifest.md`: where every image came from and its usage status
- `owner-checklist.md`: what to request from the owner
- `outreach-message.md`: the introduction message, ready to send (not yet sent)
