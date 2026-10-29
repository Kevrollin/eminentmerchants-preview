import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { business } from '../content/business'
import { hero, highlights } from '../content/site'
import { prefillEnquiry, telHref } from '../lib/contact'
import { ButtonLink } from './ui/Button'
import { Eyebrow } from './ui/Eyebrow'
import { Picture } from './ui/Picture'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="container-page grid items-center gap-10 pb-12 pt-8 sm:pt-12 lg:grid-cols-12 lg:gap-14 lg:pb-16 lg:pt-14">
        <div className="lg:col-span-6 xl:col-span-5">
          <Eyebrow>{hero.eyebrow}</Eyebrow>
          <h1
            id="hero-title"
            className="mt-5 text-[2.5rem] font-bold leading-[1.04] tracking-[-0.035em] text-ink sm:text-6xl lg:text-[3.5rem] xl:text-[4.1rem]"
          >
            {hero.title}
          </h1>
          <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-ink-soft sm:text-lg">{hero.body}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="#enquire" onClick={() => prefillEnquiry('stock')}>
              Enquire about a vehicle
              <ArrowRight aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#services" variant="secondary">
              Explore our services
            </ButtonLink>
          </div>

          <p className="mt-7 flex items-center gap-2 text-[0.9375rem] text-muted">
            <Phone aria-hidden="true" className="size-4 text-brand-red" />
            Call or WhatsApp
            <a href={telHref} className="font-semibold text-ink underline-offset-4 hover:underline">
              {business.phone.display}
            </a>
          </p>
        </div>

        <div className="lg:col-span-6 xl:col-span-7">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-paper-deep">
            <Picture
              image={hero.image}
              priority
              sizes="(min-width: 1280px) 690px, (min-width: 1024px) 47vw, calc(100vw - 2rem)"
              position="60% 50%"
              className="absolute inset-0 size-full object-cover"
            />
            <p className="absolute bottom-4 left-4 inline-flex max-w-[calc(100%-2rem)] items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-medium text-ink shadow-soft sm:bottom-6 sm:left-6">
              <MapPin aria-hidden="true" className="size-4 shrink-0 text-brand-red" />
              <span className="truncate">{business.location.road}, Meru</span>
            </p>
          </div>
        </div>
      </div>

      <div className="container-page">
        <ul className="grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex items-center gap-4 bg-paper p-5 lg:p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-blue-deep ring-1 ring-line">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <span>
                <span className="block font-semibold text-ink">{title}</span>
                <span className="block text-sm text-muted">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
