/*
 * Combine's logotype, inlined as vector so it stays crisp at any size and costs
 * no network request. Paths are verbatim from the supplied SVG.
 *
 * Uses `fill="currentColor"`, so colour comes from CSS.
 *
 * The standalone symbol is a raster asset — see src/assets/combine-symbol.png,
 * used by SiteHeader.
 */

export type MarkProps = {
  className?: string
  /** Accessible name. Pass an empty string when the mark is decorative. */
  label?: string
}

/** Full COMBINE logotype. Intrinsic ratio 397.9 x 63.8 (6.236:1). */
export function CombineLogotype({ className, label = 'Combine' }: MarkProps) {
  const decorative = label === ''
  return (
    <svg
      className={className}
      viewBox="0 0 397.9 63.8"
      fill="currentColor"
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : label}
      aria-hidden={decorative ? true : undefined}
      focusable="false"
    >
      <path d="M249.1 30.7c3-2.5 4.8-6.9 4.8-10.6 0-10.6-8.5-18.9-19.1-18.9h-15.3v13.7H235c7 0 7 10.9.1 10.9h-15.6v11.9h18.4c7 0 7 11.5.1 11.5h-18.5v13.5h17.9c12.6 0 19-8.7 19.1-19.4 0-5.5-2.4-10.1-7.4-12.6M85.1 31.9c0-24.3 33.9-24.3 33.9 0 0 24.5-33.9 24.5-33.9 0m48.5 0c0-42.5-63-42.5-63 0-.1 42.5 63 42.5 63 0M173.3 27.8L149.2 1.1h-5.8v14.3l29.1 30.5h1.7l16.2-16.8v33.6h13V1.1h-5.6zM299.6 1v14.1l47.2 47.7h5.6V1.3h-12.9v33.2L305.3 1zM271.1 1.2h14v61.4h-14zM367 1.2h30.9v13.4H367zM367 25.2h30.9v13.4H367zM367 49.2h30.9v13.4H367z" />
      <path d="M45.8 23.9h14.6C58 7.4 44.2.5 31.5.5 15.9.5.1 11 0 31.9c.1 20.9 15.9 31.4 31.5 31.3 13.1 0 26.9-6.8 29.1-24.2H46c-6 16.9-32.7 14.6-32.7-7.2.1-21.3 26-23.9 32.5-7.9" />
    </svg>
  )
}
