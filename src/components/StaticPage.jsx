import Breadcrumbs from './Breadcrumbs';
import JsonLd from './JsonLd';
import { breadcrumbSchema } from '../lib/seo';
import { formatDate } from '../lib/format';

export default function StaticPage({ title, path, intro, updated, children, schema }) {
  const trail = [
    { name: 'Home', href: '/' },
    { name: title, href: path },
  ];
  return (
    <div className="wrap">
      <JsonLd data={[breadcrumbSchema(trail), ...(schema ? [].concat(schema) : [])]} />
      <header className="page-head">
        <Breadcrumbs trail={trail} />
        <h1>{title}</h1>
        {intro && <p>{intro}</p>}
        {updated && <p className="meta" style={{ marginTop: '0.75rem' }}>Last updated {formatDate(updated)}</p>}
      </header>
      <div className="prose" style={{ paddingTop: '1rem' }}>{children}</div>
    </div>
  );
}
