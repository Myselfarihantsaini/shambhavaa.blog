'use client';

import { useState } from 'react';
import { SITE } from '../config/site';

// No mailing-list provider is connected yet, so sign-up opens a prepared email.
// To switch to Beehiiv/Mailchimp later, replace handleSubmit with the provider's form action.
export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const value = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setStatus('Please enter a valid email address.');
      return;
    }
    const subject = encodeURIComponent('Add me to the Shambhavaa letter');
    const body = encodeURIComponent(`Please add this address to the Shambhavaa letter: ${value}`);
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${body}`;
    setStatus('Your email app should open with the request ready to send.');
  }

  return (
    <section className="letter" aria-labelledby="letter-title">
      <div className="letter__copy">
        <h2 id="letter-title">The Shambhavaa letter</h2>
        <p>New guides and the month’s major transits, written plainly. About twice a month. No spam, and you can leave any time.</p>
      </div>
      <form className="letter__form" onSubmit={handleSubmit} noValidate>
        <label htmlFor="letter-email">Email address</label>
        <div className="letter__row">
          <input
            id="letter-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setStatus('');
            }}
          />
          <button type="submit" className="btn btn--ink">Subscribe</button>
        </div>
        {status && <p role="status" className="letter__status">{status}</p>}
      </form>
    </section>
  );
}
