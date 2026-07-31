import { site } from '../content/site'
import { orderedArticles } from '../content/articles'
import { getAuthor } from '../content/authors'

/**
 * JSON-LD builders. Nothing here invents ratings, reviews, awards or business
 * figures — only facts Combine already publishes.
 */

const absolute = (path: string) => new URL(path, site.url).toString()

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': absolute('/#organization'),
    name: site.name,
    url: site.url,
    email: site.email,
    telephone: site.phone,
    foundingDate: site.founded,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    sameAs: [...site.social],
  }
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absolute('/#website'),
    name: site.name,
    url: site.url,
    inLanguage: 'en-GB',
    publisher: { '@id': absolute('/#organization') },
  }
}

/** Ready for the Edge index and article routes; unused on the homepage. */
export function blogPostingSchema(slug: string) {
  const article = orderedArticles.find((a) => a.slug === slug)
  if (!article) throw new Error(`Unknown article slug: ${slug}`)
  const author = getAuthor(article.author)
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.seo.description,
    url: absolute(`/edge/${article.slug}/`),
    datePublished: article.publishedAt,
    dateModified: article.updatedAt ?? article.publishedAt,
    articleSection: article.category,
    keywords: article.tags,
    author: {
      '@type': author.kind === 'person' ? 'Person' : 'Organization',
      name: author.name,
    },
    publisher: { '@id': absolute('/#organization') },
  }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((entry, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: entry.name,
      item: absolute(entry.path),
    })),
  }
}
