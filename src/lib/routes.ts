import { routes, type RouteId } from '../content/site'
import { caseBySlug, pagedCases } from '../content/cases'
import type { Slug } from '../content/types'

/**
 * A resolved public route.
 *
 * Two kinds today: the fixed page table, and one entry per written-up case.
 * Everything downstream consumes this union rather than a bare string — the
 * client router, the prerenderer, the build's per-route HTML shells and the
 * sitemap — so adding a collection means adding a member here and teaching
 * `routePath`/`routeMeta`/`resolveRoute` about it. Nothing else has to guess.
 */
export type Route =
  | { kind: 'page'; id: RouteId }
  | { kind: 'case'; slug: Slug }

export const pageRoute = (id: RouteId): Route => ({ kind: 'page', id })
export const caseRoute = (slug: Slug): Route => ({ kind: 'case', slug })

/** Stable string form, for React keys and Record lookups. */
export const routeKey = (route: Route): string =>
  route.kind === 'page' ? `page:${route.id}` : `case:${route.slug}`

export const sameRoute = (a: Route, b: Route): boolean => routeKey(a) === routeKey(b)

const normalize = (path: string) => {
  const withoutQuery = path.split(/[?#]/, 1)[0] || '/'
  if (withoutQuery === '/') return '/'
  return `/${withoutQuery.replace(/^\/+|\/+$/g, '')}/`
}

/** Case detail pages live under the projects index: /projects/<slug>/. */
const caseBase = routes.projects.path

export function routePath(route: Route): string {
  return route.kind === 'page' ? routes[route.id].path : `${caseBase}${route.slug}/`
}

export type RouteMeta = {
  path: string
  title: string
  description: string
}

/**
 * The single source of head metadata for any route.
 *
 * Three callers used to derive this independently — the client effect in
 * App.tsx, the `head` block in entry-server.tsx, and six hand-written regexes
 * in vite.config.ts — which is three chances for a page's title, description
 * and canonical to disagree. They all call this now.
 */
export function routeMeta(route: Route): RouteMeta {
  if (route.kind === 'page') {
    const page = routes[route.id]
    return { path: page.path, title: page.title, description: page.description }
  }

  const entry = caseBySlug(route.slug)
  if (!entry) throw new Error(`No paged case for slug: ${route.slug}`)

  return {
    path: routePath(route),
    // Case titles are written as sentences; the trailing full stop reads badly
    // in a browser tab and in a search result.
    title: `${entry.title.replace(/\.$/, '')} | ${routes.projects.label}`,
    description: entry.seo.description,
  }
}

/**
 * Which primary-nav item a route sits under, so a case page still marks
 * "Projects" as current.
 */
export const routeSection = (route: Route): RouteId =>
  route.kind === 'page' ? route.id : 'projects'

/** Breadcrumb trail, root last-but-one. Used for BreadcrumbList JSON-LD. */
export function routeTrail(route: Route): { name: string; path: string }[] {
  const home = { name: routes.home.label, path: routes.home.path }
  if (route.kind === 'page') {
    if (route.id === 'home') return [home]
    return [home, { name: routes[route.id].label, path: routes[route.id].path }]
  }
  const entry = caseBySlug(route.slug)
  return [
    home,
    { name: routes.projects.label, path: routes.projects.path },
    { name: entry?.title ?? route.slug, path: routePath(route) },
  ]
}

/**
 * Every route the build should emit a document for, in sitemap order: the page
 * table first, then one page per written-up case.
 */
export const allRoutes: Route[] = [
  ...Object.values(routes).map((route) => pageRoute(route.id)),
  ...pagedCases.map((entry) => caseRoute(entry.slug)),
]

/**
 * Resolve a public route without touching window, document or history.
 *
 * Anything unrecognised falls back to home, matching the previous behaviour:
 * this is a static host with no 404 route, so an unknown path has already been
 * served the index shell by the time this runs.
 */
export function resolveRoute(pathname: string, base = '/'): Route {
  const normalizedBase = normalize(base)
  let path = pathname

  if (normalizedBase !== '/' && normalize(pathname).startsWith(normalizedBase)) {
    path = `/${normalize(pathname).slice(normalizedBase.length)}`
  }

  const normalizedPath = normalize(path)

  // The page table wins, so /projects/ stays the index rather than a slug.
  const page = Object.values(routes).find((route) => route.path === normalizedPath)
  if (page) return pageRoute(page.id)

  if (normalizedPath.startsWith(caseBase)) {
    const slug = normalizedPath.slice(caseBase.length).replace(/\/$/, '')
    if (caseBySlug(slug)) return caseRoute(slug)
  }

  return pageRoute('home')
}
