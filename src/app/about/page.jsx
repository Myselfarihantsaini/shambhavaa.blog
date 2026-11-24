import StaticPage from '../../components/StaticPage';
import { pageMeta, personSchema, abs } from '../../lib/seo';
import { bookingHref, BOOKING, SOCIAL } from '../../config/site';

export const metadata = pageMeta({
  title: 'About Shambhavaa and Arihant Saini',
  description: 'Who writes Shambhavaa, how the articles approach Vedic astrology, and what readers can and cannot expect from them.',
  path: '/about/',
  type: 'profile',
});

const profile = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: abs('/about/'),
  name: 'About Arihant Saini',
  mainEntity: personSchema,
};

export default function AboutPage() {
  return (
    <StaticPage
      title="About Shambhavaa"
      path="/about/"
      intro="A Vedic astrology journal written by Arihant Saini, for readers who want to understand their chart rather than fear it."
      schema={profile}
    >
      <h2 id="arihant-saini">Who writes it</h2>
      <p>
        Shambhavaa is written and edited by <strong>Arihant Saini</strong>, a Vedic astrologer who also reads
        charts privately through <a href={bookingHref('about')}>{BOOKING.host}</a>. The articles grow out
        of the questions people bring to those readings: why a dasha feels the way it does, what a house lord
        is doing in a difficult house, how marriage or career timing is actually judged.
      </p>

      <h2>How the articles approach astrology</h2>
      <p>
        The site follows the Parashari tradition. A placement is never read on its own: the house, its lord,
        the sign, aspects, the nakshatra, the dasha running and the transits all change what a planet can
        give. That is why most guides end by pointing back to the full chart.
      </p>
      <ul>
        <li><strong>No fear.</strong> We do not predict death, accidents or illness, and we do not label people by a single placement.</li>
        <li><strong>No remedy selling.</strong> Gemstones and rituals are discussed as traditions, never as purchases you must make.</li>
        <li><strong>Plain language.</strong> Sanskrit terms are explained the first time they appear, and the <a href="/glossary/">glossary</a> collects them.</li>
        <li><strong>Corrections welcome.</strong> If something is wrong, tell us and it will be fixed, with the update date shown on the article.</li>
      </ul>
      <p>
        Read more in the <a href="/editorial-policy/">editorial policy</a> and the{' '}
        <a href="/consultation-ethics/">consultation ethics</a>.
      </p>

      <h2>What you will find here</h2>
      <ul>
        <li><a href="/planets/">Planet guides</a> — each graha, house by house.</li>
        <li><a href="/house-lords/">House lords</a> and <a href="/mahadasha/">dasha</a> method.</li>
        <li><a href="/horoscopes/">Horoscope 2026</a> — month-by-month forecasts by sign.</li>
        <li><a href="/tools/kundli-chart/">A free kundli generator</a> that runs in your browser.</li>
      </ul>

      <h2>Elsewhere</h2>
      <ul>
        {SOCIAL.map((s) => (
          <li key={s.href}>
            <a href={s.href} rel="me noopener noreferrer" target="_blank">{s.label}</a>
          </li>
        ))}
      </ul>
      <p>
        <a className="btn btn--ink" href={bookingHref('about')} style={{ color: 'var(--paper)' }}>
          {BOOKING.label}
        </a>{' '}
        <a href="/contact/" style={{ marginLeft: '1rem' }}>Contact</a>
      </p>
    </StaticPage>
  );
}
