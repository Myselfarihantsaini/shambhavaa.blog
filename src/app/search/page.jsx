import { Suspense } from 'react';
import { pageMeta } from '../../lib/seo';
import SearchClient from './SearchClient';

export const metadata = pageMeta({
  title: 'Search',
  description: 'Search Shambhavaa’s Vedic astrology articles.',
  path: '/search/',
  noindex: true,
});

export default function SearchPage() {
  return (
    <div className="wrap">
      <header className="page-head">
        <h1>Search</h1>
        <p>Search every article by planet, house, nakshatra, sign or topic.</p>
        <Suspense fallback={null}>
          <SearchClient />
        </Suspense>
      </header>
    </div>
  );
}
