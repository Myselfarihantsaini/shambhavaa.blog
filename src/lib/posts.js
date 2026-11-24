import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

const contentDirectory = path.join(process.cwd(), 'content');

// Folders that hold pages rather than articles.
export const NON_ARTICLE_CATEGORIES = ['trust', 'services'];

function toISO(value) {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function publicImage(src) {
  if (!src || typeof src !== 'string') return null;
  if (/^https?:\/\//.test(src)) return src;
  const file = path.join(process.cwd(), 'public', src);
  try {
    return fs.statSync(file).size > 0 ? src : null;
  } catch {
    return null;
  }
}

function firstBodyImage(content) {
  const md = content.match(/!\[([^\]]*)\]\(([^)\s]+)\)/);
  if (md) return { src: md[2], alt: md[1] };
  const html = content.match(/<img[^>]*src="([^"]+)"[^>]*alt="([^"]*)"/);
  if (html) return { src: html[1], alt: html[2] };
  return null;
}

function plainText(markdown) {
  return markdown
    .replace(/\*\*|__|\*|`/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .trim();
}

export function extractHeadings(content) {
  const slugger = new GithubSlugger();
  const headings = [];
  let inFence = false;
  for (const line of content.split('\n')) {
    if (/^```/.test(line.trim())) inFence = !inFence;
    if (inFence) continue;
    const md = line.match(/^(#{2,3})\s+(.+?)\s*#*\s*$/);
    if (md) {
      const text = plainText(md[2]);
      headings.push({ level: md[1].length, text, id: slugger.slug(text) });
      continue;
    }
    const html = line.match(/^<h([23])\s+id="([^"]+)"[^>]*>(.+?)<\/h[23]>/);
    if (html) headings.push({ level: Number(html[1]), text: plainText(html[3]), id: html[2] });
  }
  return headings;
}

function wordCount(content) {
  return plainText(content).split(/\s+/).filter(Boolean).length;
}

function normalise(category, slug, data, content) {
  const words = wordCount(content);
  const bodyImage = firstBodyImage(content);
  const image = publicImage(data.image) || publicImage(bodyImage?.src);
  const date = toISO(data.date);
  return {
    slug,
    category,
    url: `/${category}/${slug}/`,
    content,
    meta: data,
    title: String(data.title || slug).replace(/\s*\|\s*Shambhavaa\s*$/i, '').trim(),
    excerpt: String(data.excerpt || data.description || '').trim(),
    description: String(data.description || data.excerpt || '').trim(),
    date,
    updated: toISO(data.updatedDate) || date,
    image,
    imageAlt: data.imageAlt || (image === publicImage(bodyImage?.src) ? bodyImage?.alt : '') || data.title,
    featured: Boolean(data.featured || data.trending),
    noindex: Boolean(data.noindex) || category === 'trust',
    draft: Boolean(data.draft),
    words,
    readingTime: Math.max(1, Math.round(words / 220)),
    keywords: Array.isArray(data.keywords)
      ? data.keywords.map((k) => String(k).trim()).filter(Boolean)
      : String(data.keywords || '')
          .split(',')
          .map((k) => k.trim())
          .filter(Boolean),
  };
}

export function getCategories() {
  if (!fs.existsSync(contentDirectory)) return [];
  return fs
    .readdirSync(contentDirectory)
    .filter((f) => fs.statSync(path.join(contentDirectory, f)).isDirectory());
}

function getPostFiles(category) {
  const dir = path.join(contentDirectory, category);
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f));
}

const cache = new Map();

export function getPostBySlug(category, slug) {
  const key = `${category}/${slug}`;
  if (cache.has(key)) return cache.get(key);
  const clean = slug.replace(/\.mdx?$/, '');
  let file = path.join(contentDirectory, category, `${clean}.md`);
  if (!fs.existsSync(file)) file = path.join(contentDirectory, category, `${clean}.mdx`);
  if (!fs.existsSync(file)) return null;
  const { data, content } = matter(fs.readFileSync(file, 'utf8'));
  const post = normalise(category, clean, data, content);
  if (post.draft && process.env.NODE_ENV === 'production') return null;
  cache.set(key, post);
  return post;
}

const byDate = (a, b) => (b.date || '').localeCompare(a.date || '');

/** Every markdown file, including trust and service pages. */
export function getAllPosts() {
  return getCategories()
    .flatMap((c) => getPostFiles(c).map((f) => getPostBySlug(c, f)))
    .filter(Boolean)
    .sort(byDate);
}

/** Articles that should appear in listings, feeds and the sitemap. */
export function getArticles() {
  return getAllPosts().filter((p) => !NON_ARTICLE_CATEGORIES.includes(p.category) && !p.noindex);
}

export function getPostsByCategory(category) {
  return getPostFiles(category)
    .map((f) => getPostBySlug(category, f))
    .filter(Boolean)
    .sort(byDate);
}

export function getRelatedPosts(post, limit = 4) {
  const keys = new Set(post.keywords.map((k) => k.toLowerCase()));
  return getArticles()
    .filter((p) => p.url !== post.url)
    .map((p) => {
      let score = p.category === post.category ? 3 : 0;
      for (const k of p.keywords) if (keys.has(k.toLowerCase())) score += 2;
      return { p, score };
    })
    .sort((a, b) => b.score - a.score || byDate(a.p, b.p))
    .slice(0, limit)
    .map(({ p }) => p);
}
