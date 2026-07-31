import type { CaseStudy } from './types'

/*
 * Every figure and detail below restates something Combine already publishes.
 * Sources are listed per entry; nothing is inflated and no client is named
 * beyond what is already public.
 */
export const cases: CaseStudy[] = [
  {
    // combine.se/cases/uncovering-ocean-secrets-by-combining-video-analysis-...
    title: 'Twenty years of underwater video made usable for marine research.',
    slug: 'koster-seafloor-observatory',
    summary:
      'Combine built the data infrastructure, annotation workflow, computer-vision models and researcher-facing tools used to identify marine species in historical footage from Kosterhavet. The system filters footage with little relevant activity and directs expert attention toward material worth reviewing.',
    client: 'Ocean Data Factory Sweden',
    industries: ['Marine research'],
    capabilities: ['Computer vision', 'Data infrastructure', 'Researcher tools'],
    result: '5×',
    resultLabel: 'less inspection time',
    tags: ['COMPUTER VISION', 'DATA INFRASTRUCTURE', 'RESEARCHER TOOLS'],
    featured: true,
    featuredOrder: 1,
    hero: {
      kind: 'svg-standin',
      standin: 'ocean',
      intent:
        'Underwater video frame with detection boxes, species markers and a scrubbable timeline',
    },
    publishedAt: '2022-05-11',
    updatedAt: '2024-11-19',
    seo: {
      description:
        'Data infrastructure, annotation workflow and computer-vision models that cut marine video inspection time fivefold.',
    },
  },
  {
    // combine.se/blog/sewage-system-management-what-the-data-reveals
    title: 'Existing pump-station data turned into operational indicators.',
    slug: 'pump-station-indicators',
    summary:
      'Historical pump current, water-level and weather data was used to estimate flow, track pump performance, identify faulty signals and detect developing overflow conditions. The analyses were designed from the start to work against live data rather than remain retrospective reports.',
    client: 'With SmartWater at Sweco',
    industries: ['Water infrastructure'],
    capabilities: ['Sensor data', 'Physical modelling', 'Real-time analysis'],
    result: '1B+',
    resultLabel: 'measurements analyzed',
    tags: ['SENSOR DATA', 'PHYSICAL MODELLING', 'REAL-TIME ANALYSIS'],
    featured: false,
    featuredOrder: 2,
    hero: {
      kind: 'svg-standin',
      standin: 'flow-network',
      intent:
        'Pump-station network with pump nodes, signal traces and one station in a developing overflow state',
    },
    publishedAt: '2026-04-07',
    seo: {
      description:
        'Flow estimation, pump-efficiency tracking, data-quality monitoring and early overflow warning from existing pump-station signals.',
    },
  },
  {
    // combine.se/blog/the-foundations-for-ai-at-sea-from-data-to-decisions
    title: 'Historical cargo operations used to support new loading plans.',
    slug: 'acht-cargo-planning',
    summary:
      "Combine developed a proof-of-concept model that retrieves relevant historical cargo plans and recommends them as starting points for new operations. An API connected the model to Kockumation's Loadmaster X5, with an interface designed around officers' existing planning workflow and tested in a maritime simulator.",
    client: 'ACHT 2.0 — Trafikverket, RISE, Kockumation',
    industries: ['Maritime'],
    capabilities: ['Decision support', 'API integration', 'Data modelling'],
    resultLabel: 'Tested with bridge officers in simulator',
    tags: ['MARITIME', 'API INTEGRATION', 'DECISION SUPPORT'],
    featured: false,
    featuredOrder: 3,
    hero: {
      kind: 'svg-standin',
      standin: 'vessel',
      intent:
        'Vessel cross-section with tank blocks, pump and valve routes, and an API output panel',
    },
    publishedAt: '2026-03-11',
    seo: {
      description:
        "A proof-of-concept cargo-planning model connected to Kockumation's Loadmaster X5 and tested with bridge officers in a simulator.",
    },
  },
]

/** Stable ordering: featured first, then explicit order, then slug. */
export const orderedCases = [...cases].sort(
  (a, b) =>
    Number(b.featured) - Number(a.featured) ||
    (a.featuredOrder ?? 99) - (b.featuredOrder ?? 99) ||
    a.slug.localeCompare(b.slug),
)

export const featuredCase = orderedCases[0]
export const secondaryCases = orderedCases.slice(1, 3)
