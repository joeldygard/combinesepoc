import SectionIntro from '../base/SectionIntro'
import { readiness } from '../../content/site'
import { useEnterOnce } from '../../lib/motion'
import './ReadinessSection.css'

/**
 * The hand-off from the hero promise to the delivery story. The open input is
 * visually distinct from the established path, so the diagram communicates
 * what the customer contributes without relying on a slogan.
 */
export default function ReadinessSection() {
  const { ref, shown } = useEnterOnce<HTMLDivElement>()

  return (
    <section
      className="section field-default readiness"
      id="delivery-path"
      aria-labelledby="readiness-heading"
    >
      <div className="container">
        <SectionIntro
          id="readiness-heading"
          eyebrow={readiness.eyebrow}
          heading={readiness.heading}
          intro={readiness.support}
        />

        <div
          ref={ref}
          className={`readiness__diagram enter${shown ? ' is-in' : ''}`}
        >
          <div className="readiness__input">
            <p className="u-eyebrow readiness__input-label">{readiness.input.label}</p>
            <h3 className="u-h3">{readiness.input.title}</h3>
            <p className="u-small u-secondary">{readiness.input.detail}</p>
            <span className="readiness__socket" aria-hidden="true" />
          </div>

          <div className="readiness__path">
            <div className="readiness__path-head">
              <p className="u-eyebrow">Delivery path</p>
              <p className="u-mono readiness__state">
                <span aria-hidden="true" />
                Established foundation
              </p>
            </div>

            <ol className="readiness__stages">
              {readiness.stages.map((stage) => (
                <li className="readiness__stage" key={stage.id}>
                  <p className="u-mono readiness__index">{stage.index}</p>
                  <h3 className="u-h4">{stage.title}</h3>
                  <p className="u-small u-secondary">{stage.detail}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <p className="u-lede readiness__closing">{readiness.closing}</p>
      </div>
    </section>
  )
}
