import StaticPage from '../../components/StaticPage';
import { pageMeta } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Consultation Ethics',
  description: 'Our code of ethics for professional Vedic astrology consultations.',
  path: '/consultation-ethics/',
});

export default function EthicsPage() {
  return (
    <StaticPage title={'Consultation Ethics'} path="/consultation-ethics/" updated="2026-11-24">

          <p>
            Professional astrology is a sacred responsibility. At Shambhavaa, we adhere to a strict ethical code 
            to ensure the psychological and spiritual safety of every client.
          </p>

          <h2>1. Confidentiality</h2>
          <p>
            All consultation details, birth data, and personal narratives shared during a session are strictly confidential. 
            We do not share client data with third parties or use client stories for content without explicit, written permission.
          </p>

          <h2>2. Empowerment Over Fatalism</h2>
          <p>
            We do not predict the exact date of death, "accidents," or other catastrophic events. Our goal is to highlight 
            the <strong>energetic quality of time</strong>, providing the client with tools to navigate challenges rather 
            than creating fear or paralysis.
          </p>

          <h2>3. Professional Boundaries</h2>
          <p>
            We are astrologers, not medical doctors or licensed therapists. If a client exhibits signs of deep clinical 
            distress, we will recommend seeking professional psychiatric or medical assistance.
          </p>

          <h2>4. Honesty and Integrity</h2>
          <p>
            If a chart is unclear or if a specific question cannot be answered through astrological means, we will be 
            honest about our limitations. We do not "fill in gaps" with guesswork.
          </p>

          <h2>5. Financial Transparency</h2>
          <p>
            Consultation fees are clearly stated upfront. We do not use "upselling" tactics for expensive "remedies" 
            (like gemstones or rituals) during or after a session.
          </p>

          <h2>6. Respect for Free Will</h2>
          <p>
            We believe that the planets impel, but do not compel. Every consultation is framed around the client's 
            agency and their ability to evolve through conscious choice.
          </p>
    </StaticPage>
  );
}
