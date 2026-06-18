const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  title: 'Terms of Use | GoldRatesToday.in',
  description: 'Terms of Use for GoldRatesToday.in. Read our terms and conditions governing the use of our gold rate tracking service.',
  alternates: { canonical: `${SITE_URL}/terms-of-use` },
};

const LAST_UPDATED = '17 June 2026';

export default function TermsOfUsePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-6">

      <header>
        <p className="section-title">Legal</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-ink-50 mb-2">Terms of Use</h1>
        <p className="text-xs text-ink-400">Last updated: {LAST_UPDATED}</p>
      </header>

      <div className="card p-5 text-sm text-ink-300 leading-relaxed">
        <p>
          Please read these Terms of Use carefully before accessing or using GoldRatesToday.in. By accessing any part of this website, you agree to be bound by these Terms. If you do not agree to all the terms, please do not use the website.
        </p>
      </div>

      {[
        {
          title: '1. Acceptance of Terms',
          body: 'By visiting, browsing, or using GoldRatesToday.in (the "Website"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Use and all applicable laws and regulations. These Terms apply to all users, including browsers, registered users, and contributors.',
        },
        {
          title: '2. Website Purpose',
          body: 'GoldRatesToday.in provides gold rate data, historical price charts, city-specific rate information, and educational content about the gold market in India. This service is provided for informational and reference purposes only and does not constitute financial advice. We are a data publisher, not a financial institution.',
        },
        {
          title: '3. Permitted Use',
          body: `You may use GoldRatesToday.in for personal, non-commercial reference. Permitted uses include:
• Checking current or historical gold rates for personal decision-making
• Reading our blog and educational content
• Sharing links to our pages on social media

Prohibited uses include:
• Scraping, crawling, or bulk downloading of our data for commercial redistribution without written permission
• Framing our website within another website without consent
• Using our gold rate data to populate another pricing website or application
• Any activity that places an unreasonable load on our servers
• Using automated bots to submit contact forms or generate traffic`,
        },
        {
          title: '4. Intellectual Property',
          body: 'All content on GoldRatesToday.in — including text, charts, design, logos, code, and data presentations — is the intellectual property of GoldRatesToday.in or its data licensors (GoldAPI.io, IBJA) and is protected by applicable copyright and trademark law. You may not reproduce, republish, distribute, or create derivative works from our content without explicit written permission.',
        },
        {
          title: '5. Accuracy of Information',
          body: 'While we strive to ensure accuracy, GoldRatesToday.in makes no warranties, express or implied, regarding the completeness, accuracy, reliability, or availability of the gold rate data, articles, or other content. Prices are sourced from third-party APIs and may differ from real-time market prices. See our Disclaimer page for full details on data accuracy limitations.',
        },
        {
          title: '6. Third-Party Links and Advertising',
          body: 'The Website may contain links to third-party websites (including data sources, jewellers, and advertisers). These links are provided for convenience only. GoldRatesToday.in does not endorse, control, or take responsibility for the content, privacy practices, or terms of any third-party website. Advertisements served via Google AdSense are governed by Google\'s advertising policies.',
        },
        {
          title: '7. Limitation of Liability',
          body: 'To the fullest extent permitted by law, GoldRatesToday.in and its operators shall not be liable for any direct, indirect, incidental, consequential, or special damages arising from your use of the Website or reliance on any information displayed, including but not limited to financial losses from gold transactions made based on rates shown on the Website.',
        },
        {
          title: '8. Indemnification',
          body: 'You agree to indemnify and hold harmless GoldRatesToday.in, its operators, and affiliates from and against any claims, damages, losses, or expenses (including legal fees) arising from your violation of these Terms of Use or your use of the Website.',
        },
        {
          title: '9. Privacy',
          body: 'Your use of the Website is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our data collection and usage practices.',
        },
        {
          title: '10. Modifications',
          body: 'We reserve the right to modify these Terms of Use at any time without prior notice. Changes take effect when posted. Continued use of the Website after any changes constitutes acceptance of the revised Terms. We encourage you to review this page periodically.',
        },
        {
          title: '11. Governing Law',
          body: 'These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from or related to these Terms shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.',
        },
        {
          title: '12. Contact',
          body: 'For questions about these Terms of Use, contact us at contact@goldratestoday.in.',
        },
      ].map(({ title, body }) => (
        <section key={title} className="card p-5">
          <h2 className="text-sm font-semibold text-ink-200 mb-2">{title}</h2>
          <p className="text-sm text-ink-300 leading-relaxed whitespace-pre-line">{body}</p>
        </section>
      ))}

    </div>
  );
}
