import { BOOKING, bookingHref } from '../config/site';

const COPY = {
  article: {
    title: 'Want this read against your own chart?',
    text: 'A general guide can only describe a placement. In a private reading, Arihant looks at your houses, lords, dasha and current transits together and answers the question you actually came with.',
  },
  service: {
    title: 'Ready to book?',
    text: 'Choose a time, share your birth date, time and place, and send your question in advance. Sessions are held online.',
  },
  sidebar: {
    title: 'Private chart reading',
    text: 'One-to-one sessions with Arihant Saini.',
  },
};

export default function BookingCta({ variant = 'article', campaign = 'article', content }) {
  const copy = COPY[variant] || COPY.article;
  return (
    <aside className={`booking booking--${variant}`} aria-label="Consultation">
      <p className="booking__title">{copy.title}</p>
      <p className="booking__text">{copy.text}</p>
      <a className="btn btn--gold" href={bookingHref(campaign, content)} rel="noopener">
        {BOOKING.label} on {BOOKING.host}
      </a>
      {variant !== 'sidebar' && (
        <p className="booking__note">
          <a href="/services/">See what each reading covers</a> · <a href="/consultation-ethics/">How we work</a>
        </p>
      )}
    </aside>
  );
}
