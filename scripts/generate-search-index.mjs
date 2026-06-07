import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = process.cwd();
const contentDirectory = path.join(root, 'content');
const outputPath = path.join(root, 'public', 'search-index.json');

function getPostFiles(category) {
  const categoryPath = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryPath)) return [];

  return fs.readdirSync(categoryPath)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'))
    .map((file) => path.join(categoryPath, file));
}

function normalizeMeta(meta) {
  return {
    title: meta.title || '',
    excerpt: meta.excerpt || '',
    description: meta.description || '',
    keywords: Array.isArray(meta.keywords) ? meta.keywords : [],
  };
}

const categories = fs.existsSync(contentDirectory)
  ? fs.readdirSync(contentDirectory).filter((entry) => fs.statSync(path.join(contentDirectory, entry)).isDirectory())
  : [];

const index = categories
  .flatMap((category) => getPostFiles(category).map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = path.basename(filePath).replace(/\.mdx?$/, '');

    return {
      slug,
      category,
      meta: normalizeMeta(data),
      date: data.date || '',
    };
  }))
  .sort((a, b) => (a.date > b.date ? -1 : 1))
  .map(({ date, ...post }) => post);

fs.writeFileSync(outputPath, `${JSON.stringify(index)}\n`);
console.log(`Generated ${path.relative(root, outputPath)} with ${index.length} posts.`);
