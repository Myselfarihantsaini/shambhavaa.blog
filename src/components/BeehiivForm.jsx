'use client';

export default function BeehiivForm() {
  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      {/* 
        This is a placeholder for the Beehiiv embedded iframe or API form.
        To implement the iframe:
        <iframe src="https://embeds.beehiiv.com/YOUR-BEEHIIV-ID" data-test-id="beehiiv-embed" height="52" frameBorder="0" scrolling="no" style={{ margin: 0, borderRadius: '0px !important', backgroundColor: 'transparent' }}></iframe>
      */}
      <form onSubmit={(e) => { e.preventDefault(); alert('Beehiiv integration pending: Replace this with the Beehiiv embed code or API integration.'); }} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input 
          type="email" 
          placeholder="Enter your email..." 
          required 
          style={{ 
            padding: '0.75rem', 
            borderRadius: '4px', 
            border: '1px solid var(--border-color)', 
            background: 'rgba(0,0,0,0.5)', 
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)'
          }} 
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Subscribe
        </button>
      </form>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
        Join our inner circle. No spam, just deep astrology.
      </p>
    </div>
  );
}
