'use client';

import { useCallback, useEffect, useState } from 'react';

const CONSENT_KEY = 'shambhavaa-cookie-consent';

function updateGoogleConsent(consent) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  const granted = consent === 'accepted';
  window.gtag('consent', 'update', {
    ad_storage: granted ? 'granted' : 'denied',
    ad_user_data: granted ? 'granted' : 'denied',
    ad_personalization: granted ? 'granted' : 'denied',
    analytics_storage: granted ? 'granted' : 'denied',
  });
}

export default function CookieConsent() {
  const [consent, setConsent] = useState(null);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_KEY);
    if (storedConsent === 'accepted' || storedConsent === 'rejected') {
      setConsent(storedConsent);
      updateGoogleConsent(storedConsent);
    }
  }, []);

  const saveConsent = useCallback((value) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    setShowPreferences(false);
    updateGoogleConsent(value);
  }, []);

  if (consent) {
    return (
      <button
        type="button"
        className="cookie-preferences-button"
        onClick={() => {
          setConsent(null);
          setShowPreferences(true);
        }}
      >
        Cookie preferences
      </button>
    );
  }

  return (
    <section className="cookie-consent" aria-label="Cookie consent">
      <div className="cookie-consent-copy">
        <strong>Cookie consent</strong>
        <p>
          Shambhavaa uses essential storage for language preferences and optional Google cookies for analytics and ads. You can accept or reject optional cookies.
          {' '}
          <a href="/privacy/">Privacy Policy</a>
        </p>
        {showPreferences && (
          <ul>
            <li>Essential cookies: always active for site language and basic function.</li>
            <li>Analytics and ads cookies: used only with your consent signal.</li>
          </ul>
        )}
      </div>
      <div className="cookie-consent-actions">
        <button type="button" className="btn" onClick={() => setShowPreferences((current) => !current)}>
          Manage
        </button>
        <button type="button" className="btn" onClick={() => saveConsent('rejected')}>
          Reject
        </button>
        <button type="button" className="btn btn-primary" onClick={() => saveConsent('accepted')}>
          Accept
        </button>
      </div>
    </section>
  );
}
