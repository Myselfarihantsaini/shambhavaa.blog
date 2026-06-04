export const SITE_URL = 'https://shambhavaa.blog';

const CATEGORY_LABELS = {
  rahu: 'Rahu',
  ketu: 'Ketu',
  saturn: 'Saturn',
  sun: 'Sun',
  moon: 'Moon',
  mars: 'Mars',
  mercury: 'Mercury',
  jupiter: 'Jupiter',
  venus: 'Venus',
  mahadasha: 'Mahadasha',
  'birth-chart': 'Birth Chart',
  'house-lords': 'House Lords',
  nakshatra: 'Nakshatra',
  horoscopes: 'Horoscopes',
  resources: 'Resources',
  services: 'Consultations',
};

export function categoryLabel(category = '') {
  if (CATEGORY_LABELS[category]) return CATEGORY_LABELS[category];
  return String(category)
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function normalizeKeywords(keywords) {
  if (!keywords) return [];
  const list = Array.isArray(keywords) ? keywords : String(keywords).split(',');
  return list.map((keyword) => String(keyword).trim()).filter(Boolean);
}

export function tagSlug(label = '') {
  return String(label)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function buildTags(post) {
  const category = post?.category || '';
  const label = categoryLabel(category);
  const tags = [{ label, href: `/${category}/`, primary: true }];
  const seen = new Set([label.toLowerCase()]);

  for (const keyword of normalizeKeywords(post?.meta?.keywords)) {
    const key = keyword.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    tags.push({ label: keyword, href: `/tag/${tagSlug(keyword)}/`, primary: false });
  }

  return tags.slice(0, 8);
}

export function collectTags(posts = []) {
  const tags = new Map();
  for (const post of posts) {
    for (const keyword of normalizeKeywords(post?.meta?.keywords)) {
      const slug = tagSlug(keyword);
      if (!slug) continue;
      if (!tags.has(slug)) tags.set(slug, { slug, label: keyword, posts: [] });
      tags.get(slug).posts.push(post);
    }
  }
  return tags;
}

export function getPostsByTag(posts, slug) {
  return collectTags(posts).get(slug) || { slug, label: slug.replace(/-/g, ' '), posts: [] };
}

export function breadcrumbSchema(trail = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function webPageSchema({ type = 'WebPage', name, description, url }) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    name,
    description,
    url,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'WebSite', name: 'Shambhavaa', url: `${SITE_URL}/` },
    publisher: PUBLISHER_ENTITY,
  };
}

export function getWordCount(content = '') {
  return content.trim().split(/\s+/).filter(Boolean).length;
}

export function getReadingTime(content = '', wpm = 200) {
  return Math.max(1, Math.ceil(getWordCount(content) / wpm));
}

export function isoMinutes(minutes) {
  return `PT${Math.max(1, Math.round(minutes))}M`;
}

export function buildAboutAndMentions(post) {
  const label = categoryLabel(post?.category || '');
  const about = [
    { '@type': 'Thing', name: `${label} in Vedic Astrology` },
    {
      '@type': 'Thing',
      name: 'Vedic Astrology',
      sameAs: 'https://en.wikipedia.org/wiki/Hindu_astrology',
    },
  ];
  const mentions = normalizeKeywords(post?.meta?.keywords)
    .slice(0, 12)
    .map((name) => ({ '@type': 'Thing', name }));
  return { about, mentions };
}

export const AUTHOR_ENTITY = {
  '@type': 'Person',
  name: 'Arihant Saini',
  url: `${SITE_URL}/about/`,
  jobTitle: 'Vedic Astrologer',
  knowsAbout: [
    'Vedic Astrology',
    'Nakshatra Psychology',
    'Karmic Astrology',
    'Predictive Astrology',
    'Spiritual Healing',
  ],
  sameAs: [
    'https://www.instagram.com/sham_bhavaa/',
    'https://www.threads.com/myself_arihant',
  ],
};

export const PUBLISHER_ENTITY = {
  '@type': 'Organization',
  name: 'Shambhavaa',
  url: `${SITE_URL}/`,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE_URL}/images/og-default.jpg`,
  },
};
