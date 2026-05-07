/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://shambhavaa.blog',
  generateRobotsTxt: true,
  outDir: 'out',
  exclude: ['/server-sitemap.xml'], // if needed
};
