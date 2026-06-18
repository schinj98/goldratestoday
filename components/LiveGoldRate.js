'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import GoldRateCard from './GoldRateCard';
import { getMarketStatus, getRefreshIntervalMs, formatCountdown } from '@/lib/marketHours';

export default function LiveGoldRate({ initialData, city = null, delta = 0 }) {
  const [rateData,  setRateData]  = useState(initialData);
  const [status,    setStatus]    = useState(() => getMarketStatus());
  const [countdown, setCountdown] = useState(null);
  const [fetching,  setFetching]  = useState(false);
  const [lastTick,  setLastTick]  = useState(0);
  const timerRef = useRef(null);
  const countRef = useRef(null);

  const fetchRate = useCallback(async (silent = false) => {
    if (!silent) setFetching(true);
    try {
      const res = await fetch('/api/goldrate', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        setRateData(data);
        setLastTick(0);
      }
    } catch {}
    if (!silent) setFetching(false);
  }, []);

  useEffect(() => {
    function tick() {
      const s = getMarketStatus();
      setStatus(s);
      setCountdown(s.isOpen ? null : formatCountdown(s.nextOpenMs));
    }
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    countRef.current = setInterval(() => setLastTick((t) => t + 1), 1000);
    return () => clearInterval(countRef.current);
  }, []);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => fetchRate(true), getRefreshIntervalMs(status.isOpen));
    return () => clearInterval(timerRef.current);
  }, [status.isOpen, fetchRate]);

  const statusMap = {
    Live:          { dot: 'bg-up animate-pulse-dot', label: 'MCX Live',     textCls: 'text-up'         },
    'Pre-Market':  { dot: 'bg-yellow-400',           label: 'Pre-Market',  textCls: 'text-yellow-400' },
    'After Hours': { dot: 'bg-orange-400',           label: 'After Hours', textCls: 'text-orange-400' },
    Weekend:       { dot: 'bg-ink-400',              label: 'Closed',      textCls: 'text-ink-400'    },
  };
  const s = statusMap[status.label] ?? statusMap.Weekend;

  const ageLabel = lastTick < 10  ? 'just now'
    : lastTick < 60  ? `${lastTick}s ago`
    : lastTick < 3600 ? `${Math.floor(lastTick / 60)}m ago`
    : 'stale';

  return (
    <div>
      <GoldRateCard rateData={rateData} city={city} delta={delta} />

      {/* Status line — beneath the prices, not above */}
      <div className="flex items-center gap-2.5 mt-5 text-2xs text-ink-400">
        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}`} />
        <span className={`font-semibold ${s.textCls}`}>{s.label}</span>
        <span className="text-ink-400">·</span>
        <span>
          {status.isOpen
            ? `Updated ${ageLabel} · refreshes every 60s`
            : countdown ? `Opens in ${countdown}` : 'Mon–Fri 9AM–11:30PM IST'}
        </span>
        <span className="text-ink-400">·</span>
        <button
          onClick={() => fetchRate(false)}
          disabled={fetching}
          className="flex items-center gap-1 hover:text-ink-300 transition-colors disabled:opacity-40"
        >
          <svg className={`w-3 h-3 ${fetching ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {fetching ? 'Fetching…' : 'Refresh'}
        </button>
      </div>

      <p className="text-2xs text-ink-400 mt-2">
        Indicative · Excl. 3% GST &amp; making charges · GoldAPI.io + IBJA
      </p>
    </div>
  );
}
