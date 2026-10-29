import { About } from './components/About'
import { Contact } from './components/Contact'
import { DevPreviewBadge } from './components/DevPreviewBadge'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ImportProcess } from './components/ImportProcess'
import { MobileActionBar } from './components/MobileActionBar'
import { Services } from './components/Services'
import { Vehicles } from './components/Vehicles'

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Services />
        <Vehicles />
        <ImportProcess />
        <About />
        <Contact />
      </main>
      <Footer />
      <MobileActionBar />
      <DevPreviewBadge />
    </>
  )
}
