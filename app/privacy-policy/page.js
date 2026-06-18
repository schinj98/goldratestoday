const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  title: 'Privacy Policy | GoldRatesToday.in',
  description: 'Privacy Policy for GoldRatesToday.in. Learn how we collect, use, and protect your data when you use our gold rate tracking service.',
  alternates: { canonical: `${SITE_URL}/privacy-policy` },
};

const LAST_UPDATED = '17 June 2026';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">

      <header>
        <p className="section-title">Legal</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 mb-2">Privacy Policy</h1>
        <p className="text-xs text-ink-400">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="card p-5 text-sm text-ink-300 leading-relaxed">
        <p>
          This Privacy Policy describes how <strong className="text-ink-200">GoldRatesToday.in</strong> ("we", "us", or "our") collects, uses, and shares information when you visit our website at goldratestoday.in (the "Service"). By using the Service, you agree to the collection and use of information in accordance with this policy.
        </p>
      </div>

      <PolicySection title="1. Information We Collect">
        <p><strong className="text-ink-200">Automatically Collected Data:</strong> When you visit GoldRatesToday.in, our servers and third-party analytics providers automatically collect:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>IP address (anonymised to the last octet for analytics)</li>
          <li>Browser type and version</li>
          <li>Operating system</li>
          <li>Pages visited and time spent on each page</li>
          <li>Referring website URL</li>
          <li>Date and time of access</li>
        </ul>
        <p className="mt-3"><strong className="text-ink-200">Cookies:</strong> We use session cookies and persistent cookies for the following purposes:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li><em>Functional cookies</em> — store your preferred theme (dark/light mode) and city selection.</li>
          <li><em>Analytics cookies</em> — Google Analytics 4 (GA4) uses cookies to understand site usage patterns. These cookies collect anonymised data about how visitors use the site.</li>
          <li><em>Advertising cookies</em> — Google AdSense places cookies to serve personalised or contextual advertisements based on your browsing activity. You can opt out at <a href="https://adssettings.google.com" className="text-gold-400 hover:underline" rel="noopener noreferrer" target="_blank">adssettings.google.com</a>.</li>
        </ul>
        <p className="mt-3">We do not collect your name, email address, phone number, or any other personally identifiable information unless you voluntarily submit it via our contact form.</p>
      </PolicySection>

      <PolicySection title="2. How We Use Your Information">
        <p>We use automatically collected data to:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Monitor website performance and uptime</li>
          <li>Understand which content is most useful to our readers</li>
          <li>Detect and prevent spam, abuse, or security incidents</li>
          <li>Serve relevant advertisements via Google AdSense</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p className="mt-3">We do not sell your personal information to third parties. We do not use automated decision-making or profiling that produces legal or similarly significant effects on you.</p>
      </PolicySection>

      <PolicySection title="3. Google Analytics and AdSense">
        <p>
          We use <strong className="text-ink-200">Google Analytics 4 (GA4)</strong> to measure traffic and engagement. GA4 uses cookies and collects usage data that is transmitted to and stored by Google on servers in the United States. Google may also transfer this data to third parties where required by law or where such third parties process the data on Google's behalf. Google will not associate your IP address with any other data held by Google.
        </p>
        <p className="mt-2">
          You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-gold-400 hover:underline" rel="noopener noreferrer" target="_blank">Google Analytics Opt-out Browser Add-on</a>.
        </p>
        <p className="mt-3">
          We use <strong className="text-ink-200">Google AdSense</strong> to display advertisements. Google uses the DoubleClick DART cookie to serve ads based on your visit to goldratestoday.in and other sites on the Internet. You may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" className="text-gold-400 hover:underline" rel="noopener noreferrer" target="_blank">Google Ad and Content Network Privacy Policy</a>.
        </p>
      </PolicySection>

      <PolicySection title="4. Third-Party Data Providers">
        <p>Our gold rate data is sourced from:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li><strong className="text-ink-200">GoldAPI.io</strong> — provides XAU/INR spot price data. Their service is subject to their own privacy policy.</li>
          <li><strong className="text-ink-200">IBJA (India Bullion and Jewellers Association)</strong> — benchmark AM/PM rates scraped from their public website for cross-reference.</li>
        </ul>
        <p className="mt-3">We do not share your personal data with these providers. They supply data to us; they do not receive any information about you.</p>
      </PolicySection>

      <PolicySection title="5. Data Retention">
        <p>Server access logs are retained for a maximum of 30 days for security and debugging purposes, then permanently deleted. Analytics data aggregated by Google Analytics is retained per Google's default data retention settings (14 months). Cookie data stored in your browser is retained until you clear your browser cookies or until the cookie expires, whichever is sooner.</p>
      </PolicySection>

      <PolicySection title="6. Your Rights">
        <p>Under applicable data protection law (including India's Digital Personal Data Protection Act, 2023), you have the right to:</p>
        <ul className="mt-2 space-y-1 list-disc list-inside">
          <li>Know what personal data we hold about you</li>
          <li>Request deletion of your personal data</li>
          <li>Withdraw consent for data processing at any time</li>
          <li>Lodge a complaint with the relevant supervisory authority</li>
        </ul>
        <p className="mt-3">To exercise any of these rights, please contact us at <a href="mailto:contact@goldratestoday.in" className="text-gold-400 hover:underline">contact@goldratestoday.in</a>. We will respond within 30 days.</p>
      </PolicySection>

      <PolicySection title="7. Children's Privacy">
        <p>GoldRatesToday.in is not directed at children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has submitted personal information to us, please contact us immediately and we will delete it.</p>
      </PolicySection>

      <PolicySection title="8. Changes to This Policy">
        <p>We may update this Privacy Policy periodically. When we do, we will update the "Last updated" date at the top of this page. Continued use of the Service after any change constitutes your acceptance of the revised policy. We encourage you to review this page periodically.</p>
      </PolicySection>

      <PolicySection title="9. Contact Us">
        <p>If you have questions or concerns about this Privacy Policy, please contact us at:</p>
        <p className="mt-2 text-ink-200">
          GoldRatesToday.in<br />
          Email: <a href="mailto:contact@goldratestoday.in" className="text-gold-400 hover:underline">contact@goldratestoday.in</a>
        </p>
      </PolicySection>

    </div>
  );
}

function PolicySection({ title, children }) {
  return (
    <section className="card p-5 sm:p-6 space-y-2 text-sm text-ink-300 leading-relaxed">
      <h2 className="text-sm font-semibold text-ink-200 mb-2">{title}</h2>
      {children}
    </section>
  );
}
