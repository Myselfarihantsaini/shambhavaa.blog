import React from 'react';

export const metadata = {
  title: 'About Shambhavaa | The Psychology of Vedic Astrology',
  description: 'Learn about the philosophy, methodology, and founder of Shambhavaa—a publication dedicated to deep Vedic astrology and spiritual transformation.',
  alternates: {
    canonical: '/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)' }}>The Path of Shambhavaa</h1>
        
        <div className="article-content">
          <p>
            Shambhavaa was born out of a singular necessity: to bridge the gap between ancient Vedic wisdom and modern psychological depth. 
            In a world saturated with generic horoscopes and superficial predictions, Shambhavaa serves as a sanctuary for those seeking 
            the <strong>authentic architecture of the soul</strong>.
          </p>

          <blockquote>
            "Astrology is not a map of what will happen to you; it is a map of who you are becoming."
          </blockquote>

          <h2 className="text-gold">Our Philosophy</h2>
          <p>
            We believe that the movements of the planets are not just celestial events, but reflections of internal psychological archetypes. 
            Vedic astrology (Jyotish) is the "Science of Light," designed to illuminate the dark corners of the subconscious mind. 
            Our approach is <strong>non-fatalistic, evolutionary, and psychologically grounded</strong>.
          </p>

          <h2 className="text-gold">The Methodology</h2>
          <p>
            At Shambhavaa, we utilize a multi-layered interpretive framework:
          </p>
          <ul>
            <li><strong>Karmic Analysis:</strong> Understanding the Saturnian lessons and Rahu-Ketu axis that define the soul's current trajectory.</li>
            <li><strong>Nakshatra Psychology:</strong> Diving into the 27 lunar mansions to uncover deep-seated emotional patterns and hidden talents.</li>
            <li><strong>Shadow Work:</strong> Using the placement of the "malefics" not as threats, but as opportunities for profound psychological integration.</li>
            <li><strong>Predictive Wisdom:</strong> Analyzing Mahadashas and Transits as seasons of growth rather than rigid destiny.</li>
          </ul>

          <h2 className="text-gold">The Founder</h2>
          <p>
            Shambhavaa was founded by <strong>Arihant Saini</strong>, a dedicated practitioner of Vedic astrology with years of experience 
            in psychological analysis and spiritual counseling. His work focuses on removing the "fear-based" narrative often found in 
            traditional astrology and replacing it with empowerment, clarity, and self-awareness.
          </p>
          <p>
            Arihant's research philosophy is rooted in the belief that astrology is a tool for <strong>radical responsibility</strong>. 
            By understanding our cosmic blueprint, we stop being victims of "fate" and start being co-creators of our reality.
          </p>

          <h2 className="text-gold">Research & Ethics</h2>
          <p>
            Every insight published on Shambhavaa is the result of rigorous study of classical texts (Bṛhat Parāśara Horāśāstra, Phaladeepika) 
            synthesized with contemporary psychological insights. We maintain a strict ethical standard: we do not provide "miracle cures" 
            or fear-mongering predictions. Our goal is education and spiritual evolution.
          </p>
          
          <div style={{ marginTop: 'var(--spacing-lg)', textAlign: 'center' }}>
            <a href="/contact" className="btn btn-primary">Connect with Us</a>
          </div>
        </div>
      </section>
    </div>
  );
}
