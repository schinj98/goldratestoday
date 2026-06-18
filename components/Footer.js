import Link from 'next/link';
import { CITIES } from '@/lib/cities';

// Footer is always #101828 dark — independent of the current theme.
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: '#101828' }}>
      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-baseline gap-0.5 mb-3">
              <span className="font-bold text-base tracking-tight text-white">
                GoldRates<span className="text-[#00d09c]">Today</span>
              </span>
              <span className="mono text-[10px] text-white/40 ml-0.5">.in</span>
            </Link>
            <p className="text-xs text-white/50 leading-relaxed mb-4 max-w-[220px]">
              Live gold rates for 15 Indian cities. Updated every 60 seconds from GoldAPI.io during MCX trading hours.
            </p>
            <div className="space-y-1.5 text-2xs text-white/35">
              <p className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                MCX · Mon–Fri · 9:00 AM – 11:30 PM IST
              </p>
              <p className="flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                IBJA benchmark rates twice daily
              </p>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-white/35 mb-3">Navigate</p>
            <ul className="space-y-2">
              {[
                { href: '/',                  label: 'Gold Rate Today' },
                { href: '/gold-rate-history', label: 'Rate History' },
                { href: '/blog',              label: 'Blog & News' },
                { href: '/about',             label: 'About Us' },
                { href: '/contact',           label: 'Contact' },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-white/50 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities col 1 */}
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-white/35 mb-3">Gold Rate In</p>
            <ul className="space-y-2">
              {CITIES.slice(0, 8).map((city) => (
                <li key={city.slug}>
                  <Link href={`/gold-rate-today-${city.slug}`} className="text-xs text-white/50 hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities col 2 */}
          <div>
            <p className="text-2xs font-semibold uppercase tracking-widest text-white/35 mb-3 invisible">·</p>
            <ul className="space-y-2">
              {CITIES.slice(8).map((city) => (
                <li key={city.slug}>
                  <Link href={`/gold-rate-today-${city.slug}`} className="text-xs text-white/50 hover:text-white transition-colors">
                    {city.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 space-y-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-2xs text-white/35 leading-relaxed max-w-3xl">
            <strong className="text-white/50">Disclaimer:</strong> All gold rates shown are indicative and for reference only.
            Actual buying/selling prices at jewellers include 3% GST, making charges (10–25%), and dealer margins.
            Rates sourced from GoldAPI.io and adjusted for Indian import duty (15%).
            GoldRatesToday.in is not responsible for financial decisions made based on this data.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-2xs text-white/30">
              © {year} GoldRatesToday.in · All rights reserved
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              {[
                { href: '/privacy-policy', label: 'Privacy Policy' },
                { href: '/disclaimer',     label: 'Disclaimer' },
                { href: '/terms-of-use',   label: 'Terms of Use' },
              ].map(({ href, label }) => (
                <Link key={href} href={href} className="text-2xs text-white/35 hover:text-white/60 transition-colors">
                  {label}
                </Link>
              ))}
              <a href="mailto:contact@goldratestoday.in" className="text-2xs text-white/35 hover:text-white/60 transition-colors">
                contact@goldratestoday.in
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
