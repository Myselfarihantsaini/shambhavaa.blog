import StaticPage from '../../components/StaticPage';
import { pageMeta } from '../../lib/seo';
import { SITE } from '../../config/site';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'What Shambhavaa.blog collects, which cookies Google Analytics and AdSense use, how the kundli tool treats birth data, and how to opt out.',
  path: '/privacy/',
});

export default function PrivacyPage() {
  return (
    <StaticPage title="Privacy policy" path="/privacy/" updated="2026-11-24">
      <p>
        This policy explains what information is collected when you read shambhavaa.blog, why, and the
        choices you have. The site is published by Arihant Saini under the name Shambhavaa. Questions can be
        sent to <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>The short version</h2>
      <ul>
        <li>You can read every article without creating an account or giving us personal details.</li>
        <li>Analytics and advertising cookies are only set after you agree in the cookie banner.</li>
        <li>Birth details you enter in the kundli tool are processed in your browser and are not sent to us.</li>
        <li>We never sell personal information.</li>
      </ul>

      <h2>Information collected automatically</h2>
      <p>
        The site is hosted on GitHub Pages. Like any web server, GitHub receives your IP address and browser
        details when it delivers a page, and may keep them in security logs. See{' '}
        <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s privacy statement</a>.
      </p>

      <h2>Cookies and similar technologies</h2>
      <p>We use three kinds of storage in your browser:</p>
      <ul>
        <li>
          <strong>Necessary:</strong> a small entry in local storage that remembers your cookie choice. It
          contains no personal information.
        </li>
        <li>
          <strong>Analytics (optional):</strong> Google Analytics 4 measures which pages are read and roughly
          from which country. IP addresses are not stored by Google Analytics 4.
        </li>
        <li>
          <strong>Advertising (optional):</strong> Google AdSense shows ads that fund the site. With your
          consent, Google and its partners may use cookies to personalise ads based on your visits to this
          and other websites. Without consent, Google may still show non-personalised ads, which use cookies
          only for frequency capping, fraud prevention and aggregated reporting.
        </li>
      </ul>
      <p>
        We use Google Consent Mode, so until you choose, Google tags run with storage set to “denied”. You
        can change your choice at any time with the “Cookie settings” link in the footer.
      </p>

      <h2>Google’s use of data</h2>
      <p>
        Third-party vendors, including Google, use cookies to serve ads based on a user’s prior visits to
        this website or other websites. Google’s use of advertising cookies enables it and its partners to
        serve ads based on visits to this site and other sites on the internet. You can opt out of
        personalised advertising in <a href="https://adssettings.google.com/">Google Ads Settings</a> or at{' '}
        <a href="https://www.aboutads.info/choices/">aboutads.info</a>. Learn{' '}
        <a href="https://policies.google.com/technologies/partner-sites">how Google uses information from sites that use its services</a>.
      </p>

      <h2>Kundli and other tools</h2>
      <p>
        The kundli generator calculates the chart in your browser. To convert a place name into coordinates
        and a time zone, the tool may send the place name (not your name or birth date) to public geocoding
        services such as OpenStreetMap Nominatim. Nothing you enter is stored on our side.
      </p>

      <h2>When you email us or sign up for the letter</h2>
      <p>
        If you write to us or ask to join the email letter, we receive your email address and whatever you
        include in the message. We use it only to reply or to send the letter, and we delete it when you ask.
      </p>

      <h2>Consultations</h2>
      <p>
        Bookings, payments and the birth details needed for a reading are handled on shambhavaa.com and are
        covered by the privacy information on that site. Consultation details are kept confidential, as
        described in our <a href="/consultation-ethics/">consultation ethics</a>.
      </p>

      <h2>Your rights</h2>
      <p>
        Depending on where you live (for example under India’s Digital Personal Data Protection Act 2023, the
        EU/UK GDPR or Californian law), you may ask to see, correct or delete personal information we hold
        about you, or withdraw consent. Email us and we will respond within 30 days.
      </p>

      <h2>Children</h2>
      <p>The site is not directed at children under 13, and we do not knowingly collect their information.</p>

      <h2>Changes</h2>
      <p>If this policy changes, the date at the top of the page will change too.</p>
    </StaticPage>
  );
}
