/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shambhavaa.blog',
  generateRobotsTxt: false,
  outDir: 'out',
  exclude: [
    '/server-sitemap.xml',
    '/trust',
    '/trust/*',
    '/admin',
    '/admin/*',
    '/mars',
    '/mercury',
    '/jupiter',
    '/venus',
  ],
  additionalPaths: async (config) => [
    await config.transform(config, '/tools/kundli-chart/'),
    await config.transform(config, '/tools/perfume-oracle/'),
  ],
  transform: async (config, path) => {
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }

    const isArticle = path.split('/').filter(Boolean).length >= 2;

    if (isArticle) {
      return {
        loc: path,
        changefreq: 'monthly',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
