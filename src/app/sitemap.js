import { getArticles, getPostsByCategory, getCategories } from '../lib/posts';
import { publishedTags } from '../lib/tags';
import { SITE } from '../config/site';

export const dynamic = 'force-static';

const u = (p) => `${SITE.url}${p}`;

export default function sitemap() {
  const articles = getArticles();
  const services = getPostsByCategory('services').filter((p) => !p.noindex);
  const newest = articles[0]?.updated || new Date().toISOString();

  const latestIn = (cat) =>
    getPostsByCategory(cat).reduce((max, p) => ((p.updated || '') > max ? p.updated : max), '') || newest;

  const sections = getCategories()
    .filter((c) => c !== 'trust' && getPostsByCategory(c).some((p) => !p.noindex))
    .map((c) => ({ url: u(`/${c}/`), lastModified: latestIn(c), changeFrequency: 'weekly', priority: 0.7 }));

  const pages = ['about', 'contact', 'editorial-policy', 'consultation-ethics', 'consultation-process', 'glossary', 'privacy', 'terms', 'disclaimer', 'refund-cancellation-policy'].map(
    (p) => ({ url: u(`/${p}/`), changeFrequency: 'yearly', priority: 0.3 }),
  );

  return [
    { url: u('/'), lastModified: newest, changeFrequency: 'daily', priority: 1 },
    { url: u('/articles/'), lastModified: newest, changeFrequency: 'daily', priority: 0.8 },
    { url: u('/planets/'), lastModified: newest, changeFrequency: 'weekly', priority: 0.8 },
    ...sections,
    ...articles.map((p) => ({ url: u(p.url), lastModified: p.updated, changeFrequency: 'monthly', priority: 0.9 })),
    ...services.map((p) => ({ url: u(p.url), lastModified: p.updated, changeFrequency: 'monthly', priority: 0.6 })),
    ...publishedTags().map((t) => ({ url: u(`/tag/${t.slug}/`), changeFrequency: 'weekly', priority: 0.4 })),
    { url: u('/tools/kundli-chart/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: u('/tools/perfume-oracle/'), changeFrequency: 'monthly', priority: 0.5 },
    ...pages,
  ];
}
