'use client';
import { Twitter, Facebook, Share2, Link as LinkIcon } from 'lucide-react';
import { useState } from 'react';

export default function ShareButtons({ title }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <button className="btn" onClick={shareOnTwitter} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none', letterSpacing: 'normal' }}>
        <Twitter size={16} /> Twitter
      </button>
      <button className="btn" onClick={shareOnFacebook} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none', letterSpacing: 'normal' }}>
        <Facebook size={16} /> Facebook
      </button>
      <button className="btn" onClick={copyToClipboard} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'none', letterSpacing: 'normal' }}>
        <LinkIcon size={16} /> {copied ? 'Copied!' : 'Copy Link'}
      </button>
    </div>
  );
}
