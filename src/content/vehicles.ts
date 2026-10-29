import { photo, type ImageAsset } from './images'

export type VehicleStatus = 'available' | 'sold' | 'imported-for-client'

export interface Vehicle {
  id: string
  title: string
  specs: string[]
  status: VehicleStatus
  /** When the status applied, e.g. "November 2025". */
  statusDate: string
  highlight?: string
  /** Only publish with the owner's approval and only for available stock. */
  priceKes?: number
  image: ImageAsset
}

// Live inventory. Empty until the owner supplies current units, prices and
// photos — the Vehicles section shows an enquiry panel instead.
export const currentStock: Vehicle[] = []

// Past vehicles the business itself published on its YouTube channel.
// None of these are for sale; they show the kind of work the business does.
export const recentVehicles: Vehicle[] = [
  {
    id: 'hilux-z-2018',
    title: '2018 Toyota Hilux Z',
    specs: ['Double cab pickup', '2,400cc diesel', '4WD'],
    status: 'imported-for-client',
    statusDate: 'November 2025',
    highlight: '68 days from start to handover',
    image: photo('hiluxZ', 'White 2018 Toyota Hilux Z pickup, front view, on a paved forecourt'),
  },
  {
    id: 'fielder-hybrid-2019',
    title: '2019 Toyota Fielder Hybrid',
    specs: ['Station wagon', '1,500cc hybrid'],
    status: 'imported-for-client',
    statusDate: 'June 2025',
    image: photo('fielderEngine', 'Open bonnet showing the hybrid engine bay of a silver 2019 Toyota Fielder'),
  },
  {
    id: 'premio-2011',
    title: '2011 Toyota Premio',
    specs: ['Saloon'],
    status: 'sold',
    statusDate: 'January 2025',
    image: photo(
      'premio',
      'Maroon Toyota Premio parked outside the Eminent Merchants yard, beside a “We sell and buy cars” sign',
    ),
  },
]

export const statusLabels: Record<VehicleStatus, string> = {
  available: 'Available',
  sold: 'Sold',
  'imported-for-client': 'Imported for a client',
}
