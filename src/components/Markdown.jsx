import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { SITE } from '../config/site';

function A({ href = '', children, ...rest }) {
  const external = /^https?:\/\//.test(href) && !href.startsWith(SITE.url);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  return <a href={href} {...rest}>{children}</a>;
}

function Img({ src, alt = '', width, height, style, ...rest }) {
  return <img src={src} alt={alt} width={width} height={height} loading="lazy" decoding="async" {...rest} />;
}

function Table(props) {
  return (
    <div className="table-wrap" role="region" aria-label="Table" tabIndex={0}>
      <table {...props} />
    </div>
  );
}

const components = {
  // The page template already renders the H1, so a heading-1 inside the body becomes an H2.
  h1: (props) => <h2 {...props} />,
  a: A,
  img: Img,
  table: Table,
};

export default function Markdown({ source }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] } }}
    />
  );
}
