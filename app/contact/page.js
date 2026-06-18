const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  title: 'Contact Us | GoldRatesToday.in',
  description: 'Get in touch with the GoldRatesToday.in team. Report a data error, suggest a feature, or ask a question about gold rates in India.',
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 space-y-6">

      <header>
        <p className="section-title">Get in Touch</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 mb-2">Contact Us</h1>
        <p className="text-sm text-ink-300 leading-relaxed">
          Found a data error? Have a question about gold rates? Want to suggest a city or feature? We'd love to hear from you.
        </p>
      </header>

      {/* Contact card */}
      <div className="card p-5 sm:p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-9 h-9 rounded-lg bg-gold-500/10 flex items-center justify-center flex-shrink-0 text-gold-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-ink-200 mb-0.5">Email</p>
            <a href="mailto:contact@goldratestoday.in" className="text-gold-400 hover:text-gold-300 text-sm transition-colors">
              contact@goldratestoday.in
            </a>
            <p className="text-2xs text-ink-400 mt-1">We typically respond within 24–48 business hours.</p>
          </div>
        </div>
      </div>

      {/* What to write about */}
      <div className="card p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-ink-200 mb-4">What you can write to us about</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '📊', label: 'Data Error', desc: 'If the gold rate shown seems wrong for your city, let us know the correct price and source.' },
            { icon: '🏙️', label: 'City Request', desc: 'Want us to add gold rates for a city not currently listed? Send us a request.' },
            { icon: '🤝', label: 'Partnership', desc: 'Jewellery brand, bullion dealer, or financial platform? Let\'s talk about data partnerships.' },
            { icon: '🐛', label: 'Bug Report', desc: 'Chart not loading, page breaking on mobile, or something looks off? Report it here.' },
            { icon: '💡', label: 'Feature Idea', desc: 'Suggestion for a new feature, comparison tool, or calculator? We\'d love to hear it.' },
            { icon: '📰', label: 'Media / Press', desc: 'Press enquiries, interview requests, or data licensing questions are welcome.' },
          ].map(({ icon, label, desc }) => (
            <div key={label} className="flex gap-3 p-3 rounded-lg" style={{ backgroundColor: 'rgb(var(--color-surface-3))', border: '1px solid var(--border)' }}>
              <span className="text-lg leading-none">{icon}</span>
              <div>
                <p className="text-xs font-semibold text-ink-200 mb-0.5">{label}</p>
                <p className="text-2xs text-ink-400 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ shortcut */}
      <div className="card p-5 flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-ink-200">Looking for quick answers?</p>
          <p className="text-xs text-ink-300 mt-0.5">
            Check our <a href="/#faq" className="text-gold-400 hover:underline">FAQ section</a> on the homepage — we answer the most common questions about gold rates, hallmarking, and jewellery buying.
          </p>
        </div>
      </div>

      {/* Response policy */}
      <div className="text-xs text-ink-400 leading-relaxed">
        <p>
          We are a small team and aim to respond to all genuine enquiries. Spam, promotional solicitations, and SEO link-building requests are ignored. Our email is not monitored on weekends or Indian public holidays; expect a slightly longer response during those periods.
        </p>
      </div>
    </div>
  );
}
