import HistoricalTable from '@/components/HistoricalTable';
import AdPlaceholder from '@/components/AdPlaceholder';
import { GoldDatasetSchema } from '@/components/SchemaMarkup';
import { getHistoricalRates } from '@/lib/dummyData';
import { formatDate } from '@/lib/goldUtils';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const revalidate = 86400;

export const metadata = {
  title: 'Gold Rate History in India | Last 30 Days — 22K & 24K',
  description: `Historical gold rates in India for the last 30 days. Compare 22K and 24K gold price trends. Data updated daily from MCX & IBJA.`,
  alternates: { canonical: `${SITE_URL}/gold-rate-history` },
};

const W = 'max-w-[1340px] mx-auto px-4 sm:px-6';

export default function HistoryPage() {
  const rates = getHistoricalRates(30);
  const today = formatDate();

  const high30  = Math.max(...rates.map((r) => r.price24k));
  const low30   = Math.min(...rates.map((r) => r.price24k));
  const change30 = rates[0].price24k - rates[rates.length - 1].price24k;
  const isUp30  = change30 >= 0;

  return (
    <>
      <GoldDatasetSchema
        price24k={rates[0]?.price24k}
        price22k={rates[0]?.price22k}
        date={today}
        siteUrl={`${SITE_URL}/gold-rate-history`}
      />

      {/* ── Hero — white ── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <p className="mono text-2xs text-ink-300 uppercase tracking-widest mb-3">Historical Data</p>
          <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 leading-tight mb-2">
            Gold Rate History in India
          </h1>
          <p className="text-sm text-ink-300 max-w-2xl">
            Track gold price trends over the last 30 days. Compare 22K and 24K rates to make informed decisions.
          </p>
        </div>
      </section>

      {/* ── Summary stats — gray ── */}
      <section className="bg-surface-2 border-b border-surface-4">
        <div className={`${W} py-8`}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <StatCard
              label="Today 24K"
              value={`₹${rates[0]?.price24k?.toLocaleString('en-IN')}/g`}
              sub={rates[0]?.date}
            />
            <StatCard
              label="30-Day High"
              value={`₹${high30.toLocaleString('en-IN')}/g`}
              direction="up"
            />
            <StatCard
              label="30-Day Low"
              value={`₹${low30.toLocaleString('en-IN')}/g`}
              direction="down"
            />
            <StatCard
              label="30-Day Change"
              value={`${isUp30 ? '+' : ''}₹${Math.abs(change30).toLocaleString('en-IN')}`}
              direction={isUp30 ? 'up' : 'down'}
            />
          </div>
        </div>
      </section>

      {/* ── Ad ── */}
      <div className={`${W} pt-6`}>
        <AdPlaceholder id="ad-top" />
      </div>

      {/* ── Table — white ── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <HistoricalTable rates={rates} title="Gold Rate — Last 30 Days" showFull />
        </div>
      </section>

      {/* ── Context note — gray ── */}
      <section className="bg-surface-2 border-b border-surface-4">
        <div className={`${W} py-8`}>
          <div className="card p-5 max-w-2xl">
            <p className="text-xs font-semibold text-ink-200 mb-2">About this data</p>
            <p className="text-sm text-ink-300 leading-relaxed">
              Historical gold rates shown are based on MCX closing prices for standard 999 (24K) and 916 (22K)
              gold in INR per gram. These are reference rates; actual buying/selling prices at jewellers include
              GST (3%), making charges (10–25%), and the jeweller's margin.
            </p>
          </div>
        </div>
      </section>

      <div className={`${W} py-8`}>
        <AdPlaceholder id="ad-bottom" />
      </div>
    </>
  );
}

function StatCard({ label, value, sub, direction }) {
  const valueCls = direction === 'up'
    ? 'text-up'
    : direction === 'down'
    ? 'text-down'
    : 'text-ink-50';

  return (
    <div className="card p-4">
      <p className="text-2xs text-ink-300 uppercase tracking-wider mb-1 font-medium">{label}</p>
      <p className={`text-base font-bold tabular-nums mono ${valueCls}`}>{value}</p>
      {sub && <p className="text-2xs text-ink-300 mt-0.5">{sub}</p>}
    </div>
  );
}
