import { getCategories, getPostsByCategory } from '../../lib/posts';
import { topicInfo, PLANET_ORDER } from '../../data/topics';
import { pageMeta, breadcrumbSchema, itemListSchema, faqSchema } from '../../lib/seo';
import PostCard from '../../components/PostCard';
import Breadcrumbs from '../../components/Breadcrumbs';
import JsonLd from '../../components/JsonLd';
import FAQ from '../../components/FAQ';
import BookingCta from '../../components/BookingCta';
import AdSlot from '../../components/AdSlot';

export const dynamicParams = false;

export function generateStaticParams() {
  return Array.from(new Set([...getCategories(), ...PLANET_ORDER, 'nakshatra'])).map((category) => ({ category }));
}

function listed(category) {
  return getPostsByCategory(category).filter((p) => category === 'trust' || !p.noindex);
}

export function generateMetadata({ params }) {
  const info = topicInfo(params.category);
  const posts = listed(params.category);
  const isServices = params.category === 'services';
  return pageMeta({
    title: isServices ? 'Vedic Astrology Consultations' : `${info.label} in Vedic Astrology — Guides`,
    description: info.description || info.blurb,
    path: `/${params.category}/`,
    noindex: posts.length === 0 || params.category === 'trust',
  });
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const info = topicInfo(category);
  const posts = listed(category);
  const isServices = category === 'services';
  const trail = [
    { name: 'Home', href: '/' },
    ...(info.group === 'planet' ? [{ name: 'Planets', href: '/planets/' }] : []),
    { name: info.label, href: `/${category}/` },
  ];

  return (
    <div className="wrap">
      <JsonLd
        data={[
          breadcrumbSchema(trail),
          posts.length ? itemListSchema(`${info.label} guides`, posts) : null,
          faqSchema(info.faqs),
        ]}
      />
      <header className="page-head">
        <Breadcrumbs trail={trail} />
        <p className="kicker">{isServices ? 'Consultations' : `${posts.length} ${posts.length === 1 ? 'guide' : 'guides'}`}</p>
        <h1>{info.title}</h1>
        {info.description && <p>{info.description}</p>}
      </header>

      {posts.length === 0 ? (
        <p style={{ padding: '2rem 0' }}>
          No guides are published in this section yet. Browse <a href="/articles/">all articles</a> or the{' '}
          <a href="/planets/">planet index</a>.
        </p>
      ) : (
        <div style={{ maxWidth: 900 }}>
          {posts.map((p, i) => (
            <div key={p.url}>
              <PostCard post={p} variant="row" headingLevel={2} showImage={!isServices} />
              {i === 3 && <AdSlot name="listing" />}
            </div>
          ))}
        </div>
      )}

      {isServices && <BookingCta variant="service" campaign="services-index" />}

      {info.faqs.length > 0 && (
        <div style={{ maxWidth: 760 }}>
          <FAQ items={info.faqs} title={`${info.label}: common questions`} />
        </div>
      )}
    </div>
  );
}
