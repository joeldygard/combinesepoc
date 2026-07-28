import { useState } from 'react'
import DriftHero from './components/DriftHero'
import DriftField from './components/DriftField'
import { DRIFT_DEFAULTS } from './components/driftConfig'
import type { DriftConfig } from './components/driftConfig'
import DriftControls from './components/DriftControls'
import SiteHeader from './components/SiteHeader'
import { CombineLogotype } from './components/CombineLogo'
import './App.css'

const EXPERTISE = ['Control Systems', 'Data Science', 'Embedded Systems']

/** The hero copy, shared by both views so the dials rig shows the real thing. */
function HeroCopy() {
  return (
    <div className="hero__inner">
      <h1 className="hero__mark">
        <CombineLogotype className="hero__logotype" />
      </h1>
      <p className="hero__lede">
        Intelligence that senses, decides and acts in the physical world.
      </p>
      <div className="hero__cta">
        <a className="btn btn--solid" href="https://combine.se/get-in-touch">
          Get in touch
        </a>
        <a className="btn btn--ghost" href="https://combine.se/areas-of-expertise/">
          Areas of expertise
        </a>
      </div>
      <ul className="hero__areas">
        {EXPERTISE.map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
    </div>
  )
}

/** The frozen hero: no props, no reactivity, adaptive quality. */
function HeroView() {
  return (
    <>
      <SiteHeader />
      <main className="hero">
        <div className="hero__bg">
          <DriftHero />
        </div>
        <HeroCopy />
      </main>
    </>
  )
}

/** The tunable rig, for experimenting with the dynamics. */
function DialsView() {
  const [config, setConfig] = useState<DriftConfig>({ ...DRIFT_DEFAULTS })
  return (
    <>
      <SiteHeader />
      <main className="hero" style={{ background: config.background }}>
        <div className="hero__bg">
          <DriftField {...config} />
        </div>
        <HeroCopy />
      </main>
      <DriftControls value={config} onChange={setConfig} />
    </>
  )
}

function App() {
  const [view, setView] = useState<'hero' | 'dials'>('hero')

  return (
    <>
      {view === 'hero' ? <HeroView /> : <DialsView />}
      <button
        type="button"
        className="view-switch"
        onClick={() => setView((v) => (v === 'hero' ? 'dials' : 'hero'))}
      >
        {view === 'hero' ? 'Open dials' : 'Back to hero'}
      </button>
    </>
  )
}

export default App
