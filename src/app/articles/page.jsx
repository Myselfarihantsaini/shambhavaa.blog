import { getArticles } from '../../lib/posts';
import { pageMeta, breadcrumbSchema } from '../../lib/seo';
import { formatDate } from '../../lib/format';
import PostCard from '../../components/PostCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import JsonLd from '../../components/JsonLd';

export const metadata = pageMeta({
  title: 'All Articles',
  description: 'Every Shambhavaa article on Vedic astrology, newest first: planets in houses, house lords, dashas, divisional charts and yearly horoscopes.',
  path: '/articles/',
});

export default function ArticlesPage() {
  const posts = getArticles();
  const groups = [];
  for (const p of posts) {
    const key = formatDate(p.date, { month: 'long', year: 'numeric' });
    const last = groups[groups.length - 1];
    if (last && last.key === key) last.posts.push(p);
    else groups.push({ key, posts: [p] });
  }
  const trail = [
    { name: 'Home', href: '/' },
    { name: 'All articles', href: '/articles/' },
  ];

  return (
    <div className="wrap">
      <JsonLd data={breadcrumbSchema(trail)} />
      <header className="page-head">
        <Breadcrumbs trail={trail} />
        <h1>All articles</h1>
        <p>{posts.length} guides, newest first. Looking for something specific? <a href="/search/">Search the site</a>.</p>
      </header>
      <div style={{ maxWidth: 900 }}>
        {groups.map((g) => (
          <section key={g.key} aria-label={g.key}>
            <h2 className="list-month">{g.key}</h2>
            {g.posts.map((p) => (
              <PostCard key={p.url} post={p} variant="compact" showImage={false} />
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
