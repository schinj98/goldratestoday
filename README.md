# GoldRatesToday.in

Live gold rate tracking website for Indian users. Built with Next.js 14 App Router.

## Features

- Live 22K and 24K gold rates per gram, 10g, 100g
- 15 city-specific pages (pre-generated at build time)
- Historical rates table (30 days)
- Blog / news section
- Auto-generated sitemap.xml and robots.txt
- Full SEO meta tags + JSON-LD schema markup
- Google AdSense placeholder divs
- Mobile-first responsive design

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Data Source**: GoldAPI.io (primary) + IBJA scraper (fallback)
- **Hosting**: Vercel (Mumbai region — bom1)

## Setup

### 1. Clone and install

```bash
git clone <repo>
cd goldratestoday
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `GOLD_API_KEY` | Your API key from [GoldAPI.io](https://www.goldapi.io/) |
| `NEXT_PUBLIC_SITE_URL` | Full URL of your site (e.g. `https://goldratestoday.in`) |

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Build for production

```bash
npm run build
npm start
```

## API Routes

| Route | Description | Cache |
|---|---|---|
| `GET /api/goldrate` | Live rate from GoldAPI.io | 1 hour |
| `GET /api/ibja` | IBJA scraped rate | 24 hours |

Both routes fall back to static dummy data if the API key is missing or the request fails.

## Pages

| Route | Description |
|---|---|
| `/` | Homepage with live rates + city grid |
| `/gold-rate-today-[city]` | City-specific page (15 cities, statically pre-generated) |
| `/gold-rate-history` | 30-day historical rate table |
| `/blog` | Blog post listing |
| `/blog/[slug]` | Individual blog post |
| `/sitemap.xml` | Auto-generated sitemap |
| `/robots.txt` | Auto-generated robots.txt |

### Supported Cities

gurgaon, delhi, mumbai, bangalore, chennai, hyderabad, pune, kolkata, ahmedabad, faridabad, noida, jaipur, lucknow, chandigarh, surat

## Deploy to Vercel

```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo to [Vercel](https://vercel.com) and it will auto-deploy on every push. Set the environment variables in the Vercel dashboard under Project → Settings → Environment Variables.

## AdSense Integration

Three placeholder divs are included on every page:

- `id="ad-top"` — Below hero/header
- `id="ad-middle"` — Between content sections  
- `id="ad-bottom"` — Above footer

Replace the `<AdPlaceholder>` component with your AdSense `<ins>` tags once your site is approved.

## Disclaimer

All gold rate data shown is indicative only. Please verify with your local jeweller before any transaction. Prices do not include GST, making charges, or local levies.
