import type { Article } from './types'

/**
 * Insight posts stay empty until the editorial prerequisites in the supplied
 * website copy are met: named authors, an agreed cadence and publishable copy.
 */
export const articles: Article[] = []

export const orderedArticles = [...articles].sort(
  (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug),
)

export const featuredArticle = orderedArticles.find((article) => article.featured)
export const listedArticles = orderedArticles.slice(0, 3)
