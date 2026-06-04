import { Tag } from 'lucide-react';
import { buildTags } from '../lib/geo';

export default function TagList({ post, tags, label = 'Topics', compact = false }) {
  const items = tags || (post ? buildTags(post) : []);
  if (!items.length) return null;

  return (
    <nav
      className={`geo-tags${compact ? ' geo-tags--compact' : ''}`}
      aria-label={`${label} covered in this article`}
    >
      {!compact && (
        <span className="geo-tags__label">
          <Tag size={13} aria-hidden="true" /> {label}
        </span>
      )}
      <ul className="geo-tags__list">
        {items.map((tag) => (
          <li key={tag.label}>
            <a
              href={tag.href}
              className={`geo-tag${tag.primary ? ' geo-tag--primary' : ''}`}
              rel="tag"
            >
              {tag.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
