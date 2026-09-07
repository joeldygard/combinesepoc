import type { CaseStudy, PagedCase } from './types'

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
    hasPage: true,
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
    // redemptor.se — public product description; Combine contribution is internal.
    title: 'Track measurement moved from the machine into one field workflow.',
    slug: 'redemptor-track-measurement',
    summary:
      'A connected system for loaded track-geometry measurement brings machine control, sensor acquisition and the operator interface together at the point of work, supporting a direct route from a completed track job to inspection material.',
    client: 'Redemptor',
    industries: ['Rail infrastructure'],
    capabilities: ['Control systems', 'Sensor integration', 'Operator interface'],
    resultLabel: 'Measurement captured at the point of work',
    tags: ['CONTROL SYSTEMS', 'SENSOR INTEGRATION', 'OPERATOR INTERFACE'],
    featured: false,
    featuredOrder: 2,
    hasPage: true,
    hero: {
      kind: 'svg-standin',
      standin: 'rail-measurement',
      intent:
        'Rail measurement vehicle with track geometry sensors, live measurement traces and a field report',
    },
    seo: {
      description:
        'A field system connecting track measurement, machine control, sensor acquisition and the operator workflow.',
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
    featuredOrder: 3,
    hasPage: true,
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
    /*
     * Card-only. Restates exactly what the site already published for this
     * client and nothing more; no write-up has been approved, so `hasPage` is
     * false, the card does not link and no route is generated.
     */
    title: 'Loading liquid fuel with less time in port.',
    slug: 'acht-liquid-fuel-loading',
    client: 'ACHT',
    industries: ['Ports and logistics'],
    tags: [],
    featured: false,
    featuredOrder: 4,
    hasPage: false,
    hero: {
      kind: 'svg-standin',
      standin: 'vessel',
      intent:
        'Tanker at a loading berth with flow rate, ullage and berth-occupancy readings',
    },
    seo: {
      description: 'Loading liquid fuel with less time in port.',
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

/**
 * The only cases that become routes. Everything that enumerates project pages —
 * the router, the prerenderer, the route shells, the sitemap — reads this list,
 * so a case gains or loses a URL by editing content and nothing else.
 */
export const pagedCases: PagedCase[] = orderedCases.filter(
  (entry): entry is PagedCase => entry.hasPage,
)

export const caseBySlug = (slug: string): PagedCase | undefined =>
  pagedCases.find((entry) => entry.slug === slug)
