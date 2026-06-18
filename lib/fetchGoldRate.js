import { DUMMY_GOLD_RATE } from './dummyData';
import { isMarketOpen } from './marketHours';

// India imports gold and levies: 12.5% BCD + 2.5% AIDC = 15% total import duty.
// GoldAPI XAU/INR returns the raw international spot price in INR (pure forex).
// Multiply by this factor to arrive at the MCX/IBJA-equivalent Indian market rate.
const IMPORT_DUTY_FACTOR = 1.15;

export async function getGoldRateData() {
  const apiKey = process.env.GOLD_API_KEY;
  const marketOpen = isMarketOpen();

  if (!apiKey || apiKey === 'your_goldapi_key_here') {
    return { ...DUMMY_GOLD_RATE, marketOpen, source: 'fallback' };
  }

  try {
    const res = await fetch('https://www.goldapi.io/api/XAU/INR', {
      headers: {
        'x-access-token': apiKey,
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) throw new Error(`GoldAPI ${res.status}`);

    const data = await res.json();

    // Apply import duty to convert international spot → Indian MCX-equivalent rate
    const spot24 = parseFloat(data.price_gram_24k) || 0;
    const spot22 = parseFloat(data.price_gram_22k) || 0;

    const p24 = Math.round(spot24 * IMPORT_DUTY_FACTOR);
    const p22 = Math.round(spot22 * IMPORT_DUTY_FACTOR);

    // Scale the USD change (ch = USD/troy oz) into INR/gram
    const chUsdOz = parseFloat(data.ch) || 0;
    const spotUsdPerGram = parseFloat(data.price) / 31.1035;
    const inrPerUsd = spot24 / spotUsdPerGram || 84;
    const change24kInr = Math.round((chUsdOz / 31.1035) * inrPerUsd * IMPORT_DUTY_FACTOR);
    const changePct    = parseFloat(data.chp) || 0;

    return {
      price24kPerGram:  p24,
      price22kPerGram:  p22,
      price24k10g:      p24 * 10,
      price22k10g:      p22 * 10,
      price24k100g:     p24 * 100,
      price22k100g:     p22 * 100,
      change24kPerGram: change24kInr,
      changePct,
      updatedAt:        new Date().toISOString(),
      source:           'goldapi',
      marketOpen,
    };
  } catch (err) {
    console.error('[getGoldRateData]', err.message);
    return { ...DUMMY_GOLD_RATE, marketOpen, source: 'fallback', error: err.message };
  }
}
