// Builds every image the site uses from assets-src/eminent.
// Run with `npm run images` after adding or replacing a source photo.
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { logo, photos } from './images.config.mjs'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'assets-src', 'eminent')
const outDir = join(root, 'public', 'assets', 'eminent')
const publicDir = join(root, 'public')
const manifestFile = join(root, 'src', 'content', 'images.generated.json')

async function ensureDir(file) {
  await mkdir(dirname(file), { recursive: true })
}

// Blurs each region through a soft-edged mask so no hard rectangle shows.
async function blurRegions(input, regions = []) {
  if (!regions.length) return input
  const { width, height } = await sharp(input).metadata()
  const rects = regions
    .map((r) => `<rect x="${r.left}" y="${r.top}" width="${r.width}" height="${r.height}" rx="6" fill="#fff"/>`)
    .join('')
  const mask = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <filter id="f"><feGaussianBlur stdDeviation="5"/></filter><g filter="url(#f)">${rects}</g></svg>`,
  )
  const blurred = await sharp(input)
    .blur(12)
    .ensureAlpha()
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer()
  return sharp(input).composite([{ input: blurred }]).toBuffer()
}

async function buildPhoto(photo) {
  let buffer = await blurRegions(join(srcDir, photo.src), photo.blur)
  if (photo.crop) buffer = await sharp(buffer).extract(photo.crop).toBuffer()
  const { width, height } = await sharp(buffer).metadata()
  const widths = photo.widths.filter((w) => w <= width)

  for (const w of widths) {
    const file = join(outDir, `${photo.out}-${w}.webp`)
    await ensureDir(file)
    await sharp(buffer).resize({ width: w }).webp({ quality: 78, effort: 5 }).toFile(file)
  }
  return { path: `/assets/eminent/${photo.out}`, width, height, widths }
}

// Turns the white badge background transparent. Logo artwork is only red
// and blue, so unsaturated light pixels are background, and anti-aliased
// edges are recovered by un-mixing them from white.
async function buildLogo() {
  const { data, info } = await sharp(join(srcDir, logo.src))
    .extract(logo.crop)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const colour = Buffer.from(data)
  const white = Buffer.from(data)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2]
    const min = Math.min(r, g, b)
    const saturation = Math.max(r, g, b) - min
    let alpha = saturation < 40 ? 0 : Math.min(1, Math.max(0, (255 - min - 25) / 190))
    if (alpha < 0.04) alpha = 0
    const unmix = (c) => (alpha ? Math.round(Math.min(255, Math.max(0, (c - (1 - alpha) * 255) / alpha))) : 0)
    colour[i] = unmix(r)
    colour[i + 1] = unmix(g)
    colour[i + 2] = unmix(b)
    colour[i + 3] = Math.round(alpha * 255)
    white[i] = white[i + 1] = white[i + 2] = 255
    white[i + 3] = Math.round(alpha * 255)
  }

  const raw = { raw: { width: info.width, height: info.height, channels: 4 } }
  for (const [name, pixels] of [['', colour], ['-white', white]]) {
    const base = join(outDir, `${logo.out}${name}`)
    await ensureDir(base)
    const resized = sharp(pixels, raw).resize({ width: logo.width })
    await resized.clone().png({ compressionLevel: 9 }).toFile(`${base}.png`)
    await resized.clone().webp({ quality: 90, alphaQuality: 100 }).toFile(`${base}.webp`)
  }
  const height = Math.round((info.height / info.width) * logo.width)
  return { path: `/assets/eminent/${logo.out}`, width: logo.width, height }
}

// Simple site icon: a monogram tile, not the business's official mark.
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0F1B2D"/>
  <rect x="20" y="15" width="7" height="34" fill="#fff"/>
  <rect x="20" y="15" width="24" height="7" fill="#fff"/>
  <rect x="20" y="28.5" width="19" height="7" fill="#fff"/>
  <rect x="20" y="42" width="24" height="7" fill="#fff"/>
  <rect x="20" y="52" width="24" height="3.5" rx="1.75" fill="#E72426"/>
</svg>
`

async function buildIcons() {
  await writeFile(join(publicDir, 'favicon.svg'), faviconSvg)
  const svg = Buffer.from(faviconSvg)
  await sharp(svg, { density: 300 }).resize(32, 32).png().toFile(join(publicDir, 'favicon-32.png'))
  await sharp(svg, { density: 600 })
    .resize(180, 180)
    .flatten({ background: '#0F1B2D' })
    .png()
    .toFile(join(publicDir, 'apple-touch-icon.png'))
}

async function buildSocialImage(logoInfo) {
  const W = 1200, H = 630
  const photo = await sharp(join(srcDir, 'vehicles/mazda-cx5-red.jpg'))
    .resize(W, H, { fit: 'cover', position: 'right' })
    .toBuffer()
  const shade = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs><linearGradient id="g" x1="0" x2="1" y1="0" y2="0">
      <stop offset="0" stop-color="#0F1B2D" stop-opacity="0.96"/>
      <stop offset="0.48" stop-color="#0F1B2D" stop-opacity="0.82"/>
      <stop offset="0.75" stop-color="#0F1B2D" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#0F1B2D" stop-opacity="0"/>
    </linearGradient></defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <g font-family="Segoe UI, Arial, Helvetica, sans-serif" fill="#fff">
      <text x="72" y="330" font-size="60" font-weight="700">Car importers &amp;</text>
      <text x="72" y="400" font-size="60" font-weight="700">dealers in Meru</text>
      <text x="72" y="462" font-size="28" fill="#C9D1DC">Direct imports · Ready stock · Local sourcing</text>
      <rect x="72" y="512" width="64" height="5" fill="#E72426"/>
      <text x="72" y="566" font-size="30" font-weight="600">Call or WhatsApp 0723 332 197</text>
    </g>
  </svg>`)
  const logoWhite = await sharp(join(outDir, `${logo.out}-white.png`)).resize({ width: 300 }).toBuffer()
  await sharp(photo)
    .composite([
      { input: shade, left: 0, top: 0 },
      { input: logoWhite, left: 66, top: 72 },
    ])
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(publicDir, 'og-image.jpg'))
  return logoInfo
}

const manifest = {}
for (const photo of photos) {
  manifest[photo.key] = await buildPhoto(photo)
  console.log(`✓ ${photo.key}`)
}
manifest.logo = await buildLogo()
console.log('✓ logo')
await buildIcons()
console.log('✓ icons')
await buildSocialImage(manifest.logo)
console.log('✓ og-image')

await ensureDir(manifestFile)
await writeFile(manifestFile, JSON.stringify(manifest, null, 2) + '\n')
console.log(`Wrote ${Object.keys(manifest).length} entries to src/content/images.generated.json`)
