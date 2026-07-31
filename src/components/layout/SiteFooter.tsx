import { CombineLogotype } from '../CombineLogo'
import { footerNav, site } from '../../content/site'
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
            <h2 className="u-eyebrow ftr__heading">{group.heading}</h2>
            <ul>
              {group.items.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    {...(item.href.startsWith('http')
                      ? { target: '_blank', rel: 'noreferrer' }
                      : {})}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="container container--wide">
        <hr className="rule" />
        <p className="u-small u-secondary ftr__legal">
          © {new Date().getFullYear()} {site.name}. Proof of concept — content and
          figures restate publicly available Combine material.
        </p>
      </div>
    </footer>
  )
}
