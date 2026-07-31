import Button from '../base/Button'
import { finalCta } from '../../content/site'
import './FinalCta.css'

/**
 * Black field. A static crop of the particle motif — no simulation, no pointer
 * interaction, so the strongest visual idea is echoed rather than repeated.
 */
export default function FinalCta() {
  return (
    <section
      className="section field-inverse fcta"
      id="contact"
      aria-labelledby="contact-heading"
    >
      <div className="fcta__motif" aria-hidden="true">
        <svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
          {/*
            A frozen fragment of the hero field: fixed coordinates, no animation,
            no randomness. Bonds and nodes only.
          */}
          <g className="fcta__links">
            <path d="M42 58 L118 96M118 96 L196 62M196 62 L268 104M268 104 L342 74M118 96 L104 158M196 62 L214 132M268 104 L296 160M104 158 L214 132" />
          </g>
          <g className="fcta__nodes">
            {[
              [42, 58, 3.2],
              [118, 96, 4.4],
              [196, 62, 3.8],
              [268, 104, 4.6],
              [342, 74, 2.8],
              [104, 158, 3.4],
              [214, 132, 4],
              [296, 160, 3],
            ].map(([cx, cy, r]) => (
              <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
            ))}
          </g>
        </svg>
      </div>

      <div className="container fcta__inner">
        <p className="u-eyebrow fcta__eyebrow">{finalCta.eyebrow}</p>
        <h2 className="u-h2 fcta__headline" id="contact-heading">
          {finalCta.headline}
        </h2>
        <p className="u-lede u-secondary fcta__support">{finalCta.support}</p>
        <div className="fcta__actions">
          <Button href={finalCta.primaryCta.href} variant="primary" onDark>
            {finalCta.primaryCta.label}
          </Button>
          <a className="fcta__email u-mono" href={`mailto:${finalCta.secondary}`}>
            {finalCta.secondary}
          </a>
        </div>
      </div>
    </section>
  )
}
