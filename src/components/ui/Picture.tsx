import type { ImageAsset } from '../../content/images'

interface PictureProps {
  image: ImageAsset
  sizes: string
  className?: string
  /** CSS object-position, e.g. "30% 50%". */
  position?: string
  /** Load immediately — use only for the hero image. */
  priority?: boolean
}

export function Picture({ image, sizes, className, position, priority = false }: PictureProps) {
  const srcSet = image.widths.map((w) => `${image.path}-${w}.webp ${w}w`).join(', ')
  const fallback = `${image.path}-${image.widths[Math.min(1, image.widths.length - 1)]}.webp`

  return (
    <img
      src={fallback}
      srcSet={srcSet}
      sizes={sizes}
      width={image.width}
      height={image.height}
      alt={image.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={priority ? 'high' : undefined}
      className={className}
      style={position ? { objectPosition: position } : undefined}
    />
  )
}
