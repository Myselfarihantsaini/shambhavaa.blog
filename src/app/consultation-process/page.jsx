import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../../lib/posts';

export const metadata = {
  title: 'How Shambhavaa Astrology Consultation Works | Shambhavaa',
  description: 'Learn step-by-step how a Vedic astrology consultation works at Shambhavaa, from birth details to complete chart analysis.',
  alternates: {
    canonical: 'https://shambhavaa.blog/consultation-process/',
  },
};

export default function ConsultationProcessPage() {
  const post = getPostBySlug('trust', 'consultation-process');

  return (
    <div className="container" style={{ padding: 'var(--spacing-lg) 0', maxWidth: '800px' }}>
      <section className="animate-fade-in">
        <div className="article-content" style={{ fontSize: '0.95rem' }}>
          <MDXRemote
            source={post.content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
          />
        </div>
      </section>
    </div>
  );
}
