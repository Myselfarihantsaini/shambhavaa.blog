import { getPostsByCategory } from '../../lib/posts';
import SEO from '../../components/SEO';
import { CATEGORY_DESCRIPTIONS } from '../../data/category-descriptions';
import FAQ from '../../components/FAQ';
import { readAnchor } from '../../lib/anchors';

export const metadata = {
  title: 'Nakshatra Psychology | The 27 Lunar Mansions | Shambhavaa',
  description: 'The 27 Nakshatras are the deepest psychological layer of Vedic astrology. Explore each lunar mansion\'s symbolism, ruling deity, emotional patterns, and spiritual purpose.',
  alternates: {
    canonical: 'https://shambhavaa.blog/nakshatra/',
  },
  openGraph: {
    title: 'Nakshatra Psychology | The 27 Lunar Mansions | Shambhavaa',
    description: 'Explore the 27 Nakshatras — the lunar mansions of Vedic astrology — through a deep psychological and spiritual lens.',
    url: 'https://shambhavaa.blog/nakshatra/',
    siteName: 'Shambhavaa',
    images: [{ url: 'https://shambhavaa.blog/images/og-default.jpg', width: 1200, height: 630, alt: 'Nakshatra Psychology — Shambhavaa' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nakshatra Psychology | The 27 Lunar Mansions | Shambhavaa',
    description: 'Explore the 27 Nakshatras — the deepest psychological layer of Vedic astrology.',
    images: ['https://shambhavaa.blog/images/og-default.jpg'],
  },
};

export default function NakshatraPage() {
  const posts = getPostsByCategory('nakshatra');
  const info = CATEGORY_DESCRIPTIONS['nakshatra'];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": "Nakshatra Psychology: The 27 Lunar Mansions",
      "description": info.description,
      "url": "https://shambhavaa.blog/nakshatra/",
      "inLanguage": "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shambhavaa.blog" },
        { "@type": "ListItem", "position": 2, "name": "Nakshatras", "item": "https://shambhavaa.blog/nakshatra/" }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": info.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": { "@type": "Answer", "text": f.answer }
      }))
    }
  ];

  return (
    <div className="container" style={{ padding: 'var(--spacing-md) 0' }}>
      <SEO schema={schema} />

      {/* Hero / Introduction Section */}
      <section style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--spacing-md)' }}>
        <h1 style={{ color: 'var(--accent-gold)', fontSize: '3rem', marginBottom: '1.5rem' }}>
          {info.title}
        </h1>
        <p style={{
          color: 'var(--text-primary)',
          fontSize: '1.2rem',
          lineHeight: '1.8',
          maxWidth: '850px',
          marginBottom: '2rem'
        }}>
          {info.description}
        </p>
      </section>

      {/* Articles Grid */}
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 className="text-gold" style={{ marginBottom: '2rem' }}>Nakshatra Guides</h2>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>
            We are currently crafting deep Nakshatra research. Each of the 27 lunar mansions will have a dedicated psychological guide. Stay tuned.
          </p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
            {posts.map(post => (
              <div key={post.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{post.meta.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                  {post.meta.date && new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem', flex: 1 }}>
                  {post.meta.excerpt}
                </p>
                <a href={`/nakshatra/${post.slug}`} style={{ fontWeight: 'bold' }}>{readAnchor(post.meta.title)} &rarr;</a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FAQ Section */}
      <section style={{ marginTop: 'var(--spacing-xl)', background: 'rgba(20, 20, 35, 0.3)', padding: 'var(--spacing-md)', borderRadius: '12px' }}>
        <h2 className="text-gold" style={{ marginBottom: '2rem' }}>Frequently Asked Questions</h2>
        <FAQ items={info.faqs} />
      </section>
    </div>
  );
}
