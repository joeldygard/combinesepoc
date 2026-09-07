import type { ComponentType } from 'react'
import Button from '../base/Button'
import SectionIntro from '../base/SectionIntro'
import Hero from '../home/Hero'
import FinalCta from '../home/FinalCta'
import CaseStandin from '../svg/CaseStandin'
import Link from '../../lib/navigation'
import { caseBySlug, orderedCases } from '../../content/cases'
import { caseRoute, routePath, type Route } from '../../lib/routes'
import type { Slug } from '../../content/types'
import {
  build,
  products,
  proof,
  routes,
  serviceEntryPoints,
  services,
  site,
  stackLayers,
  type RouteId,
} from '../../content/site'
import './Pages.css'

type PageHeroProps = {
  eyebrow: string
  title: string
  support?: string
  body?: string
  display?: boolean
}

function PageHero({ eyebrow, title, support, body, display = false }: PageHeroProps) {
  return (
    <section className="pagehero field-inverse" id="top" aria-labelledby="page-title">
      <div className="container pagehero__inner">
        <p className="u-eyebrow sec-intro__eyebrow">
          <span className="sec-intro__marker" aria-hidden="true" />
          {eyebrow}
        </p>
        <h1
          className={display ? 'u-display pagehero__title' : 'u-h2 pagehero__title'}
          id="page-title"
        >
          {title}
        </h1>
        {support && <p className="u-lede pagehero__support">{support}</p>}
        {body && <p className="u-body pagehero__support">{body}</p>}
      </div>
    </section>
  )
}

function SectionLabel({ children, id }: { children: string; id: string }) {
  return (
    <h2 className="u-eyebrow sec-intro__eyebrow" id={id}>
      <span className="sec-intro__marker" aria-hidden="true" />
      {children}
    </h2>
  )
}

/*
 * The section link used to be rendered inside this map, which gave every block
 * its own identical anchor — four "Services" links in a row on the homepage,
 * all with the same accessible name and destination. Sections that need a link
 * render one `.section-link` after the grid, which is what the rest of the site
 * already did.
 */
function ContentBlocks({
  items,
  columns = 2,
  headingLevel = 3,
}: {
  items: readonly {
    eyebrow?: string
    index?: string
    title: string
    body?: string
  }[]
  columns?: 2 | 3
  headingLevel?: 2 | 3
}) {
  const Heading = `h${headingLevel}` as 'h2' | 'h3'
  return (
    <div className={`content-grid content-grid--${columns}`}>
      {items.map((item) => (
        <article className="content-block" key={`${item.eyebrow ?? item.index}-${item.title}`}>
          {(item.eyebrow || item.index) && (
            <p className="u-eyebrow content-block__eyebrow">
              {item.index ?? item.eyebrow}
            </p>
          )}
          <Heading className="u-h3">{item.title}</Heading>
          {item.body && <p className="u-body u-secondary">{item.body}</p>}
        </article>
      ))}
    </div>
  )
}

function StackSection({ detailed = false }: { detailed?: boolean }) {
  return (
    <section className="section field-brand" aria-labelledby="stack-heading">
      <div className="container">
        <SectionIntro eyebrow="The stack" heading="Four layers, one delivery." id="stack-heading" />
        <ol className="stack-list" role="list">
          {stackLayers.map((layer) => (
            <li className="stack-list__row" key={layer.name}>
              <span className="stack-list__name">{layer.name}</span>
              <span className="u-body stack-list__use">{layer.use}</span>
            </li>
          ))}
        </ol>
        <p className="u-lede stack-list__foot">
          {detailed
            ? 'Below all four sits the physical system: sensors, actuators, energy, time.'
            : 'Few firms work across all four.'}
        </p>
        {!detailed && (
          <p className="section-link">
            <Button href={routes.build.path} variant="quiet" onDark>
              How we build
            </Button>
          </p>
        )}
      </div>
    </section>
  )
}

/**
 * Project cards, from the case content layer.
 *
 * A card links to its own page when the case has been written up. A card-only
 * entry renders as a plain article, because there is nowhere honest to send the
 * click — see `hasPage` in content/types.ts, which makes that the same fact as
 * "this case has the content a page needs".
 *
 * The whole card is the target, but there is exactly one anchor: the title
 * carries the accessible name and a stretched overlay does the rest.
 */
function ProjectsGrid({ limit }: { limit?: number }) {
  const shown = typeof limit === 'number' ? orderedCases.slice(0, limit) : orderedCases
  const Heading = limit ? 'h3' : 'h2'
  return (
    <div className={`project-grid${limit ? ' project-grid--teasers' : ''}`}>
      {shown.map((entry, index) => {
        const industry = entry.industries.join(' · ')
        return (
          <article
            className={`project-card${entry.hasPage ? ' project-card--linked' : ''}`}
            key={entry.slug}
          >
            <div className="project-card__top">
              <p className="u-mono project-card__number">
                {String(index + 1).padStart(2, '0')}
              </p>
              <p className="u-eyebrow project-card__meta">{industry}</p>
            </div>
            <Heading className="u-h3 project-card__title">
              {entry.hasPage ? (
                <Link
                  className="project-card__link"
                  href={routePath(caseRoute(entry.slug))}
                >
                  {entry.title}
                </Link>
              ) : (
                entry.title
              )}
            </Heading>
            {entry.client && <p className="u-mono project-card__client">{entry.client}</p>}
          </article>
        )
      })}
    </div>
  )
}

