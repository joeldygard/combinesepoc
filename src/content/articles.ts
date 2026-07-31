import type { Article } from './types'

/** Reading times are POC estimates, not measured from final copy. */
export const articles: Article[] = [
  {
    title: 'What a billion sensor readings reveal about wastewater systems',
    slug: 'billion-sensor-readings-wastewater',
    excerpt:
      'Sewage networks generate millions of data points that are rarely used. Working through more than a billion readings showed where the signal actually sits, and which measurements can carry an operational decision.',
    category: 'AI & Data Science',
    tags: ['Sensor data', 'Physical modelling'],
    author: 'data-science',
    publishedAt: '2026-04-07',
    readingTimeMinutes: 9,
    featured: true,
    seo: {
      description:
        'What more than a billion wastewater sensor readings reveal about which measurements can carry an operational decision.',
    },
  },
  {
    title: 'Designing AI analysis for eventual real-time operation',
    slug: 'designing-analysis-for-real-time',
    excerpt:
      'An analysis that only works on a finished dataset will not survive contact with an operating system. Designing for latency, gaps and drift from the start changes the modelling choices.',
    category: 'AI & Data Science',
    tags: ['Real-time', 'Validation'],
    author: 'data-science',
    publishedAt: '2026-03-24',
    readingTimeMinutes: 7,
    featured: false,
    seo: {
      description:
        'Designing data analysis so it survives latency, gaps and drift once it has to run against an operating system.',
    },
  },
  {
    title: 'From data to decisions at sea',
    slug: 'from-data-to-decisions-at-sea',
    excerpt:
      'Cargo handling on chemical tankers is safety-critical and tightly timed. Connecting loading plans, pump logs and voyage reports is the groundwork before any optimization is credible.',
    category: 'AI & Data Science',
    tags: ['Maritime', 'API integration'],
    author: 'data-science',
    publishedAt: '2026-03-11',
    readingTimeMinutes: 8,
    featured: false,
    seo: {
      description:
        'Connecting loading plans, pump logs and voyage reports into a model that can support decisions during cargo operations.',
    },
  },
  {
    title: 'Why simulation should come before drone hardware',
    slug: 'simulation-before-drone-hardware',
    excerpt:
      'Buying airframes early rarely produces an advantage. Modelling the mission, the sensors and the control problem first tells you whether the hardware decision matters at all.',
    category: 'Control Systems',
    tags: ['Simulation', 'Control engineering'],
    author: 'control-systems',
    publishedAt: '2026-02-04',
    readingTimeMinutes: 6,
    featured: false,
    seo: {
      description:
        'Why modelling the mission and the control problem should precede any drone hardware purchase.',
    },
  },
]

/** Stable ordering: newest first, slug as tiebreaker. */
export const orderedArticles = [...articles].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug),
)

export const featuredArticle = orderedArticles.find((a) => a.featured) ?? orderedArticles[0]
export const listedArticles = orderedArticles.filter((a) => a !== featuredArticle).slice(0, 3)
