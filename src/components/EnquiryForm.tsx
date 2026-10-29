import { CircleAlert, CircleCheck, MessageSquare } from 'lucide-react'
import { useEffect, useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { business } from '../content/business'
import { enquiryInterests, type EnquiryInterest } from '../content/site'
import {
  PREFILL_EVENT,
  buildEnquiryMessage,
  smsHref,
  whatsappHref,
  type EnquiryDetails,
} from '../lib/contact'
import { WhatsAppIcon } from './ui/BrandIcons'
import { Button } from './ui/Button'

type Field = 'name' | 'interest' | 'details'
type Errors = Partial<Record<Field, string>>
type Status =
  | { kind: 'idle' }
  | { kind: 'opened'; channel: 'whatsapp' | 'sms' }
  | { kind: 'blocked'; href: string }

const emptyDetails: EnquiryDetails = { name: '', interest: '', vehicle: '', year: '', budget: '', message: '' }
const fieldOrder: Field[] = ['name', 'interest', 'details']

function validate(details: EnquiryDetails): Errors {
  const errors: Errors = {}
  if (details.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!details.interest) errors.interest = 'Choose what you’re enquiring about.'
  if (!details.vehicle.trim() && !details.message.trim()) {
    errors.details = 'Tell us the vehicle you’re after, or add a short message.'
  }
  return errors
}

const inputClasses =
  'mt-2 block h-12 w-full rounded-xl border bg-white px-4 text-base text-ink placeholder:text-muted/70 transition-colors focus:border-brand-blue focus:outline-none focus:ring-4 focus:ring-brand-blue/15'

function ErrorText({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <p id={id} className="mt-2 flex items-center gap-1.5 text-sm font-medium text-brand-red">
      <CircleAlert aria-hidden="true" className="size-4 shrink-0" />
      {message}
    </p>
  )
}

export function EnquiryForm() {
  const id = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const [details, setDetails] = useState<EnquiryDetails>(emptyDetails)
  const [errors, setErrors] = useState<Errors>({})
  const [attempted, setAttempted] = useState(false)
  const [status, setStatus] = useState<Status>({ kind: 'idle' })

  useEffect(() => {
    const onPrefill = (event: Event) => {
      const interest = (event as CustomEvent<EnquiryInterest>).detail
      setDetails((current) => ({ ...current, interest }))
    }
    window.addEventListener(PREFILL_EVENT, onPrefill)
    return () => window.removeEventListener(PREFILL_EVENT, onPrefill)
  }, [])

  const update = (field: keyof EnquiryDetails) => (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...details, [field]: event.target.value }
    setDetails(next)
    if (attempted) setErrors(validate(next))
    setStatus({ kind: 'idle' })
  }

  function isValid() {
    setAttempted(true)
    const found = validate(details)
    setErrors(found)
    const firstInvalid = fieldOrder.find((field) => found[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[data-field="${firstInvalid}"]`)?.focus()
      setStatus({ kind: 'idle' })
      return false
    }
    return true
  }

  function openWhatsApp(event: FormEvent) {
    event.preventDefault()
    if (!isValid()) return
    const href = whatsappHref(buildEnquiryMessage(details))
    const tab = window.open(href, '_blank')
    if (tab) {
      tab.opener = null
      setStatus({ kind: 'opened', channel: 'whatsapp' })
    } else {
      setStatus({ kind: 'blocked', href })
    }
  }

  function openSms() {
    if (!isValid()) return
    window.location.href = smsHref(buildEnquiryMessage(details))
    setStatus({ kind: 'opened', channel: 'sms' })
  }

  const describedBy = (field: Field, hint?: string) =>
    [hint, errors[field] ? `${id}-${field}-error` : ''].filter(Boolean).join(' ') || undefined

  const preview = buildEnquiryMessage(details)

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={openWhatsApp}
      aria-labelledby={`${id}-title`}
      className="rounded-[var(--radius-card)] border border-line bg-paper p-6 sm:p-8"
    >
      <h3 id={`${id}-title`} className="text-2xl font-bold tracking-tight text-ink">
        Send an enquiry
      </h3>
      <p className="mt-2 leading-relaxed text-ink-soft">
        Fill this in and we’ll open a ready-to-send message to {business.name} in WhatsApp or SMS.
      </p>

      <div className="mt-8 space-y-6">
        <div>
          <label htmlFor={`${id}-name`} className="text-sm font-semibold text-ink">
            Your name
          </label>
          <input
            id={`${id}-name`}
            data-field="name"
            name="name"
            autoComplete="name"
            value={details.name}
            onChange={update('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            className={`${inputClasses} ${errors.name ? 'border-brand-red' : 'border-line'}`}
          />
          <ErrorText id={`${id}-name-error`} message={errors.name} />
        </div>

        <fieldset aria-describedby={describedBy('interest')}>
          <legend className="text-sm font-semibold text-ink">I’m enquiring about</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {enquiryInterests.map((option, index) => (
              <label key={option.value} className="relative cursor-pointer">
                <input
                  type="radio"
                  name="interest"
                  value={option.value}
                  data-field={index === 0 ? 'interest' : undefined}
                  checked={details.interest === option.value}
                  onChange={update('interest')}
                  className="peer sr-only"
                />
                <span className="inline-flex h-10 items-center gap-1.5 rounded-full border border-line bg-white px-4 text-sm font-medium text-ink-soft transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-blue hover:border-ink/40">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
          <ErrorText id={`${id}-interest-error`} message={errors.interest} />
        </fieldset>

        <div>
          <label htmlFor={`${id}-vehicle`} className="text-sm font-semibold text-ink">
            Vehicle <span className="font-normal text-muted">(make and model)</span>
          </label>
          <input
            id={`${id}-vehicle`}
            data-field="details"
            name="vehicle"
            placeholder="e.g. Toyota Fielder Hybrid"
            value={details.vehicle}
            onChange={update('vehicle')}
            aria-invalid={errors.details ? true : undefined}
            aria-describedby={describedBy('details')}
            className={`${inputClasses} ${errors.details ? 'border-brand-red' : 'border-line'}`}
          />
          <ErrorText id={`${id}-details-error`} message={errors.details} />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-year`} className="text-sm font-semibold text-ink">
              Year <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={`${id}-year`}
              name="year"
              placeholder="e.g. 2017–2019"
              value={details.year}
              onChange={update('year')}
              className={`${inputClasses} border-line`}
            />
          </div>
          <div>
            <label htmlFor={`${id}-budget`} className="text-sm font-semibold text-ink">
              Budget in KES <span className="font-normal text-muted">(optional)</span>
            </label>
            <input
              id={`${id}-budget`}
              name="budget"
              inputMode="numeric"
              placeholder="e.g. 1,500,000"
              value={details.budget}
              onChange={update('budget')}
              className={`${inputClasses} border-line`}
            />
          </div>
        </div>

        <div>
          <label htmlFor={`${id}-message`} className="text-sm font-semibold text-ink">
            Message <span className="font-normal text-muted">(optional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            name="message"
            rows={4}
            placeholder="Anything else we should know — colour, mileage, timing…"
            value={details.message}
            onChange={update('message')}
            aria-invalid={errors.details && !details.vehicle.trim() ? true : undefined}
            aria-describedby={describedBy('details')}
            className={`${inputClasses} h-auto resize-y py-3 ${errors.details ? 'border-brand-red' : 'border-line'}`}
          />
        </div>

        <details className="group rounded-xl border border-line bg-white px-4 py-3">
          <summary className="cursor-pointer select-none text-sm font-semibold text-ink marker:text-muted">
            Preview your message
          </summary>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ink-soft">{preview}</pre>
        </details>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button type="submit">
          <WhatsAppIcon />
          Continue in WhatsApp
        </Button>
        <Button variant="secondary" onClick={openSms}>
          <MessageSquare aria-hidden="true" />
          Send as SMS
        </Button>
      </div>

      <div role="status" aria-live="polite" className="mt-5 empty:mt-0">
        {status.kind === 'opened' && (
          <p className="flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-[0.9375rem] text-ink ring-1 ring-line">
            <CircleCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-blue-deep" />
            {status.channel === 'whatsapp'
              ? 'WhatsApp has opened in a new tab with your message. Press send there to reach the team.'
              : `Your messaging app should open with the message ready. If nothing happens, call ${business.phone.display}.`}
          </p>
        )}
        {status.kind === 'blocked' && (
          <p className="flex items-start gap-2 rounded-xl bg-white px-4 py-3 text-[0.9375rem] text-ink ring-1 ring-brand-red/40">
            <CircleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-red" />
            <span>
              Your browser blocked the new tab.{' '}
              <a href={status.href} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
                Open WhatsApp with your message
              </a>
              .
            </span>
          </p>
        )}
      </div>

      <p className="mt-5 text-sm leading-relaxed text-muted">
        This form doesn’t send or store anything. Nothing reaches {business.name} until you press send in WhatsApp or
        your messaging app.
      </p>
    </form>
  )
}
