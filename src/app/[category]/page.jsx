import { getAllPosts, getPostsByCategory } from '../../lib/posts';
import SEO from '../../components/SEO';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const contentDirectory = path.join(process.cwd(), 'content');
  if (!fs.existsSync(contentDirectory)) return [];
  
  const categories = fs.readdirSync(contentDirectory).filter(file => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });

  return categories.map(category => ({
    category: category,
  }));
}

export function generateMetadata({ params }) {
  const { category } = params;
  const title = `${category.charAt(0).toUpperCase() + category.slice(1)} Astrology | Shambhavaa`;
  return {
    title,
    description: `Deep insights and spiritual guides on ${category} astrology.`,
  };
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const posts = getPostsByCategory(category);

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `${category.charAt(0).toUpperCase() + category.slice(1)} Articles`,
    "url": `https://shambhavaa.blog/${category}`,
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-md) 0' }}>
      <SEO schema={schema} />
      <h1 style={{ color: 'var(--accent-gold)', textTransform: 'capitalize' }}>{category} Insights</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)' }}>
        Explore our deep spiritual guides and karmic astrology articles about {category}.
      </p>

      {posts.length === 0 ? (
        <p>No articles found in this category yet.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
          {posts.map(post => (
            <div key={post.slug} className="card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
                <a href={`/${category}/${post.slug}`} style={{ color: 'var(--text-primary)' }}>
                  {post.meta.title}
                </a>
              </h2>
              <p style={{ fontSize: '0.875rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                {post.meta.date && new Date(post.meta.date).toLocaleDateString()}
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>{post.meta.excerpt}</p>
              <a href={`/${category}/${post.slug}`}>Read Article &rarr;</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
