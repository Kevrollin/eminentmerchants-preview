import { business } from '../content/business'

// AutoDealer markup limited to verified facts. Opening hours, email, price
// range and ratings are deliberately left out until the owner confirms them.
export function buildStructuredData(siteUrl = '') {
  const { location } = business
  return {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: business.legalName,
    alternateName: business.alternateNames,
    slogan: business.tagline,
    description: 'Car importers and dealers in Meru, Kenya: ex-Japan stock, direct importation and local sourcing.',
    telephone: business.phone.e164,
    ...(business.email && { email: business.email }),
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${location.road}, ${location.landmark}`,
      addressLocality: location.town,
      addressRegion: location.county,
      addressCountry: location.countryCode,
    },
    geo: { '@type': 'GeoCoordinates', latitude: location.lat, longitude: location.lng },
    hasMap: location.mapsUrl,
    areaServed: 'Kenya',
    sameAs: business.social.map((link) => link.href),
    ...(siteUrl && {
      url: `${siteUrl}/`,
      logo: `${siteUrl}/assets/eminent/brand/logo.png`,
      image: `${siteUrl}/og-image.jpg`,
    }),
  }
}
