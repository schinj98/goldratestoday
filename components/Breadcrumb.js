import Link from 'next/link';

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && (
              <svg className="w-3 h-3 text-ink-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            )}
            {item.href ? (
              <Link href={item.href} className="text-ink-300 hover:text-gold-400 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-ink-200 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
