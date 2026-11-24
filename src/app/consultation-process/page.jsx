import TrustDoc from '../../components/TrustDoc';
import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'How a Consultation Works',
  description: 'Step by step: what happens when you book a Vedic astrology consultation with Shambhavaa, from birth details to the session itself.',
  path: '/consultation-process/',
});

export default function Page() {
  return <TrustDoc slug="consultation-process" title="How a consultation works" path="/consultation-process/" />;
}
