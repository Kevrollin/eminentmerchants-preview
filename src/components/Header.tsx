import { MapPin, Menu, Phone, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { business } from '../content/business'
import { navLinks } from '../content/site'
import { quickMessages, telHref, whatsappHref } from '../lib/contact'
import { Logo } from './Logo'
import { WhatsAppIcon } from './ui/BrandIcons'
import { ButtonLink } from './ui/Button'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const header = headerRef.current
    const desktop = window.matchMedia('(min-width: 1024px)')

    header?.querySelector<HTMLElement>('#mobile-menu a')?.focus()
    document.documentElement.style.overflow = 'hidden'

    const close = () => setOpen(false)
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
        menuButtonRef.current?.focus()
        return
      }
      // Keep keyboard focus inside the open menu.
      if (event.key !== 'Tab' || !header) return
      const focusable = [menuButtonRef.current, ...header.querySelectorAll<HTMLElement>('#mobile-menu a')].filter(
        (el): el is HTMLElement => el !== null,
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    desktop.addEventListener('change', close)
    return () => {
      document.documentElement.style.overflow = ''
      document.removeEventListener('keydown', onKeyDown)
      desktop.removeEventListener('change', close)
    }
  }, [open])

  const raised = scrolled || open

  return (
    <header
      ref={headerRef}
      className={`sticky top-0 z-40 border-b bg-paper transition-[border-color,box-shadow] duration-300 ${
        raised ? 'border-line shadow-[0_6px_20px_-16px_rgb(15_27_45/0.35)]' : 'border-transparent'
      }`}
    >
      <div className="container-page flex h-[4.5rem] items-center justify-between gap-4 lg:h-20">
        <a href="#top" className="-ml-1 shrink-0 rounded-md p-1" onClick={() => setOpen(false)}>
          <Logo className="h-12 w-auto lg:h-16" />
        </a>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-3.5 py-2 text-[0.9375rem] font-medium text-ink-soft transition-colors hover:bg-ink/[0.04] hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telHref}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.9375rem] font-semibold text-ink transition-colors hover:bg-ink/[0.04] xl:inline-flex"
          >
            <Phone aria-hidden="true" className="size-4 text-brand-red" />
            {business.phone.display}
          </a>
          <ButtonLink href={whatsappHref(quickMessages.general)} external size="sm" className="hidden sm:inline-flex">
            <WhatsAppIcon />
            WhatsApp us
          </ButtonLink>
          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors hover:border-ink/40 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
          </button>
        </div>
      </div>

      {/* Visibility flips immediately on open (so the first link can take focus)
          and only after the fade on close. */}
      <div
        id="mobile-menu"
        className={`absolute inset-x-0 top-full h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-paper lg:hidden ${
          open
            ? 'visible translate-y-0 opacity-100 [transition:opacity_300ms,transform_300ms]'
            : 'invisible -translate-y-2 opacity-0 [transition:opacity_300ms,transform_300ms,visibility_0s_300ms]'
        }`}
      >
        <div className="container-page flex min-h-full flex-col pb-10 pt-4">
          <nav aria-label="Main">
            <ul className="divide-y divide-line">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="flex items-center justify-between py-4 text-2xl font-semibold tracking-tight text-ink"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto space-y-3 pt-10">
            <ButtonLink href={whatsappHref(quickMessages.general)} external className="w-full">
              <WhatsAppIcon />
              WhatsApp us
            </ButtonLink>
            <ButtonLink href={telHref} variant="secondary" className="w-full">
              <Phone aria-hidden="true" />
              Call {business.phone.display}
            </ButtonLink>
            <p className="flex items-start gap-2 pt-3 text-sm leading-relaxed text-muted">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand-red" />
              {business.location.addressLine}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
