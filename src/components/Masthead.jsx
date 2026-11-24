import { SITE, NAV, BOOKING, bookingHref } from '../config/site';

export default function Masthead() {
  return (
    <header className="masthead">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="masthead__inner wrap">
        <a href="/" className="masthead__logo" aria-label={`${SITE.name} — home`}>
          <img src={SITE.logo} alt={`${SITE.name} ${SITE.tagline}`} width="808" height="184" />
        </a>

        <nav className="masthead__nav" aria-label="Main">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="masthead__actions">
          <a href="/search/" className="masthead__search">Search</a>
          <a href={bookingHref('header')} className="btn btn--gold" rel="noopener">
            {BOOKING.label}
          </a>
        </div>

        <details className="masthead__menu">
          <summary>Menu</summary>
          <div className="masthead__drawer">
            <ul>
              {NAV.map((item) => (
                <li key={item.href}>
                  <a href={item.href}>{item.label}</a>
                </li>
              ))}
              <li><a href="/articles/">All articles</a></li>
              <li><a href="/search/">Search</a></li>
            </ul>
            <a href={bookingHref('mobile-menu')} className="btn btn--gold btn--block" rel="noopener">
              {BOOKING.label}
            </a>
          </div>
        </details>
      </div>
    </header>
  );
}
