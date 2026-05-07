import '../styles/globals.css';
import SEO from '../components/SEO';
import Script from 'next/script';

export const metadata = {
  title: 'Shambhavaa | Deep Vedic Astrology & Spiritual Transformation',
  description: 'A global authority on deep Vedic astrology, Nakshatra psychology, karmic astrology, predictive astrology, and spiritual healing.',
  metadataBase: new URL('https://shambhavaa.blog'),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-CCHG6BM3DL"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-CCHG6BM3DL');
            `,
          }}
        />
      </head>
      <body>
        <header className="container" style={{ padding: '2rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="logo" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: '700', color: 'var(--accent-gold)' }}>
            SHAMBHAVAA
          </div>
          <nav>
            <ul style={{ listStyle: 'none', display: 'flex', gap: '2rem' }}>
              <li><a href="/saturn">Saturn</a></li>
              <li><a href="/rahu">Rahu</a></li>
              <li><a href="/nakshatra">Nakshatras</a></li>
              <li><a href="/mahadasha">Mahadasha</a></li>
            </ul>
          </nav>
        </header>

        <main>
          {children}
        </main>

        <footer className="container" style={{ padding: '4rem 1rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', marginTop: '4rem' }}>
          <div style={{ marginBottom: '2rem' }}>
            <h3 className="text-gold">Shambhavaa</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Awakening through the stars.</p>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>&copy; {new Date().getFullYear()} Shambhavaa. All rights reserved.</p>
        </footer>
      </body>
    </html>
  );
}
