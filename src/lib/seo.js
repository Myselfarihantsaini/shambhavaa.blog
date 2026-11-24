import { SITE, AUTHOR } from '../config/site';

export const abs = (p = '/') => (p.startsWith('http') ? p : `${SITE.url}${p.startsWith('/') ? '' : '/'}${p}`);

export function tagSlug(label = '') {
  return String(label)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Shorten text to about 155 characters at a word boundary, for meta descriptions. */
export function clip(text = '', max = 158) {
  const t = String(text).replace(/\s+/g, ' ').trim();
  if (t.length <= max) return t;
  return `${t.slice(0, t.lastIndexOf(' ', max - 1)).replace(/[,;:.\s-]+$/, '')}…`;
}

/** Build Next.js metadata with canonical, Open Graph and Twitter tags. */
export function pageMeta({ title, description, path = '/', image, type = 'website', noindex = false, article }) {
  const url = abs(path);
  const img = abs(image || SITE.ogImage);
  description = clip(description);
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: img }],
      ...(article || {}),
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

export const ORG_ID = `${SITE.url}/#organization`;
export const PERSON_ID = `${SITE.url}/about/#arihant-saini`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  logo: { '@type': 'ImageObject', url: abs(SITE.logoPng), width: 808, height: 184 },
  email: SITE.email,
  founder: { '@id': PERSON_ID },
  sameAs: ['https://shambhavaa.com', 'https://www.instagram.com/sham_bhavaa/', 'https://www.tumblr.com/shambhava'],
};

export const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': PERSON_ID,
  name: AUTHOR.name,
  url: abs('/about/'),
  jobTitle: 'Vedic Astrologer',
  description: AUTHOR.bio,
  worksFor: { '@id': ORG_ID },
  knowsAbout: ['Vedic astrology', 'Jyotisha', 'Nakshatra', 'Vimshottari dasha', 'Divisional charts'],
  sameAs: AUTHOR.sameAs,
};

export const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  name: SITE.name,
  url: `${SITE.url}/`,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${SITE.url}/search/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
};

export function breadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: abs(item.href),
    })),
  };
}

export function faqSchema(faqs = []) {
  const items = faqs.filter((f) => f?.question && f?.answer);
  if (!items.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };
}

export function itemListSchema(name, posts) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(p.url), name: p.title })),
  };
}

export function articleSchema(post, sectionLabel) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${abs(post.url)}#article`,
    headline: post.title.slice(0, 110),
    description: post.excerpt,
    image: [abs(post.image || SITE.ogImage)],
    datePublished: post.date,
    dateModified: post.updated,
    author: { '@type': 'Person', '@id': PERSON_ID, name: AUTHOR.name, url: abs('/about/') },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(post.url) },
    isPartOf: { '@id': WEBSITE_ID },
    articleSection: sectionLabel,
    keywords: post.keywords.join(', ') || undefined,
    wordCount: post.words,
    inLanguage: 'en',
  };
}

export function serviceSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: post.title,
    description: post.excerpt,
    url: abs(post.url),
    serviceType: 'Vedic astrology consultation',
    provider: { '@id': ORG_ID },
    areaServed: 'Worldwide',
    availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://shambhavaa.com' },
  };
}
