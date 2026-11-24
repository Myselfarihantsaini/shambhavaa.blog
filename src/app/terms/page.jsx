import StaticPage from '../../components/StaticPage';
import { pageMeta } from '../../lib/seo';
import { SITE } from '../../config/site';

export const metadata = pageMeta({
  title: 'Terms of Use',
  description: 'The terms that apply when you read Shambhavaa.blog or use its free kundli tools.',
  path: '/terms/',
});

export default function TermsPage() {
  return (
    <StaticPage title="Terms of use" path="/terms/" updated="2026-11-24">
      <p>
        These terms apply to shambhavaa.blog (“the site”), which is published by Arihant Saini under the
        name Shambhavaa. By using the site you agree to them. Paid consultations are booked on
        shambhavaa.com and are covered by the terms shown there and by our{' '}
        <a href="/refund-cancellation-policy/">refund and cancellation policy</a>.
      </p>

      <h2>What the site is for</h2>
      <p>
        Articles and tools on this site explain Vedic astrology for learning and personal reflection. They
        are general information, not advice written for you, and they are not a substitute for medical,
        psychological, legal or financial advice. Please read the <a href="/disclaimer/">disclaimer</a>.
      </p>

      <h2>Free tools</h2>
      <p>
        The kundli generator and other tools are provided as they are, without any guarantee of accuracy or
        availability. Chart calculations depend on the birth time and place you enter. Check important
        results with a qualified astrologer before acting on them.
      </p>

      <h2>Copyright</h2>
      <p>
        The text, tables and original images on this site belong to Shambhavaa unless another source is
        credited. You may quote a short passage with a link back to the original article. Please do not
        republish whole articles, translate them for publication, or sell our material without written
        permission. Ask at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
      </p>

      <h2>Links to other websites</h2>
      <p>
        We link to other sites where they help the reader. We are not responsible for their content or
        their privacy practices. Advertisements are served by Google AdSense; an advertisement is not an
        endorsement by Shambhavaa.
      </p>

      <h2>Acceptable use</h2>
      <p>
        Do not try to disrupt the site, scrape it at a rate that affects other readers, or use it for
        anything unlawful.
      </p>

      <h2>Liability</h2>
      <p>
        To the extent the law allows, Shambhavaa is not liable for losses that come from relying on
        general information published on this site. Nothing in these terms limits liability that cannot be
        limited by law.
      </p>

      <h2>Changes and governing law</h2>
      <p>
        We may update these terms; the date above shows the latest version. These terms are governed by the
        laws of India.
      </p>
    </StaticPage>
  );
}
