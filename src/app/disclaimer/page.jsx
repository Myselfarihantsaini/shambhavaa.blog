import React from 'react';

export const metadata = {
  title: 'Disclaimer | Shambhavaa',
  description: 'Important legal disclaimer regarding the astrological information provided on Shambhavaa.blog.',
  alternates: {
    canonical: '/disclaimer/',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <h1 className="text-gold" style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>Disclaimer</h1>
        
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <p>Last Updated: May 9, 2026</p>
          
          <p>
            The information provided by Shambhavaa.blog is for <strong>educational and entertainment purposes only</strong>. 
            All astrological insights, psychological analyses, and spiritual interpretations are based on traditional Vedic 
            astrology (Jyotish) and are subject to the interpretation of the author.
          </p>

          <h2 className="text-gold">No Professional Advice</h2>
          <p>
            Astrology is a tool for self-reflection and spiritual growth. It should not be used as a substitute for professional 
            medical, legal, financial, or psychological advice. Shambhavaa.blog does not provide medical diagnoses or financial 
            recommendations. Always seek the advice of a qualified professional for such matters.
          </p>

          <h2 className="text-gold">No Guarantees of Accuracy</h2>
          <p>
            While we strive for deep accuracy and research-backed insights, astrology is interpretive by nature. We make 
            <strong> no guarantees or warranties</strong> regarding the accuracy, reliability, or completeness of the 
            predictions or interpretations provided on this site. Your life experiences and free will are the primary drivers 
            of your destiny.
          </p>

          <h2 className="text-gold">Assumption of Risk</h2>
          <p>
            Any action you take based on the information found on this website is strictly at your own risk. Shambhavaa.blog 
            and its founder, Arihant Saini, will not be liable for any losses or damages in connection with the use of our website.
          </p>

          <h2 className="text-gold">External Links</h2>
          <p>
            Our website may contain links to external sites that are not provided or maintained by us. Please note that 
            Shambhavaa.blog does not guarantee the accuracy, relevance, or completeness of any information on these external websites.
          </p>

          <h2 className="text-gold">Predictive Astrology</h2>
          <p>
            We explicitly reject "fear-based" astrology. Predictions regarding Mahadashas or transits are provided as 
            "psychological seasons" and potential energetic trends. They are not fixed destinies or "miracle" events.
          </p>
        </div>
      </section>
    </div>
  );
}
