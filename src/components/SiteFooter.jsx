import { SITE, SOCIAL, bookingHref, BOOKING } from '../config/site';
import { TOPICS, PLANET_ORDER } from '../data/topics';
import CookieSettingsButton from './CookieSettingsButton';

export default function SiteFooter({ liveTopics = [] }) {
  const planets = PLANET_ORDER.filter((p) => liveTopics.includes(p));
  const methods = ['house-lords', 'mahadasha', 'divisional-charts', 'birth-chart', 'resources', 'horoscopes'].filter((t) =>
    liveTopics.includes(t),
  );
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <img src={SITE.logo} alt={SITE.name} width="808" height="184" loading="lazy" />
          <p>
            A Vedic astrology journal written and edited by Arihant Saini. Articles are for learning and
            reflection; they are not medical, legal or financial advice.
          </p>
          <a href={bookingHref('footer')} className="footer__book" rel="noopener">
            Private readings on {BOOKING.host} →
          </a>
        </div>

        <div>
          <h2 className="footer__heading">Planets</h2>
          <ul>
            {planets.map((p) => (
              <li key={p}><a href={`/${p}/`}>{TOPICS[p].label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">Read</h2>
          <ul>
            {methods.map((t) => (
              <li key={t}><a href={`/${t}/`}>{TOPICS[t].label}</a></li>
            ))}
            <li><a href="/glossary/">Glossary</a></li>
            <li><a href="/articles/">All articles</a></li>
            <li><a href="/tools/kundli-chart/">Free kundli</a></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">Shambhavaa</h2>
          <ul>
            <li><a href="/about/">About</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="/services/">Consultations</a></li>
            <li><a href="/editorial-policy/">Editorial policy</a></li>
            <li><a href="/consultation-ethics/">Ethics</a></li>
            <li><a href="/feed.xml">RSS feed</a></li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">Legal</h2>
          <ul>
            <li><a href="/privacy/">Privacy policy</a></li>
            <li><a href="/terms/">Terms of use</a></li>
            <li><a href="/disclaimer/">Disclaimer</a></li>
            <li><a href="/refund-cancellation-policy/">Refunds</a></li>
            <li><CookieSettingsButton /></li>
          </ul>
        </div>
      </div>

      <div className="wrap footer__base">
        <p>© {year} {SITE.name}. All rights reserved.</p>
        <ul className="footer__social">
          {SOCIAL.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer me">{s.label}</a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
