import { getAllPosts, getPostBySlug, getRelatedPosts, extractHeadings } from '../../../lib/posts';
import { topicInfo, topicStyle } from '../../../data/topics';
import { formatDate } from '../../../lib/format';
import { AUTHOR } from '../../../config/site';
import { pageMeta, abs, articleSchema, serviceSchema, breadcrumbSchema, faqSchema, tagSlug } from '../../../lib/seo';
import { collectTags } from '../../../lib/tags';
import Markdown from '../../../components/Markdown';
import Breadcrumbs from '../../../components/Breadcrumbs';
import JsonLd from '../../../components/JsonLd';
import Toc from '../../../components/Toc';
import FAQ from '../../../components/FAQ';
import BookingCta from '../../../components/BookingCta';
import AuthorBox from '../../../components/AuthorBox';
import ShareLinks from '../../../components/ShareLinks';
import PostCard from '../../../components/PostCard';
import AdSlot from '../../../components/AdSlot';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export function generateMetadata({ params }) {
  const post = getPostBySlug(params.category, params.slug);
  if (!post) return {};
  const isArticle = !['services', 'trust'].includes(post.category);
  return {
    ...pageMeta({
      title: post.meta.seoTitle || post.title,
      description: post.description || post.excerpt,
      path: post.url,
      image: post.image,
      type: isArticle ? 'article' : 'website',
      noindex: post.noindex,
      article: isArticle
        ? {
            publishedTime: post.date,
            modifiedTime: post.updated,
            authors: [abs('/about/')],
            section: topicInfo(post.category).label,
            tags: post.keywords,
          }
        : undefined,
    }),
    keywords: post.keywords.length ? post.keywords : undefined,
  };
}

export default function ArticlePage({ params }) {
  const post = getPostBySlug(params.category, params.slug);
  const info = topicInfo(post.category);
  const isService = post.category === 'services';
  const isTrust = post.category === 'trust';
  const headings = extractHeadings(post.content);
  const related = isTrust ? [] : getRelatedPosts(post, 3);
  const tagIndex = collectTags();
  const tags = post.keywords.filter((k) => (tagIndex.get(tagSlug(k))?.posts.length || 0) >= 2);
  const takeaways = Array.isArray(post.meta.keyTakeaways) ? post.meta.keyTakeaways : [];
  const summary = post.meta.tldr;
  const faqs = Array.isArray(post.meta.faqs) ? post.meta.faqs : [];
  const cover = post.meta.image && post.image && !post.content.includes(post.image) ? post.image : null;
  const showUpdated = post.updated && post.date && post.updated.slice(0, 10) !== post.date.slice(0, 10);

  const tone = topicStyle(post.category);
  const trail = [
    { name: 'Home', href: '/' },
    { name: info.label, href: `/${post.category}/` },
    { name: post.title, href: post.url },
  ];

  return (
    <article className="article">
      <JsonLd
        data={[
          isService ? serviceSchema(post) : isTrust ? null : articleSchema(post, info.label),
          breadcrumbSchema(trail),
          faqSchema(faqs),
        ]}
      />

      <div className="article-band" style={{ '--tile-bg': tone.bg, '--tile-fg': tone.fg }}>
      <span className="page-head__deva" aria-hidden="true" lang="hi">{tone.deva}</span>
      <div className="wrap">
      <header className="article__head">
        <Breadcrumbs trail={trail} />
        <p className="kicker">
          <a href={`/${post.category}/`}>{info.label}</a>
        </p>
        <h1 className="article__title">{post.title}</h1>
        {post.excerpt && <p className="article__dek">{post.excerpt}</p>}
        {!isTrust && (
          <div className="byline">
            <span>
              By <a href="/about/" rel="author">{AUTHOR.name}</a>
            </span>
            {post.date && (
              <span>
                Published <time dateTime={post.date}>{formatDate(post.date)}</time>
              </span>
            )}
            {showUpdated && (
              <span>
                Updated <time dateTime={post.updated}>{formatDate(post.updated)}</time>
              </span>
            )}
            <span>{post.readingTime} min read</span>
          </div>
        )}
      </header>
      </div>
      </div>

      <div className="wrap">

      {cover && (
        <figure className="article__cover">
          <img src={cover} alt={post.imageAlt || ''} width="1600" height="900" fetchPriority="high" />
          {post.meta.imageCredit && <figcaption>{post.meta.imageCredit}</figcaption>}
        </figure>
      )}

      <div className="article__layout">
        <div className="article__body">
          {isService && <BookingCta variant="service" campaign="service-page" content={post.slug} />}

          {(summary || takeaways.length > 0) && (
            <section className="summary" aria-label="Summary">
              <p className="summary__label">In short</p>
              {summary && <p>{summary}</p>}
              {takeaways.length > 0 && (
                <ul>
                  {takeaways.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </section>
          )}

          <Toc headings={headings} />
          {!isService && !isTrust && <AdSlot name="articleTop" />}

          <div className="prose">
            <Markdown source={post.content} />
          </div>

          <FAQ items={faqs} />

          {!isTrust && (
            <BookingCta
              variant={isService ? 'service' : 'article'}
              campaign={isService ? 'service-page' : 'article-end'}
              content={post.slug}
            />
          )}

          {!isService && !isTrust && <AdSlot name="articleEnd" />}

          {tags.length > 0 && (
            <ul className="tags" aria-label="Topics">
              {tags.map((t) => (
                <li key={t}>
                  <a href={`/tag/${tagSlug(t)}/`} rel="tag">{t}</a>
                </li>
              ))}
            </ul>
          )}

          {!isTrust && <ShareLinks url={abs(post.url)} title={post.title} />}
          {!isTrust && <AuthorBox />}
        </div>

        <aside className="article__aside" aria-label="Article tools">
          <div className="article__aside-inner">
            <Toc headings={headings} />
            {!isTrust && <BookingCta variant="sidebar" campaign="article-sidebar" content={post.slug} />}
            {!isService && !isTrust && <AdSlot name="sidebar" />}
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="related section" aria-labelledby="related-title">
          <div className="section__head">
            <h2 id="related-title">Read next</h2>
            <a href={`/${post.category}/`}>More on {info.label}</a>
          </div>
          <div className="grid grid--3">
            {related.map((p) => (
              <PostCard key={p.url} post={p} />
            ))}
          </div>
        </section>
      )}
      </div>
    </article>
  );
}
