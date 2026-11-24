import StaticPage from '../../components/StaticPage';
import { pageMeta, abs, ORG_ID } from '../../lib/seo';
import { SITE, SOCIAL, bookingHref, BOOKING } from '../../config/site';

export const metadata = pageMeta({
  title: 'Contact',
  description: 'How to reach Shambhavaa for article corrections, collaborations or consultation questions.',
  path: '/contact/',
});

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  url: abs('/contact/'),
  about: { '@id': ORG_ID },
};

export default function ContactPage() {
  return (
    <StaticPage title="Contact" path="/contact/" intro="We read every message. Replies usually take two to three working days." schema={schema}>
      <div className="boxes">
        <div className="box">
          <h2>Articles and corrections</h2>
          <p>Spotted an error, or have a question about something you read?</p>
          <p><a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
        </div>
        <div className="box">
          <h2>Consultations</h2>
          <p>Booking, fees and session times are handled on our consultation site.</p>
          <p><a href={bookingHref('contact')}>{BOOKING.label} →</a></p>
        </div>
        <div className="box">
          <h2>Collaborations and press</h2>
          <p>Guest articles, interviews, quotes and partnerships.</p>
          <p><a href={`mailto:${SITE.email}?subject=Collaboration`}>{SITE.email}</a></p>
        </div>
      </div>

      <h2>Social</h2>
      <ul>
        {SOCIAL.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
          </li>
        ))}
      </ul>

      <h2>Please note</h2>
      <p>
        We cannot read charts or answer personal prediction questions by email or direct message. For that,
        please book a consultation so there is time to look at your chart properly.
      </p>
    </StaticPage>
  );
}
