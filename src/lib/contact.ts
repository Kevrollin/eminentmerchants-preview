import { business } from '../content/business'
import { enquiryInterests, type EnquiryInterest } from '../content/site'

export const telHref = `tel:${business.phone.e164}`

export function whatsappHref(message?: string) {
  const base = `https://wa.me/${business.whatsappNumber}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export function smsHref(message: string) {
  return `sms:${business.phone.e164}?body=${encodeURIComponent(message)}`
}

export const quickMessages = {
  general: 'Hello Eminent Merchants, I’d like to enquire about a vehicle.',
  stock: 'Hello Eminent Merchants, could you share the vehicles you currently have available?',
  visit: 'Hello Eminent Merchants, I’d like to visit the yard. When is a good time?',
}

export interface EnquiryDetails {
  name: string
  interest: EnquiryInterest | ''
  vehicle: string
  year: string
  budget: string
  message: string
}

export function buildEnquiryMessage(details: EnquiryDetails) {
  const interest = enquiryInterests.find((option) => option.value === details.interest)
  const lines = [`Hello Eminent Merchants, my name is ${details.name.trim() || '—'}.`]
  if (interest) lines.push(`I’m enquiring about: ${interest.label.toLowerCase()}.`)
  if (details.vehicle.trim()) lines.push(`Vehicle: ${details.vehicle.trim()}`)
  if (details.year.trim()) lines.push(`Year: ${details.year.trim()}`)
  if (details.budget.trim()) lines.push(`Budget: KES ${details.budget.trim()}`)
  if (details.message.trim()) lines.push('', details.message.trim())
  return lines.join('\n')
}

// Lets any "Enquire" link pre-select a topic in the enquiry form.
// The links still work without JavaScript because they are plain #enquire anchors.
export const PREFILL_EVENT = 'enquiry:prefill'

export function prefillEnquiry(interest: EnquiryInterest) {
  window.dispatchEvent(new CustomEvent<EnquiryInterest>(PREFILL_EVENT, { detail: interest }))
}
