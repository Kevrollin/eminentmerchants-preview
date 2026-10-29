import { ArrowRight } from 'lucide-react'
import { business } from '../content/business'
import { importImage, importSteps } from '../content/site'
import { prefillEnquiry } from '../lib/contact'
import { ButtonLink } from './ui/Button'
import { Eyebrow, headingClasses } from './ui/Eyebrow'
import { Picture } from './ui/Picture'

export function ImportProcess() {
  return (
    <section id="importing" aria-labelledby="importing-title" className="bg-navy py-20 text-white sm:py-28">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Eyebrow tone="dark">Importing a car</Eyebrow>
          <h2 id="importing-title" className={`mt-4 ${headingClasses}`}>
            How a direct import works
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-on-navy-soft">
            Here’s what to expect when we import a vehicle for you. Timelines depend on the vehicle, where it’s
            sourced and the shipping schedule.
          </p>
          <div className="mt-10 hidden aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-navy-raised lg:block">
            <Picture
              image={importImage}
              sizes="(min-width: 1280px) 460px, 36vw"
              position="70% 50%"
              className="size-full object-cover opacity-90"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <ol className="border-t border-navy-line">
            {importSteps.map((step, index) => (
              <li key={step.title} className="grid grid-cols-[auto_1fr] gap-5 border-b border-navy-line py-7 sm:gap-7">
                <span className="grid size-11 place-items-center rounded-full border border-white/25 text-sm font-semibold tabular-nums">
                  0{index + 1}
                </span>
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-on-navy-soft">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <ButtonLink href="#enquire" onClick={() => prefillEnquiry('import')} className="mt-10">
            Start an import enquiry
            <ArrowRight aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>

      <div className="container-page mt-14 grid gap-5 md:grid-cols-2 lg:mt-20">
        <div className="rounded-[var(--radius-card)] bg-navy-raised p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-on-navy-soft">Where we source</h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {business.sourcingMarkets.map((market) => (
              <li key={market} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[0.9375rem]">
                {market}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-on-navy-soft">From dealer stock and auction listings.</p>
        </div>
        <div className="rounded-[var(--radius-card)] bg-navy-raised p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-on-navy-soft">A recent example</h3>
          <p className="mt-4 text-xl font-semibold leading-snug tracking-tight">
            A 2018 Toyota Hilux Z imported for a client took 68 days from start to handover.
          </p>
          <p className="mt-3 text-sm text-on-navy-soft">Every import is different — ask us about the model you have in mind.</p>
        </div>
      </div>
    </section>
  )
}
