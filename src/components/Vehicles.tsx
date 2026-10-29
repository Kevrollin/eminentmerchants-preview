import { BadgeCheck, CirclePlay, PackageCheck, Timer } from 'lucide-react'
import { business } from '../content/business'
import { currentStock, recentVehicles, statusLabels, type Vehicle } from '../content/vehicles'
import { quickMessages, whatsappHref } from '../lib/contact'
import { WhatsAppIcon } from './ui/BrandIcons'
import { ButtonLink } from './ui/Button'
import { Eyebrow, headingClasses } from './ui/Eyebrow'
import { Picture } from './ui/Picture'

const priceFormat = new Intl.NumberFormat('en-KE')
const youtube = business.social.find((link) => link.icon === 'youtube')

const statusLine: Record<Vehicle['status'], string> = {
  available: 'Available now',
  sold: 'Sold',
  'imported-for-client': 'Delivered to client',
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const StatusIcon = vehicle.status === 'sold' ? BadgeCheck : PackageCheck

  return (
    <article className="group flex flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
        <Picture
          image={vehicle.image}
          sizes="(min-width: 1280px) 290px, (min-width: 768px) 46vw, calc(100vw - 2rem)"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[0.8125rem] font-semibold text-ink shadow-soft">
          <StatusIcon aria-hidden="true" className="size-4 text-brand-blue-deep" />
          {statusLabels[vehicle.status]}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-lg font-bold tracking-tight text-ink">{vehicle.title}</h3>
        <p className="mt-1 text-[0.9375rem] text-muted">{vehicle.specs.join(' · ')}</p>
        {vehicle.highlight && (
          <p className="mt-4 flex items-center gap-2 text-[0.9375rem] font-medium text-ink">
            <Timer aria-hidden="true" className="size-4 text-brand-red" />
            {vehicle.highlight}
          </p>
        )}
        {vehicle.status === 'available' && vehicle.priceKes && (
          <p className="mt-4 text-lg font-bold text-ink">KES {priceFormat.format(vehicle.priceKes)}</p>
        )}
        <div className="mt-auto pt-5">
          <p className="border-t border-line pt-4 text-sm text-muted">
            {statusLine[vehicle.status]} · {vehicle.statusDate}
          </p>
        </div>
        {vehicle.status === 'available' && (
          <ButtonLink
            href={whatsappHref(`Hello Eminent Merchants, is the ${vehicle.title} still available?`)}
            external
            size="sm"
            className="mt-4"
          >
            <WhatsAppIcon />
            Enquire on WhatsApp
          </ButtonLink>
        )}
      </div>
    </article>
  )
}

function StockEnquiryPanel() {
  return (
    <div className="flex flex-col justify-between rounded-[var(--radius-card)] bg-navy p-7 text-white sm:p-8">
      <div>
        <p className="text-sm font-semibold text-on-navy-soft">Current stock</p>
        <h3 className="mt-3 text-2xl font-bold leading-tight tracking-tight">Looking for a particular vehicle?</h3>
        <p className="mt-3 leading-relaxed text-on-navy-soft">
          Tell us what you need, and our team can discuss the available options with you.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3">
        <ButtonLink href={whatsappHref(quickMessages.stock)} external>
          <WhatsAppIcon />
          Ask what’s available
        </ButtonLink>
        {youtube && (
          <ButtonLink href={youtube.href} external variant="outlineOnDark">
            <CirclePlay aria-hidden="true" />
            Watch stock tours
          </ButtonLink>
        )}
      </div>
    </div>
  )
}

export function Vehicles() {
  const hasStock = currentStock.length > 0
  const shown = hasStock ? currentStock : recentVehicles

  return (
    <section id="vehicles" aria-labelledby="vehicles-title" className="bg-white py-20 sm:py-28">
      <div className="container-page">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>Vehicles</Eyebrow>
            <h2 id="vehicles-title" className={`mt-4 ${headingClasses}`}>
              {hasStock ? 'Available now' : 'Recently through our yard'}
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft lg:col-span-5">
            {hasStock
              ? 'Units on our yard today. Prices and availability are confirmed when you enquire.'
              : 'A few of the vehicles we’ve recently sold or imported for clients. Stock moves quickly, so ask us what’s on the yard today.'}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16 xl:grid-cols-4">
          {shown.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
          <StockEnquiryPanel />
        </div>

        {!hasStock && (
          <p className="mt-6 text-sm text-muted">
            The vehicles above have already been sold or delivered to clients and are shown as examples only.
          </p>
        )}
      </div>
    </section>
  )
}
