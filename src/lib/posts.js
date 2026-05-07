import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getPostSlugs(category) {
  const categoryPath = path.join(contentDirectory, category);
  if (!fs.existsSync(categoryPath)) return [];
  return fs.readdirSync(categoryPath).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
}

export function getPostBySlug(category, slug) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  
  let fullPath = path.join(contentDirectory, category, `${realSlug}.md`);
  if (!fs.existsSync(fullPath)) {
    fullPath = path.join(contentDirectory, category, `${realSlug}.mdx`);
  }
  
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    category,
    meta: data,
    content,
  };
}

export function getAllPosts() {
  if (!fs.existsSync(contentDirectory)) return [];
  const categories = fs.readdirSync(contentDirectory).filter(file => {
    return fs.statSync(path.join(contentDirectory, file)).isDirectory();
  });

  const posts = [];
  categories.forEach(category => {
    const slugs = getPostSlugs(category);
    slugs.forEach(slug => {
      const post = getPostBySlug(category, slug);
      if (post) posts.push(post);
    });
  });

  return posts.sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
}

export function getPostsByCategory(category) {
  const slugs = getPostSlugs(category);
  const posts = slugs.map(slug => getPostBySlug(category, slug)).filter(Boolean);
  return posts.sort((post1, post2) => (post1.meta.date > post2.meta.date ? -1 : 1));
}
