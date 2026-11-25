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

// Traditional colour and Devanagari name for each section (used for the topic tiles).
export const TOPIC_STYLE = {
  sun: { deva: 'सूर्य', bg: '#b4441b', fg: '#fff4e6' },
  moon: { deva: 'चन्द्र', bg: '#e8e2d3', fg: '#22201c' },
  mars: { deva: 'मंगल', bg: '#9b1c1c', fg: '#fff1ec' },
  mercury: { deva: 'बुध', bg: '#2e6a3c', fg: '#f0fff2' },
  jupiter: { deva: 'गुरु', bg: '#dca21c', fg: '#2a1b00' },
  venus: { deva: 'शुक्र', bg: '#f2ddd5', fg: '#5b1a32' },
  saturn: { deva: 'शनि', bg: '#1d2943', fg: '#e8ecf7' },
  rahu: { deva: 'राहु', bg: '#3b3940', fg: '#eeeaf2' },
  ketu: { deva: 'केतु', bg: '#6b4a2b', fg: '#fbf0e3' },
  'house-lords': { deva: 'भाव', bg: '#5b1a32', fg: '#fde8ef' },
  mahadasha: { deva: 'दशा', bg: '#7a3b12', fg: '#fff0e0' },
  'divisional-charts': { deva: 'वर्ग', bg: '#24524f', fg: '#e6fbf8' },
  'birth-chart': { deva: 'कुण्डली', bg: '#4a2c5e', fg: '#f6ecff' },
  nakshatra: { deva: 'नक्षत्र', bg: '#14213d', fg: '#e8eefc' },
  horoscopes: { deva: 'राशिफल', bg: '#a8361d', fg: '#fff1ea' },
  resources: { deva: 'ज्योतिष', bg: '#3d3a2c', fg: '#f7f3df' },
  services: { deva: 'परामर्श', bg: '#14110e', fg: '#e2b857' },
  trust: { deva: 'नीति', bg: '#4a4540', fg: '#f3efe9' },
};

export function topicStyle(slug) {
  return TOPIC_STYLE[slug] || { deva: 'ज्योतिष', bg: '#3d3a2c', fg: '#f7f3df' };
}

// The twelve rashis, with the 2026 horoscope article for each where one exists.
export const RASHIS = [
  { en: 'Aries', deva: 'मेष', url: '/horoscopes/aries-horoscope-2026-month-by-month/' },
  { en: 'Taurus', deva: 'वृषभ', url: '/house-lords/1st-lord-venus-in-all-12-houses/' },
  { en: 'Gemini', deva: 'मिथुन', url: '/horoscopes/gemini-horoscope-2026-month-by-month/' },
  { en: 'Cancer', deva: 'कर्क', url: '/horoscopes/cancer-love-horoscope-2026/' },
  { en: 'Leo', deva: 'सिंह', url: '/horoscopes/leo-horoscope-2026-january-to-december/' },
  { en: 'Virgo', deva: 'कन्या', url: '/horoscopes/virgo-horoscope-2026-month-by-month/' },
  { en: 'Libra', deva: 'तुला', url: '/horoscopes/libra-horoscope-2026-month-by-month/' },
  { en: 'Scorpio', deva: 'वृश्चिक', url: '/horoscopes/scorpio-horoscope-2026-month-by-month/' },
  { en: 'Sagittarius', deva: 'धनु', url: '/horoscopes/sagittarius-horoscope-2026-month-by-month/' },
  { en: 'Capricorn', deva: 'मकर', url: '/horoscopes/capricorn-horoscope-2026-month-by-month/' },
  { en: 'Aquarius', deva: 'कुम्भ', url: '/horoscopes/aquarius-horoscope-2026-month-by-month/' },
  { en: 'Pisces', deva: 'मीन', url: '/horoscopes/pisces-horoscope-2026-month-by-month/' },
];

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
