import SectionIntro from '../base/SectionIntro'
import Button from '../base/Button'
import { platform } from '../../content/site'
import { useEnterOnce } from '../../lib/motion'
import './PlatformSection.css'

/**
 * The delivery platform, presented as two named layers inside a stack that runs
 * from operational data to the customer's application.
 *
 * The stack is semantic HTML — an ordered list — rather than an SVG. The layers
 * are text with a direction, so a list reflows on narrow viewports, scales with
 * the user's font size and reads correctly to a screen reader, none of which is
 * true of text inside a fixed viewBox.
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
          <div className="plat__stack-wrap">
            <h3 className="u-eyebrow plat__stack-heading" id="plat-stack">
              From data to application
            </h3>
            <ol className="plat__stack" aria-labelledby="plat-stack">
              {platform.stack.map((layer) => (
                <li
                  className={`plat__layer${layer.owned ? ' plat__layer--owned' : ''}`}
                  key={layer.id}
                >
                  <p className="u-mono plat__layer-label">
                    {layer.label}
                    {layer.owned && (
                      <span className="plat__badge">Combine</span>
                    )}
                  </p>
                  <p className="u-small plat__layer-parts">
                    {layer.parts.join(' · ')}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div className="plat__aside">
            <p className="u-lede">{platform.closing}</p>
            <p className="u-small plat__trace">{platform.traceability}</p>
          </div>
        </div>

        <div className="plat__cta">
          <Button href={platform.cta.href} variant="primary" onDark>
            {platform.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
