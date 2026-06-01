import { getAllPosts, getPostsByCategory } from '../../lib/posts';
import SEO from '../../components/SEO';
import fs from 'fs';
import path from 'path';
import { PLANETS, getPlanetLabel } from '../../data/planets';
import { CATEGORY_DESCRIPTIONS } from '../../data/category-descriptions';
import FAQ from '../../components/FAQ';
import { readAnchor } from '../../lib/anchors';

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content');
  const planetCategories = PLANETS.map((planet) => planet.slug);
  if (!fs.existsSync(contentDirectory)) {
    return planetCategories.map(category => ({ category }));
  }
  
  const contentCategories = fs.readdirSync(contentDirectory).filter(file => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });
  const categories = Array.from(new Set([...contentCategories, ...planetCategories]));

  return categories.map(category => ({
    category: category,
  }));
}

export function generateMetadata({ params }) {
  const { category } = params;
  const posts = getPostsByCategory(category);
  const label = getPlanetLabel(category) || category.charAt(0).toUpperCase() + category.slice(1);
  const info = CATEGORY_DESCRIPTIONS[category];
  const title = `${label} Astrology | Deep Spiritual Guides | Shambhavaa`;
  const description = info ? info.description.substring(0, 160) : `Deep insights and spiritual guides on ${label} astrology.`;
  const ogImage = 'https://shambhavaa.blog/images/og-default.jpg';

  return {
    title,
    description,
    robots: posts.length === 0 || category === 'trust' ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: `https://shambhavaa.blog/${category}/`,
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://shambhavaa.blog/${category}/`,
      siteName: 'Shambhavaa',
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const posts = getPostsByCategory(category);
  const label = getPlanetLabel(category) || category.charAt(0).toUpperCase() + category.slice(1);
  const info = CATEGORY_DESCRIPTIONS[category];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": `${label} Articles & Insights`,
      "description": info?.description || `Authoritative guides on ${label} astrology.`,
      "url": `https://shambhavaa.blog/${category}/`,
      "inLanguage": "en-US",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shambhavaa.blog" },
        { "@type": "ListItem", "position": 2, "name": label, "item": `https://shambhavaa.blog/${category}/` }
      ]
    },
    ...(info?.faqs ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": info.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    }] : [])
  ];

  return (
    <div className="container" style={{ padding: 'var(--spacing-md) 0' }}>
      <SEO schema={schema} />
      
      {/* Hero / Introduction Section */}
      <section style={{ marginBottom: 'var(--spacing-lg)', borderBottom: '1px solid var(--border-color)', paddingBottom: 'var(--spacing-md)' }}>
        <h1 style={{ color: 'var(--accent-gold)', fontSize: '3rem', marginBottom: '1.5rem' }}>
          {info?.title || `${label} Insights`}
        </h1>
        <p style={{ 
          color: 'var(--text-primary)', 
          fontSize: '1.2rem', 
          lineHeight: '1.8', 
          maxWidth: '850px',
          marginBottom: '2rem'
        }}>
          {info?.description || `Deep spiritual explorations and karmic analysis of ${label} in the Vedic system.`}
        </p>
      </section>

      {/* Articles Grid */}
      <section style={{ marginBottom: 'var(--spacing-xl)' }}>
        <h2 className="text-gold" style={{ marginBottom: '2rem' }}>Latest Guides</h2>
        {posts.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>We are currently crafting deep research for this category. Stay tuned.</p>
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
                <a href={`/${category}/${post.slug}`} style={{ fontWeight: 'bold' }}>{readAnchor(post.meta.title)} &rarr;</a>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Category FAQ Section */}
      {info?.faqs && (
        <section style={{ marginTop: 'var(--spacing-xl)', background: 'rgba(20, 20, 35, 0.3)', padding: 'var(--spacing-md)', borderRadius: '12px' }}>
          <h2 className="text-gold" style={{ marginBottom: '2rem' }}>Frequently Asked Questions</h2>
          <FAQ items={info.faqs} />
        </section>
      )}
    </div>
  );
}
