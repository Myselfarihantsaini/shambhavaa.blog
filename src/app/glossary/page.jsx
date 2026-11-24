import glossary from '../../data/glossary.json';
import StaticPage from '../../components/StaticPage';
import { pageMeta, abs } from '../../lib/seo';
import { tagSlug } from '../../lib/seo';

export const metadata = pageMeta({
  title: 'Vedic Astrology Glossary',
  description: 'Plain-English definitions of Vedic astrology terms: nakshatra, mahadasha, Rahu, Ketu, Sade Sati, Atmakaraka, Lagna and more.',
  path: '/glossary/',
});

export default function GlossaryPage() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  const letters = Array.from(new Set(terms.map((t) => t.term[0].toUpperCase())));
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Vedic astrology glossary',
    url: abs('/glossary/'),
    hasDefinedTerm: terms.map((t) => ({
      '@type': 'DefinedTerm',
      name: t.term,
      description: t.definition,
      url: abs(`/glossary/#${tagSlug(t.term)}`),
    })),
  };
  return (
    <StaticPage
      title="Glossary"
      path="/glossary/"
      intro="Short definitions of the Sanskrit and technical terms used across Shambhavaa."
      schema={schema}
    >
      <nav className="alpha" aria-label="Jump to letter">
        {letters.map((l) => (
          <a key={l} href={`#letter-${l}`}>{l}</a>
        ))}
      </nav>
      <dl className="glossary">
        {terms.map((t, i) => {
          const first = i === 0 || terms[i - 1].term[0].toUpperCase() !== t.term[0].toUpperCase();
          return (
            <div key={t.term} id={first ? `letter-${t.term[0].toUpperCase()}` : undefined}>
              <dt id={tagSlug(t.term)}>{t.term}</dt>
              <dd>{t.definition}</dd>
            </div>
          );
        })}
      </dl>
    </StaticPage>
  );
}
