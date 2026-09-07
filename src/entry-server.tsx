import { renderToString } from 'react-dom/server'
import AppRoot from './AppRoot'
import { site } from './content/site'
import { allRoutes, routeMeta, routePath, type Route } from './lib/routes'

/**
 * Every route to emit a document for, paired with the path it is written to.
 * Derived from `allRoutes`, so a new case study becomes a prerendered page
 * without touching the prerender script.
 */
export const prerenderTargets = allRoutes.map((route) => ({
  route,
  path: routePath(route),
}))

/**
 * Shared server entry for either prerendering or request-time rendering.
 * Route selection and metadata stay explicit so no server render needs a
 * browser global.
 */
export function render(route: Route) {
  const metadata = routeMeta(route)
  return {
    html: renderToString(<AppRoot initialRoute={route} />),
    head: {
      title: metadata.title,
      description: metadata.description,
      canonical: new URL(metadata.path, site.url).toString(),
    },
  }
}
