import glossaryData from '../../data/glossary.json';

export default function GlossaryPage() {
  const sortedGlossary = [...glossaryData].sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="container" style={{ padding: '4rem 1rem', maxWidth: '900px' }}>
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
