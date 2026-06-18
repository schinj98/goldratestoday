'use client';

import { useState, useEffect } from 'react';
import { CITIES } from '@/lib/cities';
import { getCityMultiplier, formatINR } from '@/lib/goldUtils';

export default function TickerBar() {
  const [rate, setRate] = useState(null);

  useEffect(() => {
    fetch('/api/goldrate', { cache: 'no-store' })
      .then((r) => r.ok ? r.json() : null)
      .then((d) => d && setRate(d))
      .catch(() => null);

    const id = setInterval(() => {
      fetch('/api/goldrate', { cache: 'no-store' })
        .then((r) => r.ok ? r.json() : null)
        .then((d) => d && setRate(d))
        .catch(() => null);
    }, 5 * 60_000);
    return () => clearInterval(id);
  }, []);

  if (!rate) return null;

  const isUp = (rate.changePct ?? 0) >= 0;
  const items = [
    {
      label: 'XAU/INR',
      price: rate.price24kPerGram,
      change: rate.changePct,
      bold: true,
    },
    ...CITIES.map((c) => ({
      label: c.name,
      price: (rate.price24kPerGram || 0) + getCityMultiplier(c.slug),
      change: rate.changePct,
    })),
  ];

  // Duplicate for seamless loop
  const allItems = [...items, ...items];

  return (
    <div className="h-8 bg-surface-1 border-b border-white/[0.06] overflow-hidden ticker-wrap flex items-center">
      {/* Left label */}
      <div className="flex-shrink-0 flex items-center gap-2 pl-3 pr-4 border-r border-white/[0.06] h-full bg-surface-1 z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-up animate-pulse-dot" />
        <span className="text-2xs font-semibold uppercase tracking-widest text-ink-400">
          Live
        </span>
      </div>

      {/* Scrolling items */}
      <div className="ticker-content flex items-center animate-ticker whitespace-nowrap" style={{ animationDuration: '80s' }}>
        {allItems.map((item, i) => (
          <TickerItem key={i} item={item} isUp={isUp} />
        ))}
      </div>
    </div>
  );
}

function TickerItem({ item, isUp }) {
  const color = isUp ? 'text-up' : 'text-down';
  const arrow = isUp ? '▲' : '▼';
  const abs   = Math.abs(item.change ?? 0).toFixed(2);

  return (
    <span className="inline-flex items-center gap-1.5 px-4 text-2xs border-r border-white/[0.04]">
      <span className={`font-semibold tracking-wide ${item.bold ? 'text-gold-400' : 'text-ink-200'}`}>
        {item.label}
      </span>
      <span className="mono font-medium text-ink-100">
        {formatINR(item.price)}
      </span>
      <span className={`mono ${color}`}>
        {arrow} {abs}%
      </span>
    </span>
  );
}
