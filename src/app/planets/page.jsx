import { getArticles } from '../../lib/posts';
import { TOPICS, PLANET_ORDER } from '../../data/topics';
import { pageMeta, breadcrumbSchema } from '../../lib/seo';
import Breadcrumbs from '../../components/Breadcrumbs';
import JsonLd from '../../components/JsonLd';
import PostCard from '../../components/PostCard';

export const metadata = pageMeta({
  title: 'The Nine Grahas — Planet Guides in Vedic Astrology',
  description: 'Guides to the Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu and Ketu in Vedic astrology: what each graha signifies and how it behaves in each house.',
  path: '/planets/',
});

export default function PlanetsPage() {
  const articles = getArticles();
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Planets', href: '/planets/' },
  ];
  return (
    <div className="wrap">
      <JsonLd data={breadcrumbSchema(trail)} />
      <header className="page-head">
        <Breadcrumbs trail={trail} />
        <h1>The nine grahas</h1>
        <p>
          In Jyotisha, nine grahas are read: the seven visible planets and the two lunar nodes, Rahu and
          Ketu. Start with the planet you want to understand, then the house it occupies in your chart.
        </p>
      </header>
      {PLANET_ORDER.map((slug) => {
        const posts = articles.filter((p) => p.category === slug);
        return (
          <section key={slug} className="section" aria-labelledby={`p-${slug}`}>
            <div className="section__head">
              <h2 id={`p-${slug}`}>{TOPICS[slug].label}</h2>
              {posts.length > 0 && <a href={`/${slug}/`}>{posts.length} {posts.length === 1 ? 'guide' : 'guides'}</a>}
            </div>
            <p className="section__intro">{TOPICS[slug].blurb}</p>
            {posts.length ? (
              <div className="grid grid--3">
                {posts.slice(0, 3).map((p) => (
                  <PostCard key={p.url} post={p} showImage={false} />
                ))}
              </div>
            ) : (
              <p className="meta">Guides for {TOPICS[slug].label} are in preparation.</p>
            )}
          </section>
        );
      })}
    </div>
  );
}
