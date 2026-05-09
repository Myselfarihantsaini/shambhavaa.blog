import React from 'react';

export const metadata = {
  title: 'Consultation Ethics | Shambhavaa',
  description: 'Our code of ethics for professional Vedic astrology consultations.',
};

export default function EthicsPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Consultation Ethics</h1>
        
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <p>
            Professional astrology is a sacred responsibility. At Shambhavaa, we adhere to a strict ethical code 
            to ensure the psychological and spiritual safety of every client.
          </p>

          <h2 className="text-gold">1. Confidentiality</h2>
          <p>
            All consultation details, birth data, and personal narratives shared during a session are strictly confidential. 
            We do not share client data with third parties or use client stories for content without explicit, written permission.
          </p>

          <h2 className="text-gold">2. Empowerment Over Fatalism</h2>
          <p>
            We do not predict the exact date of death, "accidents," or other catastrophic events. Our goal is to highlight 
            the <strong>energetic quality of time</strong>, providing the client with tools to navigate challenges rather 
            than creating fear or paralysis.
          </p>

          <h2 className="text-gold">3. Professional Boundaries</h2>
          <p>
            We are astrologers, not medical doctors or licensed therapists. If a client exhibits signs of deep clinical 
            distress, we will recommend seeking professional psychiatric or medical assistance.
          </p>

          <h2 className="text-gold">4. Honesty and Integrity</h2>
          <p>
            If a chart is unclear or if a specific question cannot be answered through astrological means, we will be 
            honest about our limitations. We do not "fill in gaps" with guesswork.
          </p>

          <h2 className="text-gold">5. Financial Transparency</h2>
          <p>
            Consultation fees are clearly stated upfront. We do not use "upselling" tactics for expensive "remedies" 
            (like gemstones or rituals) during or after a session.
          </p>

          <h2 className="text-gold">6. Respect for Free Will</h2>
          <p>
            We believe that the planets impel, but do not compel. Every consultation is framed around the client's 
            agency and their ability to evolve through conscious choice.
          </p>
        </div>
      </section>
    </div>
  );
}
