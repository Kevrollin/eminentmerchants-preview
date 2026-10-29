import { business } from '../content/business'
import { navLinks } from '../content/site'
import { telHref, whatsappHref } from '../lib/contact'
import { Logo } from './Logo'
import { SocialIcon } from './ui/BrandIcons'

const linkClasses = 'text-on-navy-soft transition-colors hover:text-white'
const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 lg:py-20">
        <div className="md:col-span-12 lg:col-span-5">
          <Logo variant="white" className="h-[4.5rem] w-auto" />
          <p className="mt-6 max-w-sm leading-relaxed text-on-navy-soft">
            Car importers and dealers on the Meru–Maua Highway, Meru. {business.tagline}
          </p>
        </div>

        <nav aria-label="Footer" className="md:col-span-3 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Explore</h2>
          <ul className="mt-4 space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClasses}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-6 lg:col-span-3">
          <h2 className="text-sm font-semibold text-white">Contact</h2>
          <ul className="mt-4 space-y-2.5">
            <li>
              <a href={telHref} className={linkClasses}>
                Call {business.phone.display}
              </a>
            </li>
            <li>
              <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className={linkClasses}>
                WhatsApp {business.phone.display}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
            {business.email && (
              <li>
                <a href={`mailto:${business.email}`} className={linkClasses}>
                  {business.email}
                </a>
              </li>
            )}
            <li className="leading-relaxed text-on-navy-soft">{business.location.addressLine}</li>
          </ul>
        </div>

        <div className="md:col-span-3 lg:col-span-2">
          <h2 className="text-sm font-semibold text-white">Follow</h2>
          <ul className="mt-4 flex gap-3">
            {business.social.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-11 place-items-center rounded-full border border-white/20 text-white transition-colors hover:border-white/60 hover:bg-white/5"
                >
                  <SocialIcon name={link.icon} className="size-[1.125rem]" />
                  <span className="sr-only">{link.label} (opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-line">
        <div className="container-page flex flex-col gap-2 py-6 text-sm text-on-navy-soft sm:flex-row sm:justify-between">
          <p>
            © <span suppressHydrationWarning>{year}</span> {business.legalName}. All rights
            reserved.
          </p>
          <p>Meru, Kenya</p>
        </div>
      </div>
      {/* Keeps the last line clear of the mobile call/WhatsApp bar. */}
      <div aria-hidden="true" className="h-20 md:hidden" />
    </footer>
  )
}
