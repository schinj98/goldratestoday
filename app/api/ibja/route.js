import { NextResponse } from 'next/server';
import { DUMMY_GOLD_RATE } from '@/lib/dummyData';

const CACHE_DURATION = 86400; // 24 hours

async function scrapeIBJA() {
  const res = await fetch('https://www.ibja.co', {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (compatible; GoldRatesToday/1.0; +https://goldratestoday.in)',
    },
    next: { revalidate: CACHE_DURATION },
  });

  if (!res.ok) throw new Error(`IBJA fetch failed: ${res.status}`);
  const html = await res.text();

  // Dynamic import so cheerio is only loaded server-side
  const { load } = await import('cheerio');
  const $ = load(html);

  let price999 = null;
  let price916 = null;

  // IBJA table typically has columns: Commodity | AM | PM
  // We look for rows containing "999" and "916"
  $('table tr').each((_, row) => {
    const cells = $(row).find('td');
    if (cells.length < 2) return;
    const label = $(cells[0]).text().trim();
    const value = $(cells[1]).text().trim().replace(/[^0-9.]/g, '');

    if (label.includes('999') && !price999) {
      price999 = parseFloat(value) || null;
    }
    if (label.includes('916') && !price916) {
      price916 = parseFloat(value) || null;
    }
  });

  if (!price999 && !price916) throw new Error('Could not parse IBJA table');

  // IBJA quotes per 10 grams — convert to per gram
  return {
    price24kPerGram: price999 ? Math.round(price999 / 10) : null,
    price22kPerGram: price916 ? Math.round(price916 / 10) : null,
    source: 'ibja',
    updatedAt: new Date().toISOString(),
  };
}

export async function GET() {
  try {
    const data = await scrapeIBJA();
    const p24 = data.price24kPerGram || DUMMY_GOLD_RATE.price24kPerGram;
    const p22 = data.price22kPerGram || DUMMY_GOLD_RATE.price22kPerGram;

    return NextResponse.json(
      {
        ...data,
        price24kPerGram: p24,
        price22kPerGram: p22,
        price24k10g:  p24 * 10,
        price22k10g:  p22 * 10,
        price24k100g: p24 * 100,
        price22k100g: p22 * 100,
      },
      {
        headers: {
          'Cache-Control': `public, s-maxage=${CACHE_DURATION}, stale-while-revalidate=172800`,
        },
      }
    );
  } catch (err) {
    console.error('[IBJA API] Scrape failed, using fallback:', err.message);

    // Fallback to GoldAPI
    try {
      const fallbackRes = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/goldrate`
      );
      const fallback = await fallbackRes.json();
      return NextResponse.json({ ...fallback, source: 'goldapi-fallback' });
    } catch {
      return NextResponse.json(
        { ...DUMMY_GOLD_RATE, source: 'fallback', error: err.message },
        { status: 200 }
      );
    }
  }
}
