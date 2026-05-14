import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import SEO from '../../../components/SEO';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ShareButtons from '../../../components/ShareButtons';
import AuthorBox from '../../../components/AuthorBox';

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
    alternates: {
      canonical: `/${category}/${slug}/`,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      authors: ['Arihant Saini'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.description,
    },
    keywords: post.meta.keywords,
  };
}

export default function ArticlePage({ params }) {
  const { category, slug } = params;
  const post = getPostBySlug(category, slug);

  if (!post) {
    return <div className="container" style={{ padding: '4rem 0' }}><h1>Post not found</h1></div>;
  }

  const readingTime = getReadingTime(post.content);
  const allPosts = getAllPosts();
  const relatedPosts = allPosts
    .filter(p => p.slug !== slug && (p.category === category || p.meta.trending))
    .slice(0, 3);

  const faqSchema = Array.isArray(post.meta.faqs) && post.meta.faqs.length > 0
    ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": post.meta.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }]
    : [];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.meta.title,
      "description": post.meta.excerpt,
      "datePublished": post.meta.date,
      "dateModified": post.meta.updatedDate || post.meta.date,
      "author": {
        "@type": "Person",
        "name": "Arihant Saini",
        "url": "https://shambhavaa.blog/about"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Shambhavaa",
        "logo": {
          "@type": "ImageObject",
          "url": "https://shambhavaa.blog/logo.png"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://shambhavaa.blog/${category}/${slug}`
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shambhavaa.blog"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.charAt(0).toUpperCase() + category.slice(1),
          "item": `https://shambhavaa.blog/${category}`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.meta.title,
          "item": `https://shambhavaa.blog/${category}/${slug}`
        }
      ]
    },
    ...faqSchema
  ];

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
        background: 'rgba(255,255,255,0.05)', 
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
      <nav style={{ marginBottom: 'var(--spacing-md)', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
        <a href="/">Home</a> <span style={{ margin: '0 0.5rem' }}>&rarr;</span> 
        <a href={`/${category}`} style={{ textTransform: 'capitalize' }}>{category}</a> <span style={{ margin: '0 0.5rem' }}>&rarr;</span> 
        <span style={{ color: 'var(--accent-gold)' }}>{post.meta.title}</span>
      </nav>

      <header style={{ marginBottom: 'var(--spacing-lg)' }}>
        <h1 style={{ fontSize: '3rem', color: 'var(--accent-gold)', marginBottom: '1.5rem', lineHeight: '1.1' }}>{post.meta.title}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', fontSize: '0.9rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--accent-gold-dim)' }}></div>
            <span>Arihant Saini</span>
          </div>
          <span>•</span>
          <span>{post.meta.date && new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          <span>•</span>
          <span>{readingTime} min read</span>
        </div>
      </header>

      <div className="article-content" style={{ fontSize: '1.15rem', lineHeight: '1.8', color: 'var(--text-primary)' }}>
        <MDXRemote source={post.content} />
      </div>

      <AuthorBox 
        date={post.meta.date} 
        updatedDate={post.meta.updatedDate} 
        readingTime={readingTime} 
      />

      <div style={{ marginTop: 'var(--spacing-lg)', paddingTop: 'var(--spacing-md)', borderTop: '1px solid var(--border-color)' }}>
        <h3 className="text-gold" style={{ marginBottom: '1.5rem' }}>Share this insight</h3>
        <ShareButtons title={post.meta.title} />
      </div>

      {/* Related Insights */}
      {relatedPosts.length > 0 && (
        <section style={{ marginTop: 'var(--spacing-xl)', borderTop: '1px solid var(--border-color)', paddingTop: 'var(--spacing-lg)' }}>
          <h2 className="text-gold" style={{ marginBottom: '2rem' }}>Related Insights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {relatedPosts.map(p => (
              <a key={p.slug} href={`/${p.category}/${p.slug}`} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{p.meta.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>{p.meta.excerpt}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>Read Insight &rarr;</span>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
