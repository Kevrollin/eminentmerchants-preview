import { Phone } from 'lucide-react'
import { useEffect, useState } from 'react'
import { quickMessages, telHref, whatsappHref } from '../lib/contact'
import { WhatsAppIcon } from './ui/BrandIcons'
import { ButtonLink } from './ui/Button'

// Call / WhatsApp shortcuts on small screens, shown once the hero has scrolled away.
export function MobileActionBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const hero = document.getElementById('top')
    if (!hero) return
    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting))
    observer.observe(hero)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      inert={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-white px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-8px_24px_-18px_rgb(15_27_45/0.4)] transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="grid grid-cols-2 gap-3">
        <ButtonLink href={telHref} variant="secondary">
          <Phone aria-hidden="true" />
          Call
        </ButtonLink>
        <ButtonLink href={whatsappHref(quickMessages.general)} external>
          <WhatsAppIcon />
          WhatsApp
        </ButtonLink>
      </div>
    </div>
  )
}
