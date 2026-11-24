export default function ShareLinks({ url, title }) {
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: 'WhatsApp', href: `https://wa.me/?text=${t}%20${u}` },
    { label: 'X', href: `https://x.com/intent/post?text=${t}&url=${u}` },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { label: 'Pinterest', href: `https://www.pinterest.com/pin/create/button/?url=${u}&description=${t}` },
    { label: 'Email', href: `mailto:?subject=${t}&body=${u}` },
  ];
  return (
    <div className="share">
      <span className="share__label">Share</span>
      <ul>
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noopener noreferrer nofollow">{l.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
