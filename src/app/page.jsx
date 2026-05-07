import BeehiivForm from '../components/BeehiivForm';
import { getAllPosts } from '../lib/posts';

export default function Home() {
  return (
    <div className="container">
      {/* Hero Section */}
      <section className="animate-fade-in" style={{ padding: 'var(--spacing-xl) 0', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-md)', color: 'var(--accent-gold)' }}>
          Awaken Your Cosmic Blueprint
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto var(--spacing-md)' }}>
          Deep Vedic astrology, Nakshatra psychology, and karmic insights to navigate your spiritual journey. Move beyond generic horoscopes into the authentic depth of the stars.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="#newsletter" className="btn btn-primary">Join the Inner Circle</a>
          <a href="/nakshatra" className="btn">Explore Nakshatras</a>
        </div>
      </section>
      
      {/* Trending Section */}
      {getAllPosts().filter(p => p.meta.trending).length > 0 && (
        <section style={{ paddingBottom: 'var(--spacing-lg)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ 
              background: 'var(--accent-gold)', 
              color: '#000', 
              padding: '0.2rem 0.6rem', 
              borderRadius: '4px', 
              fontSize: '0.75rem', 
              fontWeight: 'bold',
              textTransform: 'uppercase'
            }}>Trending Now</span>
            <div style={{ height: '1px', flex: 1, background: 'var(--border-color)' }}></div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {getAllPosts().filter(p => p.meta.trending).slice(0, 3).map(post => {
              const trendingPosts = getAllPosts().filter(p => p.meta.trending);
              return (
                <a key={post.slug} href={`/${post.category}/${post.slug}`} style={{ 
                  display: 'flex', 
                  gap: '1.5rem', 
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: 'inherit'
                }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'rgba(212, 175, 55, 0.2)', fontFamily: 'var(--font-heading)' }}>
                    0{trendingPosts.indexOf(post) + 1}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{post.meta.title}</h3>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{post.category.toUpperCase()}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </section>
      )}

      {/* Pillar Topics */}
      <section style={{ padding: 'var(--spacing-lg) 0' }}>
        <h2 className="text-center text-gold mb-4">Core Pillars of Wisdom</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          <div className="card">
            <h3 className="text-gold">Saturn & Karma</h3>
            <p>Understand the Lord of Karma. Discover how Saturn's transits and placement shape your soul's greatest lessons and ultimate discipline.</p>
            <a href="/saturn" style={{ display: 'inline-block', marginTop: '1rem' }}>Read Guide &rarr;</a>
          </div>

          <div className="card">
            <h3 className="text-gold">Rahu & Ketu</h3>
            <p>The lunar nodes hold the key to your past life mastery and current life obsession. Uncover the spiritual psychology of the eclipse axis.</p>
            <a href="/rahu" style={{ display: 'inline-block', marginTop: '1rem' }}>Read Guide &rarr;</a>
          </div>

          <div className="card">
            <h3 className="text-gold">Nakshatra Psychology</h3>
            <p>Vedic astrology's greatest secret. The 27 lunar mansions reveal your deepest emotional patterns, psychological drives, and spiritual gifts.</p>
            <a href="/nakshatra" style={{ display: 'inline-block', marginTop: '1rem' }}>Read Guide &rarr;</a>
          </div>

        </div>
      </section>

      {/* Latest Articles */}
      <section style={{ padding: 'var(--spacing-lg) 0' }}>
        <h2 className="text-center text-gold mb-4">Latest Insights</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {getAllPosts().slice(0, 6).map(post => (
            <div key={post.slug} className="card">
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem' }}>
                <a href={`/${post.category}/${post.slug}`} style={{ color: 'var(--text-primary)' }}>
                  {post.meta.title}
                </a>
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--accent-gold)', marginBottom: '1rem' }}>
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)} • {new Date(post.meta.date).toLocaleDateString()}
              </p>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>{post.meta.excerpt}</p>
              <a href={`/${post.category}/${post.slug}`}>Read More &rarr;</a>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="newsletter" className="newsletter-section">
        <h2>Cosmic Insights, Delivered.</h2>
        <p>Join thousands of seekers receiving deep astrological analysis, transit updates, and spiritual psychology directly to their inbox.</p>
        <BeehiivForm />
      </section>
    </div>
  );
}
