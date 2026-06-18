'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CITIES } from '@/lib/cities';
import { getCityMultiplier, formatINR } from '@/lib/goldUtils';

// Top 8 by search volume — shown by default
const TOP_8 = ['delhi', 'mumbai', 'bangalore', 'chennai', 'hyderabad', 'kolkata', 'gurgaon', 'pune'];

// Regional grouping for expanded view
const REGIONS = [
  { name: 'North',  slugs: ['delhi', 'gurgaon', 'noida', 'faridabad', 'chandigarh', 'jaipur', 'lucknow'] },
  { name: 'West',   slugs: ['mumbai', 'pune', 'ahmedabad', 'surat'] },
  { name: 'South',  slugs: ['bangalore', 'chennai', 'hyderabad'] },
  { name: 'East',   slugs: ['kolkata'] },
];

export default function CityRatesGrid({ rateData }) {
  const [expanded, setExpanded] = useState(false);

  const base24    = rateData?.price24kPerGram || 0;
  const base22    = rateData?.price22kPerGram || 0;
  const changePct = rateData?.changePct ?? 0;
  const isUp      = changePct >= 0;

  const delhiBase24 = base24 + getCityMultiplier('delhi'); // delta = 0

  const buildRow = (city) => {
    const d   = getCityMultiplier(city.slug);
    const diff = d - getCityMultiplier('delhi'); // vs Delhi benchmark
    return { ...city, p24: base24 + d, p22: base22 + d, diff };
  };

  return (
    <section>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-ink-200">Gold Rate by City</h2>
        <p className="text-2xs text-ink-400 mono">
          MCX today:&ensp;
          <span className={`font-semibold ${isUp ? 'text-up' : 'text-down'}`}>
            {isUp ? '+' : ''}{Math.abs(changePct).toFixed(2)}%
          </span>
        </p>
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'rgb(var(--color-surface-3) / 0.5)', borderBottom: '1px solid var(--border)' }}>
              <th className="text-left px-4 py-2.5 text-2xs font-semibold uppercase tracking-widest text-ink-300 w-[40%]">City</th>
              <th className="text-right px-4 py-2.5 text-2xs font-semibold uppercase tracking-widest text-ink-300">24K</th>
              <th className="text-right px-4 py-2.5 text-2xs font-semibold uppercase tracking-widest text-ink-300 hidden sm:table-cell">22K</th>
              <th className="text-right px-4 py-2.5 text-2xs font-semibold uppercase tracking-widest text-ink-300">vs Delhi</th>
            </tr>
          </thead>

          {!expanded ? (
            // Default: top 8, no region grouping
            <tbody>
              {TOP_8.map((slug, i) => {
                const city = CITIES.find((c) => c.slug === slug);
                if (!city) return null;
                const row = buildRow(city);
                return (
                  <CityRow
                    key={slug}
                    row={row}
                    isLast={i === TOP_8.length - 1 && !expanded}
                    borderBottom
                  />
                );
              })}
            </tbody>
          ) : (
            // Expanded: all 15 cities with region headers
            REGIONS.map((region) => (
              <tbody key={region.name}>
                <tr style={{ backgroundColor: 'rgb(var(--color-surface-3) / 0.3)', borderBottom: '1px solid var(--border)' }}>
                  <td colSpan={4} className="px-4 py-1.5">
                    <span className="text-2xs font-semibold uppercase tracking-widest text-ink-300">{region.name}</span>
                  </td>
                </tr>
                {region.slugs.map((slug) => {
                  const city = CITIES.find((c) => c.slug === slug);
                  if (!city) return null;
                  const row = buildRow(city);
                  return <CityRow key={slug} row={row} borderBottom />;
                })}
              </tbody>
            ))
          )}
        </table>

        {/* Expand / collapse footer */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-2.5 text-2xs text-ink-400 hover:text-ink-200 transition-colors"
          style={{ borderTop: '1px solid var(--border)', backgroundColor: 'rgb(var(--color-surface-3) / 0.3)' }}
        >
          {expanded ? (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
              Show fewer cities
            </>
          ) : (
            <>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
              View all 15 cities by region
            </>
          )}
        </button>
      </div>
    </section>
  );
}

function CityRow({ row, borderBottom }) {
  const diffCls = row.diff === 0
    ? 'text-ink-400'
    : row.diff > 0 ? 'text-down' : 'text-up'; // higher price vs Delhi = red; lower = green

  const diffLabel = row.diff === 0
    ? '—'
    : `${row.diff > 0 ? '+' : ''}${formatINR(row.diff)}`;

  return (
    <tr
      className="group hover:bg-white/[0.02] transition-colors"
      style={borderBottom ? { borderBottom: '1px solid var(--border)' } : {}}
    >
      <td className="px-4 py-3">
        <Link
          href={`/gold-rate-today-${row.slug}`}
          className="text-sm font-medium text-ink-200 group-hover:text-gold-400 transition-colors"
        >
          {row.name}
        </Link>
      </td>
      <td className="px-4 py-3 text-right mono text-sm font-semibold text-ink-100">
        {formatINR(row.p24)}
      </td>
      <td className="px-4 py-3 text-right mono text-sm text-ink-300 hidden sm:table-cell">
        {formatINR(row.p22)}
      </td>
      <td className={`px-4 py-3 text-right mono text-xs font-semibold ${diffCls}`}>
        {diffLabel}
      </td>
    </tr>
  );
}
