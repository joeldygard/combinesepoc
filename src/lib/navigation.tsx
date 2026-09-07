import {
  createContext,
  useContext,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react'

/**
 * Prefix internal paths with Vite's deployment base, leaving absolute URLs,
 * mailto: and tel: alone.
 *
 * This lives here rather than in lib/routes.ts because it is the one piece of
 * routing that needs a bundler global. vite.config.ts imports lib/routes.ts to
 * enumerate routes at build time, and `import.meta.env` does not exist there.
 */
function routeHref(href: string): string {
  if (!href.startsWith('/')) return href
  const base = import.meta.env.BASE_URL || '/'
  if (href === '/') return base
  return `${base.replace(/\/$/, '')}${href}`
}

type Navigate = (href: string) => void

const NavigationContext = createContext<Navigate | null>(null)

export function NavigationProvider({
  navigate,
  children,
}: {
  navigate: Navigate
  children: ReactNode
}) {
  return (
    <NavigationContext.Provider value={navigate}>
      {children}
    </NavigationContext.Provider>
  )
}

export type LinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
}

/**
 * A real anchor with progressive enhancement for same-site route changes.
 * Modified clicks, downloads, new tabs and non-HTTP links retain the browser's
 * native behaviour.
 */
export default function Link({ href, onClick, target, ...props }: LinkProps) {
  const navigate = useContext(NavigationContext)
  const resolvedHref = routeHref(href)

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)

    if (
      event.defaultPrevented ||
      !navigate ||
      !href.startsWith('/') ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      (target && target !== '_self') ||
      event.currentTarget.hasAttribute('download')
    ) {
      return
    }

    event.preventDefault()
    navigate(resolvedHref)
  }

  return <a {...props} href={resolvedHref} target={target} onClick={handleClick} />
}
