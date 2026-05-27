import { getPostBySlug, getAllPosts } from '../../../lib/posts';
import SEO from '../../../components/SEO';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
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

  const canonicalUrl = `https://shambhavaa.blog/${category}/${slug}/`;

  // Trust pages are compliance/support pages, not primary AdSense inventory.
  if (post.meta.noindex || category === 'trust') {
    return {
      title: post.meta.title,
      robots: { index: false, follow: true },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  }

  const ogImage = `https://shambhavaa.blog/images/og-default.jpg`;

  return {
    title: `${post.meta.title} | Shambhavaa`,
    description: post.meta.excerpt || post.meta.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.description,
      type: 'article',
      publishedTime: post.meta.date,
      modifiedTime: post.meta.updatedDate || post.meta.date,
      authors: ['Arihant Saini'],
      url: canonicalUrl,
      siteName: 'Shambhavaa',
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.meta.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.meta.title,
      description: post.meta.excerpt || post.meta.description,
      images: [ogImage],
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

  const canonicalUrl = `https://shambhavaa.blog/${category}/${slug}/`;
  const isServicePage = category === 'services';

  const faqSchema = Array.isArray(post.meta.faqs) && post.meta.faqs.length > 0
    ? [
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": post.meta.faqs.map((faq) => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.answer,
            },
          })),
        },
      ]
    : [];

  const primarySchema =
    category === 'services'
      ? {
          "@context": "https://schema.org",
          "@type": "Service",
          "name": post.meta.title,
          "description": post.meta.excerpt || post.meta.description,
          "url": canonicalUrl,
          "serviceType": "Vedic Astrology Consultation",
          "provider": {
            "@type": "Organization",
            "name": "Shambhavaa",
            "url": "https://shambhavaa.blog/",
          },
          "areaServed": "Worldwide",
          "inLanguage": "en-US",
        }
      : {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.meta.title,
          "description": post.meta.excerpt || post.meta.description,
          "datePublished": post.meta.date,
          "dateModified": post.meta.updatedDate || post.meta.date,
          "inLanguage": "en-US",
          "keywords": Array.isArray(post.meta.keywords)
            ? post.meta.keywords.join(', ')
            : post.meta.keywords,
          "image": "https://shambhavaa.blog/images/og-default.jpg",
          "author": {
            "@type": "Person",
            "name": "Arihant Saini",
            "url": "https://shambhavaa.blog/about/",
          },
          "publisher": {
            "@type": "Organization",
            "name": "Shambhavaa",
            "url": "https://shambhavaa.blog/",
            "logo": {
              "@type": "ImageObject",
              "url": "https://shambhavaa.blog/images/og-default.jpg",
            },
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": canonicalUrl,
          },
        };

  const schema = [
    primarySchema,
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": "https://shambhavaa.blog/",
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": category.charAt(0).toUpperCase() + category.slice(1),
          "item": `https://shambhavaa.blog/${category}/`,
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": post.meta.title,
          "item": canonicalUrl,
        },
      ],
    },
    ...faqSchema,
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
        <MDXRemote
          source={post.content}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          }}
        />
      </div>

      {isServicePage && (
        <section className="service-depth-section">
          <h2>How Shambhavaa Keeps This Reading Practical</h2>
          <p>
            Every consultation page on Shambhavaa is written to help you understand the method before you book, not to create fear or dependency. A useful Vedic astrology reading should explain the chart structure, the active dasha period, the supporting divisional charts, and the practical timing shown by major transits. The purpose is not to promise a fixed outcome, but to show where your effort, awareness, and decision-making can become more aligned with the chart.
          </p>
          <p>
            In a session, the astrologer studies the relevant house, house lord, karaka planet, dignity, nakshatra influence, conjunctions, aspects, dasha sequence, and current transit pressure. This layered process helps separate temporary emotional confusion from a deeper life pattern. It also protects the client from one-line predictions that sound dramatic but do not explain the reason behind the interpretation.
          </p>
          <p>
            You are encouraged to arrive with accurate birth details, a clear question, and openness to practical guidance. Remedies, when suggested, are treated as supportive spiritual disciplines rather than shortcuts. The final aim is clarity: what is active now, what requires patience, what needs responsibility, and where your choices matter most.
          </p>
        </section>
      )}

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
