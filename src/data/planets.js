export const PLANETS = [
  { label: 'Sun', slug: 'sun' },
  { label: 'Moon', slug: 'moon' },
  { label: 'Mars', slug: 'mars' },
  { label: 'Mercury', slug: 'mercury' },
  { label: 'Jupiter', slug: 'jupiter' },
  { label: 'Venus', slug: 'venus' },
  { label: 'Saturn', slug: 'saturn' },
  { label: 'Rahu', slug: 'rahu' },
  { label: 'Ketu', slug: 'ketu' },
];

export function getPlanetLabel(slug) {
  return PLANETS.find((planet) => planet.slug === slug)?.label;
}
