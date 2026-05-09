import React from 'react';

export const metadata = {
  title: 'Editorial Policy | Shambhavaa',
  description: 'Our editorial policy outlines our commitment to quality, research, and authenticity in our astrology content.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Editorial Policy</h1>
        
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <p>
            Shambhavaa is committed to producing the highest quality Vedic astrology content that is both traditionally 
            accurate and psychologically relevant. Our goal is to provide a "Gold Standard" for spiritual information.
          </p>

          <h2 className="text-gold">Content Accuracy & Research</h2>
          <p>
            Every article on Shambhavaa undergoes a rigorous research process:
          </p>
          <ul>
            <li><strong>Classical Synthesis:</strong> Insights are cross-referenced with foundational texts like Bṛhat Parāśara Horāśāstra and Saravali.</li>
            <li><strong>Psychological Layering:</strong> Traditional meanings are synthesized with modern depth psychology concepts.</li>
            <li><strong>Original Writing:</strong> We do not use AI-generated filler. Every article is written by a human expert with a unique voice and perspective.</li>
          </ul>

          <h2 className="text-gold">Non-Sensationalism</h2>
          <p>
            We strictly avoid "clickbait" or sensationalist spiritual claims. You will not find articles promising "millions of dollars" 
            or "soulmates in 24 hours" on Shambhavaa. We focus on the slow, meaningful work of spiritual evolution.
          </p>

          <h2 className="text-gold">Author Integrity</h2>
          <p>
            All content is authored by experienced practitioners. We maintain transparency regarding our expertise and 
            limitations. If an article is updated with new research, the "Last Updated" date will be clearly visible.
          </p>

          <h2 className="text-gold">AI Policy</h2>
          <p>
            At Shambhavaa, we believe that spiritual wisdom requires a soul. We do not use Large Language Models (LLMs) 
            to generate our core analysis or interpretative content. AI may be used for technical tasks (like SEO optimization 
            or formatting), but the wisdom itself is 100% human-born.
          </p>

          <h2 className="text-gold">Community Feedback</h2>
          <p>
            We welcome corrections and constructive dialogue. If you believe an article contains a technical error in 
            astrological calculation or interpretation, please reach out to our editorial team at <strong>hello@shambhavaa.blog</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
