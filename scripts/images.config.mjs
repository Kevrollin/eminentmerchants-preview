// Source images live in assets-src/eminent (not deployed).
// `npm run images` writes optimised WebP files to public/assets/eminent
// and records their dimensions in src/content/images.generated.json.
//
// crop / blur rectangles are in source-image pixels. Blur is applied before
// cropping and is used to hide number plates.

export const photos = [
  {
    key: 'heroCx5',
    src: 'vehicles/mazda-cx5-red.jpg',
    out: 'vehicles/mazda-cx5-red',
    widths: [640, 960, 1280],
  },
  {
    key: 'subaruImpreza',
    src: 'vehicles/subaru-impreza-silver.jpg',
    out: 'vehicles/subaru-impreza-silver',
    blur: [{ left: 30, top: 390, width: 100, height: 125 }],
    crop: { left: 80, top: 0, width: 1080, height: 720 },
    widths: [480, 720, 1080],
  },
  {
    key: 'subaruInterior',
    src: 'vehicles/subaru-impreza-interior.jpg',
    out: 'vehicles/subaru-impreza-interior',
    widths: [640, 960, 1280],
  },
  {
    key: 'hiluxZ',
    src: 'vehicles/toyota-hilux-z-white.jpg',
    out: 'vehicles/toyota-hilux-z-white',
    blur: [{ left: 940, top: 410, width: 145, height: 90 }],
    crop: { left: 560, top: 60, width: 720, height: 540 },
    widths: [480, 720],
  },
  {
    key: 'fielderEngine',
    src: 'vehicles/toyota-fielder-hybrid-engine.jpg',
    out: 'vehicles/toyota-fielder-hybrid-engine',
    crop: { left: 160, top: 0, width: 960, height: 720 },
    widths: [480, 720, 960],
  },
  {
    key: 'premio',
    src: 'vehicles/toyota-premio-maroon.jpg',
    out: 'vehicles/toyota-premio-maroon',
    blur: [{ left: 890, top: 535, width: 70, height: 85 }],
    crop: { left: 180, top: 0, width: 960, height: 720 },
    widths: [480, 720, 960],
  },
  {
    key: 'vezelYard',
    src: 'vehicles/honda-vezel-blue-yard.jpg',
    out: 'vehicles/honda-vezel-blue-yard',
    crop: { left: 140, top: 0, width: 960, height: 720 },
    widths: [480, 720, 960],
  },
  {
    key: 'demioTitanium',
    src: 'vehicles/mazda-demio-titanium.jpg',
    out: 'vehicles/mazda-demio-titanium',
    crop: { left: 120, top: 0, width: 960, height: 720 },
    widths: [480, 720, 960],
  },
  {
    key: 'yardLineup',
    src: 'yard/yard-lineup-office.jpg',
    out: 'yard/yard-lineup-office',
    crop: { left: 100, top: 0, width: 960, height: 720 },
    widths: [480, 720, 960],
  },
  {
    key: 'officeInterior',
    src: 'yard/office-interior.jpg',
    out: 'yard/office-interior',
    crop: { left: 340, top: 30, width: 640, height: 480 },
    widths: [480, 640],
  },
  {
    key: 'yardFrontage',
    src: 'yard/yard-frontage-signage.jpg',
    out: 'yard/yard-frontage-signage',
    blur: [{ left: 850, top: 420, width: 45, height: 50 }],
    crop: { left: 0, top: 0, width: 1280, height: 512 },
    widths: [640, 960, 1280],
  },
]

// The only logo found is the round YouTube/Facebook badge. We crop the
// lockup (car, name, "Car Importers") and make the white background
// transparent. Replace with the owner's original artwork when supplied.
export const logo = {
  src: 'brand/logo-badge-youtube-avatar.jpg',
  crop: { left: 110, top: 140, width: 708, height: 366 },
  out: 'brand/logo',
  width: 480,
}
