import { StrictMode, useCallback, useEffect, useRef, useState } from 'react'
import App from './App'
import { NavigationProvider } from './lib/navigation'
import { resolveRoute, type Route } from './lib/routes'

function RoutedApp({ initialRoute }: { initialRoute: Route }) {
  const [route, setRoute] = useState(initialRoute)
  const shouldFocusMain = useRef(false)

  const updateFromLocation = useCallback((resetScroll: boolean) => {
    shouldFocusMain.current = true
    if (resetScroll) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    }
    setRoute(resolveRoute(window.location.pathname, import.meta.env.BASE_URL))
  }, [])

  useEffect(() => {
    const onPopState = () => updateFromLocation(false)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [updateFromLocation])

  useEffect(() => {
    if (!shouldFocusMain.current) return
    shouldFocusMain.current = false
    document.getElementById('main')?.focus({ preventScroll: true })
  }, [route])

  const navigate = useCallback(
    (href: string) => {
      const destination = new URL(href, window.location.href)
      if (destination.href === window.location.href) return

      window.history.pushState(null, '', destination)
      updateFromLocation(true)
    },
    [updateFromLocation],
  )

  return (
    <NavigationProvider navigate={navigate}>
      <App route={route} />
    </NavigationProvider>
  )
}

/** The identical root tree is used by both prerendering and hydration. */
export default function AppRoot({ initialRoute }: { initialRoute: Route }) {
  return (
    <StrictMode>
      <RoutedApp initialRoute={initialRoute} />
    </StrictMode>
  )
}
