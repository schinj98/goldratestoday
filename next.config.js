/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  async rewrites() {
    return [
      // Rewrite /gold-rate-today-{city} → /gold-rate-today/{city}
      // This keeps SEO-friendly hyphenated URLs while using Next.js dynamic routing internally.
      {
        source: '/gold-rate-today-:city',
        destination: '/gold-rate-today/:city',
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, s-maxage=3600, stale-while-revalidate=86400' },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
