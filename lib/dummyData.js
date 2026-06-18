import { formatDate } from './goldUtils';

// INR/gram (international spot × 1.15 import duty, Jun 2026 range)
const BASE_24K = 15100;
const BASE_22K = 13842; // 91.67% of 24K

// Generates a realistic trending price: upward ~12 INR/gram/day with weekly/monthly cycles
function seedPrice(daysAgo, base) {
  const trend    = daysAgo * 11.5;                                          // upward trend
  const weekly   = Math.sin(daysAgo * (2 * Math.PI / 7)) * base * 0.007;   // weekly rhythm
  const monthly  = Math.sin(daysAgo * (2 * Math.PI / 28)) * base * 0.012;  // monthly swing
  const noise    = Math.sin(daysAgo * 17.3) * Math.cos(daysAgo * 3.7 + base * 0.0001) * base * 0.006;
  return Math.round(Math.max(base * 0.82, base - trend + weekly + monthly + noise));
}

export function getHistoricalRates(days = 180) {
  const today = new Date();
  const result = Array.from({ length: Math.min(days, 180) }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    const price24k = seedPrice(i, BASE_24K);
    const price22k = seedPrice(i, BASE_22K);
    return {
      date:     formatDate(date),
      price24k,
      price22k,
      change24k: i === days - 1 ? 0 : price24k - seedPrice(i + 1, BASE_24K),
    };
  });
  return result;
}

// Abbreviated date for chart axis labels
export function abbreviateDate(dateStr, totalDays) {
  const parts = dateStr.split(' '); // ["17", "Jun", "2026"]
  if (!parts[0] || !parts[1]) return dateStr;
  if (totalDays <= 30) return `${parts[1]} ${parts[0]}`; // "Jun 17"
  return `${parts[1]} '${parts[2]?.slice(2) || ''}`; // "Jun '26"
}

export const DUMMY_GOLD_RATE = {
  price24kPerGram:  BASE_24K,
  price22kPerGram:  BASE_22K,
  price24k10g:      BASE_24K * 10,
  price22k10g:      BASE_22K * 10,
  price24k100g:     BASE_24K * 100,
  price22k100g:     BASE_22K * 100,
  change24kPerGram: 0,
  changePct:        0,
  updatedAt:        new Date().toISOString(),
  source:           'fallback',
};

