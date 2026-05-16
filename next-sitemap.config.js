/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shambhavaa.blog',
  generateRobotsTxt: false, // We manage robots.txt manually in public/
  outDir: 'out',
  exclude: [
    '/trust',
    '/trust/*',
    '/admin',
    '/admin/*',
    '/mars',
    '/mercury',
    '/jupiter',
    '/venus',
  ],
  transform: async (config, path) => {
    // Custom transform logic for sitemap
    let priority = 0.7;
    let changefreq = 'weekly';

    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if ((path.match(/\//g) || []).length >= 3) {
      // Deep article pages are higher priority than category hubs
      priority = 0.9;
      changefreq = 'monthly';
    }

    return {
      loc: path,
      changefreq: changefreq,
      priority: priority,
      lastmod: new Date().toISOString(),
      alternateRefs: config.alternateRefs ?? [],
    };
  },
};
