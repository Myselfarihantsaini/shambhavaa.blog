import React from 'react';
import { User, Calendar, Clock, BadgeCheck } from 'lucide-react';

export default function AuthorBox({ date, updatedDate, readingTime }) {
  const author = {
    name: 'Arihant Saini',
    role: 'Vedic Astrologer & Spiritual Researcher',
    bio: 'Arihant Saini specializes in the psychological and karmic dimensions of Vedic astrology. With over a decade of research into the Nakshatras and planetary archetypes, he helps seekers navigate their spiritual transformation with clarity and radical responsibility.',
    knowsAbout: ['Nakshatra Psychology', 'Karmic Astrology', 'Predictive Astrology', 'Spiritual Healing'],
    profileUrl: '/about/',
    sameAs: [
      { label: 'Instagram', href: 'https://www.instagram.com/sham_bhavaa/' },
      { label: 'Threads', href: 'https://www.threads.com/myself_arihant' },
    ],
  };

  return (
    <div
      className="card"
      style={{ marginTop: 'var(--spacing-lg)', padding: 'var(--spacing-md)', display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}
    >
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gold-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden' }}>
        <User size={40} color="var(--accent-gold)" />
      </div>

      <div style={{ flex: 1, minWidth: '250px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h3 className="text-gold" style={{ margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <a href={author.profileUrl} style={{ color: 'inherit' }}>{author.name}</a>
            <BadgeCheck size={16} color="var(--accent-gold)" aria-label="Verified author" />
          </h3>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            {date && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={14} /> {new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
              </span>
            )}
            {readingTime && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Clock size={14} /> {readingTime} min read
              </span>
            )}
          </div>
        </div>

        <p style={{ fontSize: '0.78rem', color: 'var(--accent-gold)', margin: '0 0 0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {author.role}
        </p>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
          {author.bio}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
          {author.knowsAbout.map((topic) => (
            <span key={topic} className="geo-tag geo-tag--muted">{topic}</span>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.8rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <a href={author.profileUrl} style={{ fontWeight: 'bold' }}>Full profile &rarr;</a>
          {author.sameAs.map((social) => (
            <a key={social.href} href={social.href} target="_blank" rel="noopener noreferrer me">{social.label}</a>
          ))}
        </div>

        {updatedDate && (
          <p style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontStyle: 'italic', marginTop: '0.85rem' }}>
            Last updated: {new Date(updatedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>
    </div>
  );
}
