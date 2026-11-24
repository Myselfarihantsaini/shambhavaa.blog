import { CATEGORY_DESCRIPTIONS } from './category-descriptions';

// Short labels and one-line descriptions for every content folder.
export const TOPICS = {
  sun: { label: 'Sun', group: 'planet', blurb: 'Identity, authority, father and visibility — house by house.' },
  moon: { label: 'Moon', group: 'planet', blurb: 'The mind, emotional safety and the lens through which everything is felt.' },
  mars: { label: 'Mars', group: 'planet', blurb: 'Courage, conflict, property and the way you push.' },
  mercury: { label: 'Mercury', group: 'planet', blurb: 'Speech, trade, learning and the nervous system.' },
  jupiter: { label: 'Jupiter', group: 'planet', blurb: 'Grace, teachers, children and the meaning you live by.' },
  venus: { label: 'Venus', group: 'planet', blurb: 'Love, comfort, art and what you find beautiful.' },
  saturn: { label: 'Saturn', group: 'planet', blurb: 'Karma, delay, discipline and what time slowly builds.' },
  rahu: { label: 'Rahu', group: 'planet', blurb: 'Hunger, obsession, foreign ground and unfamiliar ambition.' },
  ketu: { label: 'Ketu', group: 'planet', blurb: 'Detachment, old mastery and quiet spiritual release.' },
  'house-lords': { label: 'House Lords', group: 'method', blurb: 'Where each house lord sits, and what it carries there.' },
  mahadasha: { label: 'Mahadasha', group: 'method', blurb: 'Reading dasha periods with D1, D9 and transits together.' },
  'divisional-charts': { label: 'Divisional Charts', group: 'method', blurb: 'D2, D9, D10 and the vargas that refine a reading.' },
  'birth-chart': { label: 'Birth Chart', group: 'method', blurb: 'How a kundli is structured and how to read it whole.' },
  nakshatra: { label: 'Nakshatra', group: 'method', blurb: 'The 27 lunar mansions and their temperaments.' },
  horoscopes: { label: 'Horoscope 2026', group: 'forecast', blurb: 'Month-by-month forecasts for each Moon sign and Lagna.' },
  resources: { label: 'Learn Astrology', group: 'method', blurb: 'Method notes: career, marriage timing, remedies and more.' },
  services: { label: 'Consultations', group: 'service', blurb: 'One-to-one readings, what they cover and how to prepare.' },
  trust: { label: 'Policies', group: 'meta', blurb: '' },
};

export const PLANET_ORDER = ['sun', 'moon', 'mars', 'mercury', 'jupiter', 'venus', 'saturn', 'rahu', 'ketu'];

export function topicLabel(slug = '') {
  return TOPICS[slug]?.label || String(slug).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export function topicInfo(slug) {
  const extra = CATEGORY_DESCRIPTIONS[slug] || {};
  return {
    slug,
    label: topicLabel(slug),
    blurb: TOPICS[slug]?.blurb || '',
    group: TOPICS[slug]?.group || 'method',
    title: extra.title || `${topicLabel(slug)} in Vedic Astrology`,
    description: extra.description || TOPICS[slug]?.blurb || '',
    faqs: extra.faqs || [],
  };
}
