import { logo } from '../content/images'

export function Logo({ variant = 'colour', className }: { variant?: 'colour' | 'white'; className?: string }) {
  return (
    <img
      src={variant === 'white' ? logo.white : logo.colour}
      width={logo.width}
      height={logo.height}
      alt="Eminent Merchants Ltd, car importers"
      className={className}
    />
  )
}
