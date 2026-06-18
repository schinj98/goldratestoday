'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { CITIES } from '@/lib/cities';
import { formatINR } from '@/lib/goldUtils';
import { getMarketStatus, formatCountdown } from '@/lib/marketHours';
import ThemeToggle from './ThemeToggle';

// ─── Market Status Strip ──────────────────────────────────────────────────────
function MarketStatusStrip() {
  const [rate,   setRate]   = useState(null);
  const [status, setStatus] = useState(() => getMarketStatus());

  useEffect(() => {
    function poll() {
      fetch('/api/goldrate', { cache: 'no-store' })
        .then((r) => r.ok ? r.json() : null)
        .then((d) => d && setRate(d))
        .catch(() => null);
    }
    poll();
    const id = setInterval(poll, 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setStatus(getMarketStatus()), 30_000);
    return () => clearInterval(id);
  }, []);

  const isLive = status.label === 'Live';
  const price  = rate?.price24kPerGram;
  const change = rate?.change24kPerGram ?? 0;
  const pct    = rate?.changePct ?? 0;
  const isUp   = pct >= 0;

  return (
    <div className="hidden lg:flex items-center gap-2 text-2xs mono select-none">
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isLive ? 'bg-up animate-pulse-dot' : 'bg-ink-500'}`} />
      <span className={`font-semibold ${isLive ? 'text-up' : 'text-ink-400'}`}>{status.label}</span>
      {price ? (
        <>
          <span className="text-ink-400">·</span>
          <span className="text-ink-300 font-medium">24K {formatINR(price)}</span>
          {change !== 0 && (
            <span className={isUp ? 'text-up' : 'text-down'}>
              {isUp ? '+' : ''}{formatINR(change)} ({isUp ? '+' : ''}{Math.abs(pct).toFixed(2)}%)
            </span>
          )}
        </>
      ) : !isLive ? (
        <span className="text-ink-400">· Opens in {formatCountdown(status.nextOpenMs)}</span>
      ) : null}
    </div>
  );
}

// ─── City Search Modal ────────────────────────────────────────────────────────
function CityModal({ open, onClose }) {
  const [query, setQuery] = useState('');
  const router   = useRouter();
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 40);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = CITIES.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.state.toLowerCase().includes(query.toLowerCase())
  );

  function select(slug) {
    router.push(`/gold-rate-today-${slug}`);
    onClose();
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-50/30 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-xl overflow-hidden bg-surface-1"
        style={{ border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(16,24,40,0.12)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
          <svg className="w-4 h-4 text-ink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search city or state…"
            className="flex-1 text-sm bg-transparent text-ink-100 placeholder-ink-400 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="text-2xs text-ink-400 hover:text-ink-200 transition-colors px-1.5 py-0.5 rounded border"
            style={{ borderColor: 'var(--border)' }}
          >
            ESC
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto">
          {filtered.map((city, i) => (
            <button
              key={city.slug}
              onClick={() => select(city.slug)}
              className="w-full flex items-center justify-between px-4 py-3 text-left transition-colors hover:bg-surface-3 group"
              style={i < filtered.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}
            >
              <span className="text-sm font-medium text-ink-200 group-hover:text-[#00d09c] transition-colors">
                {city.name}
              </span>
              <span className="text-2xs text-ink-400">{city.state}</span>
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-8 text-sm text-ink-400 text-center">No cities match &ldquo;{query}&rdquo;</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cityOpen, setCityOpen] = useState(false);
  const pathname = usePathname();

  const currentCity = CITIES.find(
    (c) => pathname?.includes(`/${c.slug}`) || pathname?.includes(`-${c.slug}`)
  )?.name ?? null;

  const links = [
    { href: '/',                  label: "Today's Rates" },
    { href: '/gold-rate-history', label: 'History'       },
    { href: '/blog',              label: 'Blog'          },
  ];

  return (
    <>
      <nav
        className="sticky top-0 z-40 h-14 bg-surface-1 border-b"
        style={{ borderColor: 'var(--border)' }}
      >
        <div className="max-w-[1340px] mx-auto px-4 sm:px-6 h-full flex items-center gap-5">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-baseline gap-0.5 select-none">
            <span className="font-bold text-[17px] tracking-tight text-ink-50 leading-none">
              GoldRates<span className="text-[#00d09c]">Today</span>
            </span>
            <span className="mono text-[10px] text-ink-400 ml-0.5 leading-none">.in</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
                    active
                      ? 'text-[#00d09c] bg-[#e7faf5]'
                      : 'text-ink-300 hover:text-ink-100 hover:bg-surface-3'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>

          <div className="flex-1" />

          <MarketStatusStrip />

          {/* City selector */}
          <button
            onClick={() => setCityOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-ink-300 hover:text-ink-100 hover:bg-surface-3 transition-colors duration-150"
            style={{ border: '1px solid var(--border)' }}
          >
            <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{currentCity ?? 'Select city'}</span>
          </button>

          <ThemeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-ink-300 hover:text-ink-100 p-1.5 rounded-lg hover:bg-surface-3 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="md:hidden absolute top-14 left-0 right-0 border-b px-4 py-3 space-y-0.5 z-50 bg-surface-1"
            style={{ borderColor: 'var(--border)' }}
          >
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? 'text-[#00d09c] bg-[#e7faf5] font-medium'
                      : 'text-ink-300 hover:text-ink-100 hover:bg-surface-3'
                  }`}
                >
                  {label}
                </Link>
              );
            })}
            <button
              onClick={() => { setCityOpen(true); setMenuOpen(false); }}
              className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-ink-300 hover:text-ink-100 hover:bg-surface-3 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {currentCity ? `Change city (${currentCity})` : 'Select city'}
            </button>
          </div>
        )}
      </nav>

      <CityModal open={cityOpen} onClose={() => setCityOpen(false)} />
    </>
  );
}
