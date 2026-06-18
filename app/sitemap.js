import { CITIES } from '@/lib/cities';
import { BLOG_POSTS } from '@/lib/dummyData';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export default function sitemap() {
  const now = new Date().toISOString();

  const staticPages = [
    { url: SITE_URL,                           lastModified: now, changeFrequency: 'hourly',  priority: 1.0 },
    { url: `${SITE_URL}/gold-rate-history`,    lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${SITE_URL}/blog`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${SITE_URL}/about`,                lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/contact`,              lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${SITE_URL}/disclaimer`,           lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/privacy-policy`,       lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${SITE_URL}/terms-of-use`,         lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
  ];

  const cityPages = CITIES.map((city) => ({
    url:             `${SITE_URL}/gold-rate-today-${city.slug}`,
    lastModified:    now,
    changeFrequency: 'hourly',
    priority:        0.9,
  }));

  const blogPages = BLOG_POSTS.map((post) => ({
    url:             `${SITE_URL}/blog/${post.slug}`,
    lastModified:    now,
    changeFrequency: 'monthly',
    priority:        0.6,
  }));

  return [...staticPages, ...cityPages, ...blogPages];
}
