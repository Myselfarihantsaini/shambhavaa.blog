import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import SEO from '../../../components/SEO';
import { MDXRemote } from 'next-mdx-remote/rsc';
import fs from 'fs';
import path from 'path';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = params;
  const post = getPostBySlug(category, slug);
  
  if (!post) {
    return { title: 'Not Found' };
  }

  return {
    title: `${post.meta.title} | Shambhavaa`,
    description: post.meta.excerpt || post.meta.description,
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: ['Shambhavaa'],
    },
  };
}

export default function ArticlePage({ params }) {
  const { category, slug } = params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    return <div className="container" style={{ padding: '4rem 0' }}><h1>Post not found</h1></div>;
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.meta.title,
    "datePublished": post.meta.date,
    "author": {
      "@type": "Organization",
      "name": "Shambhavaa"
    }
  };

  return (
    <article className="container" style={{ padding: 'var(--spacing-md) 0', maxWidth: '800px' }}>
      <SEO schema={schema} />
      
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
        <a href="/">Home</a> &gt; <a href={`/${category}`} style={{ textTransform: 'capitalize' }}>{category}</a> &gt; <span style={{ color: 'var(--text-secondary)' }}>{post.meta.title}</span>
      </nav>

      <header style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>{post.meta.title}</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
          <span>{post.meta.date && new Date(post.meta.date).toLocaleDateString()}</span>
          <span>By Shambhavaa</span>
        </div>
      </header>

      <div className="article-content" style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
        <MDXRemote source={post.content} />
      </div>

      {/* Share Buttons Placeholder */}
      <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-color)' }}>
        <h3>Share this insight</h3>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <button className="btn" onClick={() => alert('Share to X (Twitter)')}>X (Twitter)</button>
          <button className="btn" onClick={() => alert('Share to Pinterest')}>Pinterest</button>
        </div>
      </div>
    </article>
  );
}
