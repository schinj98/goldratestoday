/**
 * City-specific SEO content.
 * Falls back to generic content for cities without a custom entry.
 */

const DEFAULT = {
  intro: (name, state) =>
    `Gold rates in ${name} track the MCX (Multi Commodity Exchange) spot price with a small local premium reflecting transportation from bullion markets, state levies, and dealer margins. ${name} is supplied from the nearest bullion hub.`,
  buyingTips: (name) =>
    `When buying gold in ${name}, always ask for a BIS Hallmark certificate (916 for 22K, 999 for 24K) and a proper itemised invoice. Jewellers are required by law to disclose the gold rate, making charges, and GST separately.`,
  faqs: (name) => [
    {
      question: `What is the gold rate today in ${name}?`,
      answer: `The current gold rate in ${name} is updated live on this page. Check the price card above for the latest 22K and 24K rates per gram and per 10 grams.`,
    },
    {
      question: `Why is the gold rate different in ${name} compared to other cities?`,
      answer: `Gold prices vary slightly between Indian cities due to local transportation costs, state-level levies, and dealer margins. The IBJA publishes city-specific benchmark rates to account for these differences.`,
    },
    {
      question: `Is GST included in the gold rate shown for ${name}?`,
      answer: `No. The rates shown on this page are the gold value rate only. When buying jewellery, you will additionally pay 3% GST on the gold value, plus making charges (₹300–₹800/gram depending on design).`,
    },
    {
      question: `How often is the gold rate updated for ${name}?`,
      answer: `During MCX market hours (Monday–Friday, 9:00 AM – 11:30 PM IST), rates are refreshed every 60 seconds. Outside market hours, the page shows the last available closing price.`,
    },
    {
      question: `What is 22K vs 24K gold in ${name}?`,
      answer: `24K gold is 99.9% pure (marked 999) — the purest form, used in coins and investment bars. 22K gold is 91.6% pure (marked 916) — the standard for most jewellery because it is harder and more durable than 24K.`,
    },
  ],
};

