import { ArrowUpRight, Clock, Mail, MapPin, MapPinned, Navigation, Phone } from 'lucide-react'
import { useState, type ReactNode } from 'react'
import { business } from '../content/business'
import { visitImage } from '../content/site'
import { quickMessages, telHref, whatsappHref } from '../lib/contact'
import { EnquiryForm } from './EnquiryForm'
import { SocialIcon, WhatsAppIcon } from './ui/BrandIcons'
import { Button } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { Picture } from './ui/Picture'

function ContactRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4 py-5">
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-paper text-brand-red ring-1 ring-line [&_svg]:size-5">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-sm font-semibold text-muted">{label}</dt>
        <dd className="mt-1 text-ink">{children}</dd>
      </div>
    </div>
  )
}

const textLink = 'inline-flex items-center gap-1.5 font-semibold text-brand-blue-deep underline-offset-4 hover:underline'

// Google Maps loads only when asked, to keep the page fast and avoid third-party cookies.
function MapFacade() {
  const [show, setShow] = useState(false)

  return (
    <div className="mt-8 overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
      {show ? (
        <iframe
          title={`Map showing ${business.name} on the ${business.location.road}`}
          src={business.location.embedUrl}
          className="block aspect-[16/10] w-full md:aspect-[21/9] lg:aspect-[16/10]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="flex aspect-[16/10] flex-col items-center justify-center gap-3 p-6 text-center md:aspect-[21/9] lg:aspect-[16/10]">
          <MapPinned aria-hidden="true" className="size-8 text-brand-red" strokeWidth={1.5} />
          <p className="font-semibold text-ink">See us on the map</p>
          <p className="max-w-xs text-sm text-muted">The map is provided by Google Maps and loads when you choose to view it.</p>
          <Button variant="secondary" size="sm" onClick={() => setShow(true)} className="mt-1">
            Show map
          </Button>
        </div>
      )}
    </div>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-navy sm:aspect-[5/2]">
          <Picture
            image={visitImage}
            sizes="(min-width: 1280px) 1200px, calc(100vw - 2rem)"
            position="0% 50%"
            className="absolute inset-0 size-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-navy/0" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-10">
            <Eyebrow tone="dark">Contact</Eyebrow>
            <h2 id="contact-title" className="mt-3 max-w-2xl text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-5xl">
              Talk to us about your next car.
            </h2>
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <dl className="divide-y divide-line border-y border-line">
              <ContactRow icon={<Phone aria-hidden="true" />} label="Call">
                <a href={telHref} className="text-lg font-semibold text-ink underline-offset-4 hover:underline">
                  {business.phone.display}
                </a>
              </ContactRow>
              <ContactRow icon={<WhatsAppIcon />} label="WhatsApp">
                <a
                  href={whatsappHref(quickMessages.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-lg font-semibold text-ink underline-offset-4 hover:underline"
                >
                  {business.phone.display}
                  <span className="sr-only"> on WhatsApp (opens in a new tab)</span>
                </a>
              </ContactRow>
              {business.email && (
                <ContactRow icon={<Mail aria-hidden="true" />} label="Email">
                  <a href={`mailto:${business.email}`} className="text-lg font-semibold text-ink underline-offset-4 hover:underline">
                    {business.email}
                  </a>
                </ContactRow>
              )}
              <ContactRow icon={<MapPin aria-hidden="true" />} label="Visit the yard">
                <address className="not-italic leading-relaxed">
                  {business.location.road}
                  <br />
                  {business.location.landmark}
                  <br />
                  {business.location.town}, {business.location.country}
                </address>
                <p className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-[0.9375rem]">
                  <a href={business.location.directionsUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
                    <Navigation aria-hidden="true" className="size-4" />
                    Get directions
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                  <a href={business.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={textLink}>
                    View on Google Maps
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </p>
              </ContactRow>
            </dl>

            <p className="mt-5 flex items-start gap-2 text-[0.9375rem] leading-relaxed text-muted">
              <Clock aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
              {business.openingHours ?? 'Please call ahead to confirm opening hours before you visit.'}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <p className="text-sm font-semibold text-ink">Follow us</p>
              <ul className="flex gap-2">
                {business.social.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-semibold text-ink transition-colors hover:border-ink/40"
                    >
                      <SocialIcon name={link.icon} className="size-4" />
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <MapFacade />
          </div>

          <div id="enquire" className="scroll-mt-24 lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  )
}
