import { SITE } from '../config/site';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/admin/', '/search/'] },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