export const BLOG_POSTS = [
  {
    slug: 'why-gold-rates-change-daily',
    title: 'Why Gold Rates Change Every Day in India',
    excerpt: 'Gold prices in India are influenced by international spot prices, the USD/INR exchange rate, import duties, and local demand. Here\'s a simple breakdown of all the factors.',
    date: '15 Jun 2025',
    readTime: '4 min read',
    author: 'GoldRatesToday Team',
    content: `Gold rates in India change daily due to a combination of global and domestic factors. The primary driver is the international gold spot price quoted in USD on the COMEX and London Bullion Market. When the USD strengthens, gold prices typically fall, and vice versa.

The USD to INR exchange rate adds another layer of volatility. Even if international gold prices stay flat, a weaker rupee means higher gold prices in India. Import duty (currently 15%) and GST (3%) are applied on top, making India's gold prices significantly higher than global benchmarks.

Local demand also matters — festivals like Dhanteras, Akshaya Tritiya, and wedding seasons in October-December and April-May cause demand spikes that can push local premiums higher. The Multi Commodity Exchange (MCX) operates from Monday to Friday, 9 AM to 11:30 PM IST, providing a real-time price discovery platform.

IBJA (India Bullion and Jewellers Association) publishes standard rates twice daily — morning and evening — which most jewellers use as their base price before adding their making charges.`,
  },
  {
    slug: '22k-vs-24k-gold-which-to-buy',
    title: '22K vs 24K Gold: Which Should You Buy?',
    excerpt: 'Understanding the difference between 22 karat and 24 karat gold can help you make smarter jewellery and investment decisions.',
    date: '10 Jun 2025',
    readTime: '3 min read',
    author: 'GoldRatesToday Team',
    content: `The "karat" (K) in gold refers to purity. 24K gold is 99.9% pure gold — the highest purity available. 22K gold is 91.6% pure (hence the "916" hallmark), with the remaining 8.4% being silver, copper, or other metals added for durability.

**24K Gold** is ideal for investment — coins, bars, and digital gold. Its high purity makes it the standard for gold ETFs and sovereign gold bonds. However, it's too soft for everyday jewellery.

**22K Gold** is the standard for Indian jewellery. The alloy mix makes it harder and more durable, holding gemstone settings better. Most bridal jewellery, bangles, and traditional pieces are 22K.

**Making charges** matter too. Jewellers add 10-25% making charges on top of the gold price, which you lose when selling back. If you're investing, consider gold ETFs, digital gold, or sovereign gold bonds instead of physical jewellery.

Always look for the BIS Hallmark (Bureau of Indian Standards) certification when buying gold jewellery to ensure you're getting the stated purity.`,
  },
  {
    slug: 'gold-investment-options-india-2025',
    title: 'Top 5 Ways to Invest in Gold in India (2025)',
    excerpt: 'From physical gold to digital gold and sovereign bonds, here are the best gold investment options available to Indian investors in 2025.',
    date: '05 Jun 2025',
    readTime: '5 min read',
    author: 'GoldRatesToday Team',
    content: `India is the world's second-largest gold consumer, and Indians have been investing in gold for centuries. In 2025, you have more options than ever before.

**1. Physical Gold (Coins & Bars)**
Buying gold coins or bars from banks and certified jewellers is the most traditional approach. BIS-hallmarked coins offer guaranteed purity. Downside: storage cost, insurance, and making charges add up.

**2. Digital Gold**
Platforms like Paytm, PhonePe, and Google Pay allow you to buy as little as ₹1 worth of gold. The gold is stored in insured vaults. Easy to buy and sell, but check platform fees carefully.

**3. Gold ETFs**
Gold Exchange Traded Funds trade on NSE and BSE like stocks. Each unit represents 1 gram of 99.5% pure gold. No storage hassle, transparent pricing, and low expense ratios (0.3–0.6%). Requires a demat account.

**4. Sovereign Gold Bonds (SGBs)**
Issued by the RBI, SGBs offer a 2.5% annual interest over 8 years on top of gold appreciation. Tax-exempt on maturity if held until 8 years. Limited issuance windows — check RBI announcements.

**5. Gold Mutual Funds**
Invest in gold ETFs through SIP (Systematic Investment Plan) without a demat account. Slightly higher expense ratio but offers the convenience of automatic monthly investing.

*This is educational content. Please consult a SEBI-registered financial advisor before making investment decisions.*`,
  },
  {
    slug: 'gold-rates-today-gurgaon-guide',
    title: 'Gold Rates Today in Gurgaon (Gurugram): Complete Buyer\'s Guide 2026',
    excerpt: 'Everything you need to know about today\'s gold rates in Gurgaon — live 22K and 24K prices, where to buy, how Gurgaon rates compare to Delhi, and tips for getting the best deal.',
    date: '17 Jun 2026',
    readTime: '7 min read',
    author: 'GoldRatesToday Team',
    content: `Gold rates in Gurgaon (officially Gurugram) are among the most-searched in the NCR region, and for good reason — Gurgaon has one of the highest per-capita gold consumption rates in India, fuelled by its large corporate workforce, Punjabi community, and thriving wedding market.

**What is Today's Gold Rate in Gurgaon?**
The live gold rate in Gurgaon is available on our Gurgaon city page, updated every 60 seconds during MCX trading hours (Monday–Friday, 9:00 AM – 11:30 PM IST). As of mid-2026, 24K gold in Gurgaon trades at approximately ₹15,200–₹15,400 per gram and 22K gold at approximately ₹13,900–₹14,100 per gram. These rates include 15% import duty but exclude 3% GST and making charges.

**Why Are Gurgaon Gold Rates Slightly Higher Than Delhi?**
Gurgaon's gold rates are typically ₹150–₹200 per gram higher than Delhi's MCX benchmark. This premium exists for three main reasons:

1. Haryana's entry tax on bullion transported from Delhi wholesale markets
2. Higher retail real estate and operating costs in Gurgaon
3. The city's premium consumer base, which supports slightly wider dealer margins

If you live near the Delhi–Gurgaon border (Sector 14, MG Road area), it may be worth comparing prices at Delhi's Karol Bagh market, especially for large purchases like bridal jewellery sets.

**Best Places to Buy Gold in Gurgaon**
Gurgaon has a well-developed gold retail ecosystem:

Sector 14 (Old Gurgaon): The traditional heart of Gurgaon's jewellery market. Family-run shops with competitive pricing and willingness to negotiate on making charges. Best for traditional 22K gold jewellery, necklaces, and bangles.

MG Road corridor: Premium branded jewellers — Tanishq, Kalyan Jewellers, Malabar Gold & Diamonds, PC Jeweller, and Senco Gold — are clustered here. Fixed pricing, but excellent hallmarking compliance, easy exchange policies, and EMI options.

Sector 57 & Sohna Road: Newer markets catering to South Gurgaon's residential areas. CaratLane and Joyalukkas have stores here with competitive online-to-offline pricing.

**How to Verify Gold Purity in Gurgaon**
The Bureau of Indian Standards (BIS) Hallmark is your best protection. Since June 2021, BIS hallmarking is mandatory for gold jewellery in India. Look for:
• The BIS Hallmark logo (a triangle mark)
• Purity grade: 999 (24K), 916 (22K), 750 (18K)
• The HUID (Hallmark Unique ID) — a 6-digit alphanumeric code you can verify at the BIS Care app

Never buy gold from a seller who cannot show the Hallmark and HUID.

**Gurgaon Gold Rate vs NCR Cities**
Within the NCR region, gold rates typically rank as:
1. Delhi (lowest — closest to the wholesale source)
2. Noida / Greater Noida (Delhi + ₹50–₹100 due to UP levies)
3. Gurgaon / Gurugram (Delhi + ₹150–₹200 due to Haryana entry tax)
4. Faridabad (similar to Gurgaon or slightly lower)

For large purchases (bridal sets, bulk investment gold), the difference between Delhi and Gurgaon rates can amount to ₹5,000–₹15,000 on a 100-gram purchase.

**Tips for Buying Gold in Gurgaon**
1. Check the live rate here before entering any shop — don't rely on the jeweller's rate board.
2. Ask for the "gold rate" separately from "making charges" and "GST". These should appear as separate line items on your invoice.
3. Compare at least 3 jewellers before committing to large purchases.
4. For investment gold (coins, bars), consider buying directly from banks like SBI, HDFC, or ICICI, which offer certified 24K coins at near-MCX prices with minimal premiums.
5. Akshaya Tritiya (April/May) and Dhanteras (October/November) are auspicious buying days but are also the busiest and most expensive. Consider buying 1–2 weeks before or after these festivals for better pricing.
6. Sovereign Gold Bonds (SGBs) issued by the RBI offer the gold rate + 2.5% annual interest and are more tax-efficient than physical gold for pure investment purposes.

*All rates are indicative. Verify current prices with your jeweller before any transaction.*`,
  },
];

