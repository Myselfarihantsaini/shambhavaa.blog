'use client';

import { useCallback, useEffect, useState } from 'react';

const CONSENT_KEY = 'shambhavaa-cookie-consent';

const defaultPreferences = {
  analytics: false,
  ads: false,
};

function normalizeStoredConsent(value) {
  if (!value) return null;

  if (value === 'accepted') {
    return { analytics: true, ads: true };
  }

  if (value === 'rejected') {
    return { analytics: false, ads: false };
  }

  try {
    const parsed = JSON.parse(value);
    return {
      analytics: Boolean(parsed.analytics),
      ads: Boolean(parsed.ads),
    };
  } catch {
    return null;
  }
}

function updateGoogleConsent(preferences) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') {
    return;
  }

  window.gtag('consent', 'update', {
    analytics_storage: preferences.analytics ? 'granted' : 'denied',
    ad_storage: preferences.ads ? 'granted' : 'denied',
    ad_user_data: preferences.ads ? 'granted' : 'denied',
    ad_personalization: preferences.ads ? 'granted' : 'denied',
  });
}

function saveStoredConsent(preferences) {
  const value = {
    version: 1,
    analytics: Boolean(preferences.analytics),
    ads: Boolean(preferences.ads),
    updatedAt: new Date().toISOString(),
  };

  window.localStorage.setItem(CONSENT_KEY, JSON.stringify(value));
}

export default function CookieConsent() {
  const [isReady, setIsReady] = useState(false);
  const [hasSavedChoice, setHasSavedChoice] = useState(false);
  const [preferences, setPreferences] = useState(defaultPreferences);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    const storedPreferences = normalizeStoredConsent(window.localStorage.getItem(CONSENT_KEY));

    if (storedPreferences) {
      setPreferences(storedPreferences);
      setHasSavedChoice(true);
      updateGoogleConsent(storedPreferences);
      setIsReady(true);
      return;
    }

    const timer = window.setTimeout(() => setIsReady(true), 1500);
    return () => window.clearTimeout(timer);
  }, []);

  const saveConsent = useCallback((nextPreferences) => {
    saveStoredConsent(nextPreferences);
    setPreferences(nextPreferences);
    setHasSavedChoice(true);
    setShowPreferences(false);
    updateGoogleConsent(nextPreferences);
  }, []);

  const updatePreference = useCallback((key) => {
    setPreferences((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }, []);

  if (!isReady) {
    return null;
  }

  if (hasSavedChoice && !showPreferences) {
    return (
      <button
        type="button"
        className="cookie-preferences-button"
        onClick={() => setShowPreferences(true)}
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
          Shambhavaa uses essential storage for language preferences and optional Google cookies for analytics and ads. You can accept, reject, or manage optional cookies.
          {' '}
          <a href="/privacy">Privacy details</a>
        </p>
        {showPreferences && (
          <div className="cookie-consent-preferences">
            <label className="cookie-consent-toggle">
              <span>
                <strong>Analytics</strong>
                <small>Helps us understand page performance and improve articles.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={() => updatePreference('analytics')}
              />
            </label>
            <label className="cookie-consent-toggle">
              <span>
                <strong>Ads</strong>
                <small>Allows Google ad storage and personalization signals.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.ads}
                onChange={() => updatePreference('ads')}
              />
            </label>
          </div>
        )}
      </div>
      <div className="cookie-consent-actions">
        {showPreferences ? (
          <>
            <button type="button" className="btn" onClick={() => saveConsent(preferences)}>
              Save choices
            </button>
            {hasSavedChoice && (
              <button type="button" className="btn" onClick={() => setShowPreferences(false)}>
                Close
              </button>
            )}
          </>
        ) : (
          <button type="button" className="btn" onClick={() => setShowPreferences(true)}>
            Manage
          </button>
        )}
        <button type="button" className="btn" onClick={() => saveConsent({ analytics: false, ads: false })}>
          Reject
        </button>
        <button type="button" className="btn btn-primary" onClick={() => saveConsent({ analytics: true, ads: true })}>
          Accept
        </button>
      </div>
    </section>
  );
}
