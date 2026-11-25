import { topicLabel, topicStyle } from '../data/topics';
import { formatDate } from '../lib/format';

/** Coloured block with the section's Devanagari name, used instead of stock or AI imagery. */
export function TopicTile({ category, size = 'md', as: Tag = 'div', href }) {
  const s = topicStyle(category);
  const props = {
    className: `tile tile--${size}`,
    style: { '--tile-bg': s.bg, '--tile-fg': s.fg },
    'aria-hidden': href ? undefined : 'true',
  };
  const inner = (
    <>
      <span className="tile__deva" lang="hi">{s.deva}</span>
      <span className="tile__en">{topicLabel(category)}</span>
    </>
  );
  return href ? (
    <a href={href} {...props} tabIndex={-1} aria-hidden="true">{inner}</a>
  ) : (
    <Tag {...props}>{inner}</Tag>
  );
}

export default function PostCard({ post, variant = 'standard', headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const s = topicStyle(post.category);

  if (variant === 'compact') {
    return (
      <article className="row">
        <span className="row__dot" style={{ background: s.bg }} aria-hidden="true" />
        <div>
          <p className="kicker"><a href={`/${post.category}/`}>{topicLabel(post.category)}</a></p>
          <H className="row__title"><a href={post.url}>{post.title}</a></H>
          <p className="meta">
            {post.date && <time dateTime={post.date}>{formatDate(post.date, { day: 'numeric', month: 'short', year: 'numeric' })}</time>}
            {' · '}{post.readingTime} min
          </p>
        </div>
      </article>
    );
  }

  return (
    <article className={`card card--${variant}`}>
      <TopicTile category={post.category} size={variant === 'feature' ? 'lg' : 'md'} href={post.url} />
      <div className="card__body">
        <p className="kicker"><a href={`/${post.category}/`}>{topicLabel(post.category)}</a></p>
        <H className="card__title"><a href={post.url}>{post.title}</a></H>
        {post.excerpt && <p className="card__excerpt">{post.excerpt}</p>}
        <p className="meta">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          {' · '}{post.readingTime} min read
        </p>
      </div>
    </article>
  );
}