/**
 * One case study. Reached only via a `case` route, which `resolveRoute` will
 * not produce for a slug that has no paged case — hence no not-found branch.
 */
function ProjectPage({ slug }: { slug: Slug }) {
  const entry = caseBySlug(slug)
  if (!entry) return null

  const industry = entry.industries.join(' · ')
  const published = entry.updatedAt ?? entry.publishedAt

  return (
    <>
      <PageHero eyebrow={industry} title={entry.title} support={entry.summary} />

      <section className="section field-default" aria-label="Project facts">
        <div className="container case-layout">
          <div className="case-figure">
            <CaseStandin image={entry.hero} />
          </div>
          <dl className="case-facts">
            {entry.client && (
              <div className="case-facts__row">
                <dt className="u-small u-secondary">Client</dt>
                <dd className="u-h4">{entry.client}</dd>
              </div>
            )}
            <div className="case-facts__row">
              <dt className="u-small u-secondary">Industry</dt>
              <dd className="u-h4">{industry}</dd>
            </div>
            {entry.result ? (
              <div className="case-facts__row">
                <dt className="u-small u-secondary">Result</dt>
                <dd>
                  <span className="u-metric">{entry.result}</span>
                  {entry.resultLabel && (
                    <span className="u-small u-secondary case-facts__note">
                      {entry.resultLabel}
                    </span>
                  )}
                </dd>
              </div>
            ) : (
              entry.resultLabel && (
                <div className="case-facts__row">
                  <dt className="u-small u-secondary">Outcome</dt>
                  <dd className="u-h4">{entry.resultLabel}</dd>
                </div>
              )
            )}
            {published && (
              <div className="case-facts__row">
                <dt className="u-small u-secondary">
                  {entry.updatedAt ? 'Updated' : 'Published'}
                </dt>
                <dd className="u-mono">
                  <time dateTime={published}>{published}</time>
                </dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      <section className="section field-subtle" aria-labelledby="capabilities-heading">
        <div className="container">
          <SectionIntro
            eyebrow="What it took"
            heading="Capabilities applied."
            id="capabilities-heading"
          />
          <ul className="case-caps" role="list">
            {entry.capabilities.map((capability) => (
              <li className="u-h4 case-caps__item" key={capability}>
                {capability}
              </li>
            ))}
          </ul>
          <p className="section-link">
            <Button href={routes.projects.path} variant="quiet">
              All projects
            </Button>
          </p>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

function HomePage() {
  return (
    <>
      <Hero />

      <section className="section field-default" aria-labelledby="what-heading">
        <div className="container">
          <SectionIntro
            eyebrow="What we do"
            heading="You already know which of these is yours."
            id="what-heading"
          />
          <ContentBlocks
            items={serviceEntryPoints.map((item) => ({
              eyebrow: item.eyebrow,
              title: item.heading,
              body: item.body,
            }))}
          />
          <p className="section-link">
            <Button href={routes.services.path} variant="quiet">
              Services
            </Button>
          </p>
        </div>
      </section>

      <StackSection />

      <section className="section field-subtle" aria-labelledby="projects-heading">
        <div className="container">
          <SectionIntro
            eyebrow="Projects"
            heading="What it looks like finished."
            id="projects-heading"
          />
          <ProjectsGrid limit={3} />
          <p className="section-link">
            <Button href={routes.projects.path} variant="quiet">
              See all projects
            </Button>
          </p>
        </div>
      </section>

      <section className="section field-default" aria-labelledby="proof-heading">
        <div className="container">
          <SectionLabel id="proof-heading">{proof.eyebrow}</SectionLabel>
          <dl className="proof-grid">
            {proof.metrics.map((metric) => (
              <div
                className={`proof-grid__metric${
                  metric.text ? ' proof-grid__metric--text' : ''
                }`}
                key={metric.label}
              >
                <dt className="u-small u-secondary">{metric.label}</dt>
                <dd className={metric.text ? undefined : 'u-metric'}>{metric.value}</dd>
              </div>
            ))}
          </dl>
          <p className="u-body u-secondary proof-grid__foot">{proof.infrastructure}</p>
        </div>
      </section>

      <FinalCta />
    </>
  )
}

function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title={services.headline} />
      <section className="section field-default" aria-labelledby="starting-heading">
        <div className="container">
          <SectionIntro
            eyebrow={services.startingPoint.eyebrow}
            heading={services.startingPoint.heading}
            intro={services.startingPoint.body}
            id="starting-heading"
          />
        </div>
      </section>
      <section className="section field-subtle" aria-labelledby="starts-heading">
        <div className="container">
          <SectionLabel id="starts-heading">How we start</SectionLabel>
          <ContentBlocks items={services.starts} columns={3} />
        </div>
      </section>
      <section className="section field-default" aria-labelledby="engage-heading">
        <div className="container">
          <SectionLabel id="engage-heading">How we engage</SectionLabel>
          <ContentBlocks items={services.engagements} />
          <p className="section-link">
            <Button href={routes.build.path} variant="quiet">
              How we build
            </Button>
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Projects" title="Every project we can show you." />
      <section className="section field-default" aria-label="Projects">
        <div className="container">
          <ProjectsGrid />
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function BuildPage() {
  return (
    <>
      <PageHero
        eyebrow="How we build"
        title={build.headline}
        support={build.support}
        body={build.intro}
        display
      />
      <StackSection detailed />
      {/*
        Beat 3. This was the last section on the page, under an eyebrow reading
        "Why the combination is rare" — the writer announcing his own thesis on
        top of the argument that earns it. The argument runs here instead, where
        the reader has just seen the four layers and is owed a reason why anyone
        would have all of them.
      */}
      <section className="section field-default" aria-labelledby="rarity-heading">
        <div className="container">
          <SectionIntro
            eyebrow={build.rarity.eyebrow}
            heading={build.rarity.heading}
            intro={build.rarity.body}
            id="rarity-heading"
          />
        </div>
      </section>
      <section className="section field-subtle" aria-labelledby="origin-heading">
        <div className="container">
          <SectionIntro
            eyebrow={build.origin.eyebrow}
            heading={build.origin.heading}
            intro={build.origin.body}
            id="origin-heading"
          />
        </div>
      </section>
      <section className="section field-default" aria-labelledby="trace-heading">
        <div className="container">
          <SectionIntro
            eyebrow={build.traceability.eyebrow}
            heading={build.traceability.heading}
            intro={build.traceability.body}
            id="trace-heading"
          />
        </div>
      </section>
      <section className="section field-brand" aria-labelledby="platform-heading">
        <div className="container">
          <SectionIntro
            eyebrow={build.platform.eyebrow}
            heading={build.platform.heading}
            id="platform-heading"
          />
          <div className="platform-copy">
            {build.platform.paragraphs.map((paragraph) => (
              <p className="u-body u-secondary platform-copy__item" key={paragraph}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title={products.headline} />
      <section className="section field-default" aria-labelledby="sympathy-heading">
        <div className="container">
          <SectionIntro
            eyebrow={products.sympathy.eyebrow}
            heading={products.sympathy.heading}
            intro={products.sympathy.body}
            id="sympathy-heading"
          />
          <p className="section-link">
            <Button href={products.sympathy.cta.href} variant="quiet">
              {products.sympathy.cta.label}
            </Button>
          </p>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Engineering notes."
        support="Depth lives here and only here."
      />
      <FinalCta />
    </>
  )
}

function CompanyPage() {
  return (
    <>
      <PageHero eyebrow="Company" title="About Combine." />
      <section className="section field-default" aria-labelledby="company-heading">
        <div className="container">
          <SectionLabel id="company-heading">Combine</SectionLabel>
          <dl className="proof-grid proof-grid--company">
            <div className="proof-grid__metric">
              <dt className="u-small u-secondary">Engineers</dt>
              <dd className="u-metric">~40</dd>
            </div>
            <div className="proof-grid__metric">
              <dt className="u-small u-secondary">Hold a PhD</dt>
              <dd className="u-metric">~20%</dd>
            </div>
            <div className="proof-grid__metric proof-grid__metric--text">
              <dt className="u-small u-secondary">Offices</dt>
              <dd>{site.offices.join(' · ')}</dd>
            </div>
          </dl>
        </div>
      </section>
      <FinalCta />
    </>
  )
}

function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to an engineer." />
      <section className="section field-default" aria-labelledby="contact-heading">
        <div className="container contact-layout">
          <SectionIntro
            eyebrow="What comes next"
            heading="Tell us what isn't working."
            intro="Start with the operation, the data or the decision that needs to improve."
            id="contact-heading"
          >
            <p className="section-link">
              <Button href={`mailto:${site.email}`} variant="primary">
                {site.email}
              </Button>
            </p>
          </SectionIntro>
          <aside className="contact-offices" aria-labelledby="offices-heading">
            <p className="u-eyebrow" id="offices-heading">Offices</p>
            <ul className="u-h4" role="list">
              {site.offices.map((office) => <li key={office}>{office}</li>)}
            </ul>
          </aside>
        </div>
      </section>
    </>
  )
}

const pages: Record<RouteId, ComponentType> = {
  home: HomePage,
  services: ServicesPage,
  projects: ProjectsPage,
  build: BuildPage,
  products: ProductsPage,
  insights: InsightsPage,
  company: CompanyPage,
  contact: ContactPage,
}

export default function PageForRoute({ route }: { route: Route }) {
  if (route.kind === 'case') return <ProjectPage slug={route.slug} />

  const Page = pages[route.id]
  return <Page />
}
