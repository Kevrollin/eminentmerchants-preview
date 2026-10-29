// Customer-facing copy. Services and process are drawn from the business's own
// signage, logo badge and YouTube descriptions — see the research notes for
// what still needs the owner's confirmation before launch.
import {
  CarFront,
  CirclePlay,
  FileCheck,
  MapPin,
  MessageCircle,
  Phone,
  Ship,
  Wallet,
  type LucideIcon,
} from 'lucide-react'
import { business } from './business'
import { photo, type ImageAsset } from './images'

export const navLinks = [
  { href: '#services', label: 'Services' },
  { href: '#vehicles', label: 'Vehicles' },
  { href: '#importing', label: 'Importing' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export type EnquiryInterest = 'stock' | 'import' | 'sourcing' | 'selling' | 'financing' | 'other'

export const enquiryInterests: { value: EnquiryInterest; label: string }[] = [
  { value: 'stock', label: 'Buying from stock' },
  { value: 'import', label: 'Importing a car' },
  { value: 'sourcing', label: 'Local sourcing' },
  { value: 'selling', label: 'Selling my car' },
  { value: 'financing', label: 'Financing' },
  { value: 'other', label: 'Something else' },
]

export const hero = {
  eyebrow: 'Car importers & dealers in Meru',
  title: 'Your next car, imported or ready to drive.',
  body: 'View ex-Japan stock at our yard on the Meru–Maua Highway, or tell us the exact model you want and we’ll import it for you.',
  image: photo('heroCx5', 'Red Mazda CX-5 SUV parked on a paved forecourt in Meru'),
}

export const highlights: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: Ship, title: 'Direct imports', body: 'Sourced from stock and auction abroad' },
  { icon: CarFront, title: 'Ready stock', body: 'On the Meru–Maua Highway, near KeMU' },
  { icon: MessageCircle, title: 'Talk to us', body: `Call or WhatsApp ${business.phone.display}` },
]

export interface Service {
  id: string
  interest: EnquiryInterest
  title: string
  body: string
  cta: string
  image: ImageAsset
  imagePosition?: string
}

export const services: Service[] = [
  {
    id: 'importing',
    interest: 'import',
    title: 'Direct importation',
    body: 'Tell us the make, model and budget. We source from stock and auction listings abroad and import the vehicle on your behalf.',
    cta: 'Start an import enquiry',
    image: photo('subaruImpreza', 'Silver Subaru Impreza hatchback parked on a paved forecourt'),
    imagePosition: '35% 50%',
  },
  {
    id: 'stock',
    interest: 'stock',
    title: 'Ready stock in Meru',
    body: 'Ex-Japan units on our yard, ready to view and test drive. Visit us, or ask for the latest stock list on WhatsApp.',
    cta: 'Ask about current stock',
    image: photo('vezelYard', 'Blue Honda Vezel on the gravel yard in front of the Eminent Merchants office'),
  },
  {
    id: 'sourcing',
    interest: 'sourcing',
    title: 'Local sourcing & buying on your behalf',
    body: 'Need a particular car found locally, or someone to handle a purchase or sale for you? We source, buy and sell on your behalf.',
    cta: 'Tell us what you need',
    image: photo('demioTitanium', 'Titanium grey Mazda Demio on the Eminent Merchants yard'),
  },
]

export const additionalServices: { icon: LucideIcon; title: string; body: string; interest: EnquiryInterest }[] = [
  {
    icon: Wallet,
    title: 'Asset financing & hire purchase',
    body: 'Ask which financing and hire-purchase options are available for your purchase.',
    interest: 'financing',
  },
  {
    icon: FileCheck,
    title: 'Duty exemption services',
    body: 'Support for buyers importing a vehicle under a duty exemption.',
    interest: 'import',
  },
]

export const importSteps = [
  {
    title: 'Tell us what you want',
    body: 'Share the make, model, preferred year and budget — on WhatsApp, by phone or at the yard.',
  },
  {
    title: 'Review the options',
    body: 'We search stock and auction listings and send you suitable vehicles to consider.',
  },
  {
    title: 'Confirm and import',
    body: 'Once you choose a vehicle and agree terms, we buy it and manage the import for you.',
  },
  {
    title: 'Collect your car',
    body: 'When the vehicle has arrived and cleared, we arrange the handover with you.',
  },
]

export const importImage = photo('subaruInterior', 'Dashboard and steering wheel of a Subaru Impreza')

export const about = {
  title: 'A Meru car importer you can visit.',
  paragraphs: [
    `${business.legalName} imports and sells vehicles from our office and yard on the Meru–Maua Highway, just past Kenya Methodist University’s main campus.`,
    'We bring in ex-Japan stock for the yard and import to order for individual clients — so you can buy what’s here today, or ask us to find exactly what you have in mind.',
  ],
  image: photo('yardLineup', 'Row of cars on the Eminent Merchants yard, with the company office behind them'),
  inset: photo('officeInterior', 'Inside the Eminent Merchants office, with the company logo on the wall'),
}

export const trustPoints: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: MapPin,
    title: 'A yard you can visit',
    body: 'See vehicles in person at our office and yard on the Meru–Maua Highway.',
  },
  {
    icon: CirclePlay,
    title: 'Stock you can see first',
    body: 'We post stock tours, vehicle reviews and handovers on our YouTube channel.',
  },
  {
    icon: Phone,
    title: 'One direct line',
    body: `Call or WhatsApp ${business.phone.display} to speak with the team.`,
  },
]

export const visitImage = photo(
  'yardFrontage',
  'The Eminent Merchants Motors signboard and yard gate beside the road in Meru',
)
