import { useEffect, useId, useState } from 'react'
import { CombineLogotype } from '../CombineLogo'
import symbolUrl from '../../assets/combine-symbol.png'
import { primaryNav, navCta } from '../../content/site'
import './SiteHeader.css'

/**
 * Attached and transparent over the hero; detaches into a floating pill once
 * past it, with the symbol becoming a black coin that overhangs the bar.
 *
 * No elaborate scroll animation: one class flip at a threshold, and the state
 * is only written when the threshold is actually crossed, so scrolling costs
 * nothing. The menu markup is always in the DOM and toggled with `hidden`, so
 * the links exist without client JavaScript.
 */
export default function SiteHeader() {
  const [detached, setDetached] = useState(false)
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > window.innerHeight * 0.8
      setDetached((cur) => (cur === past ? cur : past))
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
    <header className={`hdr${detached ? ' hdr--detached' : ''}`}>
      <div className="hdr__inner container container--wide">
        <a className="hdr__brand" href="#top" aria-label="Combine, home">
          {/* Becomes the overhanging coin in the detached state. */}
          <span className="hdr__coin">
            <img
              className="hdr__symbol"
              src={symbolUrl}
              alt=""
              width={636}
              height={1024}
            />
          </span>
          <CombineLogotype className="hdr__logotype" label="" />
        </a>

        <nav className="hdr__nav" aria-label="Primary">
          <ul className="hdr__links">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <a className="hdr__cta" href={navCta.href}>
          {navCta.label}
        </a>

        <button
          type="button"
          className="hdr__toggle"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="hdr__toggle-text">{open ? 'Close' : 'Menu'}</span>
          <span className={`hdr__glyph${open ? ' is-open' : ''}`} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div className="hdr__panel" id={panelId} hidden={!open}>
        <nav className="container" aria-label="Primary, mobile">
          <ul>
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                className="hdr__panel-cta"
                href={navCta.href}
                onClick={() => setOpen(false)}
              >
                {navCta.label}
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
