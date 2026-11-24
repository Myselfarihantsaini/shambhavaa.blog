import TrustDoc from '../../components/TrustDoc';
import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Refund and Cancellation Policy',
  description: 'Refund, cancellation, rescheduling and no-show rules for Shambhavaa astrology consultations.',
  path: '/refund-cancellation-policy/',
});

export default function Page() {
  return <TrustDoc slug="refund-cancellation-policy" title="Refund and cancellation policy" path="/refund-cancellation-policy/" />;
}
