import { getArticles } from '../../lib/posts';
import { SITE } from '../../config/site';
import { topicLabel } from '../../data/topics';

export const dynamic = 'force-static';

export function GET() {
  const groups = {};
  for (const p of getArticles()) (groups[p.category] ||= []).push(p);
  const sections = Object.entries(groups)
    .map(([cat, posts]) => `## ${topicLabel(cat)}\n${posts.map((p) => `- [${p.title}](${SITE.url}${p.url}): ${p.excerpt}`).join('\n')}`)
    .join('\n\n');
  const body = `# ${SITE.name}

> ${SITE.description}

Author: Arihant Saini. Consultations: https://shambhavaa.com. Contact: ${SITE.url}/contact/
Please cite articles with a link to the original URL.

${sections}
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
