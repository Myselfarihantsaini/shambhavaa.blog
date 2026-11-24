import PostCard from '../components/PostCard';
import JsonLd from '../components/JsonLd';
import Newsletter from '../components/Newsletter';
import AdSlot from '../components/AdSlot';
import { getArticles } from '../lib/posts';
import { TOPICS, PLANET_ORDER, topicLabel } from '../data/topics';
import { SITE, bookingHref, BOOKING } from '../config/site';
import { itemListSchema, personSchema } from '../lib/seo';

export const metadata = {
  title: { absolute: `${SITE.name} — Vedic Astrology Guides by Arihant Saini` },
  description: SITE.description,
  alternates: { canonical: `${SITE.url}/` },
};

export default function Home() {
  const articles = getArticles();
  const featured = articles.filter((p) => p.featured && p.image);
  const lead = featured[0] || articles[0];
  const rest = articles.filter((p) => p !== lead);
  const secondary = rest.slice(0, 2);
  const latest = rest.slice(2, 8);

  const counts = articles.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});
  const planets = PLANET_ORDER.filter((p) => counts[p]);
  const methods = ['house-lords', 'mahadasha', 'divisional-charts', 'birth-chart', 'resources'].filter((t) => counts[t]);
  const horoscopes = articles.filter((p) => p.category === 'horoscopes').slice(0, 6);

  return (
    <>
      <JsonLd data={[personSchema, itemListSchema('Latest articles on Shambhavaa', articles.slice(0, 10))]} />
      <h1 className="visually-hidden">Shambhavaa — Vedic astrology guides by Arihant Saini</h1>

      <div className="intro-strip">
        <div className="wrap">
          <p>
            <strong>Vedic astrology, explained carefully.</strong> Planet-by-house guides, dasha and transit
            method, and yearly forecasts — written by Arihant Saini to help you read a chart as a whole,
            without fear.
          </p>
        </div>
      </div>

      <div className="wrap">
        <div className="front">
          <div>
            <PostCard post={lead} variant="lead" headingLevel={2} />
            <div className="grid grid--2" style={{ marginTop: '2.25rem' }}>
              {secondary.map((p) => (
                <PostCard key={p.url} post={p} />
              ))}
            </div>
          </div>
          <aside className="front__side" aria-labelledby="latest-title">
            <h2 id="latest-title">Latest</h2>
            {latest.map((p) => (
              <PostCard key={p.url} post={p} variant="compact" showImage={false} />
            ))}
            <p style={{ marginTop: '1rem', fontFamily: 'var(--sans)', fontSize: '0.875rem' }}>
              <a href="/articles/">Every article, newest first →</a>
            </p>
          </aside>
        </div>

        <AdSlot name="listing" />

        <section className="section" aria-labelledby="planets-title">
          <div className="section__head">
            <h2 id="planets-title">Read by planet</h2>
            <a href="/planets/">All planets</a>
          </div>
          <div className="topic-index">
            {planets.map((p) => (
              <a key={p} href={`/${p}/`}>
                <strong>{TOPICS[p].label}</strong>
                <span>{counts[p]} {counts[p] === 1 ? 'guide' : 'guides'}</span>
                <em>{TOPICS[p].blurb}</em>
              </a>
            ))}
          </div>
        </section>

        <section className="section" aria-labelledby="method-title">
          <div className="section__head">
            <h2 id="method-title">Method and technique</h2>
          </div>
          <p className="section__intro">
            How the pieces of a chart are judged together — house lords, dashas, divisional charts and the
            habits of a careful reader.
          </p>
          <div className="topic-index">
            {methods.map((t) => (
              <a key={t} href={`/${t}/`}>
                <strong>{topicLabel(t)}</strong>
                <span>{counts[t]} {counts[t] === 1 ? 'guide' : 'guides'}</span>
                <em>{TOPICS[t].blurb}</em>
              </a>
            ))}
          </div>
        </section>

        {horoscopes.length > 0 && (
          <section className="section" aria-labelledby="horo-title">
            <div className="section__head">
              <h2 id="horo-title">Horoscope 2026</h2>
              <a href="/horoscopes/">All signs</a>
            </div>
            <div className="grid grid--3">
              {horoscopes.map((p) => (
                <PostCard key={p.url} post={p} showImage={false} />
              ))}
            </div>
          </section>
        )}

        <section className="section" aria-labelledby="tools-title">
          <div className="section__head">
            <h2 id="tools-title">Free tools</h2>
          </div>
          <div className="tools">
            <div className="tool">
              <h3>Kundli generator</h3>
              <p>
                Enter your date, time and place of birth to draw a North Indian D1 chart with Lagna, Moon
                sign, nakshatra and planetary houses. Calculated in your browser.
              </p>
              <a className="btn btn--gold" href="/tools/kundli-chart/">Make my kundli</a>
            </div>
            <div className="tool">
              <h3>Kundli perfume oracle</h3>
              <p>
                A playful pairing of fragrance notes with your Moon sign, nakshatra and D9 — for fun, not for
                prediction.
              </p>
              <a className="btn btn--gold" href="/tools/perfume-oracle/">Try the oracle</a>
            </div>
          </div>
        </section>
      </div>

      <section className="consult-band" aria-labelledby="consult-title">
        <div className="wrap consult-band__inner">
          <div>
            <p className="kicker">Consultations</p>
            <h2 id="consult-title">Have one question about your own chart?</h2>
            <p>
              Articles describe placements in general. A private reading looks at your full chart — houses,
              lords, current dasha and transits — and stays with the question you bring.
            </p>
            <a className="btn btn--ink" href={bookingHref('home-band')} rel="noopener">
              {BOOKING.label} on {BOOKING.host}
            </a>
          </div>
          <ul>
            <li><a href="/services/vedic-kundli-reading/">Full kundli reading</a></li>
            <li><a href="/services/career-astrology-consultation/">Career and timing</a></li>
            <li><a href="/services/marriage-astrology-consultation/">Marriage and relationships</a></li>
            <li><a href="/services/kundli-matching-consultation/">Kundli matching</a></li>
            <li><a href="/services/dasha-transit-reading/">Dasha and transit reading</a></li>
            <li><a href="/services/">All readings</a></li>
          </ul>
        </div>
      </section>

      <div className="wrap">
        <Newsletter />
      </div>
    </>
  );
}
