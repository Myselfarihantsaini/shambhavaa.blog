import BeehiivForm from '../components/BeehiivForm';
import { getAllPosts } from '../lib/posts';
import { shortAnchorTitle } from '../lib/anchors';
import { ArrowRight, Calculator, FileText, FolderOpen, User, Shield, Star, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';

const articleFolderDetails = {
  horoscopes: {
    label: 'Horoscope 2026',
    description: 'Yearly and month-by-month sign predictions.',
  },
  saturn: {
    label: 'Saturn & Karma',
    description: 'Discipline, isolation, karma, transit lessons, and maturity.',
  },
  rahu: {
    label: 'Rahu Psychology',
    description: 'Obsession, desire, ambition, illusion, and shadow patterns.',
  },
  ketu: {
    label: 'Ketu & Detachment',
    description: 'Spiritual release, dasha transitions, and past-life residue.',
  },
  sun: {
    label: 'Sun Placements',
    description: 'Identity, authority, visibility, confidence, and house results.',
  },
  mahadasha: {
    label: 'Mahadasha',
    description: 'Dasha timing, planetary periods, D1-D9 judgment, and prediction.',
  },
  'birth-chart': {
    label: 'Birth Chart',
    description: 'Psychological and spiritual architecture of the kundli.',
  },
  'house-lords': {
    label: 'House Lords',
    description: 'Functional house lord results and placement-based guidance.',
  },
  nakshatra: {
    label: 'Nakshatra',
    description: 'Lunar mansion psychology, instincts, and emotional patterns.',
  },
};

const articleFolderOrder = [
  'horoscopes',
  'birth-chart',
  'mahadasha',
  'house-lords',
  'nakshatra',
  'saturn',
  'rahu',
  'ketu',
  'sun',
];

function getArticleFolders(posts) {
  const groupedPosts = posts.reduce((folders, post) => {
    if (!folders[post.category]) folders[post.category] = [];
    folders[post.category].push(post);
    return folders;
  }, {});

  return Object.entries(groupedPosts)
    .filter(([category]) => !['resources', 'services', 'trust'].includes(category))
    .map(([category, categoryPosts]) => ({
      category,
      label: articleFolderDetails[category]?.label || category.replace(/-/g, ' '),
      description: articleFolderDetails[category]?.description || 'Browse all guides in this article folder.',
      posts: categoryPosts,
    }))
    .sort((a, b) => {
      const aIndex = articleFolderOrder.indexOf(a.category);
      const bIndex = articleFolderOrder.indexOf(b.category);
      const normalizedA = aIndex === -1 ? articleFolderOrder.length : aIndex;
      const normalizedB = bIndex === -1 ? articleFolderOrder.length : bIndex;
      return normalizedA - normalizedB || a.label.localeCompare(b.label);
    });
}

const homepageSchema = [
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Shambhavaa",
    "url": "https://shambhavaa.blog",
    "description": "A global authority on deep Vedic astrology, Nakshatra psychology, karmic astrology, predictive astrology, and spiritual healing.",
    "inLanguage": "en-US",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://shambhavaa.blog/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shambhavaa",
    "url": "https://shambhavaa.blog",
    "logo": {
      "@type": "ImageObject",
      "url": "https://shambhavaa.blog/images/og-default.jpg"
    },
    "sameAs": [
      "https://www.instagram.com/sham_bhavaa/",
      "https://www.threads.com/myself_arihant",
      "https://www.tumblr.com/shambhava"
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Arihant Saini",
    "url": "https://shambhavaa.blog/about",
    "jobTitle": "Vedic Astrologer",
    "worksFor": {
      "@type": "Organization",
      "name": "Shambhavaa",
      "url": "https://shambhavaa.blog"
    },
    "sameAs": [
      "https://www.instagram.com/sham_bhavaa/",
      "https://www.threads.com/myself_arihant"
    ]
  }
];

export default function Home() {
  const allPosts = getAllPosts();
  const trendingPosts = allPosts.filter(p => p.meta.trending);
  const articleFolders = getArticleFolders(allPosts);

  return (
    <div className="container">
      <SEO schema={homepageSchema} />
      {/* Hero Section */}
      <section className="animate-fade-in" style={{ padding: 'var(--spacing-xl) 0 4rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-md)', color: 'var(--accent-gold)', lineHeight: '1.1' }}>
          The Architecture <br /> of the Soul
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto var(--spacing-md)', lineHeight: '1.6' }}>
          Deep Vedic astrology, Nakshatra psychology, and karmic insights synthesized for the modern seeker.
          Move beyond generic predictions into the authentic depth of the stars.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
          <a href="#newsletter" className="btn btn-primary">Join the Inner Circle</a>
          <a href="/about" className="btn">Our Philosophy</a>
        </div>
      </section>

      {/* Trust Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        marginBottom: 'var(--spacing-xl)',
        color: 'var(--text-secondary)',
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        opacity: 0.7,
        flexWrap: 'wrap'
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Shield size={16} /> 100% Human Writing</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={16} /> Evidence Based Analysis</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><BookOpen size={16} /> Classical Vedic Wisdom</span>
      </div>

      {/* Latest Articles */}
      <section style={{ padding: '0 0 var(--spacing-lg)' }}>
        <h2 className="text-center text-gold mb-4" style={{ fontSize: '2.5rem' }}>Latest Deep Dives</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {allPosts.slice(0, 6).map(post => (
            <div key={post.slug} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>{post.meta.title}</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', marginBottom: '1.25rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                {post.category} • {new Date(post.meta.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1rem', flex: 1, lineHeight: '1.6' }}>{post.meta.excerpt}</p>
              <a href={`/${post.category}/${post.slug}`} style={{ fontWeight: 'bold' }}>Latest {shortAnchorTitle(post.meta.title)} &rarr;</a>
            </div>
          ))}
        </div>
      </section>

      {/* Article Folders */}
      <section className="article-folders" style={{ padding: '0 0 var(--spacing-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-gold)',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.8rem'
            }}>
              <FolderOpen size={16} /> Article Folders
            </span>
            <h2 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Browse by Topic</h2>
            <p style={{ maxWidth: '680px', color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
              Find horoscope predictions, chart analysis, dasha guidance, remedies, and astrology learning guides from one clear place.
            </p>
          </div>
          <a href="/horoscopes" className="btn" style={{ flexShrink: 0 }}>Start with 2026</a>
        </div>

        <div className="article-folder-grid">
          {articleFolders.map(folder => (
            <article key={folder.category} className="article-folder-card">
              <a href={`/${folder.category}`} className="article-folder-heading" aria-label={`Open ${folder.label} folder`}>
                <span className="article-folder-icon" aria-hidden="true">
                  <FolderOpen size={22} />
                </span>
                <span>
                  <span className="article-folder-title">{folder.label}</span>
                  <span className="article-folder-count">{folder.posts.length} {folder.posts.length === 1 ? 'article' : 'articles'}</span>
                </span>
                <ArrowRight className="article-folder-arrow" size={18} aria-hidden="true" />
              </a>
              <p className="article-folder-description">{folder.description}</p>
              <div className="article-folder-links">
                {folder.posts.slice(0, 3).map(post => (
                  <a key={post.slug} href={`/${post.category}/${post.slug}`}>
                    <FileText size={15} aria-hidden="true" />
                    <span>{shortAnchorTitle(post.meta.title)}</span>
                  </a>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tools */}
      <section style={{ padding: '0 0 var(--spacing-lg)' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <div>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'var(--accent-gold)',
              fontSize: '0.78rem',
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              marginBottom: '0.8rem'
            }}>
              <Calculator size={16} /> Free Astrology Tools
            </span>
            <h2 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Calculate Your Chart</h2>
            <p style={{ maxWidth: '680px', color: 'var(--text-secondary)', fontSize: '1.05rem', margin: 0 }}>
              Generate a North Indian style Vedic kundli with Lagna, Moon sign, nakshatra, houses, and planetary placements.
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          <div className="card" style={{ display: 'block', padding: '2.5rem', color: 'inherit' }}>
            <Calculator size={34} color="var(--accent-gold)" />
            <h3 className="text-gold" style={{ fontSize: '1.8rem', marginTop: '1.2rem' }}>Free Kundli Generator</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem' }}>
              Enter birth date, time, and place to generate your D1 Rashi chart in North Indian format.
            </p>
            <a href="/tools/kundli-chart" style={{ fontWeight: 'bold' }}>Open Kundli Tool &rarr;</a>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      {trendingPosts.length > 0 && (
        <section style={{ paddingBottom: 'var(--spacing-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{
              background: 'var(--accent-gold)',
              color: '#000',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              fontSize: '0.75rem',
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>Trending Insights</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
            {trendingPosts.slice(0, 3).map((post, index) => (
              <div key={post.slug} style={{
                display: 'flex',
                gap: '1.5rem',
                alignItems: 'flex-start',
                color: 'inherit'
              }}>
                <div style={{ fontSize: '3rem', fontWeight: 'bold', color: 'rgba(212, 175, 55, 0.15)', fontFamily: 'var(--font-heading)', lineHeight: '1' }}>
                  0{index + 1}
                </div>
                <div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--accent-gold)', fontWeight: 'bold', marginBottom: '0.4rem', textTransform: 'uppercase' }}>
                    {post.category}
                  </p>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', lineHeight: '1.3' }}>{post.meta.title}</h3>
                  <a href={`/${post.category}/${post.slug}`} style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    Trending {shortAnchorTitle(post.meta.title)} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Meet the Founder Section (Trust & E-E-A-T) */}
      <section style={{ padding: 'var(--spacing-lg) 0', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)', margin: 'var(--spacing-lg) 0' }}>
        <div style={{ display: 'flex', gap: '4rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <h2 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>The Vision Behind Shambhavaa</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              Shambhavaa is led by <strong>Arihant Saini</strong>, a Vedic astrologer dedicated to removing the fear-based narratives of traditional astrology.
              By synthesizing the psychological depth of the Nakshatras with the karmic laws of Saturn, we provide a roadmap for radical self-responsibility and spiritual evolution.
            </p>
            <a href="/about" style={{ fontWeight: 'bold' }}>Read Our Story &rarr;</a>
          </div>
          <div style={{ width: '300px', height: '300px', background: 'var(--card-bg)', border: '1px solid var(--accent-gold-dim)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={120} color="var(--accent-gold-dim)" />
          </div>
        </div>
      </section>

      {/* Pillar Topics */}
      <section style={{ padding: 'var(--spacing-lg) 0' }}>
        <h2 className="text-center text-gold mb-4" style={{ fontSize: '2.5rem' }}>Core Knowledge Hubs</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 className="text-gold" style={{ fontSize: '1.8rem' }}>Saturn & Karma</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem' }}>Understand the Lord of Karma. Discover how Saturn's transits and placement shape your soul's greatest lessons and ultimate discipline.</p>
            <a href="/saturn" style={{ fontWeight: 'bold' }}>Explore Saturn &rarr;</a>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 className="text-gold" style={{ fontSize: '1.8rem' }}>Rahu & Ketu</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem' }}>The lunar nodes hold the key to your past life mastery and current life obsession. Uncover the spiritual psychology of the eclipse axis.</p>
            <a href="/rahu" style={{ fontWeight: 'bold' }}>Explore Rahu Ketu &rarr;</a>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 className="text-gold" style={{ fontSize: '1.8rem' }}>Moon Psychology</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem' }}>The filter of your reality. Discover how your lunar placement determines your emotional safety, subconscious habits, and peace of mind.</p>
            <a href="/moon" style={{ fontWeight: 'bold' }}>Explore Moon &rarr;</a>
          </div>

          <div className="card" style={{ padding: '2.5rem' }}>
            <h3 className="text-gold" style={{ fontSize: '1.8rem' }}>Nakshatra Secrets</h3>
            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0 1.5rem' }}>Vedic astrology's greatest secret. The 27 lunar mansions reveal your deepest emotional patterns, psychological drives, and spiritual gifts.</p>
            <a href="/nakshatra" style={{ fontWeight: 'bold' }}>Explore Nakshatra &rarr;</a>
          </div>

        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="newsletter-section" style={{ background: 'rgba(212, 175, 55, 0.05)', borderRadius: '12px', padding: 'var(--spacing-lg)' }}>
        <h2 style={{ fontSize: '3rem' }}>Cosmic Insights, Delivered.</h2>
        <p style={{ fontSize: '1.2rem' }}>Join thousands of seekers receiving deep astrological analysis, transit updates, and spiritual psychology directly to their inbox.</p>
        <div style={{ maxWidth: '500px', margin: '0 auto' }}>
          <BeehiivForm />
        </div>
      </section>
    </div>
  );
}
