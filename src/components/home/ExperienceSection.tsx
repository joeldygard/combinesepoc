import SectionIntro from '../base/SectionIntro'
import { experience } from '../../content/site'
import { useEnterOnce } from '../../lib/motion'
import './ExperienceSection.css'

/**
 * The longevity beat: how long Combine has been doing this, and which
 * disciplines sit under one roof. It ends in links out rather than trying to
 * explain each discipline on the homepage.
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

          <ul className="exp__disciplines">
            {experience.disciplines.map((d) => (
              <li className="exp__discipline" key={d.id}>
                <h3 className="u-h4">
                  <a href={d.href} target="_blank" rel="noreferrer">
                    {d.title}
                  </a>
                </h3>
                <p className="u-body u-secondary">{d.detail}</p>
              </li>
            ))}
          </ul>
        </div>

        <ul className="exp__links">
          {experience.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
