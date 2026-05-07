import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import SEO from '../../../components/SEO';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ShareButtons from '../../../components/ShareButtons';
import fs from 'fs';
import path from 'path';

// Helper to calculate reading time
function getReadingTime(content) {
  const wordsPerMinute = 200;
  const words = content.split(/\s/g).length;
  return Math.ceil(words / wordsPerMinute);
}

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

  const readingTime = getReadingTime(post.content);

  return (
    <article className="container" style={{ padding: 'var(--spacing-md) 0', maxWidth: '800px', position: 'relative' }}>
      <SEO schema={schema} />
      
      {/* Sticky Reading Progress Bar */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '4px', 
        background: 'rgba(255,255,255,0.1)', 
        zIndex: 1000 
      }}>
        <div id="progress-bar" style={{ 
          height: '100%', 
          background: 'var(--accent-gold)', 
          width: '0%', 
          transition: 'width 0.1s ease' 
        }}></div>
      </div>
      <script dangerouslySetInnerHTML={{ __html: `
        window.onscroll = function() {
          var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
          var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          var scrolled = (winScroll / height) * 100;
          document.getElementById("progress-bar").style.width = scrolled + "%";
        };
      `}} />
      
      {/* Breadcrumbs */}
      <nav style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.875rem' }}>
        <a href="/">Home</a> &gt; <a href={`/${category}`} style={{ textTransform: 'capitalize' }}>{category}</a> &gt; <span style={{ color: 'var(--text-secondary)' }}>{post.meta.title}</span>
      </nav>

      <header style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>{post.meta.title}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', fontSize: '0.9rem' }}>
          <span>{post.meta.date && new Date(post.meta.date).toLocaleDateString()}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
          <span>•</span>
          <span>By Shambhavaa</span>
        </div>
      </header>

      <div className="article-content" style={{ fontSize: '1.125rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
        <MDXRemote source={post.content} />
      </div>

      {/* Author Box */}
      <div style={{ 
        marginTop: 'var(--spacing-lg)', 
        padding: 'var(--spacing-md)', 
        background: 'var(--card-bg)', 
        borderRadius: '8px', 
        border: '1px solid var(--border-color)',
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'center'
      }}>
        <div style={{ 
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: 'var(--accent-gold-dim)', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          fontSize: '2rem',
          color: 'var(--accent-gold)',
          flexShrink: 0
        }}>
          S
        </div>
        <div>
          <h4 style={{ color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>About Shambhavaa</h4>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Deep Vedic astrologer, Nakshatra researcher, and spiritual guide. Dedicated to revealing the psychological and karmic depths of the stars to help souls navigate their cosmic blueprint.
          </p>
        </div>
      </div>

      {/* Share Buttons */}
      <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-color)' }}>
        <h3>Share this insight</h3>
        <ShareButtons title={post.meta.title} />
      </div>
    </article>
  );
}
