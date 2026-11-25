import PostCard from '../components/PostCard';
import JsonLd from '../components/JsonLd';
import Newsletter from '../components/Newsletter';
import AdSlot from '../components/AdSlot';
import { getArticles } from '../lib/posts';
import { TOPICS, PLANET_ORDER, RASHIS, topicLabel, topicStyle } from '../data/topics';
import { SITE, bookingHref, BOOKING } from '../config/site';
import { itemListSchema, personSchema } from '../lib/seo';

export const metadata = {
  title: { absolute: `${SITE.name} — Vedic Astrology Guides by Arihant Saini` },
  description: SITE.description,
  alternates: { canonical: `${SITE.url}/` },
};

export default function Home() {
  const articles = getArticles();
  const lead = articles.find((p) => p.featured) || articles[0];
  const latest = articles.filter((p) => p !== lead).slice(0, 6);
  const popular = articles.filter((p) => p.featured && p !== lead).slice(0, 5);

  const counts = articles.reduce((acc, p) => ({ ...acc, [p.category]: (acc[p.category] || 0) + 1 }), {});
  const methods = ['house-lords', 'mahadasha', 'divisional-charts', 'birth-chart', 'resources'].filter((t) => counts[t]);

  return (
    <>
      <JsonLd data={[personSchema, itemListSchema('Latest articles on Shambhavaa', articles.slice(0, 10))]} />

      {/* Opening band */}
      <section className="hero">
        <div className="wrap hero__grid">
          <div className="hero__text">
            <p className="hero__eyebrow" lang="hi">ज्योतिष · शम्भवा</p>
            <h1 className="hero__title">Vedic astrology, read the way it was meant to be.</h1>
            <p className="hero__lede">
              Planet-by-house guides, dasha timing and yearly forecasts by Arihant Saini — written so you can
              understand your own chart, not fear it.
            </p>
            <div className="hero__actions">
              <a className="btn btn--gold" href="/planets/">Start with your planets</a>
              <a className="btn btn--ghost" href={bookingHref('home-hero')} rel="noopener">{BOOKING.label}</a>
            </div>
          </div>
          <div className="hero__feature">
            <p className="hero__label">Featured guide</p>
            <PostCard post={lead} variant="feature" headingLevel={2} />
          </div>
        </div>
      </section>

      {/* Planets row */}
      <section className="band" aria-labelledby="planets-title">
        <div className="wrap">
          <div className="section__head">
            <h2 id="planets-title">Nine grahas, nine doors</h2>
            <a href="/planets/">All planet guides →</a>
          </div>
          <div className="planets">
            {PLANET_ORDER.map((p) => {
              const s = topicStyle(p);
              const n = counts[p] || 0;
              return (
                <a
                  key={p}
                  href={`/${p}/`}
                  className={`planet${n ? '' : ' planet--soon'}`}
                  style={{ '--tile-bg': s.bg, '--tile-fg': s.fg }}
                >
                  <span className="planet__deva" lang="hi">{s.deva}</span>
                  <span className="planet__en">{TOPICS[p].label}</span>
                  <span className="planet__n">{n ? `${n} ${n === 1 ? 'guide' : 'guides'}` : 'Coming soon'}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <div className="wrap">
        {/* Latest + popular */}
        <section className="section" aria-labelledby="latest-title">
          <div className="section__head">
            <h2 id="latest-title">New on Shambhavaa</h2>
            <a href="/articles/">Every article →</a>
          </div>
          <div className="split">
            <div className="grid grid--2">
              {latest.map((p) => (
                <PostCard key={p.url} post={p} />
              ))}
            </div>
            <aside className="popular" aria-labelledby="popular-title">
              <h3 id="popular-title" className="popular__title">Most read</h3>
              <ol>
                {popular.map((p) => (
                  <li key={p.url}>
                    <a href={p.url}>{p.title}</a>
                    <span className="meta">{topicLabel(p.category)}</span>
                  </li>
                ))}
              </ol>
              <AdSlot name="sidebar" />
            </aside>
          </div>
        </section>

        <AdSlot name="listing" />

        {/* Rashis */}
        <section className="section" aria-labelledby="rashi-title">
          <div className="section__head">
            <h2 id="rashi-title">Rashifal 2026 — pick your sign</h2>
            <a href="/horoscopes/">All forecasts →</a>
          </div>
          <p className="section__intro">Read for your Moon sign first; if you know your Ascendant (Lagna), read that too.</p>
          <ul className="rashis">
            {RASHIS.map((r) => (
              <li key={r.en}>
                <a href={r.url}>
                  <span className="rashi__deva" lang="hi">{r.deva}</span>
                  <span className="rashi__en">{r.en}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Method */}
        <section className="section" aria-labelledby="method-title">
          <div className="section__head">
            <h2 id="method-title">Learn how a chart is judged</h2>
          </div>
          <div className="methods">
            {methods.map((t) => {
              const s = topicStyle(t);
              return (
                <a key={t} href={`/${t}/`} className="method" style={{ '--tile-bg': s.bg, '--tile-fg': s.fg }}>
                  <span className="method__deva" lang="hi">{s.deva}</span>
                  <span className="method__body">
                    <strong>{topicLabel(t)}</strong>
                    <em>{TOPICS[t].blurb}</em>
                    <span className="meta">{counts[t]} {counts[t] === 1 ? 'guide' : 'guides'}</span>
                  </span>
                </a>
              );
            })}
          </div>
        </section>

        {/* Tool */}
        <section className="section">
          <div className="kundli">
            <div>
              <p className="kicker kicker--light">Free tool</p>
              <h2>Make your kundli in one minute</h2>
              <p>
                Date, time and place of birth — and you get a North Indian D1 chart with Lagna, Moon sign,
                nakshatra and every planet’s house. Calculated in your browser; nothing is stored.
              </p>
              <a className="btn btn--gold" href="/tools/kundli-chart/">Open the kundli maker</a>
            </div>
            <div className="kundli__chart" aria-hidden="true" lang="hi">कुण्डली</div>
          </div>
        </section>
      </div>

      {/* Consultation */}
      <section className="consult" aria-labelledby="consult-title">
        <div className="wrap consult__grid">
          <div>
            <p className="kicker kicker--gold">Private consultation</p>
            <h2 id="consult-title">Bring one real question. Leave with clarity.</h2>
            <p>
              Articles describe placements in general. In a one-to-one reading, Arihant looks at your whole
              chart — houses, lords, the dasha running now and current transits — and stays with the question
              you came with.
            </p>
            <a className="btn btn--gold" href={bookingHref('home-band')} rel="noopener">
              {BOOKING.label} on {BOOKING.host}
            </a>
          </div>
          <ul className="consult__list">
            <li><a href="/services/vedic-kundli-reading/">Full kundli reading</a></li>
            <li><a href="/services/career-astrology-consultation/">Career and timing</a></li>
            <li><a href="/services/marriage-astrology-consultation/">Marriage and relationships</a></li>
            <li><a href="/services/kundli-matching-consultation/">Kundli matching</a></li>
            <li><a href="/services/dasha-transit-reading/">Dasha and transit reading</a></li>
            <li><a href="/services/">See all readings →</a></li>
          </ul>
        </div>
      </section>

      <div className="wrap">
        <Newsletter />
      </div>
    </>
  );
}
