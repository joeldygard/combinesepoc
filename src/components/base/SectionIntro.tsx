import type { ReactNode } from 'react'
import './SectionIntro.css'

export type SectionIntroProps = {
  /** Rendered as the section's h2, so headings stay in order. */
  heading: string
  eyebrow?: string
  intro?: string
  id?: string
  /** Offset headings; not every section is centred. */
  align?: 'start' | 'offset'
  children?: ReactNode
}

export default function SectionIntro({
  heading,
  eyebrow,
  intro,
  id,
  align = 'start',
  children,
}: SectionIntroProps) {
  return (
    <div className={`sec-intro sec-intro--${align}`}>
      {eyebrow && (
        <p className="u-eyebrow sec-intro__eyebrow">
          <span className="sec-intro__marker" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="u-h2" id={id}>
        {heading}
      </h2>
      {intro && <p className="u-lede u-secondary sec-intro__lede">{intro}</p>}
      {children}
    </div>
  )
}
