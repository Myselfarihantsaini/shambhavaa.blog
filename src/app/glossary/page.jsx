import glossaryData from '../../data/glossary.json';
import SEO from '../../components/SEO';

export const metadata = {
  title: 'Vedic Astrology Glossary | Key Terms Explained | Shambhavaa',
  description: 'A comprehensive glossary of Vedic astrology terms — Nakshatra, Mahadasha, Rahu, Ketu, Sade Sati, Atmakaraka, and more. Clear definitions for students and seekers.',
  alternates: {
    canonical: 'https://shambhavaa.blog/glossary/',
  },
  openGraph: {
    title: 'Vedic Astrology Glossary | Shambhavaa',
    description: 'Key Vedic astrology terms clearly defined — Nakshatra, Mahadasha, Rahu, Ketu, Sade Sati, and more.',
    url: 'https://shambhavaa.blog/glossary/',
    siteName: 'Shambhavaa',
    images: [{ url: 'https://shambhavaa.blog/images/og-default.jpg', width: 1200, height: 630, alt: 'Vedic Astrology Glossary' }],
  },
};

export default function GlossaryPage() {
  const sortedGlossary = [...glossaryData].sort((a, b) => a.term.localeCompare(b.term));

  const glossarySchema = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      "name": "Vedic Astrology Glossary",
      "description": "A guide to the deep terminology of Vedic astrology and spiritual psychology.",
      "url": "https://shambhavaa.blog/glossary/",
      "inLanguage": "en-US",
      "hasDefinedTerm": sortedGlossary.map(item => ({
        "@type": "DefinedTerm",
        "name": item.term,
        "description": item.definition,
        "inDefinedTermSet": "https://shambhavaa.blog/glossary/"
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://shambhavaa.blog" },
        { "@type": "ListItem", "position": 2, "name": "Glossary", "item": "https://shambhavaa.blog/glossary/" }
      ]
    }
  ];

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '900px' }}>
      <SEO schema={glossarySchema} />
      <h1 className="text-gold" style={{ fontSize: '3rem', marginBottom: '2rem', textAlign: 'center' }}>
        Astrology Glossary
      </h1>
      <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '4rem', fontSize: '1.2rem' }}>
        A guide to the deep terminology of Vedic astrology and spiritual psychology.
      </p>

      <div style={{ display: 'grid', gap: '2rem' }}>
        {sortedGlossary.map((item, index) => (
          <div 
            key={index} 
            style={{ 
              padding: '2rem', 
              background: 'var(--card-bg)', 
              borderRadius: '12px', 
              border: '1px solid var(--border-color)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}
          >
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.5rem', marginBottom: '1rem' }}>
              {item.term}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '1.1rem' }}>
              {item.definition}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
