import SectionIntro from '../base/SectionIntro'
import Button from '../base/Button'
import { platform } from '../../content/site'
import { useEnterOnce } from '../../lib/motion'
import './PlatformSection.css'

/**
 * The reusable delivery foundations. Each layer has a concrete responsibility;
 * the adjacent bespoke lane makes clear that the platform accelerates custom
 * engineering rather than replacing it.
 */
export default function PlatformSection() {
  const { ref, shown } = useEnterOnce<HTMLDivElement>()

  return (
    <section
      className="section field-brand plat"
      id="platform"
      aria-labelledby="platform-heading"
    >
      <div className="container">
        <SectionIntro
          id="platform-heading"
          eyebrow={platform.eyebrow}
          heading={platform.heading}
          intro={platform.support}
        />

        <div ref={ref} className={`plat__body enter${shown ? ' is-in' : ''}`}>
          <ol className="plat__foundations">
            {platform.foundations.map((foundation) => (
              <li className="plat__foundation" key={foundation.id}>
                <div className="plat__foundation-head">
                  <p className="u-mono plat__number">{foundation.index}</p>
                  <p className="u-eyebrow plat__role">{foundation.role}</p>
                </div>
                <h3 className="u-h3">{foundation.title}</h3>
                <p className="u-body u-secondary">{foundation.detail}</p>
                <ul className="u-mono plat__parts" aria-label={`${foundation.title} includes`}>
                  {foundation.parts.map((part) => (
                    <li key={part}>{part}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>

          <aside className="plat__specific" aria-labelledby="specific-heading">
            <p className="u-eyebrow plat__specific-eyebrow">
              {platform.specific.eyebrow}
            </p>
            <h3 className="u-h3" id="specific-heading">
              {platform.specific.heading}
            </h3>
            <p className="u-body u-secondary">{platform.specific.detail}</p>
            <ul className="u-mono plat__specific-parts">
              {platform.specific.parts.map((part) => (
                <li key={part}>{part}</li>
              ))}
            </ul>
          </aside>
        </div>

        <div className="plat__foot">
          <p className="u-small plat__trace">{platform.traceability}</p>
          <Button href={platform.cta.href} variant="primary" onDark>
            {platform.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