export const FAQ_DATA = [
  {
    question: 'What is today\'s gold rate per gram in India?',
    answer: 'Today\'s gold rate per gram in India is approximately ₹7,250 for 24K (pure gold) and ₹6,645 for 22K gold. Rates vary slightly by city due to local taxes and transportation costs. Always check with your local jeweller for the exact buying price.',
  },
  {
    question: 'Why is the gold rate different in different cities?',
    answer: 'Gold rates vary by city due to differences in local state taxes, transportation costs from major bullion markets, and local demand. Cities like Mumbai and Chennai tend to have slightly lower rates due to proximity to ports, while rates in the North (Delhi, Jaipur) may be slightly higher.',
  },
  {
    question: 'What is the difference between 22K and 24K gold?',
    answer: '24K gold is 99.9% pure gold and is ideal for investment in the form of coins, bars, and ETFs. 22K gold is 91.6% pure (hallmarked as 916) and contains 8.4% other metals for added durability, making it the standard for jewellery in India.',
  },
  {
    question: 'How often is the gold rate updated?',
    answer: 'Gold rates on MCX (Multi Commodity Exchange) update in real time during trading hours: Monday to Friday, 9:00 AM to 11:30 PM IST. IBJA (India Bullion and Jewellers Association) publishes standard rates twice daily. Our website refreshes rates every hour.',
  },
  {
    question: 'Is GST applicable on gold in India?',
    answer: 'Yes. GST of 3% is applicable on the purchase of gold jewellery in India. Additionally, making charges attract 5% GST. An import duty of 15% is already built into the gold price as it is applied when gold is imported into India.',
  },
];
