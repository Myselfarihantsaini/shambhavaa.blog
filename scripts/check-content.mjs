// Checks every article before the build. Errors stop the build; warnings are advice.
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDir = path.join(root, 'content');
const errors = [];
const warnings = [];

const exists = (src) => {
  if (!src || /^https?:/.test(src)) return true;
  try {
    return fs.statSync(path.join(root, 'public', src.split('#')[0])).size > 0;
  } catch {
    return false;
  }
};

for (const category of fs.readdirSync(contentDir)) {
  const dir = path.join(contentDir, category);
  if (!fs.statSync(dir).isDirectory()) continue;
  for (const file of fs.readdirSync(dir).filter((f) => /\.mdx?$/.test(f))) {
    const rel = `content/${category}/${file}`;
    const { data, content } = matter(fs.readFileSync(path.join(dir, file), 'utf8'));
    if (!/^[a-z0-9]+(-[a-z0-9]+)*\.mdx?$/.test(file)) warnings.push(`${rel}: file name should be lowercase-words-with-hyphens`);
    if (!data.title) errors.push(`${rel}: missing title`);
    if (category !== 'trust') {
      if (!data.date || Number.isNaN(new Date(data.date).getTime())) errors.push(`${rel}: missing or invalid date`);
      const summary = data.excerpt || data.description || '';
      if (!summary) warnings.push(`${rel}: add an excerpt (shown in Google results and cards)`);
      else if (summary.length > 170) warnings.push(`${rel}: excerpt is ${summary.length} characters; Google shows about 155`);
      if (String(data.title || '').length > 70) warnings.push(`${rel}: title is ${data.title.length} characters; keep under ~65 for Google`);
    }
    if (data.image && !exists(data.image)) errors.push(`${rel}: image "${data.image}" does not exist in public/`);
    const imgs = [...content.matchAll(/!\[([^\]]*)\]\(([^)\s]+)\)/g), ...content.matchAll(/<img[^>]*src="([^"]+)"/g)];
    for (const m of imgs) {
      const src = m[2] || m[1];
      if (!exists(src)) errors.push(`${rel}: body image "${src}" does not exist in public/`);
      if (m[2] !== undefined && !m[1].trim()) warnings.push(`${rel}: image "${src}" has no alt text`);
    }
  }
}

for (const w of warnings) console.warn(`  warn  ${w}`);
for (const e of errors) console.error(`  ERROR ${e}`);
console.log(`content check: ${errors.length} errors, ${warnings.length} warnings`);
if (errors.length) process.exit(1);
