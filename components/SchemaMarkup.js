export function WebSiteSchema({ siteUrl }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'GoldRatesToday.in',
    url: siteUrl,
    description: 'Live gold rates in India for all major cities. Updated every hour from MCX and IBJA.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/gold-rate-today-{city}`,
      },
      'query-input': 'required name=city',
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function FAQSchema({ faqs }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function BreadcrumbSchema({ items, siteUrl }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${siteUrl}${item.href}` : undefined,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export function GoldDatasetSchema({ city, price24k, price22k, date, siteUrl }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    name: `Gold Rate Today${city ? ` in ${city}` : ''} — ${date}`,
    description: `Live gold rate data${city ? ` for ${city}` : ' for India'} on ${date}. Includes 22K and 24K gold prices per gram.`,
    url: siteUrl,
    creator: {
      '@type': 'Organization',
      name: 'GoldRatesToday.in',
      url: siteUrl?.replace(/\/[^/]+$/, ''),
    },
    variableMeasured: [
      { '@type': 'PropertyValue', name: '24K Gold Price per gram (INR)', value: price24k },
      { '@type': 'PropertyValue', name: '22K Gold Price per gram (INR)', value: price22k },
    ],
    dateModified: new Date().toISOString(),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
