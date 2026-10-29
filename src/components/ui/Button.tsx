import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'onDark' | 'outlineOnDark'
type Size = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition-colors duration-200 [&_svg]:size-[1.125rem] [&_svg]:shrink-0'

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[0.9375rem]',
}

const variants: Record<Variant, string> = {
  primary: 'bg-brand-red text-white hover:bg-brand-red-dark',
  secondary: 'border border-ink/20 text-ink hover:border-ink/45 hover:bg-ink/[0.03]',
  onDark: 'bg-white text-ink hover:bg-paper-deep',
  outlineOnDark: 'border border-white/30 text-white hover:border-white/70 hover:bg-white/5',
}

interface StyleProps {
  variant?: Variant
  size?: Size
}

function buttonClasses({ variant = 'primary', size = 'md' }: StyleProps, className = '') {
  return [base, sizes[size], variants[variant], className].filter(Boolean).join(' ')
}

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps & { external?: boolean }

export function ButtonLink({ variant, size, external, className, children, ...props }: ButtonLinkProps) {
  return (
    <a
      className={buttonClasses({ variant, size }, className)}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      {...props}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & StyleProps

export function Button({ variant, size, className, type = 'button', ...props }: ButtonProps) {
  return <button type={type} className={buttonClasses({ variant, size }, className)} {...props} />
}
