import { CombineLogotype } from '../CombineLogo'
import { footerNav, site } from '../../content/site'
import Link from '../../lib/navigation'
import './SiteFooter.css'

export default function SiteFooter() {
  return (
    <footer className="ftr field-inverse">
      <div className="container container--wide ftr__inner">
        <div className="ftr__brand">
          <CombineLogotype className="ftr__logotype" />
          <p className="u-small u-secondary ftr__address">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}, Sweden
            <br />
            Founded {site.founded}
          </p>
        </div>

        {footerNav.map((group) => (
          <nav className="ftr__group" key={group.heading} aria-label={group.heading}>
            {/*
              A label for the nav, not a section heading. As an <h2> it put
              three entries into every page's outline that outranked the real
              content; the <nav> already carries the same text as its
              accessible name.
            */}
            <p className="u-eyebrow ftr__heading">{group.heading}</p>
            <ul role="list">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container container--wide">
        <hr className="rule" />
        <p className="u-small u-secondary ftr__legal">
          © {new Date().getFullYear()} {site.legalName}.
        </p>
      </div>
    </footer>
  )
}
