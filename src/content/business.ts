// Business facts used across the site.
// Every value here is backed by a public source listed in
// research/eminent-merchants-research.md. Leave a field null until the owner
// confirms it — components skip anything that is null.

export interface SocialLink {
  label: string
  href: string
  icon: 'facebook' | 'youtube'
}

export interface Business {
  name: string
  legalName: string
  alternateNames: string[]
  tagline: string
  summary: string
  phone: { display: string; international: string; e164: string }
  whatsappNumber: string
  location: {
    road: string
    landmark: string
    /** One-line address for compact layouts. */
    addressLine: string
    town: string
    county: string
    country: string
    countryCode: string
    lat: number
    lng: number
    mapsUrl: string
    directionsUrl: string
    embedUrl: string
  }
  social: SocialLink[]
  sourcingMarkets: string[]
  email: string | null
  openingHours: string | null
}

const lat = 0.0910555
const lng = 37.6539837

export const business: Business = {
  name: 'Eminent Merchants',
  legalName: 'Eminent Merchants Ltd',
  alternateNames: ['Eminent Merchants Motors', 'Eminent Merchants Car Importers LTD'],
  tagline: 'Importing quality, driving value.',
  summary: 'Car importers and dealers on the Meru–Maua Highway, Meru.',
  phone: {
    display: '0723 332 197',
    international: '+254 723 332 197',
    e164: '+254723332197',
  },
  whatsappNumber: '254723332197',
  location: {
    road: 'Meru–Maua Highway',
    landmark: 'Just past KeMU main campus, at Ruiri Junction',
    addressLine: 'Meru–Maua Highway, just past KeMU main campus, at Ruiri Junction, Meru',
    town: 'Meru',
    county: 'Meru County',
    country: 'Kenya',
    countryCode: 'KE',
    lat,
    lng,
    mapsUrl:
      'https://www.google.com/maps/place/Eminent+Merchants+Car+storage/@0.0910555,37.6539837,17z/data=!3m1!4b1!4m6!3m5!1s0x178823cf5a140d75:0x848d54e021784b58!8m2!3d0.0910555!4d37.6539837',
    directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${lat}%2C${lng}`,
    embedUrl: `https://maps.google.com/maps?q=${lat},${lng}&z=16&output=embed`,
  },
  social: [
    { label: 'Facebook', href: 'https://www.facebook.com/EminentMerchantsltd', icon: 'facebook' },
    { label: 'YouTube', href: 'https://www.youtube.com/@eminentmerchantsltd2865', icon: 'youtube' },
  ],
  // Listed on the business's own logo badge: "Selections from: Japan, UK,
  // Singapore, Thailand, S. Africa".
  sourcingMarkets: ['Japan', 'United Kingdom', 'Singapore', 'Thailand', 'South Africa'],
  // Not published anywhere we could verify. Add once the owner confirms —
  // e.g. openingHours: 'Open Monday to Saturday, 8am – 6pm.' — and they
  // appear in the Contact section and footer.
  email: null,
  openingHours: null,
}
