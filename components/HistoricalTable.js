import Link from 'next/link';
import { formatINR } from '@/lib/goldUtils';

// Full day abbreviation for the date column
function formatFullDate(dateStr) {
  // dateStr: "17 Jun 2026"
  const [day, mon, year] = dateStr.split(' ');
  if (!day || !mon) return dateStr;
  const d = new Date(`${mon} ${day}, ${year}`);
  const weekday = d.toLocaleDateString('en-IN', { weekday: 'short' });
  return `${weekday} ${day} ${mon}`;
}

export default function HistoricalTable({ rates, title = 'Historical Gold Rates', showFull = false }) {
  const rows = showFull ? rates : rates.slice(0, 7);

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-ink-200">{title}</h2>
        {!showFull && (
          <Link
            href="/gold-rate-history"
            className="text-2xs text-ink-400 hover:text-ink-200 transition-colors flex items-center gap-1"
          >
            30-day history
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ backgroundColor: 'rgb(var(--color-surface-3) / 0.5)', borderBottom: '1px solid var(--border)' }}>
              <th className="text-left px-4 py-2 text-2xs font-semibold uppercase tracking-widest text-ink-300 w-[36%]">Date</th>
              <th className="text-right px-4 py-2 text-2xs font-semibold uppercase tracking-widest text-ink-300">22K</th>
              <th className="text-right px-4 py-2 text-2xs font-semibold uppercase tracking-widest text-ink-300">24K</th>
              <th className="text-right px-4 py-2 text-2xs font-semibold uppercase tracking-widest text-ink-300">Δ</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const up = (row.change24k ?? 0) > 0;
              const dn = (row.change24k ?? 0) < 0;
              const isToday = i === 0;

              return (
                <tr
                  key={row.date}
                  className={isToday ? '' : 'hover:bg-white/[0.01] transition-colors'}
                  style={i < rows.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}
                >
                  <td className="px-4 py-2 relative">
                    {/* Today: gold left border accent, no badge */}
                    {isToday && (
                      <span className="absolute left-0 top-0 bottom-0 w-0.5 bg-gold-500 rounded-r" />
                    )}
                    <span className={`mono text-sm ${isToday ? 'text-gold-400 font-semibold' : 'text-ink-300'}`}>
                      {formatFullDate(row.date)}
                    </span>
                  </td>
                  <td className="px-4 py-2 text-right mono text-sm text-ink-300">
                    {formatINR(row.price22k)}
                  </td>
                  <td className={`px-4 py-2 text-right mono text-sm font-semibold ${isToday ? 'text-gold-400' : 'text-ink-100'}`}>
                    {formatINR(row.price24k)}
                  </td>
                  <td className="px-4 py-2 text-right">
                    {/* Colored dot instead of ▲/▼ triangle */}
                    <span
                      className={`inline-block w-1.5 h-1.5 rounded-full ${
                        up ? 'bg-up' : dn ? 'bg-down' : 'bg-ink-400'
                      }`}
                      title={row.change24k !== 0 ? `${up ? '+' : ''}${formatINR(row.change24k ?? 0)}` : 'unchanged'}
                    />
                    {row.change24k !== 0 && (
                      <span className={`mono text-2xs ml-1.5 ${up ? 'text-up' : dn ? 'text-down' : 'text-ink-400'}`}>
                        {up ? '+' : ''}{formatINR(row.change24k ?? 0)}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
