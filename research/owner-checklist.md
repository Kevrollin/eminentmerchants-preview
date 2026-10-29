# Owner information and asset request checklist

What we still need from Eminent Merchants before the concept can become a live website.
Tick items off as the owner confirms them, and update `src/content/` to match.

## Business details

- [ ] Preferred name on the website: *Eminent Merchants*, *Eminent Merchants Motors* or *Eminent Merchants Car Importers LTD*
- [ ] Confirm the main services, in priority order: ready stock / direct importation / local sourcing / buying and selling on behalf
- [ ] **Car storage:** the Google Maps listing is called "Eminent Merchants Car storage". Is storage offered to customers? If yes, what exactly (secure parking, holding imported units, fees)? If no, consider renaming the listing.
- [ ] **Asset financing and hire purchase:** provider(s), who qualifies, typical deposit and terms, and any wording you need on the site
- [ ] **Duty exemption services:** who it is for and what you handle
- [ ] Sourcing countries: are Japan, UK, Singapore, Thailand and South Africa all current?
- [ ] Typical customers and areas served (Meru only, Mt Kenya region, countrywide?)
- [ ] The import process as you run it: steps, deposit, inspections, how clients get updates, and a typical time range if you are happy to publish one
- [ ] Anything that makes you different that you want stated, for example inspection, after-sale support or delivery. These are only published once you confirm them.

## Contact and location

- [ ] Confirm 0723 332 197 is the right public number for calls **and** WhatsApp
- [ ] Any second number or WhatsApp Business number
- [ ] Official email address, if any
- [ ] Opening hours (weekdays, Saturday, Sunday, public holidays)
- [ ] Confirm the Google Maps pin is at the yard gate, and the preferred directions wording ("Meru–Maua Highway, just past KeMU main campus, at Ruiri Junction")
- [ ] Is "1801 Gakurine, Kithoka, Meru 60200" (on JapaneseCarTrade) still current, or an old address?
- [ ] Preferred Facebook link: facebook.com/EminentMerchantsltd or facebook.com/eminentmerchantscarimportersltd
- [ ] Other social accounts (TikTok, Instagram, X)
- [ ] emcarsltd.com does not load. Do you still own the domain? Should the new site live there?

## Brand assets

- [ ] Logo as vector (SVG, AI, EPS or PDF) or high-resolution transparent PNG
- [ ] Any official colour codes or brand guide
- [ ] Approval of the derived white logo used on dark backgrounds, or a supplied version
- [ ] Favicon or app icon, if you have one

## Photos and vehicles

- [ ] Permission to use your YouTube and Facebook photos on the website
- [ ] Original high-resolution photos of the yard, the office, the signboard and the team (if staff are happy to appear)
- [ ] Current stock for each vehicle: make, model, year, engine, mileage, transmission, colour, price (only if you want it published), availability and 3–6 photos
- [ ] Who will keep the stock list up to date, and how often

## Trust and legal

- [ ] Customer testimonials you have written permission to publish, with names or initials as the customer prefers
- [ ] Whether to name a contact person (for example "Ask for Erick") on the site
- [ ] Any disclaimers you need (vehicle condition, pricing, financing, import timelines)
- [ ] Company registration or KRA details, **only** if you want them shown
- [ ] Your preferred style: anything you love or dislike about the concept

## Before launch (developer)

- [ ] Replace concept images with approved originals (`npm run images`)
- [ ] Add confirmed hours and email to `src/content/business.ts` (they will appear automatically where relevant)
- [ ] Add live stock to `src/content/vehicles.ts` (`currentStock`)
- [ ] Choose a domain and hosting, then build with `SITE_URL=… ALLOW_INDEXING=true npm run build`
- [ ] Update the Google Business Profile website link and name
