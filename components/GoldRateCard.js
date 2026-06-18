import { formatINR } from '@/lib/goldUtils';

export default function GoldRateCard({ rateData, city = null, delta = 0 }) {
  const d = delta ?? rateData?.delta ?? 0;

  const p24g      = (rateData?.price24kPerGram || 0) + d;
  const p22g      = (rateData?.price22kPerGram || 0) + d;
  const change    = rateData?.change24kPerGram ?? 0;
  const changePct = rateData?.changePct ?? 0;
  const isUp      = change >= 0;

  const changeColor = isUp ? 'text-up' : 'text-down';
  const changeSign  = isUp ? '+' : '';

  return (
    <div>
      {/* 24K — dominant price. Dark text, heavy weight. No gold, no glow. */}
      <div className="flex items-baseline gap-4 flex-wrap">
        <span className="mono font-bold text-6xl sm:text-7xl text-ink-50 leading-none tabular-nums">
          {formatINR(p24g)}
        </span>
        {change !== 0 && (
          <span className={`mono text-base sm:text-lg font-semibold ${changeColor} leading-none`}>
            {changeSign}{formatINR(change)}&ensp;
            <span className="text-sm opacity-80">
              ({changeSign}{Math.abs(changePct).toFixed(2)}%)
            </span>
          </span>
        )}
      </div>

      <p className="mono text-xs text-ink-300 mt-2">
        24K · per gram
        {city && <span className="text-ink-300 ml-1.5">· {city}</span>}
      </p>

      <p className="mono text-xs text-ink-300 mt-1">
        10g:&ensp;<span className="text-ink-200">{formatINR(p24g * 10)}</span>
        &ensp;·&ensp;100g:&ensp;<span className="text-ink-200">{formatINR(p24g * 100)}</span>
      </p>

      {/* 22K — secondary price */}
      <div className="flex items-baseline gap-3 mt-6">
        <span className="mono font-semibold text-3xl sm:text-4xl text-ink-200 leading-none tabular-nums">
          {formatINR(p22g)}
        </span>
        <div>
          <span className="text-xs text-ink-300">22K per gram</span>
          {change !== 0 && (
            <span className={`block mono text-xs ${changeColor}`}>
              {changeSign}{formatINR(Math.round(change * 0.9167))} today
            </span>
          )}
        </div>
      </div>

      <p className="mono text-2xs text-ink-300 mt-1">
        10g:&ensp;{formatINR(p22g * 10)}
        &ensp;·&ensp;100g:&ensp;{formatINR(p22g * 100)}
      </p>
    </div>
  );
}
