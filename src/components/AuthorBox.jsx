import React from 'react';
import { User, Calendar, Clock } from 'lucide-react';

export default function AuthorBox({ date, updatedDate, readingTime }) {
  const author = {
    name: 'Arihant Saini',
    role: 'Vedic Astrologer & Spiritual Researcher',
    bio: 'Arihant Saini specializes in the psychological and karmic dimensions of Vedic astrology. With over a decade of research into the Nakshatras and planetary archetypes, he helps seekers navigate their spiritual transformation with clarity and radical responsibility.',
    image: '/images/author-arihant.png', // Placeholder path
  };

  return (
    <div className="card" style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        {/* If image exists use it, otherwise show icon */}
        <User size={40} color="var(--accent-gold)" />
      </div>
      
      <div style={{ flex: 1, minWidth: '250px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className="text-gold" style={{ margin: 0, fontSize: '1.25rem' }}>{author.name}</h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Calendar size={14} /> {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            {readingTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> {readingTime} min read
              </span>
            )}
          </div>
        </div>
        
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
          {author.bio}
        </p>
        
        {updatedDate && (
          <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontStyle: 'italic' }}>
            Last updated: {new Date(updatedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>
    </div>
  );
}
