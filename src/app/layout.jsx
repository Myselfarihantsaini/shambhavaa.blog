import '@fontsource-variable/source-serif-4/opsz.css';
import '@fontsource-variable/source-serif-4/opsz-italic.css';
import '@fontsource-variable/public-sans';
import '../styles/globals.css';

import Masthead from '../components/Masthead';
import SiteFooter from '../components/SiteFooter';
import CookieConsent from '../components/CookieConsent';
import Analytics, { ConsentDefaults } from '../components/Analytics';
import JsonLd from '../components/JsonLd';
import { SITE } from '../config/site';
import { organizationSchema, websiteSchema } from '../lib/seo';
import { getArticles } from '../lib/posts';

// GitHub Pages cannot send HTTP headers, so the security policy is set with a meta tag.
// Google AdSense serves ads from many Google domains, which is why those are allowed broadly.
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self' https://shambhavaa.com",
  "script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.google-analytics.com https://*.googlesyndication.com https://*.doubleclick.net https://*.google.com https://*.gstatic.com https://*.adtrafficquality.google https://*.googletagservices.com",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https:",
  "frame-src https:",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  'upgrade-insecure-requests',
].join('; ');

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — Vedic Astrology Guides by Arihant Saini`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: 'Arihant Saini', url: `${SITE.url}/about/` }],
  creator: 'Arihant Saini',
  publisher: SITE.name,
  formatDetection: { telephone: false, email: false, address: false },
  alternates: {
    canonical: `${SITE.url}/`,
    types: { 'application/rss+xml': `${SITE.url}/feed.xml` },
  },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    locale: SITE.locale,
    url: `${SITE.url}/`,
    title: `${SITE.name} — Vedic Astrology Guides`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  verification: {
    other: {
      'p:domain_verify': '31d19f48dc6ae8aa6b7d02eb6a32b6b7',
      // Add the Google Search Console code here: 'google-site-verification': '...'
    },
  },
};

export const viewport = {
  themeColor: '#030305',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  const liveTopics = Array.from(new Set(getArticles().map((p) => p.category)));
  return (
    <html lang="en-IN">
      <head>
        <meta httpEquiv="Content-Security-Policy" content={csp} />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="google-adsense-account" content="ca-pub-9194178610009666" />
        <ConsentDefaults />
        <JsonLd data={[organizationSchema, websiteSchema]} />
      </head>
      <body>
        <Masthead />
        <main id="main">{children}</main>
        <SiteFooter liveTopics={liveTopics} />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
