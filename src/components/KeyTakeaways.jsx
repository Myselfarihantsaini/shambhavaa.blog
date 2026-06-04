import { Sparkles } from 'lucide-react';

export default function KeyTakeaways({ summary, points = [], title = 'Quick Answer' }) {
  const hasPoints = Array.isArray(points) && points.length > 0;
  if (!summary && !hasPoints) return null;

  return (
    <aside className="geo-key-takeaways" aria-label={title} data-geo="key-takeaways">
      <p className="geo-key-takeaways__title">
        <Sparkles size={15} aria-hidden="true" /> {title}
      </p>
      {summary && <p className="geo-key-takeaways__summary">{summary}</p>}
      {hasPoints && (
        <ul className="geo-key-takeaways__list">
          {points.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      )}
    </aside>
  );
}
