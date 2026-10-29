import type { ReactNode } from 'react'

export function Eyebrow({ children, tone = 'light' }: { children: ReactNode; tone?: 'light' | 'dark' }) {
  return (
    <p
      className={`flex items-center gap-3 text-sm font-semibold ${tone === 'dark' ? 'text-white/85' : 'text-brand-red'}`}
    >
      <span aria-hidden="true" className="h-0.5 w-7 rounded-full bg-brand-red" />
      {children}
    </p>
  )
}

export const headingClasses = 'text-[2rem] font-bold leading-[1.1] tracking-[-0.03em] sm:text-[2.75rem]'
