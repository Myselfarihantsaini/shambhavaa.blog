import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getPostBySlug } from '../../lib/posts';

export const metadata = {
  title: 'Refund and Cancellation Policy | Shambhavaa',
  description: 'Understand the refund, cancellation, rescheduling, and no-show policies for astrology consultations at Shambhavaa.',
  alternates: {
    canonical: 'https://shambhavaa.blog/refund-cancellation-policy/',
  },
};

export default function RefundCancellationPolicyPage() {
  const post = getPostBySlug('trust', 'refund-cancellation-policy');

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
