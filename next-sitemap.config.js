/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shambhavaa.blog',
  generateRobotsTxt: false, // We manage robots.txt manually in public/
  outDir: 'out',
  exclude: [
    // Duplicate trust/* pages (duplicates of /about/, /contact/, etc.)
    '/trust',
    '/trust/*',
    // Empty planet category pages — excluded until articles are published
    '/mars',
    '/mercury',
    '/jupiter',
    '/venus',
  ],
  transform: async (config, path) => {
    // Homepage — highest priority
    if (path === '/') return { loc: path, changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() };
    // Article pages — highest content value
    const isArticle = (path.match(/\//g) || []).length >= 3;
    if (isArticle) return { loc: path, changefreq: 'monthly', priority: 0.9, lastmod: new Date().toISOString() };
    // Category hub pages and static pages
    return { loc: path, changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() };
  },
};

