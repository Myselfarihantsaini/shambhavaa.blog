export default function JsonLd({ data }) {
  const items = (Array.isArray(data) ? data : [data]).filter(Boolean);
  if (!items.length) return null;
  return items.map((item, i) => (
    <script
      key={i}
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped so content cannot close the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, '\\u003c') }}
    />
  ));
}
