// Central site settings. Change values here, not inside components.

export const SITE = {
  name: 'Shambhavaa',
  tagline: 'Vedic Astrology',
  url: 'https://shambhavaa.blog',
  locale: 'en_IN',
  language: 'en',
  description:
    'Shambhavaa is a Vedic astrology journal by Arihant Saini: house-by-house planet guides, dasha and transit explainers, yearly horoscopes and free kundli tools, written to be read slowly.',
  email: 'shambhavaa.reviews@gmail.com',
  logo: '/images/brand/shambhavaa-logo.webp',
  logoPng: '/images/brand/shambhavaa-logo.png',
  ogImage: '/images/og-default.jpg',
  foundingYear: 2025,
};

export const AUTHOR = {
  name: 'Arihant Saini',
  slug: 'arihant-saini',
  role: 'Vedic astrologer and founder of Shambhavaa',
  // Keep this factual. Add qualifications, years of practice or teachers only if they are true.
  bio: 'Arihant Saini writes every guide on Shambhavaa and reads charts one-to-one through shambhavaa.com. His work follows the Parashari tradition — houses, lords, dashas, divisional charts and transits read together — and avoids fear-based predictions.',
  sameAs: [
    'https://www.instagram.com/sham_bhavaa/',
    'https://www.threads.com/myself_arihant',
  ],
};

// The consultation and booking website.
export const BOOKING = {
  url: 'https://shambhavaa.com',
  label: 'Book a consultation',
  host: 'shambhavaa.com',
};

/**
 * Link to the booking site with UTM tags, so visits coming from the blog
 * show up as "shambhavaa.blog / referral" in the booking site's analytics.
 */
export function bookingHref(campaign = 'site', content) {
  const params = new URLSearchParams({
    utm_source: 'shambhavaa.blog',
    utm_medium: 'referral',
    utm_campaign: campaign,
  });
  if (content) params.set('utm_content', content);
  return `${BOOKING.url}/?${params.toString()}`;
}

export const SOCIAL = [
  { label: 'Instagram', href: 'https://www.instagram.com/sham_bhavaa/' },
  { label: 'WhatsApp channel', href: 'https://whatsapp.com/channel/0029VbC4J9rJENy0bajwXS1I' },
  { label: 'Threads', href: 'https://www.threads.com/myself_arihant' },
  { label: 'Tumblr', href: 'https://www.tumblr.com/shambhava' },
];

export const ANALYTICS = {
  gaId: 'G-CCHG6BM3DL',
};

export const ADSENSE = {
  client: 'ca-pub-9194178610009666',
  // Paste ad-unit slot IDs from AdSense → Ads → By ad unit. Empty = slot is not rendered
  // (Auto ads still work through the main AdSense script).
  slots: {
    articleTop: '',
    articleEnd: '',
    sidebar: '',
    listing: '',
  },
  // Set to true after you switch on AdSense → Privacy & messaging → "European regulations"
  // message. Google's certified consent banner then replaces the site's own banner.
  useGoogleCmp: false,
};

// Primary navigation. Only link to sections that have published articles.
export const NAV = [
  { label: 'Planets', href: '/planets/' },
  { label: 'Houses & Lords', href: '/house-lords/' },
  { label: 'Dasha', href: '/mahadasha/' },
  { label: 'Horoscope 2026', href: '/horoscopes/' },
  { label: 'Learn', href: '/resources/' },
  { label: 'Free Kundli', href: '/tools/kundli-chart/' },
];
