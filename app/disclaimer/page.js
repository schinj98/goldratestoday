const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  title: 'Disclaimer | GoldRatesToday.in',
  description: 'Financial and data disclaimer for GoldRatesToday.in. Gold rates shown are indicative and for reference only. Not financial advice.',
  alternates: { canonical: `${SITE_URL}/disclaimer` },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">

      <header>
        <p className="section-title">Legal</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 mb-2">Disclaimer</h1>
        <p className="text-xs text-ink-400">Effective: 17 June 2026</p>
      </header>

      <div className="border border-down/30 bg-down/5 rounded-xl p-4 text-sm text-ink-300 leading-relaxed">
        <strong className="text-ink-100">Important:</strong> The information on GoldRatesToday.in is provided for general reference and informational purposes only. It does not constitute financial advice, investment advice, or a solicitation to buy or sell gold.
      </div>

      {[
        {
          title: 'Indicative Rates Only',
          body: `All gold rates displayed on GoldRatesToday.in are indicative market reference rates derived from international spot prices (XAU/INR) sourced from GoldAPI.io, adjusted for India's import duty (15% comprising 12.5% Basic Customs Duty and 2.5% AIDC). These rates are NOT the actual buying or selling prices offered by any specific jeweller, bank, or gold dealer.

The actual price you pay when buying gold jewellery in India will include:
• 3% Goods and Services Tax (GST) on the gold value
• Making charges (typically ₹300–₹800 per gram depending on design complexity)
• Dealer margin and retail overheads
• Local city premiums based on supply chain costs

These additions can add 15–30% to the base rate shown on this website. Always ask for a detailed invoice that breaks down each component.`,
        },
        {
          title: 'Not Financial or Investment Advice',
          body: `Nothing on this website should be construed as financial advice or a recommendation to buy, sell, hold, or invest in gold or any gold-related financial instrument. We are a data publisher, not a financial advisor, broker, or investment firm.

Gold prices are volatile. Past price trends shown in our historical charts are not predictive of future performance. Anyone considering a significant investment in physical gold, Sovereign Gold Bonds, Gold ETFs, or gold futures should consult a SEBI-registered investment advisor before making a decision.`,
        },
        {
          title: 'Data Accuracy',
          body: `While we make every reasonable effort to ensure the gold rates displayed are accurate and timely:

• We cannot guarantee that prices are current at all times. Our data refreshes every 60 seconds during MCX hours, but system latency, API downtime, or connectivity issues may cause temporary delays.
• Prices shown during MCX non-trading hours (after 11:30 PM IST and before 9:00 AM IST, or on weekends) reflect the last available closing price and are NOT live.
• City-specific adjustments are estimates based on published IBJA differentials and may not reflect intra-day dealer fluctuations.
• IBJA benchmark data is scraped from publicly available sources and may be subject to parsing errors.`,
        },
        {
          title: 'Third-Party Data Sources',
          body: `GoldRatesToday.in sources price data from GoldAPI.io and the India Bullion and Jewellers Association (IBJA). We are not affiliated with, endorsed by, or responsible for the accuracy of data provided by these third parties. Any discrepancy between our displayed rates and IBJA's official rate should be verified directly at ibja.co.`,
        },
        {
          title: 'Limitation of Liability',
          body: `GoldRatesToday.in, its owners, developers, and content contributors shall not be held liable for any direct, indirect, incidental, special, or consequential damages arising from:

• Reliance on any gold rate information displayed on this website
• Decisions to purchase, sell, or invest in gold based on rates shown here
• Any financial loss incurred due to price differences between our displayed rates and actual market transaction prices
• Technical errors, data feed outages, or delayed price updates

By using this website, you agree to use the information solely for personal reference and to independently verify all prices before making any transaction.`,
        },
        {
          title: 'BIS Hallmarking Advisory',
          body: `When buying gold jewellery in India, always insist on BIS Hallmarking as mandated by the Bureau of Indian Standards. The Hallmark quality mark guarantees the gold purity:

• 24K (999 fineness) — 99.9% pure gold
• 22K (916 fineness) — 91.6% pure gold (standard for most jewellery)
• 18K (750 fineness) — 75% pure gold

Do not purchase gold jewellery from shops that cannot produce BIS-hallmarked pieces. GoldRatesToday.in is not responsible for any fraud, adulteration, or misrepresentation by jewellers.`,
        },
      ].map(({ title, body }) => (
        <section key={title} className="card p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-ink-200 mb-3">{title}</h2>
          <div className="space-y-2">
            {body.split('\n\n').map((para, i) => (
              <p key={i} className="text-sm text-ink-300 leading-relaxed whitespace-pre-line">{para}</p>
            ))}
          </div>
        </section>
      ))}

    </div>
  );
}
