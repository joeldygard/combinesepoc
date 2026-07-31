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
  standin: 'ocean' | 'flow-network' | 'vessel'
}

export type CaseStudy = {
  title: string
  slug: Slug
  summary: string
  client?: string
  industries: string[]
  capabilities: string[]
  result?: string
  resultLabel?: string
  tags: string[]
  featured: boolean
  featuredOrder?: number
  hero: ImageRef
  publishedAt: string
  updatedAt?: string
  seo: Seo
}

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
