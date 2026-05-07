import BeehiivForm from '../components/BeehiivForm';

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

      {/* Newsletter Section */}
      <section id="newsletter" className="newsletter-section">
        <h2>Cosmic Insights, Delivered.</h2>
        <p>Join thousands of seekers receiving deep astrological analysis, transit updates, and spiritual psychology directly to their inbox.</p>
        <BeehiivForm />
      </section>
    </div>
  );
}
