export function shortAnchorTitle(title, fallback = 'Guide') {
  const clean = String(title || fallback).replace(/\s+/g, ' ').trim();
  const base = (clean.split(':')[0] || clean || fallback).trim();
  const words = base.split(' ');
  let out = '';
  for (const word of words) {
    const next = `${out} ${word}`.trim();
    if (next.length > 42) break;
    out = next;
  }
  return out || fallback;
}

export function readAnchor(title, fallback = 'Guide') {
  return `Read ${shortAnchorTitle(title, fallback)}`;
}
