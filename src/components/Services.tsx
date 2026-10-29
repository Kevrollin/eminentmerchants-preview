import { ArrowRight } from 'lucide-react'
import { additionalServices, services } from '../content/site'
import { prefillEnquiry } from '../lib/contact'
import { Eyebrow, headingClasses } from './ui/Eyebrow'
import { Picture } from './ui/Picture'

export function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>What we do</Eyebrow>
            <h2 id="services-title" className={`mt-4 ${headingClasses}`}>
              Buy from our yard, or import exactly what you want.
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5">
            Every enquiry starts with a conversation about the car you need and the budget you’re working with.
          </p>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-3 md:gap-6 lg:mt-16 lg:gap-8">
          {services.map((service, index) => (
            <article key={service.id} className="group flex flex-col">
              <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
                <Picture
                  image={service.image}
                  sizes="(min-width: 1280px) 380px, (min-width: 768px) 31vw, calc(100vw - 2rem)"
                  position={service.imagePosition}
                  className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
              </div>
              <p className="mt-6 text-sm font-semibold tabular-nums text-muted">0{index + 1}</p>
              <h3 className="mt-1.5 text-xl font-bold tracking-tight text-ink">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{service.body}</p>
              <a
                href="#enquire"
                onClick={() => prefillEnquiry(service.interest)}
                className="mt-5 inline-flex items-center gap-2 self-start font-semibold text-brand-blue-deep transition-[gap] duration-200 hover:gap-3"
              >
                {service.cta}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="bg-white p-6 md:p-8">
            <h3 className="text-lg font-bold tracking-tight text-ink">Also ask us about</h3>
            <p className="mt-1 text-sm text-muted">Listed on our yard signage.</p>
          </div>
          {additionalServices.map(({ icon: Icon, title, body, interest }) => (
            <div key={title} className="flex gap-4 bg-white p-6 md:p-8">
              <Icon aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" strokeWidth={1.75} />
              <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
                <a
                  href="#enquire"
                  onClick={() => prefillEnquiry(interest)}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-blue-deep hover:underline hover:underline-offset-4"
                >
                  Ask about this
                  <ArrowRight aria-hidden="true" className="size-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
