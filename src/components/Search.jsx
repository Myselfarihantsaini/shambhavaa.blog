'use client';
import { useEffect, useMemo, useRef, useState } from 'react';

const normalise = (value) => String(value || '').toLowerCase();

function getSearchText(post) {
  return [
    post?.meta?.title,
    post?.meta?.excerpt,
    post?.meta?.description,
    post?.meta?.keywords?.join?.(' '),
    post?.category,
  ].map(normalise).join(' ');
}

export default function Search({ posts }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q') || params.get('search') || '';
    if (initialQuery.trim()) {
      setQuery(initialQuery);
      setIsOpen(true);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchablePosts = useMemo(() => (
    (posts || []).map((post) => ({
      ...post,
      searchText: getSearchText(post),
      title: post?.meta?.title || post?.slug || 'Untitled article',
      excerpt: post?.meta?.excerpt || post?.meta?.description || '',
      href: `/${post.category}/${post.slug}/`,
    }))
  ), [posts]);

  const results = useMemo(() => {
    const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];

    return searchablePosts
      .map((post) => {
        const titleText = normalise(post.title);
        const excerptText = normalise(post.excerpt);
        const categoryText = normalise(post.category);
        const score = terms.reduce((total, term) => {
          if (titleText.includes(term)) return total + 8;
          if (categoryText.includes(term)) return total + 4;
          if (excerptText.includes(term)) return total + 2;
          if (post.searchText.includes(term)) return total + 1;
          return total;
        }, 0);

        return { ...post, score };
      })
      .filter((post) => post.score >= terms.length)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [query, searchablePosts]);

  const hasQuery = query.trim().length > 0;
  const showPanel = isOpen && hasQuery;

  function handleSubmit(event) {
    event.preventDefault();
    if (results[0]) {
      window.location.href = results[0].href;
    }
  }

  return (
    <form className="site-search" role="search" onSubmit={handleSubmit} ref={searchRef}>
      <input
        type="search"
        placeholder="Search insights..."
        value={query}
        aria-label="Search Shambhavaa articles"
        aria-expanded={showPanel}
        onChange={(event) => {
          setQuery(event.target.value);
          setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && results[0]) {
            event.preventDefault();
            window.location.href = results[0].href;
          }
        }}
      />
      {showPanel && (
        <div className="site-search-results">
          {results.length > 0 ? (
            <>
              <div className="site-search-count">
                {results.length} result{results.length === 1 ? '' : 's'}
              </div>
              {results.map(post => (
                <a
                  key={`${post.category}-${post.slug}`}
                  href={post.href}
                  className="site-search-result"
                >
                  <span>{post.title}</span>
                  <small>{post.category.replace(/-/g, ' ')}</small>
                </a>
              ))}
            </>
          ) : (
            <div className="site-search-empty">
              No matching article found.
            </div>
          )}
        </div>
      )}
    </form>
  );
}
