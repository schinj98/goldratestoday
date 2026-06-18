const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  title: 'About GoldRatesToday.in | Live Gold Rate Tracker for India',
  description: 'Learn about GoldRatesToday.in — India\'s dedicated gold rate tracker. We provide live 22K and 24K gold prices for 15 cities, updated every minute from MCX and IBJA sources.',
  alternates: { canonical: `${SITE_URL}/about` },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-8">

      <header>
        <p className="section-title">About Us</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 mb-3">
          About <span className="text-gold-400">GoldRatesToday.in</span>
        </h1>
        <p className="text-ink-300 leading-relaxed">
          India's most up-to-date gold rate tracker — built for buyers, investors, and jewellers who need accurate prices without the noise.
        </p>
      </header>

      <Section title="Our Mission">
        <p>
          Gold is not just a commodity in India — it is woven into weddings, festivals, savings, and generational wealth. Yet accurate, real-time gold pricing has historically been locked behind dealer quotes, SMS alerts, or slow-loading newspaper pages.
        </p>
        <p>
          GoldRatesToday.in was built to change that. Our goal is simple: give every Indian a fast, trustworthy, and free way to check 22K and 24K gold rates for their city before they walk into any jewellery shop.
        </p>
      </Section>

      <Section title="What We Track">
        <ul className="space-y-3">
          {[
            ['Live MCX Rate', 'We pull the spot price of gold (XAU/INR) from GoldAPI.io, which aggregates MCX tick data. Prices refresh every 60 seconds during MCX trading hours (Monday–Friday, 9:00 AM – 11:30 PM IST).'],
            ['Import Duty Adjustment', 'India levies a 12.5% Basic Customs Duty and 2.5% Agriculture Infrastructure Development Cess (AIDC) on gold imports — a total of 15% on top of the international spot price. We apply this automatically so the rate you see reflects what Indian bullion markets actually trade at.'],
            ['IBJA Benchmark', 'The India Bullion and Jewellers Association (IBJA) publishes AM and PM benchmark rates twice daily. Our API cross-checks against the IBJA figure so you always see a locally grounded price.'],
            ['City-specific Premiums', 'Gold prices vary slightly across Indian cities due to transport logistics, local state levies, and dealer margins. We apply per-city adjustments based on established IBJA differentials for 15 major cities.'],
            ['Historical Data', 'Up to 180 days of historical 22K and 24K price data, visualised as an interactive AreaChart with 7D, 1M, 3M, and 6M filters.'],
          ].map(([title, body]) => (
            <li key={title} className="flex gap-3">
              <span className="w-1.5 h-1.5 mt-2 flex-shrink-0 rounded-full bg-gold-500" />
              <span><strong className="text-ink-200">{title}:</strong>{' '}
                <span className="text-ink-300">{body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="The 15 Cities We Cover">
        <p>
          We currently provide live and historical gold rates for: Delhi, Mumbai, Bangalore, Chennai, Hyderabad, Kolkata, Pune, Ahmedabad, Jaipur, Lucknow, Chandigarh, Surat, Gurgaon (Gurugram), Noida, and Faridabad.
        </p>
        <p>
          Each city page includes a real-time price card, a city-specific price chart, a 30-day historical rate table, and buying advice tailored to that local bullion market.
        </p>
      </Section>

      <Section title="Who We Are">
        <p>
          GoldRatesToday.in is an independent financial data website based in India. We are not affiliated with any jewellery brand, bank, or gold trading platform. Our revenue comes from display advertising (Google AdSense), which keeps the service free for users.
        </p>
        <p>
          We are a small team passionate about making financial data accessible. If you spot an error, have a data suggestion, or just want to say hello, please reach out via our <a href="/contact" className="text-gold-400 hover:text-gold-300 underline underline-offset-2">Contact page</a>.
        </p>
      </Section>

      <Section title="Data Accuracy & Disclaimer">
        <p>
          All rates on GoldRatesToday.in are <strong className="text-ink-200">indicative</strong>. The actual price you pay at a jeweller will differ due to:
        </p>
        <ul className="space-y-1 mt-2">
          {['3% GST on the gold value', 'Making charges (₹300–₹800/gram depending on design)', 'Dealer margin and shop overhead', 'Local demand-supply on the day of purchase'].map((item) => (
            <li key={item} className="flex gap-2 text-ink-300">
              <span className="text-gold-600">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          Always ask your jeweller for a proper invoice showing the gold rate, making charges, and GST separately. Insist on <strong className="text-ink-200">BIS Hallmarking</strong> (916 stamp for 22K, 999 for 24K) to verify purity.
        </p>
        <p>
          We update prices as frequently as possible but cannot guarantee zero latency. Do not use this data alone to make large financial decisions. For investment or bulk purchases, verify directly with IBJA or a certified bullion dealer.
        </p>
      </Section>

      <div className="card p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-ink-200">Have a question or feedback?</p>
          <p className="text-xs text-ink-300 mt-0.5">We typically respond within 24 hours.</p>
        </div>
        <a href="/contact" className="btn-gold text-center whitespace-nowrap">Contact Us</a>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="card p-5 sm:p-6 space-y-3 text-sm text-ink-300 leading-relaxed">
      <h2 className="text-base font-semibold text-ink-100 mb-3">{title}</h2>
      {children}
    </section>
  );
}
