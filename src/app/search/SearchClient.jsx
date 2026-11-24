'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const norm = (s) => String(s || '').toLowerCase();

export default function SearchClient() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get('q') || '');
  const [items, setItems] = useState(null);

  useEffect(() => {
    fetch('/search-index.json')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setItems([]));
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    window.history.replaceState(null, '', url);
  }, [q]);

  const results = useMemo(() => {
    const words = norm(q).split(/\s+/).filter(Boolean);
    if (!items || !words.length) return [];
    return items
      .map((it) => {
        const title = norm(it.title);
        const hay = `${title} ${norm(it.excerpt)} ${norm(it.keywords?.join(' '))} ${norm(it.topic)}`;
        if (!words.every((w) => hay.includes(w))) return null;
        const score = words.reduce((s, w) => s + (title.includes(w) ? 3 : 1), 0);
        return { it, score };
      })
      .filter(Boolean)
      .sort((a, b) => b.score - a.score)
      .slice(0, 30)
      .map((r) => r.it);
  }, [items, q]);

  return (
    <>
      <form className="search-form" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="q" className="visually-hidden">Search articles</label>
        <input id="q" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="e.g. Saturn 12th house" autoFocus />
      </form>
      <div aria-live="polite" style={{ marginTop: '1.5rem', maxWidth: 820 }}>
        {q && items && (
          <p className="meta">
            {results.length} {results.length === 1 ? 'result' : 'results'} for “{q}”
          </p>
        )}
        {results.map((r) => (
          <article key={r.url} className="card card--compact">
            <div className="card__body">
              <p className="kicker">{r.topic}</p>
              <h2 className="card__title">
                <a href={r.url}>{r.title}</a>
              </h2>
              <p className="card__excerpt">{r.excerpt}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
