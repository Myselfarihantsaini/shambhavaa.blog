import { collectTags, MIN_TAG_POSTS } from '../../../lib/tags';
import { pageMeta, breadcrumbSchema, itemListSchema } from '../../../lib/seo';
import PostCard from '../../../components/PostCard';
import Breadcrumbs from '../../../components/Breadcrumbs';
import JsonLd from '../../../components/JsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(collectTags().keys()).map((tag) => ({ tag }));
}

export function generateMetadata({ params }) {
  const t = collectTags().get(params.tag);
  return pageMeta({
    title: `${t.label} — Vedic Astrology Articles`,
    description: `Shambhavaa articles about ${t.label}: ${t.posts.map((p) => p.title).slice(0, 3).join('; ')}.`.slice(0, 160),
    path: `/tag/${params.tag}/`,
    // Single-article tag pages would be thin duplicates of the article itself.
    noindex: t.posts.length < MIN_TAG_POSTS,
  });
}

export default function TagPage({ params }) {
  const t = collectTags().get(params.tag);
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles/' },
    { name: t.label, href: `/tag/${params.tag}/` },
  ];
  return (
    <div className="wrap">
      <JsonLd data={[breadcrumbSchema(trail), itemListSchema(t.label, t.posts)]} />
      <header className="page-head">
        <Breadcrumbs trail={trail} />
        <p className="kicker">Topic</p>
        <h1>{t.label}</h1>
        <p>
          {t.posts.length} {t.posts.length === 1 ? 'article' : 'articles'} on Shambhavaa discuss {t.label}.
        </p>
      </header>
      <div style={{ maxWidth: 900 }}>
        {t.posts.map((p) => (
          <PostCard key={p.url} post={p} variant="row" headingLevel={2} />
        ))}
      </div>
    </div>
  );
}
