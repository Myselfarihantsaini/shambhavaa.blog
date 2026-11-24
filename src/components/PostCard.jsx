import { topicLabel } from '../data/topics';
import { formatDate } from '../lib/format';

export default function PostCard({ post, variant = 'standard', showImage = true, headingLevel = 3 }) {
  const H = `h${headingLevel}`;
  const withImage = showImage && post.image;

  return (
    <article className={`card card--${variant}${withImage ? ' card--has-image' : ''}`}>
      {withImage && (
        <a href={post.url} className="card__media" tabIndex={-1} aria-hidden="true">
          <img
            src={post.image}
            alt=""
            loading={variant === 'lead' ? 'eager' : 'lazy'}
            decoding="async"
            width="800"
            height="450"
          />
        </a>
      )}
      <div className="card__body">
        <p className="kicker">
          <a href={`/${post.category}/`}>{topicLabel(post.category)}</a>
        </p>
        <H className="card__title">
          <a href={post.url}>{post.title}</a>
        </H>
        {variant !== 'compact' && post.excerpt && <p className="card__excerpt">{post.excerpt}</p>}
        <p className="meta">
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
          <span aria-hidden="true"> · </span>
          {post.readingTime} min read
        </p>
      </div>
    </article>
  );
}
