import React from 'react';

export const metadata = {
  title: 'Editorial Policy | Shambhavaa',
  description: 'Our editorial policy outlines our commitment to quality, research, and authenticity in our astrology content.',
  alternates: {
    canonical: '/editorial-policy/',
  },
};

export default function EditorialPolicyPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Editorial Policy</h1>
        
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <p>
            Shambhavaa publishes educational writing about Vedic astrology and spiritual reflection.
            Astrology is presented as an interpretive tradition, not as a scientifically validated
            method of diagnosis or a guarantee of future events.
          </p>

          <h2 className="text-gold">Content Accuracy & Research</h2>
          <p>
            Our editorial standards distinguish source material, interpretation and illustrative examples:
          </p>
          <ul>
            <li><strong>Sources:</strong> When an article attributes a rule or quotation to a text, it should identify the source and relevant section. We do not claim every article has been checked against classical manuscripts.</li>
            <li><strong>Interpretation:</strong> Psychological language is used for reflection and does not establish a clinical finding or a personality fact about a reader.</li>
            <li><strong>Examples:</strong> Invented chart configurations are labelled hypothetical. They must not be presented as client cases, testimonials or evidence of predictive accuracy.</li>
          </ul>

          <h2 className="text-gold">Non-Sensationalism</h2>
          <p>
            We strictly avoid "clickbait" or sensationalist spiritual claims. You will not find articles promising "millions of dollars" 
            or "soulmates in 24 hours" on Shambhavaa. We focus on the slow, meaningful work of spiritual evolution.
          </p>

          <h2 className="text-gold">Author Integrity</h2>
          <p>
            Bylines identify the person responsible for an article. Source-based explanations, personal
            interpretations and AI-assisted additions should be distinguishable. Substantive revisions
            receive an updated date; a revision date is not evidence of independent expert review.
          </p>

          <h2 className="text-gold">AI Policy</h2>
          <p>
            AI tools may assist with drafting, explanations, hypothetical examples, FAQs, editing,
            formatting and technical work. Articles with substantive AI-assisted additions should
            disclose that assistance. We do not describe this process as entirely human-written.
          </p>
          <p>
            Author review is required before AI-assisted material is labelled author-reviewed.
            Automated checks of links, calculations or formatting do not substitute for that review.
            AI output is not a source, and citations must refer to material that supports the attributed claim.
          </p>

          <h2 className="text-gold">Community Feedback</h2>
          <p>
            We welcome corrections and constructive dialogue. If you believe an article contains a technical error in 
            astrological calculation or interpretation, please reach out to our editorial team at <strong>shambhavaa.reviews@gmail.com</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
