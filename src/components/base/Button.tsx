import type { ReactNode } from 'react'
import './Button.css'

export type ButtonProps = {
  href: string
  children: ReactNode
  /** `primary` carries the one logo-derived clipped edge. */
  variant?: 'primary' | 'secondary' | 'quiet'
  /** Inverts borders/text for use on dark or plum fields. */
  onDark?: boolean
  className?: string
}

export default function Button({
  href,
  children,
  variant = 'primary',
  onDark = false,
  className,
}: ButtonProps) {
  const external = /^https?:|^mailto:|^tel:/.test(href)
  return (
    <a
      className={[
        'btn',
        `btn--${variant}`,
        onDark ? 'btn--on-dark' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      href={href}
      {...(external && href.startsWith('http')
        ? { target: '_blank', rel: 'noreferrer' }
        : {})}
    >
      {children}
    </a>
  )
}
