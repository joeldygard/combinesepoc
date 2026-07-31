import SectionIntro from '../base/SectionIntro'
import Button from '../base/Button'
import CaseStandin from '../svg/CaseStandin'
import '../svg/CaseStandin.css'
import { featuredCase, secondaryCases } from '../../content/cases'
import { work } from '../../content/site'
import { useEnterOnce } from '../../lib/motion'
import type { CaseStudy } from '../../content/types'
import './SelectedWork.css'

function CaseTags({ tags }: { tags: string[] }) {
  return (
    <ul className="u-mono work__tags" aria-label="Disciplines">
      {tags.map((tag) => (
        <li key={tag}>{tag}</li>
      ))}
    </ul>
  )
}

/** One featured case, two secondary in an asymmetric grid. No carousel. */
function SecondaryCase({ study }: { study: CaseStudy }) {
  return (
    <article className="work__card">
      <div className="work__media work__media--small">
        <CaseStandin image={study.hero} />
      </div>
      <div className="work__body">
        {study.result && (
          <p className="u-metric work__result">
            {study.result}
            <span className="u-small u-secondary work__result-label">
              {study.resultLabel}
            </span>
          </p>
        )}
        <h3 className="u-h4">{study.title}</h3>
        <p className="u-body u-secondary">{study.summary}</p>
        {study.client && <p className="u-mono work__client">{study.client}</p>}
        <CaseTags tags={study.tags} />
      </div>
    </article>
  )
}

export default function SelectedWork() {
  const { ref, shown } = useEnterOnce<HTMLDivElement>()
  return (
    <section className="section field-subtle" id="work" aria-labelledby="work-heading">
      <div className="container">
        <SectionIntro id="work-heading" eyebrow={work.eyebrow} heading={work.heading} />

        <div ref={ref} className={`work enter${shown ? ' is-in' : ''}`}>
          <article className="work__featured">
            <div className="work__media">
              <CaseStandin image={featuredCase.hero} />
            </div>
            <div className="work__body work__body--featured">
              {featuredCase.result && (
                <p className="u-metric work__result">
                  {featuredCase.result}
                  <span className="u-small u-secondary work__result-label">
                    {featuredCase.resultLabel}
                  </span>
                </p>
              )}
              <h3 className="u-h3">{featuredCase.title}</h3>
              <p className="u-body u-secondary">{featuredCase.summary}</p>
              {featuredCase.client && (
                <p className="u-mono work__client">{featuredCase.client}</p>
              )}
              <CaseTags tags={featuredCase.tags} />
            </div>
          </article>

          <div className="work__secondary">
            {secondaryCases.map((study) => (
              <SecondaryCase study={study} key={study.slug} />
            ))}
          </div>
        </div>

        <div className="work__cta">
          <Button href={work.cta.href} variant="quiet">
            {work.cta.label}
          </Button>
        </div>
      </div>
    </section>
  )
}
