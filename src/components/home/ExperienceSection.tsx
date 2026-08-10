import SectionIntro from '../base/SectionIntro'
import { experience } from '../../content/site'
import { useEnterOnce } from '../../lib/motion'
import './ExperienceSection.css'

/**
 * Company history is presented as inputs to the delivery method, not as an
 * awards wall. The labels on each practice tie accumulated judgement back to a
 * concrete part of the product path.
 */
export default function ExperienceSection() {
  const { ref, shown } = useEnterOnce<HTMLDivElement>()

  return (
    <section
      className="section field-default"
      id="experience"
      aria-labelledby="experience-heading"
    >
      <div className="container">
        <SectionIntro
          id="experience-heading"
          eyebrow={experience.eyebrow}
          heading={experience.heading}
          intro={experience.support}
        />

        <div ref={ref} className={`exp enter${shown ? ' is-in' : ''}`}>
          <dl className="exp__facts">
            {experience.facts.map((fact) => (
              <div className="exp__fact" key={fact.label}>
                <dt className="u-small u-secondary exp__fact-label">{fact.label}</dt>
                <dd className="exp__fact-value">{fact.value}</dd>
              </div>
            ))}
          </dl>

          <ol className="exp__practices">
            {experience.practices.map((practice) => (
              <li className="exp__practice" key={practice.id}>
                <div className="exp__practice-head">
                  <p className="u-mono exp__index">{practice.index}</p>
                  <p className="u-mono exp__destination">
                    Carried into <span>{practice.carriedInto}</span>
                  </p>
                </div>
                <h3 className="u-h4">{practice.title}</h3>
                <p className="u-body u-secondary">{practice.detail}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="exp__disciplines">
          <p className="u-eyebrow exp__disciplines-label">One integrated team</p>
          <ul>
            {experience.disciplines.map((discipline) => (
              <li key={discipline.href}>
                <a href={discipline.href} target="_blank" rel="noreferrer">
                  {discipline.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
