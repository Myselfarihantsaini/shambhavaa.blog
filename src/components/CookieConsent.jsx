'use client';

import { useEffect, useState } from 'react';
import { ADSENSE } from '../config/site';

const KEY = 'shambhavaa-consent-v2';

function read() {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const v = JSON.parse(raw);
    return { analytics: Boolean(v.analytics), ads: Boolean(v.ads) };
  } catch {
    return null;
  }
}

function apply(prefs) {
  if (typeof window.gtag !== 'function') return;
  window.gtag('consent', 'update', {
    analytics_storage: prefs.analytics ? 'granted' : 'denied',
    ad_storage: prefs.ads ? 'granted' : 'denied',
    ad_user_data: prefs.ads ? 'granted' : 'denied',
    ad_personalization: prefs.ads ? 'granted' : 'denied',
  });
}

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: false, ads: false });

  useEffect(() => {
    const saved = read();
    if (saved) {
      setPrefs(saved);
      apply(saved);
    } else if (!ADSENSE.useGoogleCmp) {
      setOpen(true);
    }
    const reopen = () => {
      setDetails(true);
      setOpen(true);
    };
    window.addEventListener('shambhavaa:cookie-settings', reopen);
    return () => window.removeEventListener('shambhavaa:cookie-settings', reopen);
  }, []);

  function save(next) {
    setPrefs(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify({ ...next, at: new Date().toISOString() }));
    } catch {
      /* storage blocked: choice applies to this page view only */
    }
    apply(next);
    setOpen(false);
    setDetails(false);
  }

  if (!open) return null;

  return (
    <section className="consent" role="dialog" aria-modal="false" aria-labelledby="consent-title">
      <h2 id="consent-title" className="consent__title">Cookies on Shambhavaa</h2>
      <p>
        We use cookies to count visits and to show ads that keep the articles free. Nothing is set for
        analytics or advertising until you agree. Read the <a href="/privacy/">privacy policy</a>.
      </p>

      {details && (
        <fieldset className="consent__choices">
          <legend className="visually-hidden">Cookie preferences</legend>
          <label>
            <input type="checkbox" checked disabled /> Necessary — remembers this choice
          </label>
          <label>
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
            />{' '}
            Analytics — Google Analytics visit statistics
          </label>
          <label>
            <input
              type="checkbox"
              checked={prefs.ads}
              onChange={(e) => setPrefs({ ...prefs, ads: e.target.checked })}
            />{' '}
            Advertising — personalised Google AdSense ads
          </label>
        </fieldset>
      )}

      <div className="consent__actions">
        <button type="button" className="btn btn--ink" onClick={() => save({ analytics: true, ads: true })}>
          Accept all
        </button>
        <button type="button" className="btn btn--line" onClick={() => save({ analytics: false, ads: false })}>
          Reject all
        </button>
        {details ? (
          <button type="button" className="btn btn--line" onClick={() => save(prefs)}>
            Save choices
          </button>
        ) : (
          <button type="button" className="linklike" onClick={() => setDetails(true)}>
            Choose
          </button>
        )}
      </div>
    </section>
  );
}
