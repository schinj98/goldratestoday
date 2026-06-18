import Link from 'next/link';
import AdPlaceholder from '@/components/AdPlaceholder';
import { BLOG_POSTS } from '@/lib/dummyData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  title: 'Gold Rate News & Blog | GoldRatesToday.in',
  description: 'Read articles about gold rates in India, investment tips, and market analysis. Stay informed about factors affecting gold prices.',
  alternates: { canonical: `${SITE_URL}/blog` },
};

const W = 'max-w-[1340px] mx-auto px-4 sm:px-6';

export default function BlogPage() {
  return (
    <>
      {/* ── Hero — white ── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <p className="mono text-2xs text-ink-400 uppercase tracking-widest mb-3">News & Insights</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 leading-tight mb-2">
            Gold Rate Blog
          </h1>
          <p className="text-sm text-ink-300 max-w-2xl">
            Articles on gold prices, investment strategies, and market analysis for Indian investors.
          </p>
        </div>
      </section>

      {/* ── Ad ── */}
      <div className={`${W} pt-6`}>
        <AdPlaceholder id="ad-top" />
      </div>

      {/* ── Posts — white ── */}
      <section className="bg-surface-1">
        <div className={`${W} py-10 sm:py-12`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.slug}
                className="card overflow-hidden hover:border-[#00d09c]/40 transition-colors group flex flex-col"
              >
                {/* Accent bar */}
                <div className="h-[3px] bg-[#00d09c]" />
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-2xs text-ink-400 mb-3 mono">
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h2 className="text-sm font-semibold text-ink-100 group-hover:text-[#00d09c] transition-colors leading-snug mb-3">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-xs text-ink-300 leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-xs text-[#00d09c] font-semibold hover:text-[#00b386] transition-colors"
                  >
                    Read more
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className={`${W} py-8`}>
        <AdPlaceholder id="ad-bottom" />
      </div>
    </>
  );
}
