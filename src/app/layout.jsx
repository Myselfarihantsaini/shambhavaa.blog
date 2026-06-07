import '../styles/globals.css';
import SEO from '../components/SEO';
import CookieConsent from '../components/CookieConsent';
import Search from '../components/Search';
import LanguageGate from '../components/LanguageGate';
import Script from 'next/script';
import { getAllPosts } from '../lib/posts';
import { PLANETS } from '../data/planets';

const tumblrUrl = 'https://www.tumblr.com/shambhava';
const instagramUrl = 'https://www.instagram.com/sham_bhavaa/';
const threadsUrl = 'https://www.threads.com/myself_arihant';
const whatsappChannelUrl = 'https://whatsapp.com/channel/0029VbC4J9rJENy0bajwXS1I';
const consultationUrl = 'https://shambhavaa.com';
const socialLinks = [
  { label: 'WhatsApp', href: whatsappChannelUrl },
  { label: 'Instagram', href: instagramUrl },
  { label: 'Threads', href: threadsUrl },
  { label: 'Tumblr', href: tumblrUrl },
];

const searchPosts = getAllPosts().map(({ slug, category, meta }) => ({
  slug,
  category,
  meta: {
    title: meta.title,
    excerpt: meta.excerpt,
    description: meta.description,
    keywords: meta.keywords,
  },
}));

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://shambhavaa.com",
  "upgrade-insecure-requests",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://rankai.ai https://www.googletagmanager.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.googleapis.com https://www.gstatic.com https://fundingchoicesmessages.google.com https://adservice.google.com https://www.googletagservices.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com https://www.gstatic.com",
  "font-src 'self' https://fonts.gstatic.com data:",
  "img-src 'self' data: https:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net https://translate.google.com https://translate.googleapis.com https://translate-pa.googleapis.com https://www.googleapis.com https://fundingchoicesmessages.google.com https://adservice.google.com",
  "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://translate.google.com https://translate.googleapis.com https://www.google.com https://fundingchoicesmessages.google.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
].join('; ');

export const metadata = {
  title: 'Shambhavaa | Deep Vedic Astrology & Spiritual Transformation',
  description: 'A global authority on deep Vedic astrology, Nakshatra psychology, karmic astrology, predictive astrology, and spiritual healing.',
  metadataBase: new URL('https://shambhavaa.blog'),
  alternates: {
    canonical: 'https://shambhavaa.blog/',
  },
  openGraph: {
    type: 'website',
    siteName: 'Shambhavaa',
    title: 'Shambhavaa | Deep Vedic Astrology & Spiritual Transformation',
    description: 'A global authority on deep Vedic astrology, Nakshatra psychology, karmic astrology, predictive astrology, and spiritual healing.',
    url: 'https://shambhavaa.blog',
    images: [{
      url: 'https://shambhavaa.blog/images/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Shambhavaa — Deep Vedic Astrology & Spiritual Transformation',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shambhavaa | Deep Vedic Astrology & Spiritual Transformation',
    description: 'A global authority on deep Vedic astrology, Nakshatra psychology, karmic astrology, predictive astrology, and spiritual healing.',
    images: ['https://shambhavaa.blog/images/og-default.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        <meta name="p:domain_verify" content="31d19f48dc6ae8aa6b7d02eb6a32b6b7" />
        <meta
          httpEquiv="Content-Security-Policy"
          content={contentSecurityPolicy}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CCHG6BM3DL"
          strategy="lazyOnload"
        />
        <Script
          id="google-analytics-consent"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                ad_storage: 'denied',
                ad_user_data: 'denied',
                ad_personalization: 'denied',
                analytics_storage: 'denied',
                wait_for_update: 500
              });
              gtag('js', new Date());
              gtag('config', 'G-CCHG6BM3DL');
            `,
          }}
        />
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9194178610009666"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
        <Script
          src="https://rankai.ai/apply.js"
          data-rankai-id="cmpxxn4qn000biy4gif7p52s8"
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />
      </head>
      <body suppressHydrationWarning>
        <LanguageGate />
        <CookieConsent />

        <header className="container" style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <a href="/" className="logo" aria-label="Shambhavaa home" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
            SHAMBHAVAA
          </a>
          <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <Search posts={searchPosts} />
            <nav>
              <ul className="main-nav">
                <li className="nav-dropdown">
                  <button className="nav-dropdown-trigger" type="button">
                    Planets
                  </button>
                  <div className="nav-dropdown-menu">
                    {PLANETS.map((planet) => (
                      <a key={planet.slug} href={`/${planet.slug}`}>
                        {planet.label}
                      </a>
                    ))}
                  </div>
                </li>
                <li><a href="/nakshatra">Nakshatra Guides</a></li>
                <li><a href="/mahadasha">Mahadasha</a></li>
                <li><a href="/tools/kundli-chart">Kundli Tool</a></li>
                <li><a href="/tools/perfume-oracle">Perfume Tool</a></li>
                <li>
                  <a href={whatsappChannelUrl} target="_blank" rel="noopener noreferrer">
                    WhatsApp
                  </a>
                </li>
                <li>
                  <a href={consultationUrl} target="_blank" rel="noopener noreferrer">
                    Consultation
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>
          {children}
        </main>

        <aside className="floating-socials" aria-label="Social links">
          <span>Follow</span>
          {socialLinks.map((link) => (
            <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </a>
          ))}
        </aside>

        <footer className="container" style={{ padding: '4rem 1rem', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
          <div className="grid-responsive-200" style={{ marginBottom: '3rem', textAlign: 'left' }}>
            <div>
              <h3 className="text-gold" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Shambhavaa</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                A global authority on deep Vedic astrology, Nakshatra psychology, and spiritual transformation. 
                Synthesizing ancient wisdom with modern psychological depth.
              </p>
            </div>
            
            <div>
              <h4 className="text-gold" style={{ marginBottom: '1rem', fontSize: '1rem' }}>Knowledge Hub</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <li><a href="/rahu">Rahu & Ketu</a></li>
                <li><a href="/saturn">Saturn & Karma</a></li>
                <li><a href="/nakshatra">Nakshatras</a></li>
                <li><a href="/mahadasha">Mahadasha Guides</a></li>
                <li><a href="/glossary">Astrology Glossary</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold" style={{ marginBottom: '1rem', fontSize: '1rem' }}>Company</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <li><a href="/about">About Shambhavaa</a></li>
                <li><a href="/contact">Contact & Inquiries</a></li>
                <li><a href="/editorial-policy">Editorial Policy</a></li>
                <li><a href="/consultation-ethics">Code of Ethics</a></li>
                <li><a href={consultationUrl} target="_blank" rel="noopener noreferrer">Consultations</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-gold" style={{ marginBottom: '1rem', fontSize: '1rem' }}>Legal</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem' }}>
                <li><a href="/privacy">Privacy Policy</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/disclaimer">Disclaimer</a></li>
              </ul>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div className="footer-socials" style={{ margin: 0 }}>
              <span style={{ marginRight: '1rem' }}>Follow</span>
              {socialLinks.map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" style={{ marginRight: '1rem' }}>
                  {link.label}
                </a>
              ))}
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              &copy; {new Date().getFullYear()} Shambhavaa. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
