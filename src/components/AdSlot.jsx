'use client';

import { useEffect, useRef } from 'react';
import { ADSENSE } from '../config/site';

/** A manual AdSense unit. Renders nothing until a slot ID is set in src/config/site.js. */
export default function AdSlot({ name, format = 'auto', className = '' }) {
  const slot = ADSENSE.slots[name];
  const pushed = useRef(false);

  useEffect(() => {
    if (!slot || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocked or script not loaded */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <aside className={`ad ${className}`} aria-label="Advertisement">
      <span className="ad__label">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={ADSENSE.client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
