import { useEffect } from 'react'
import SiteHeader from './components/layout/SiteHeader'
import SiteFooter from './components/layout/SiteFooter'
import PageForRoute from './components/pages/Pages'
import { site } from './content/site'
import { routeMeta, type Route } from './lib/routes'

function PageMetadata({ route }: { route: Route }) {
  useEffect(() => {
    const metadata = routeMeta(route)
    document.title = metadata.title

    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    description?.setAttribute('content', metadata.description)

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
    canonical?.setAttribute('href', new URL(metadata.path, site.url).toString())
  }, [route])

  return null
}

/**
 * App receives a route as data. It does not inspect window during render, so
 * the same component tree can be called by a future static or server renderer.
 */
export default function App({ route }: { route: Route }) {
  return (
    <>
      <PageMetadata route={route} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader currentRoute={route} />
      <main id="main" tabIndex={-1}>
        <PageForRoute route={route} />
      </main>
      <SiteFooter />
    </>
  )
}