const CITY_CONTENT = {

  gurgaon: {
    altName: 'Gurugram',
    metaTitle: 'Gold Rate Today in Gurgaon (Gurugram) | Live 22K & 24K Price per Gram',
    metaDescription: 'Gold rate today in Gurgaon (Gurugram): live 22K and 24K gold price per gram. Updated every minute from MCX. Check today\'s 22K gold rate in Gurgaon, 24K gold rate, and 30-day historical chart.',
    h1Suffix: '(Gurugram)',
    sections: [
      {
        heading: 'Gold Market in Gurgaon',
        content: `Gurgaon, officially renamed Gurugram, is part of the National Capital Region (NCR) and one of India's most affluent urban centres. The city has a large gold-buying population spanning Haryana's traditional families, Delhi-NCR's corporate class, and Punjabi communities who are culturally significant gold consumers.

Gold in Gurgaon trades at a slight premium of approximately ₹150–₹200 per gram above the Delhi benchmark, primarily due to Haryana's local levies and the city's historically high demand during the wedding and festival seasons (October–February).

The primary bullion supply chain for Gurgaon runs through Karol Bagh and Chandni Chowk in Delhi, where large bullion dealers supply the Gurgaon retail market. Most reputable jewellers in Gurgaon are IBJA members and follow AM/PM benchmark pricing.`,
      },
      {
        heading: 'Major Gold Jewellery Markets in Gurgaon',
        content: `The main jewellery shopping destinations in Gurgaon include:

**Sector 14 (Old Gurgaon):** The traditional jewellery hub of the city, with family-run gold shops that have operated for decades. Prices here tend to be more competitive than mall-based stores, and negotiation on making charges is common.

**MG Road & IFFCO Chowk:** Premium retail brands like Tanishq, Kalyan Jewellers, Malabar Gold, and PC Jeweller have flagship stores here. Fixed-price policy, certified hallmarking, and easy exchange/buyback programs make these stores popular for salaried buyers.

**Sector 57 & Sector 29:** Emerging jewellery corridors catering to the new residential areas of Gurgaon. Brands like Senco Gold, Joyalukkas, and CaratLane are present here.

**DLF Mall of India (nearby):** While technically in Noida, many Gurgaon residents shop here for brands like Tiffany, CaratLane, and Au Gold.`,
      },
      {
        heading: 'Gurgaon vs Delhi Gold Rate Comparison',
        content: `Gurgaon's gold rate is typically ₹150–₹200/gram higher than Delhi's MCX benchmark. This premium arises from:
• Haryana's entry tax (octroi) on bullion transported from Delhi
• Higher real estate and operational costs of Gurgaon jewellers
• Premium demand from the city's high-income residential zones

If you live near Gurgaon's Delhi border (MG Road or Sector 5), it is worth comparing prices at Delhi's Karol Bagh market, where bulk buying power results in thinner margins.

Compared to Noida (another NCR city), Gurgaon rates are generally ₹50–₹100 higher due to Haryana's vs UP's different levy structures.`,
      },
    ],
    faqs: [
      {
        question: 'What is the gold rate today in Gurgaon?',
        answer: 'The live gold rate in Gurgaon is shown in the price card above. It is updated every 60 seconds during MCX market hours (Monday–Friday, 9:00 AM – 11:30 PM IST). Today\'s 22K and 24K gold rates in Gurgaon include a local premium of approximately ₹150–₹200/gram above the Delhi base rate.',
      },
      {
        question: 'Why is the gold rate in Gurgaon higher than Delhi?',
        answer: 'Gurgaon (Gurugram) is in Haryana, and gold transported from Delhi bullion markets (Karol Bagh, Chandni Chowk) incurs Haryana\'s entry tax. Additionally, Gurgaon\'s higher real-estate costs and premium consumer base mean slightly wider dealer margins. Typically, Gurgaon rates are ₹150–₹200/gram above Delhi.',
      },
      {
        question: 'Is the gold rate in Gurgaon the same as Gurugram?',
        answer: 'Yes — Gurgaon and Gurugram are the same city. The city was officially renamed Gurugram in 2016. All gold rate references to "Gurgaon" apply equally to "Gurugram".',
      },
      {
        question: 'What is 22K gold rate in Gurgaon today?',
        answer: 'The 22K gold rate in Gurgaon today is displayed live in the price card above. 22K gold (916 hallmark) is 91.6% pure and is the most commonly used karat for jewellery. The 22K rate is approximately 91.67% of the 24K (999) rate.',
      },
      {
        question: 'What is 24K gold rate in Gurgaon today?',
        answer: 'The 24K gold rate in Gurgaon today is shown in the price card at the top of this page. 24K gold (999 fineness) is 99.9% pure and is used for coins, bars, and investment-grade gold. It trades at a premium above 22K jewellery gold.',
      },
      {
        question: 'Which is the best jewellery market to buy gold in Gurgaon?',
        answer: 'The best markets depend on what you are buying. For competitive pricing on plain 22K jewellery, Sector 14 (Old Gurgaon) has traditional family jewellers with thinner margins. For certified branded jewellery with buyback guarantees, Tanishq, Kalyan Jewellers, and Malabar Gold on MG Road are reliable. Always verify BIS Hallmark (916 for 22K) before purchasing.',
      },
      {
        question: 'Does the gold rate in Gurgaon include GST?',
        answer: 'No. The gold rate shown on this page is the pre-GST gold value rate. When you buy jewellery, you will also pay: 3% GST on the gold value, making charges (typically ₹300–₹800/gram for standard designs), and the jeweller\'s margin. Ask your jeweller for an itemised invoice.',
      },
      {
        question: 'How often is the Gurgaon gold rate updated on this page?',
        answer: 'The gold rate for Gurgaon updates every 60 seconds during MCX trading hours (Monday to Friday, 9:00 AM to 11:30 PM IST). During weekends, market holidays, and outside trading hours, the last closing price is displayed.',
      },
      {
        question: 'Where does Gurgaon\'s gold supply come from?',
        answer: 'Gurgaon\'s gold is primarily supplied through Delhi\'s Karol Bagh and Zaveri Bazaar (via Mumbai) bullion markets. Large distributors supply Gurgaon retailers twice daily in line with IBJA AM/PM benchmark rates. Gurgaon itself does not have a primary bullion exchange but operates as a retail and secondary market.',
      },
      {
        question: 'Is it better to buy gold in Gurgaon or online (CaratLane, BlueStone)?',
        answer: 'Online jewellers like CaratLane and BlueStone often have lower making charges (₹200–₹400/gram) vs. physical stores in Gurgaon (₹400–₹800/gram). However, physical stores allow you to inspect the jewellery before buying and offer easier exchange. For plain investment gold (coins, bars), consider Sovereign Gold Bonds or digital gold platforms for the lowest premiums.',
      },
    ],
    ncrComparison: true,
  },

  delhi: {
    sections: [
      {
        heading: 'Gold Market in Delhi',
        content: `Delhi is India's largest bullion trading hub outside Mumbai. Karol Bagh and Chandni Chowk are the primary wholesale markets where bullion prices are set for the entire North India region. Delhi's rates are considered the NCR benchmark, and cities like Gurgaon, Noida, and Faridabad typically trade at a small premium above Delhi rates.`,
      },
    ],
    faqs: DEFAULT.faqs('Delhi'),
  },

  mumbai: {
    sections: [
      {
        heading: 'Gold Market in Mumbai',
        content: `Mumbai's Zaveri Bazaar is Asia's largest gold and jewellery market. The city's gold prices closely track the MCX spot rate since MCX itself is headquartered in Mumbai. Mumbai rates are considered the national base benchmark and are typically the lowest among major cities due to direct access to bullion imports via JNPT port.`,
      },
    ],
    faqs: DEFAULT.faqs('Mumbai'),
  },
};

export function getCityContent(slug) {
  const custom = CITY_CONTENT[slug];
  const name   = slug.charAt(0).toUpperCase() + slug.slice(1);

  if (!custom) {
    return {
      altName:     null,
      metaTitle:   null,
      metaDescription: null,
      h1Suffix:    null,
      sections:    [],
      faqs:        DEFAULT.faqs(name),
      ncrComparison: false,
    };
  }

  return {
    altName:        custom.altName || null,
    metaTitle:      custom.metaTitle || null,
    metaDescription: custom.metaDescription || null,
    h1Suffix:       custom.h1Suffix || null,
    sections:       custom.sections || [],
    faqs:           custom.faqs || DEFAULT.faqs(name),
    ncrComparison:  custom.ncrComparison || false,
  };
}
