export default function FAQ({ items = [], title = 'Questions readers ask', id = 'faq' }) {
  const list = items.filter((f) => f?.question && f?.answer);
  if (!list.length) return null;
  return (
    <section className="faq" aria-labelledby={id}>
      <h2 id={id}>{title}</h2>
      {list.map((f) => (
        <details key={f.question}>
          <summary>{f.question}</summary>
          <p>{f.answer}</p>
        </details>
      ))}
    </section>
  );
}
