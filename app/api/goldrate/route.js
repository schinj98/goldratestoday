import { NextResponse } from 'next/server';
import { getGoldRateData } from '@/lib/fetchGoldRate';
import { isMarketOpen } from '@/lib/marketHours';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await getGoldRateData();
  const marketOpen = isMarketOpen();
  const cdnMaxAge = marketOpen ? 60 : 1800;

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': `public, s-maxage=${cdnMaxAge}, stale-while-revalidate=${cdnMaxAge * 2}`,
    },
  });
}
