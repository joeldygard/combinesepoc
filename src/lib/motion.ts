import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

/**
 * Media queries via useSyncExternalStore rather than useState + useEffect.
 *
 * Two reasons this matters: it needs no setState inside an effect (which causes
 * cascading renders), and it takes a server snapshot — so nothing touches
 * `window` during render and the tree stays renderable without a browser.
 */
function useMediaQuery(query: string, serverValue = false): boolean {
  const subscribe = useCallback(
    (onChange: () => void) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', onChange)
      return () => mq.removeEventListener('change', onChange)
    },
    [query],
  )
  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query])
  const getServerSnapshot = useCallback(() => serverValue, [serverValue])
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

/** Live: the OS setting can change without a reload. */
export function usePrefersReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}

/** Fine pointer only, per the brief's rule on pointer-driven behaviour. */
export function useFinePointer(): boolean {
  return useMediaQuery('(pointer: fine)')
}

/**
 * Fires once, then disconnects — no entrance animation replays on re-entry.
 * Visibility is derived, so under reduced motion content is shown immediately
 * without writing state from an effect.
 */
export function useEnterOnce<T extends HTMLElement>(rootMargin = '0px 0px -12% 0px') {
  const ref = useRef<T | null>(null)
  const reduced = usePrefersReducedMotion()
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setEntered(true)
        io.disconnect()
      },
      { rootMargin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced, rootMargin])

  return { ref, shown: reduced || entered }
}
