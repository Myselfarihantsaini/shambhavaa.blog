export function formatDate(iso, opts = { day: 'numeric', month: 'long', year: 'numeric' }) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-GB', { ...opts, timeZone: 'Asia/Kolkata' });
}
