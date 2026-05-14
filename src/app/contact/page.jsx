import React from 'react';

export const metadata = {
  title: 'Contact Shambhavaa | Reach Out for Inquiries',
  description: 'Connect with Shambhavaa for inquiries regarding Vedic astrology consultations, collaborations, or editorial questions.',
  alternates: {
    canonical: '/contact/',
  },
};

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>Connect with Shambhavaa</h1>
        
        <div className="article-content">
          <p>
            Whether you have a question about a specific article, are interested in a deep-dive consultation, or wish to 
            collaborate on a spiritual project, we are here to listen.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: 'var(--spacing-md)' }}>
            <div className="card">
              <h3 className="text-gold">Editorial Inquiries</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                For questions regarding our content, research methodology, or errors in articles.
              </p>
              <p style={{ marginTop: '1rem', fontWeight: 'bold' }}>hello@shambhavaa.blog</p>
            </div>
            
            <div className="card">
              <h3 className="text-gold">Consultations</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                To book a private session with Arihant Saini or inquire about services.
              </p>
              <a href="https://shambhavaa.com" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', marginTop: '1rem' }}>
                Visit shambhavaa.com &rarr;
              </a>
            </div>
          </div>

          <h2 className="text-gold" style={{ marginTop: 'var(--spacing-lg)' }}>Social Channels</h2>
          <p>
            For daily insights, transit updates, and quick psychological tips, follow our social presence:
          </p>
          <ul style={{ listStyle: 'none', marginLeft: 0 }}>
            <li><strong>Instagram:</strong> <a href="https://www.instagram.com/sham_bhavaa/" target="_blank" rel="noopener noreferrer">@sham_bhavaa</a></li>
            <li><strong>Threads:</strong> <a href="https://www.threads.com/myself_arihant" target="_blank" rel="noopener noreferrer">@myself_arihant</a></li>
            <li><strong>Tumblr:</strong> <a href="https://www.tumblr.com/shambhava" target="_blank" rel="noopener noreferrer">shambhava</a></li>
          </ul>

          <h2 className="text-gold">Response Time</h2>
          <p>
            We are a small team dedicated to deep research. While we try to respond to every message, please allow 
            <strong> 48–72 hours</strong> for a thoughtful reply.
          </p>
        </div>
      </section>
    </div>
  );
}
