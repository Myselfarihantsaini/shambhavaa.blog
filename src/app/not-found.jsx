export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <div className="wrap notfound">
      <p className="kicker">404</p>
      <h1>This page isn’t here</h1>
      <p>
        The link may be old, or the article may have moved. Try the <a href="/articles/">list of all
        articles</a>, <a href="/search/">search</a>, or go back to the <a href="/">home page</a>.
      </p>
    </div>
  );
}
