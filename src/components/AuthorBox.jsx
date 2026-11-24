import { AUTHOR } from '../config/site';

export default function AuthorBox() {
  return (
    <section className="author" aria-label="About the author">
      <p className="kicker">Written by</p>
      <p className="author__name">
        <a href="/about/" rel="author">{AUTHOR.name}</a>
      </p>
      <p className="author__role">{AUTHOR.role}</p>
      <p className="author__bio">{AUTHOR.bio}</p>
      <p className="author__links">
        <a href="/about/">About Arihant</a>
        {' · '}
        <a href="/editorial-policy/">How articles are written and checked</a>
      </p>
    </section>
  );
}
