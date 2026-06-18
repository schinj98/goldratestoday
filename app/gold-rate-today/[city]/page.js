import { notFound } from 'next/navigation';
import Link from 'next/link';
import LiveGoldRate from '@/components/LiveGoldRate';
import PriceChart from '@/components/PriceChart';
import HistoricalTable from '@/components/HistoricalTable';
import FAQSection from '@/components/FAQSection';
import Breadcrumb from '@/components/Breadcrumb';
import AdPlaceholder from '@/components/AdPlaceholder';
import { BreadcrumbSchema, GoldDatasetSchema } from '@/components/SchemaMarkup';
import { CITIES, getCityBySlug } from '@/lib/cities';
import { getHistoricalRates } from '@/lib/dummyData';
import { formatDate, getCityMultiplier, formatINR } from '@/lib/goldUtils';
import { getGoldRateData } from '@/lib/fetchGoldRate';
import { getCityContent } from '@/lib/cityContent';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

// NCR cities for comparison table
const NCR_CITIES = ['delhi', 'gurgaon', 'noida', 'faridabad'];

export const revalidate = 60;

export async function generateStaticParams() {
  return CITIES.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({ params }) {
  const cityData = getCityBySlug(params.city);
  if (!cityData) return {};

  const cityContent = getCityContent(params.city);
  const today = formatDate();

  const title = cityContent.metaTitle
    || `Gold Rate Today in ${cityData.name} | Live 22K & 24K Price — ${today}`;
  const description = cityContent.metaDescription
    || `Live gold rate in ${cityData.name} today: 22K ₹/gram & 24K ₹/gram. Updated every 60s from MCX. Historical 30-day chart, buying guide, and FAQ for ${cityData.name}, ${cityData.state}.`;
  const canonicalUrl = `${SITE_URL}/gold-rate-today-${cityData.slug}`;

  return {
    title,
    description,
    keywords: [
      `gold rate today ${cityData.name.toLowerCase()}`,
      `gold price ${cityData.name.toLowerCase()} today`,
      `22k gold rate ${cityData.name.toLowerCase()}`,
      `24k gold rate ${cityData.name.toLowerCase()}`,
      ...(cityContent.altName ? [
        `gold rate today ${cityContent.altName.toLowerCase()}`,
        `gold price ${cityContent.altName.toLowerCase()}`,
      ] : []),
    ],
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'article',
    },
  };
}

