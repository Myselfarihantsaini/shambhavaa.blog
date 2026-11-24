export default function Toc({ headings }) {
  const items = headings.filter((h) => h.level === 2);
  if (items.length < 3) return null;
  return (
    <nav className="toc" aria-label="On this page">
      <details open>
        <summary>On this page</summary>
        <ol>
          {items.map((h) => (
            <li key={h.id}>
              <a href={`#${h.id}`}>{h.text}</a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}
