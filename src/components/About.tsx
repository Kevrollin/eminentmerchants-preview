import { business } from '../content/business'
import { about, trustPoints } from '../content/site'
import { Eyebrow, headingClasses } from './ui/Eyebrow'
import { Picture } from './ui/Picture'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="py-20 sm:py-28">
      <div className="container-page grid gap-16 lg:grid-cols-12 lg:items-center lg:gap-16">
        <div className="relative pb-10 lg:col-span-6 lg:pb-0">
          <div className="aspect-[4/3] overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
            <Picture
              image={about.image}
              sizes="(min-width: 1280px) 580px, (min-width: 1024px) 46vw, calc(100vw - 2rem)"
              className="size-full object-cover"
            />
          </div>
          <div className="absolute -bottom-2 right-4 aspect-[4/3] w-[44%] overflow-hidden rounded-2xl border-[6px] border-paper bg-paper-deep shadow-soft sm:right-8 lg:-bottom-10">
            <Picture
              image={about.inset}
              sizes="(min-width: 1024px) 260px, 44vw"
              className="size-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-6">
          <Eyebrow>About us</Eyebrow>
          <h2 id="about-title" className={`mt-4 ${headingClasses}`}>
            {about.title}
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <figure className="mt-8 border-l-2 border-brand-red pl-5">
            <blockquote className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
              “{business.tagline}”
            </blockquote>
            <figcaption className="mt-1 text-sm text-muted">Our motto, on the signboard at the yard</figcaption>
          </figure>
        </div>
      </div>

      <div className="container-page mt-20 lg:mt-24">
        <ul className="grid gap-8 border-t border-line pt-10 md:grid-cols-3 md:gap-10">
          {trustPoints.map(({ icon: Icon, title, body }) => (
            <li key={title} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-brand-blue-deep ring-1 ring-line">
                <Icon aria-hidden="true" className="size-5" strokeWidth={1.75} />
              </span>
              <div>
                <h3 className="font-semibold text-ink">{title}</h3>
                <p className="mt-1 text-[0.9375rem] leading-relaxed text-ink-soft">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
