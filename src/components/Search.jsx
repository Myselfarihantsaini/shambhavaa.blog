'use client';
import { useState, useEffect } from 'react';

export default function Search({ posts }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = posts.filter(post => 
      post.meta.title.toLowerCase().includes(query.toLowerCase()) ||
      post.meta.excerpt.toLowerCase().includes(query.toLowerCase()) ||
      post.content.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  }, [query, posts]);

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
      <input
        type="text"
        placeholder="Search insights..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          borderRadius: '4px',
          border: '1px solid var(--border-color)',
          background: 'rgba(255,255,255,0.05)',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          outline: 'none'
        }}
      />
      {results.length > 0 && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#101018',
          border: '1px solid var(--border-color)',
          borderRadius: '4px',
          marginTop: '0.5rem',
          zIndex: 1000,
          maxHeight: '300px',
          overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
        }}>
          {results.map(post => (
            <a
              key={post.slug}
              href={`/${post.category}/${post.slug}`}
              style={{
                display: 'block',
                padding: '1rem',
                borderBottom: '1px solid var(--border-color)',
                transition: 'background 0.3s ease'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(212, 175, 55, 0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              <div style={{ fontWeight: '500', color: 'var(--accent-gold)' }}>{post.meta.title}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{post.category}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
