import { getAllPosts } from '../../../lib/posts';
import SEO from '../../../components/SEO';
import TagList from '../../../components/TagList';
import { readAnchor } from '../../../lib/anchors';
import {
  SITE_URL,
  categoryLabel,
  collectTags,
  getPostsByTag,
  buildTags,
  breadcrumbSchema,
} from '../../../lib/geo';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return Array.from(collectTags(posts).keys()).map((tag) => ({ tag }));
}

export function generateMetadata({ params }) {
  const { tag } = params;
  const posts = getAllPosts();
  const { label, posts: tagged } = getPostsByTag(posts, tag);
  const title = `${label} | Vedic Astrology Guides | Shambhavaa`;
  const description = `Every Shambhavaa guide tagged "${label}" - ${tagged.length} in-depth ${tagged.length === 1 ? 'article' : 'articles'} on ${label} in Vedic astrology.`;

  return {
    title,
    description,
    robots: tagged.length === 0 ? { index: false, follow: true } : undefined,
    alternates: { canonical: `${SITE_URL}/tag/${tag}/` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/tag/${tag}/`,
      siteName: 'Shambhavaa',
      images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [`${SITE_URL}/images/og-default.jpg`] },
  };
}

export default function TagPage({ params }) {
  const { tag } = params;
  const posts = getAllPosts();
  const { label, posts: tagged } = getPostsByTag(posts, tag);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: `${label} - Vedic Astrology Guides`,
      description: `In-depth Shambhavaa guides on ${label} in Vedic astrology.`,
      url: `${SITE_URL}/tag/${tag}/`,
      inLanguage: 'en-US',
      about: { '@type': 'Thing', name: label },
    },
    ...(tagged.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: `${label} guides`,
            numberOfItems: tagged.length,
            itemListElement: tagged.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: `${SITE_URL}/${post.category}/${post.slug}/`,
              name: post.meta.title,
            })),
          },
        ]
      : []),
    breadcrumbSchema([
      { name: 'Home', url: `${SITE_URL}/` },
      { name: label, url: `${SITE_URL}/tag/${tag}/` },
    ]),
  ];

  return (
    <div className="container" style={{ padding: 'var(--spacing-md) 0' }}>
      <SEO schema={schema} />

      <section style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--spacing-md)' }}>
        <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: '0.75rem' }}>
          Topic
        </p>
        <h1 style={{ color: 'var(--accent-gold)', fontSize: '3rem', marginBottom: '1rem' }}>{label}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: '1.8', maxWidth: '760px' }}>
          {tagged.length} {tagged.length === 1 ? 'guide' : 'guides'} on{' '}
          <strong style={{ color: 'var(--text-primary)' }}>{label}</strong> in Vedic astrology, collected
          from across the Shambhavaa archive.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        {tagged.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No guides are tagged with this topic yet.</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {tagged.map((post) => (
              <article key={`${post.category}-${post.slug}`} className="card clickable-card" style={{ display: 'flex', flexDirection: 'column' }}>
                <a href={`/${post.category}/${post.slug}/`} className="card-cover-link" aria-label={`Read ${post.meta.title}`} />
                <TagList tags={buildTags(post).slice(0, 3)} compact />
                <h2 style={{ fontSize: '1.4rem', margin: '0.75rem 0 0.5rem', color: 'var(--text-primary)' }}>{post.meta.title}</h2>
                <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {categoryLabel(post.category)}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', flex: 1 }}>{post.meta.excerpt}</p>
                <a href={`/${post.category}/${post.slug}/`} tabIndex={-1} aria-hidden="true" style={{ fontWeight: 'bold' }}>{readAnchor(post.meta.title)} &rarr;</a>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
