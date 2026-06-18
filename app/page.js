import LiveGoldRate from '@/components/LiveGoldRate';
import PriceChart from '@/components/PriceChart';
import CityRatesGrid from '@/components/CityRatesGrid';
import HistoricalTable from '@/components/HistoricalTable';
import FAQSection from '@/components/FAQSection';
import AdPlaceholder from '@/components/AdPlaceholder';
import { FAQSchema, GoldDatasetSchema } from '@/components/SchemaMarkup';
import { getHistoricalRates, FAQ_DATA } from '@/lib/dummyData';
import { formatDate } from '@/lib/goldUtils';
import { getGoldRateData } from '@/lib/fetchGoldRate';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const revalidate = 60;

export const metadata = {
  title: 'Gold Rate Today in India | Live 22K & 24K Price per Gram',
  description: `Today's gold rate in India: live 22K & 24K gold price per gram, 10g and 100g. MCX reference rates for Delhi, Mumbai, Bangalore and 15 cities. Updated ${formatDate()}.`,
  alternates: { canonical: SITE_URL },
};

const W = 'max-w-[1340px] mx-auto px-4 sm:px-6';

export default async function HomePage() {
  const rateData        = await getGoldRateData();
  const historicalRates = getHistoricalRates(180);
  const today           = formatDate();

  const weekday = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', timeZone: 'Asia/Kolkata',
  });

  return (
    <>
      <FAQSchema faqs={FAQ_DATA} />
      <GoldDatasetSchema
        price24k={rateData.price24kPerGram}
        price22k={rateData.price22kPerGram}
        date={today}
        siteUrl={SITE_URL}
      />

      {/* ── Hero — white ───────────────────────────────── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-14`}>
          <p className="mono text-2xs text-ink-300 uppercase tracking-widest mb-3">
            {weekday} · {today}
          </p>
          <h1 className="text-xl font-semibold text-ink-200 mb-8 leading-snug">
            Gold Rate Today in India
          </h1>
          <LiveGoldRate initialData={rateData} />
        </div>
      </section>

      {/* ── Chart — white ──────────────────────────────── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <PriceChart historicalRates={historicalRates} />
        </div>
      </section>

      <div className={`${W} py-4`}>
        <AdPlaceholder id="ad-post-chart" />
      </div>

      {/* ── City Rates — white ─────────────────────────── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <CityRatesGrid rateData={rateData} />
        </div>
      </section>

      {/* ── Historical — gray ──────────────────────────── */}
      <section className="bg-surface-2 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <HistoricalTable rates={historicalRates} title="Gold Rate — Last 7 Days" />
        </div>
      </section>

      {/* ── Editorial — white ──────────────────────────── */}
      <section className="bg-surface-1 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <WhyGoldChanges rate24k={rateData.price24kPerGram} />
        </div>
      </section>

      {/* ── FAQ — gray ─────────────────────────────────── */}
      <section className="bg-surface-2 border-b border-surface-4">
        <div className={`${W} py-10 sm:py-12`}>
          <FAQSection faqs={FAQ_DATA} />
        </div>
      </section>

      <div className={`${W} py-8`}>
        <AdPlaceholder id="ad-bottom" />
      </div>
    </>
  );
}

function WhyGoldChanges({ rate24k = 15169 }) {
  const spotOz   = Math.round((rate24k / 1.15) / 85 * 31.1);
  const usdInr   = 85;
  const perGram  = Math.round(spotOz / 31.1 * usdInr);
  const withDuty = Math.round(perGram * 1.15);

  return (
    <section>
      <h2 className="text-sm font-semibold text-ink-200 mb-5">
        Why Does the Gold Price Change Every Day?
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Editorial prose — 2/3 width */}
        <div className="lg:col-span-2 space-y-5 text-sm text-ink-300 leading-7">
          <p>
            Gold prices in India are driven by four overlapping forces. Understanding them explains
            why the rate you see today differs from last Tuesday — and why Chandigarh is higher than Chennai.
          </p>

          {[
            {
              title: 'USD / INR Exchange Rate',
              body: 'Gold is priced globally in US dollars. The rupee-denominated price swings with every currency move, regardless of what gold itself is doing. A 1% depreciation in the rupee adds approximately ₹150 per gram at current levels — larger than most intraday MCX movements.',
            },
            {
              title: 'Import Duty — 15%',
              body: 'India taxes gold imports at 12.5% Basic Customs Duty plus 2.5% AIDC, totalling 15%. This duty wedge permanently separates Indian prices from international spot. A policy change causes an immediate step-change in every jeweller\'s rate board across the country.',
            },
            {
              title: 'MCX Futures & IBJA Benchmarks',
              body: 'The Multi Commodity Exchange (MCX) runs from 9 AM to 11:30 PM IST. The India Bullion and Jewellers Association (IBJA) publishes benchmark rates at 11:30 AM and 4:00 PM. Most jewellers base their daily rate on the IBJA AM rate.',
            },
            {
              title: 'Local Demand & City Premiums',
              body: 'Wedding seasons (October–February) and auspicious days like Dhanteras spike retail demand 2–5×. Cities far from bullion hubs — Chandigarh, Lucknow, Jaipur — pay a transport premium. Coastal cities near import ports pay slightly less.',
            },
          ].map(({ title, body }) => (
            <div key={title}>
              <h3 className="text-xs font-semibold text-ink-200 uppercase tracking-wider mb-1">{title}</h3>
              <p>{body}</p>
            </div>
          ))}
        </div>

        {/* Price build callout — 1/3 width */}
        <div className="lg:col-span-1">
          <div className="card p-5 sticky top-20">
            <p className="text-2xs font-semibold uppercase tracking-widest text-ink-300 mb-4">
              How today's price is built
            </p>
            <div className="space-y-3 mono text-sm">
              <CalcRow label="COMEX spot"            value={`~$${spotOz}/oz`} />
              <CalcRow label="÷ 31.1 g/troy oz"      value={`$${Math.round(spotOz/31.1)}/g`} />
              <CalcRow label={`× ₹${usdInr} (USD/INR)`} value={`₹${perGram.toLocaleString('en-IN')}/g`} />
              <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                <CalcRow label="× 1.15 (import duty)" value={`₹${withDuty.toLocaleString('en-IN')}/g`} highlight />
              </div>
            </div>
            <p className="text-2xs text-ink-300 mt-4 leading-relaxed">
              Illustrative. Actual MCX rates may differ by 0.1–0.3%.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CalcRow({ label, value, highlight }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className={`text-2xs ${highlight ? 'text-ink-200' : 'text-ink-300'}`}>{label}</span>
      <span className={`font-semibold text-xs tabular-nums ${highlight ? 'text-[#00d09c]' : 'text-ink-200'}`}>{value}</span>
    </div>
  );
}
