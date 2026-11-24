// Builds public/search-index.json for the /search/ page.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content');
const out = path.join(root, 'public', 'search-index.json');
const SKIP = new Set(['trust']);

const label = (s) => s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

const items = [];
for (const category of fs.readdirSync(contentDir)) {
  const dir = path.join(contentDir, category);
  if (!fs.statSync(dir).isDirectory() || SKIP.has(category)) continue;
  for (const file of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
    const { data } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (data.draft || data.noindex) continue;
    const slug = file.replace(/\.mdx?$/, '');
    items.push({
      url: `/${category}/${slug}/`,
      title: data.title || slug,
      excerpt: String(data.excerpt || data.description || '').slice(0, 220),
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      topic: category === 'services' ? 'Consultation' : label(category),
      date: data.date ? new Date(data.date).toISOString() : null,
    });
  }
}
items.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
fs.writeFileSync(out, JSON.stringify(items));
console.log(`search index: ${items.length} entries`);
