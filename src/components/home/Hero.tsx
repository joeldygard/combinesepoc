import { useEffect, useRef, useState } from 'react'
import DriftHero from '../DriftHero'
import { CombineLogotype } from '../CombineLogo'
import Button from '../base/Button'
import { hero } from '../../content/site'
import { usePrefersReducedMotion } from '../../lib/motion'
import './Hero.css'

/** Below this fraction of the hero remaining visible, the field fades out. */
const FADE_BELOW = 0.55

/**
 * The simulation belongs to the hero and nowhere else.
 *
 * The fade is driven by how much of the hero is still on screen, observed with
 * coarse thresholds — not by a sentinel element. An absolutely-positioned
 * sentinel near the hero's foot is already inside the viewport at scroll 0, so
 * it reports "leaving" on the first callback and the field never appears.
 *
 * Simulation state stays uncoupled from scroll: only the wrapper's opacity
 * changes, and DriftHero's own observer stops the canvas once it leaves view.
 */
export default function Hero() {
  const section = useRef<HTMLElement | null>(null)
  const [leaving, setLeaving] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return
    const el = section.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        setLeaving(entry.intersectionRatio < FADE_BELOW)
      },
      { threshold: [0, 0.15, 0.3, 0.45, 0.55, 0.7, 0.85, 1] },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  return (
    <section
      className="hero field-inverse"
      id="top"
      ref={section}
      aria-labelledby="hero-heading"
    >
      <div className={`hero__sim${leaving ? ' is-leaving' : ''}`}>
        <DriftHero />
      </div>

      <div className="container hero__inner">
        <CombineLogotype className="hero__logotype" />

        <h1 className="u-display hero__headline" id="hero-heading">
          {hero.headline}
        </h1>

        <p className="u-lede hero__support">{hero.support}</p>

        <p className="u-h4 hero__statement">{hero.statement}</p>

        <p className="u-body hero__support">{hero.body}</p>

        <div className="hero__actions">
          <Button href={hero.primaryCta.href} variant="primary" onDark>
            {hero.primaryCta.label}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" onDark>
            {hero.secondaryCta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
