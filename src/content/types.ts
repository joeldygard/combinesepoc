/*
 * Normalized domain models.
 *
 * Presentation components consume ONLY these shapes. Local modules under
 * src/content/ are today's source; a CMS becomes tomorrow's. The mapping layer
 * changes, the models and components do not:
 *
 *   local content  → normalized domain model → components
 *   Sanity content → normalized domain model → components
 */

export type Slug = string

export type Seo = {
  /** Falls back to the entry title when absent. */
  title?: string
  description: string
  /** Path under /social/, resolved by lib/seo.ts. */
  image?: string
}

export type ImageRef = {
  /** POC entries carry no bitmap; `kind` selects the SVG stand-in to render. */
  kind: 'svg-standin'
  /** Describes the intended final asset, for reviewers and for alt text. */
  intent: string
  standin: 'ocean' | 'flow-network' | 'rail-measurement' | 'vessel'
}

type CaseStudyShared = {
  title: string
  slug: Slug
  client?: string
  industries: string[]
  result?: string
  resultLabel?: string
  tags: string[]
  featured: boolean
  featuredOrder?: number
  hero: ImageRef
  /** Optional for private/internal case studies without a public publication date. */
  publishedAt?: string
  updatedAt?: string
  seo: Seo
}

/**
 * A case that has been written up, and therefore gets its own route.
 *
 * The fields a detail page cannot render without are required here rather than
 * optional, so `hasPage: true` and "actually has enough content for a page"
 * cannot drift apart. Adding a route is a type change, not a judgement call.
 */
export type PagedCase = CaseStudyShared & {
  hasPage: true
  summary: string
  capabilities: string[]
}

/**
 * A case that exists as a card only: the client and the headline are public but
 * no write-up has been approved yet. It appears in the grid, links nowhere, and
 * never produces a route — so the site cannot grow a thin page by accident.
 */
export type StubCase = CaseStudyShared & {
  hasPage: false
  summary?: string
  capabilities?: string[]
}

export type CaseStudy = PagedCase | StubCase

export type Article = {
  title: string
  slug: Slug
  excerpt: string
  category: string
  tags: string[]
  /** References Author.id. */
  author: string
  publishedAt: string
  updatedAt?: string
  readingTimeMinutes: number
  featured: boolean
  seo: Seo
}

/**
 * `team` covers group bylines. Real named contributors become `person` entries
 * with their own pages, which is when Person JSON-LD becomes appropriate.
 */
export type Author = {
  id: string
  name: string
  kind: 'person' | 'team'
  discipline: string
  url?: string
}

export type CapabilityGroup = {
  id: string
  title: string
  description: string
  items: string[]
}

export type NavItem = { label: string; href: string }

export type ProofBlock = {
  metric: string
  label: string
  detail: string
  /** Set when the metric is a phrase rather than a figure, so it is typeset smaller. */
  textual?: boolean
}

export type SystemStage = {
  id: string
  index: number
  label: string
  detail: string
  /** The disciplines the stage draws on, shown as a hairline-separated list. */
  disciplines: string[]
}

/** One named layer of the delivery stack, from raw data to the finished product. */
export type StackLayer = {
  id: string
  label: string
  parts: string[]
  /** Combine's own named layers are emphasised; the rest are context. */
  owned?: boolean
}
