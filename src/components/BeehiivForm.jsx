'use client';

import { useState } from 'react';

const contactEmail = 'shambhavaa.reviews@gmail.com';

export default function BeehiivForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus('Please enter your email address.');
      return;
    }

    const subject = encodeURIComponent('Newsletter signup request');
    const body = encodeURIComponent(`Please add me to the Shambhavaa newsletter.\n\nEmail: ${trimmedEmail}`);
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setStatus('Your email app should open now. Send the prepared email to complete signup.');
  }

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '1rem', background: 'var(--card-bg)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label htmlFor="newsletter-email" className="sr-only">Email address</label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="Enter your email..."
          required
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setStatus('');
          }}
          style={{
            padding: '0.75rem',
            borderRadius: '4px',
            border: '1px solid var(--border-color)',
            background: 'rgba(0,0,0,0.5)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-body)',
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
          Subscribe
        </button>
      </form>
      {status && (
        <p role="status" style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', marginTop: '1rem', lineHeight: 1.5 }}>
          {status}
        </p>
      )}
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
        Join our inner circle. No spam, just deep astrology.
      </p>
    </div>
  );
}
