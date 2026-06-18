import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { WebSiteSchema } from '@/components/SchemaMarkup';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://goldratestoday.in';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Gold Rate Today in India | Live 22K & 24K Price — GoldRatesToday.in',
    template: '%s — GoldRatesToday.in',
  },
  description:
    'Live gold rates today in India. Check 22K and 24K gold price per gram, 10g and 100g for all major cities. Updated every 60 seconds from MCX & IBJA.',
  keywords: ['gold rate today', 'gold price India', '22k gold price', '24k gold price', 'gold rate per gram'],
  authors: [{ name: 'GoldRatesToday.in' }],
  creator: 'GoldRatesToday.in',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: SITE_URL,
    siteName: 'GoldRatesToday.in',
    title: 'Gold Rate Today in India | Live 22K & 24K Price',
    description: 'Live gold rates for all major Indian cities. Updated every 60 seconds from MCX & IBJA.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gold Rate Today in India | GoldRatesToday.in',
    description: 'Live 22K & 24K gold prices for all major Indian cities.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
      <head>
        <WebSiteSchema siteUrl={SITE_URL} />
        {/* FOUC prevention: set theme class before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('grt-theme');if(t==='dark')document.documentElement.classList.add('dark');}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
