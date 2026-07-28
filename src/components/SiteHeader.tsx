import { useEffect, useState } from 'react'
import { CombineLogotype } from './CombineLogo'
import symbolUrl from '../assets/combine-symbol.png'
import './SiteHeader.css'

/** Mirrors the live navigation on combine.se. */
const SECTIONS = [
  { label: 'Expertise', href: 'https://combine.se/areas-of-expertise/' },
  { label: 'What we offer', href: 'https://combine.se/what-we-offer/' },
  { label: 'Cases', href: 'https://combine.se/cases/' },
  { label: 'Edge', href: 'https://combine.se/edge/' },
  { label: 'Career', href: 'https://combine.teamtailor.com/' },
]

export default function SiteHeader() {
  const [lifted, setLifted] = useState(false)
  const [open, setOpen] = useState(false)

  // Only touches state on a threshold crossing, so scrolling doesn't re-render.
  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 24
      setLifted((cur) => (cur === next ? cur : next))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`hdr${lifted ? ' hdr--lifted' : ''}`}>
      <nav className="hdr__bar" aria-label="Primary">
        {/* The coin breaks out of the pill vertically — see hdr__badge in the CSS. */}
        <a className="hdr__badge" href="https://combine.se/" aria-label="Combine, home">
          <img className="hdr__symbol" src={symbolUrl} alt="" width={636} height={1024} />
        </a>
        <span className="hdr__lockup" aria-hidden="true">
          <CombineLogotype className="hdr__logotype" label="" />
        </span>

        <ul className="hdr__links">
          {SECTIONS.map((s) => (
            <li key={s.label}>
              <a href={s.href}>{s.label}</a>
            </li>
          ))}
        </ul>

        <a className="hdr__cta" href="https://combine.se/get-in-touch">
          Get in touch
        </a>

        <button
          type="button"
          className="hdr__burger"
          aria-expanded={open}
          aria-controls="hdr-panel"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="hdr__burger-label">Menu</span>
          <span className={`hdr__glyph${open ? ' is-open' : ''}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </nav>

      <div id="hdr-panel" className={`hdr__panel${open ? ' is-open' : ''}`} hidden={!open}>
        <ul>
          {SECTIONS.map((s) => (
            <li key={s.label}>
              <a href={s.href} onClick={() => setOpen(false)}>
                {s.label}
              </a>
            </li>
          ))}
          <li>
            <a
              className="hdr__panel-cta"
              href="https://combine.se/get-in-touch"
              onClick={() => setOpen(false)}
            >
              Get in touch
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
