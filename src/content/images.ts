import generated from './images.generated.json'

export interface ImageAsset {
  /** Public path without the `-{width}.webp` suffix. */
  path: string
  width: number
  height: number
  widths: number[]
  alt: string
}

type ImageKey = Exclude<keyof typeof generated, 'logo'>

export function photo(key: ImageKey, alt: string): ImageAsset {
  return { ...generated[key], alt }
}

export const logo = {
  colour: `${generated.logo.path}.webp`,
  white: `${generated.logo.path}-white.webp`,
  width: generated.logo.width,
  height: generated.logo.height,
}
