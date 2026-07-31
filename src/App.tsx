import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import Hero from './components/home/Hero'
import PlatformSection from './components/home/PlatformSection'
import ExperienceSection from './components/home/ExperienceSection'
import SelectedWork from './components/home/SelectedWork'
import FinalCta from './components/home/FinalCta'
import DialsLab from './components/DialsLab'

/**
 * The homepage, as four beats and a close:
 *
 *   hero → what you inherit → how long we have done this → highlights → contact
 *
 * Deliberately shorter than the brief's eight sections. Leading with proof read
 * as boasting, and explaining the system path, every capability and the article
 * feed on one page left nothing for the rest of the site to do. Those live at
 * combine.se/areas-of-expertise, /cases and /edge, and the page links out to
 * them instead of summarising them.
 *
 * Field rhythm: dark hero → plum → white → off-white → black.
 */
export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <PlatformSection />
        <ExperienceSection />
        <SelectedWork />
        <FinalCta />
      </main>

      <SiteFooter />

      {/* Development-only. Tree-shaken out of the production bundle. */}
      {import.meta.env.DEV && <DialsLab />}
    </>
  )
}
