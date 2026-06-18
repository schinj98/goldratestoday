import { notFound } from 'next/navigation';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import AdPlaceholder from '@/components/AdPlaceholder';
import { BLOG_POSTS } from '@/lib/dummyData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function BlogPostPage({ params }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: post.title },
  ];

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <AdPlaceholder id="ad-top" />

      <Breadcrumb items={breadcrumbs} />

      <article>
        <header className="mb-6">
          <div className="flex items-center gap-3 text-2xs text-ink-400 mono mb-3">
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
            <span>·</span>
            <span>{post.author}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-ink-300 leading-relaxed border-l-2 border-gold-500 pl-4">
            {post.excerpt}
          </p>
        </header>

        {/* Article body */}
        <div className="card p-6 sm:p-8 space-y-4 text-sm text-ink-300 leading-relaxed">
          {post.content.split('\n\n').map((para, i) => {
            if (para.startsWith('**') && para.includes('**\n')) {
              const [heading, ...rest] = para.split('\n');
              return (
                <div key={i}>
                  <h2 className="text-base font-semibold text-ink-100 mb-1">
                    {heading.replace(/\*\*/g, '')}
                  </h2>
                  <p>{rest.join('\n')}</p>
                </div>
              );
            }
            if (para.startsWith('*') && para.endsWith('*')) {
              return (
                <p key={i} className="text-ink-400 italic border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                  {para.replace(/\*/g, '')}
                </p>
              );
            }
            if (para.includes('**')) {
              return (
                <p key={i} dangerouslySetInnerHTML={{
                  __html: para.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink-200">$1</strong>'),
                }} />
              );
            }
            return <p key={i}>{para}</p>;
          })}
        </div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section>
          <p className="section-title">Related Articles</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((related) => (
              <Link
                key={related.slug}
                href={`/blog/${related.slug}`}
                className="card p-5 hover:border-gold-500/30 transition-colors group"
              >
                <div className="text-2xs text-ink-400 mono mb-2">{related.date} · {related.readTime}</div>
                <h3 className="text-sm font-semibold text-ink-200 group-hover:text-gold-400 transition-colors leading-snug">
                  {related.title}
                </h3>
                <p className="text-xs text-ink-400 mt-2 leading-relaxed line-clamp-2">{related.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <AdPlaceholder id="ad-bottom" />
    </div>
  );
}
