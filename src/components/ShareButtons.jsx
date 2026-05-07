'use client';

export default function ShareButtons({ title }) {
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
      <button className="btn" onClick={shareOnTwitter}>Twitter</button>
      <button className="btn" onClick={shareOnFacebook}>Facebook</button>
    </div>
  );
}
