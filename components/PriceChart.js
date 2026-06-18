'use client';

import { useState, useMemo } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { CITIES } from '@/lib/cities';
import { getCityMultiplier, formatINR } from '@/lib/goldUtils';
import { abbreviateDate } from '@/lib/dummyData';
import { useTheme } from './ThemeProvider';

const RANGES = [
  { label: '7D',  days: 7   },
  { label: '1M',  days: 30  },
  { label: '3M',  days: 90  },
  { label: '6M',  days: 180 },
];

export default function PriceChart({ historicalRates, initialCity = '' }) {
  const [range, setRange] = useState('1M');
  const [karat, setKarat] = useState('both');
  const [city,  setCity]  = useState(initialCity);
  const { theme } = useTheme();
  const isDark = theme !== 'light';
  const tickColor   = isDark ? '#667085' : '#98a2b3';
  const gridColor   = isDark ? 'rgba(152,162,179,0.08)' : 'rgba(102,112,133,0.08)';
  const cursorColor = isDark ? 'rgba(152,162,179,0.12)' : 'rgba(102,112,133,0.12)';
  const line24k = '#00d09c';   // accent green
  const line22k = '#84dcc6';   // lighter teal

  const days  = RANGES.find((r) => r.label === range)?.days ?? 30;
  const delta = city ? getCityMultiplier(city) : 0;

  const chartData = useMemo(() => (
    historicalRates
      .slice(0, days)
      .reverse()
      .map((r) => ({
        date:  r.date,
        label: abbreviateDate(r.date, days),
        '24K': r.price24k + delta,
        '22K': r.price22k + delta,
      }))
  ), [historicalRates, days, delta]);

  const prices24 = chartData.map((d) => d['24K']);
  const prices22 = chartData.map((d) => d['22K']);
  const high     = Math.max(...prices24);
  const low      = Math.min(...prices24);
  const first    = prices24[0]  ?? 0;
  const last     = prices24[prices24.length - 1] ?? 0;
  const chg      = last - first;
  const chgPct   = first ? ((chg / first) * 100).toFixed(2) : '0.00';
  const isUp     = chg >= 0;

  const xTickEvery = days <= 7 ? 1 : days <= 30 ? 5 : days <= 90 ? 15 : 30;

  const yMin = Math.floor(Math.min(...prices24, ...prices22) * 0.995 / 100) * 100;
  const yMax = Math.ceil(Math.max(...prices24, ...prices22) * 1.005 / 100) * 100;

  const yFmt = (v) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(0)}L`;
    if (v >= 1000)   return `₹${(v / 1000).toFixed(0)}K`;
    return `₹${v}`;
  };

  const cityName = city ? CITIES.find((c) => c.slug === city)?.name : null;

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="rounded-lg p-3 shadow-2xl min-w-[148px]"
           style={{ backgroundColor: 'rgb(var(--color-surface-3))', border: '1px solid var(--border-2)' }}>
        <p className="text-2xs text-ink-400 mb-2 font-medium">{label}</p>
        {payload.map((p) => (
          <div key={p.name} className="flex items-center justify-between gap-5 mb-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: p.color }} />
              <span className="text-2xs text-ink-400">{p.name}</span>
            </div>
            <span className="mono text-xs font-semibold text-ink-100">{formatINR(p.value)}/g</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card p-5 sm:p-6">

      {/* Header row: title left, range tabs right */}
      <div className="flex items-center justify-between gap-4 mb-1">
        <p className="text-base font-semibold text-ink-100">
          Gold Price History
          {cityName && (
            <span className="text-ink-400 font-normal ml-2">· {cityName}</span>
          )}
        </p>
        <div className="flex items-center gap-0.5">
          {RANGES.map((r) => (
            <button
              key={r.label}
              onClick={() => setRange(r.label)}
              className={`px-2.5 py-1 rounded-md text-2xs font-semibold transition-all duration-150 ${
                range === r.label
                  ? 'bg-gold-500 text-surface-1'
                  : 'text-ink-400 hover:text-ink-200'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Sub-header: karat toggle left, city right */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {[
            { key: '24K',  label: '24K' },
            { key: '22K',  label: '22K' },
            { key: 'both', label: 'Both' },
          ].map((k) => (
            <button
              key={k.key}
              onClick={() => setKarat(k.key)}
              className={`text-2xs transition-colors ${
                karat === k.key
                  ? 'text-ink-200 font-semibold'
                  : 'text-ink-400 hover:text-ink-200'
              }`}
            >
              {k.label}
            </button>
          ))}
        </div>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="text-2xs text-ink-400 bg-transparent border-none focus:outline-none cursor-pointer hover:text-ink-200 transition-colors"
        >
          <option value="">All India</option>
          {CITIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>
      </div>

      {/* Plain stats — no container, just numbers */}
      <div className="flex items-center gap-6 mb-5 flex-wrap">
        <StatFigure label="HIGH"    value={formatINR(high)} />
        <StatFigure label="LOW"     value={formatINR(low)} />
        <StatFigure label="CHANGE"  value={`${isUp ? '+' : ''}${formatINR(chg)}`} up={isUp} down={!isUp} />
        <StatFigure label="RETURN"  value={`${isUp ? '+' : ''}${chgPct}%`}        up={isUp} down={!isUp} />
      </div>

      {/* Chart — line dominant, fill subtle */}
      <div className="h-60 sm:h-72 -mx-1">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="grad24k" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={line24k} stopOpacity={0.18} />
                <stop offset="100%" stopColor={line24k} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="grad22k" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor={line22k} stopOpacity={0.14} />
                <stop offset="100%" stopColor={line22k} stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="0" stroke={gridColor} vertical={false} />

            <XAxis
              dataKey="label"
              tick={{ fill: tickColor, fontSize: 10, fontFamily: 'DM Mono' }}
              tickLine={false}
              axisLine={false}
              interval={xTickEvery - 1}
              dy={6}
            />
            <YAxis
              domain={[yMin, yMax]}
              tickFormatter={yFmt}
              tick={{ fill: tickColor, fontSize: 10, fontFamily: 'DM Mono' }}
              tickLine={false}
              axisLine={false}
              width={50}
              orientation="right"
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: cursorColor, strokeWidth: 1 }} />

            {(karat === '24K' || karat === 'both') && (
              <Area
                type="monotone" dataKey="24K"
                stroke={line24k} strokeWidth={1.5}
                fill="url(#grad24k)"
                dot={false}
                activeDot={{ r: 3, fill: line24k, strokeWidth: 0 }}
              />
            )}
            {(karat === '22K' || karat === 'both') && (
              <Area
                type="monotone" dataKey="22K"
                stroke={line22k} strokeWidth={1.5}
                fill="url(#grad22k)"
                dot={false}
                activeDot={{ r: 3, fill: line22k, strokeWidth: 0 }}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-5 mt-3 justify-center">
        {(karat === '24K' || karat === 'both') && <LegendItem color={line24k} label="24K" />}
        {(karat === '22K' || karat === 'both') && <LegendItem color={line22k} label="22K" />}
      </div>
    </div>
  );
}

function StatFigure({ label, value, up, down }) {
  const valueCls = up ? 'text-up' : down ? 'text-down' : 'text-ink-100';
  return (
    <div>
      <p className="text-2xs text-ink-400 uppercase tracking-wider mb-0.5">{label}</p>
      <p className={`mono text-sm font-semibold ${valueCls}`}>{value}</p>
    </div>
  );
}

function LegendItem({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-5 h-[1.5px] rounded-full" style={{ background: color }} />
      <span className="text-2xs text-ink-400">{label}</span>
    </div>
  );
}
