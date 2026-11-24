import { getArticles } from './posts';
import { tagSlug } from './seo';

// A tag page is only worth publishing (and indexing) when it groups 2+ articles.
export const MIN_TAG_POSTS = 2;

let memo;
export function collectTags() {
  if (memo) return memo;
  const map = new Map();
  for (const post of getArticles()) {
    const seen = new Set();
    for (const label of post.keywords) {
      const slug = tagSlug(label);
      if (!slug || seen.has(slug)) continue;
      seen.add(slug);
      if (!map.has(slug)) map.set(slug, { slug, label, posts: [] });
      map.get(slug).posts.push(post);
    }
  }
  memo = map;
  return map;
}

export function publishedTags() {
  return Array.from(collectTags().values()).filter((t) => t.posts.length >= MIN_TAG_POSTS);
}
