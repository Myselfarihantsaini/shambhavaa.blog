import StaticPage from './StaticPage';
import Markdown from './Markdown';
import { getPostBySlug } from '../lib/posts';

/** Renders a policy page whose text lives in content/trust/<slug>.md */
export default function TrustDoc({ slug, title, path }) {
  const doc = getPostBySlug('trust', slug);
  const body = doc.content.replace(/^\s*#\s+.+\n/, '').replace(/^\s*\*\*Last Updated:[^\n]*\n/m, '');
  return (
    <StaticPage title={title} path={path} updated={doc.updated}>
      <Markdown source={body} />
    </StaticPage>
  );
}
