'use client';

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      className="linklike"
      onClick={() => window.dispatchEvent(new Event('shambhavaa:cookie-settings'))}
    >
      Cookie settings
    </button>
  );
}