export default async function CityPage({ params }) {
  const cityData = getCityBySlug(params.city);
  if (!cityData) notFound();

  const cityContent = getCityContent(params.city);
  const baseRate    = await getGoldRateData();
  const delta       = getCityMultiplier(cityData.slug);

  const baseHistoricalRates = getHistoricalRates(180);
  const adjustedHistoricalRates = baseHistoricalRates.map((r) => ({
    ...r,
    price24k: r.price24k + delta,
    price22k: r.price22k + delta,
  }));

  const today   = formatDate();
  const weekday = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', timeZone: 'Asia/Kolkata',
  });

  const displayName = cityContent.altName
    ? `${cityData.name} (${cityContent.altName})`
    : cityData.name;

  const breadcrumbs = [
    { label: 'Home',              href: '/' },
    { label: 'Gold Rate by City', href: '/' },
    { label: cityData.name },
  ];

  // NCR comparison data (only shown for Gurgaon and NCR cities)
  const ncrData = cityContent.ncrComparison
    ? NCR_CITIES.map((slug) => {
        const city = getCityBySlug(slug);
        const d    = getCityMultiplier(slug);
        return {
          slug,
          name:    city?.name ?? slug,
          price24k: (baseRate.price24kPerGram || 0) + d,
          price22k: (baseRate.price22kPerGram || 0) + d,
          diff:    d - delta,
        };
      })
    : [];

  return (
    <>
      <BreadcrumbSchema items={breadcrumbs} siteUrl={SITE_URL} />
      <GoldDatasetSchema
        city={cityData.name}
        price24k={(baseRate.price24kPerGram || 0) + delta}
        price22k={(baseRate.price22kPerGram || 0) + delta}
        date={today}
        siteUrl={`${SITE_URL}/gold-rate-today-${cityData.slug}`}
      />

      <div className="max-w-[1340px] mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">

        {/* ── Hero ─────────────────────────────── */}
        <section>
          <Breadcrumb items={breadcrumbs} />

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 mt-4 mb-6">
            <div>
              <p className="text-2xs text-ink-400 uppercase tracking-widest font-semibold mb-1">
                {weekday} · {today} · {cityData.state}
              </p>
              <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 leading-tight">
                Gold Rate Today in{' '}
                <span className="text-gold-400">{displayName}</span>
              </h1>
              <p className="text-sm text-ink-300 mt-1">
                Live 22K &amp; 24K gold price per gram · Updated every 60s during MCX hours
              </p>
            </div>
          </div>

          <AdPlaceholder id="ad-top" className="mb-6" />
          <LiveGoldRate initialData={baseRate} city={cityData.name} delta={delta} />
        </section>

        {/* ── Chart ────────────────────────────── */}
        <PriceChart historicalRates={baseHistoricalRates} initialCity={cityData.slug} />

        <AdPlaceholder id="ad-middle" />

        {/* ── NCR Comparison (Gurgaon only) ────── */}
        {cityContent.ncrComparison && ncrData.length > 0 && (
          <section>
            <p className="section-title">NCR Gold Rate Comparison</p>
            <div className="card overflow-hidden">
              <div className="grid grid-cols-12 gap-2 px-4 py-2.5 border-b" style={{ borderColor: 'var(--border)', backgroundColor: 'rgb(var(--color-surface-3) / 0.4)' }}>
                <span className="col-span-4 text-2xs font-semibold uppercase tracking-widest text-ink-300">City</span>
                <span className="col-span-3 text-2xs font-semibold uppercase tracking-widest text-ink-300 text-right">24K / gram</span>
                <span className="col-span-3 text-2xs font-semibold uppercase tracking-widest text-ink-300 text-right hidden sm:block">22K / gram</span>
                <span className="col-span-2 text-2xs font-semibold uppercase tracking-widest text-ink-300 text-right">vs here</span>
              </div>
              <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
                {ncrData.map((row) => {
                  const isCurrent = row.slug === cityData.slug;
                  return (
                    <div
                      key={row.slug}
                      className={`grid grid-cols-12 gap-2 px-4 py-3 transition-colors ${isCurrent ? 'bg-gold-500/[0.04]' : 'hover:bg-white/[0.02]'}`}
                    >
                      <div className="col-span-4 flex items-center gap-2">
                        {isCurrent ? (
                          <span className="text-sm font-semibold text-gold-400">{row.name}</span>
                        ) : (
                          <Link href={`/gold-rate-today-${row.slug}`} className="text-sm text-ink-200 hover:text-gold-400 transition-colors">
                            {row.name}
                          </Link>
                        )}
                        {isCurrent && (
                          <span className="text-2xs mono font-semibold text-gold-500 bg-gold-500/10 px-1.5 py-0.5 rounded">You</span>
                        )}
                      </div>
                      <div className="col-span-3 text-right mono text-sm font-semibold text-ink-100">{formatINR(row.price24k)}</div>
                      <div className="col-span-3 text-right mono text-sm text-ink-300 hidden sm:block">{formatINR(row.price22k)}</div>
                      <div className={`col-span-2 text-right mono text-xs font-semibold ${
                        isCurrent ? 'text-ink-400' : row.diff < 0 ? 'text-up' : 'text-down'
                      }`}>
                        {isCurrent ? '—' : row.diff < 0 ? `−${formatINR(Math.abs(row.diff))}` : `+${formatINR(row.diff)}`}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="px-4 py-2.5 border-t" style={{ borderColor: 'var(--border)', backgroundColor: 'rgb(var(--color-surface-3) / 0.3)' }}>
                <p className="text-2xs text-ink-400">Comparison based on today's MCX spot + city-specific IBJA differentials. GST excluded.</p>
              </div>
            </div>
          </section>
        )}

        {/* ── Historical table ─────────────────── */}
        <HistoricalTable
          rates={adjustedHistoricalRates.slice(0, 30)}
          title={`Historical Gold Rate in ${cityData.name} — Last 30 Days`}
          showFull
        />

        {/* ── City content sections ─────────────── */}
        {cityContent.sections.length > 0 && (
          <section className="space-y-4">
            <p className="section-title">Gold Market Guide — {cityData.name}</p>
            {cityContent.sections.map((sec) => (
              <div key={sec.heading} className="card p-5 sm:p-6">
                <h2 className="text-base font-semibold text-ink-100 mb-3">{sec.heading}</h2>
                <div className="space-y-2 text-sm text-ink-300 leading-relaxed">
                  {sec.content.split('\n\n').map((para, i) => {
                    if (para.startsWith('**') && para.endsWith('**')) {
                      return <p key={i} className="font-semibold text-ink-200">{para.replace(/\*\*/g, '')}</p>;
                    }
                    if (para.includes('**')) {
                      return (
                        <p key={i} dangerouslySetInnerHTML={{
                          __html: para.replace(/\*\*([^*]+)\*\*/g, '<strong class="text-ink-200">$1</strong>'),
                        }} />
                      );
                    }
                    return <p key={i}>{para}</p>;
                  })}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── Generic city info (if no custom sections) ── */}
        {cityContent.sections.length === 0 && (
          <CityInfoBox city={cityData} />
        )}

        {/* ── FAQ ───────────────────────────────── */}
        <FAQSection faqs={cityContent.faqs} />

        {/* ── Internal links to nearby cities ───── */}
        <NearbyCities currentSlug={cityData.slug} ncrComparison={cityContent.ncrComparison} />

        <AdPlaceholder id="ad-bottom" />
      </div>
    </>
  );
}

function CityInfoBox({ city }) {
  return (
    <section>
      <p className="section-title">About Gold Rates in {city.name}</p>
      <div className="card p-5 sm:p-6 space-y-3 text-sm text-ink-300 leading-relaxed">
        <p>
          Gold rates in <strong className="text-ink-200">{city.name}</strong> track the MCX (Multi Commodity Exchange)
          spot price with a small local premium reflecting transportation from bullion markets, state levies,
          and dealer margins. {city.name} is supplied from the nearest bullion hub — typically Mumbai or Delhi.
        </p>
        <p>
          The IBJA (India Bullion and Jewellers Association) publishes {city.name}&apos;s benchmark twice daily.
          Most jewellers use this as their base, adding making charges of ₹300–₹800/gram plus 3% GST.
          Always insist on a BIS Hallmark (916 for 22K, 999 for 24K) and a proper invoice.
        </p>
        <p className="text-2xs text-ink-400 border-t pt-3" style={{ borderColor: 'var(--border)' }}>
          Disclaimer: Rates shown are indicative. Actual transaction prices in {city.name} may differ.
          Verify with a local IBJA-certified jeweller.
        </p>
      </div>
    </section>
  );
}

function NearbyCities({ currentSlug, ncrComparison }) {
  const others = CITIES
    .filter((c) => c.slug !== currentSlug)
    .slice(0, ncrComparison ? 6 : 8);

  return (
    <section>
      <p className="section-title">Gold Rate in Other Cities</p>
      <div className="flex flex-wrap gap-2">
        {others.map((city) => (
          <Link
            key={city.slug}
            href={`/gold-rate-today-${city.slug}`}
            className="px-3 py-1.5 text-xs text-ink-300 hover:text-gold-400 rounded-lg transition-colors"
            style={{ backgroundColor: 'rgb(var(--color-surface-3))', border: '1px solid var(--border)' }}
          >
            Gold Rate {city.name}
          </Link>
        ))}
      </div>
    </section>
  );
}
