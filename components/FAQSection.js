'use client';

import { useState } from 'react';

export default function FAQSection({ faqs }) {
  const [open, setOpen] = useState(null);

  return (
    <section>
      <h2 className="text-sm font-semibold text-ink-200 mb-3">Frequently Asked Questions</h2>

      {/* Single outer border — no card per item */}
      <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)' }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={i < faqs.length - 1 ? { borderBottom: '1px solid var(--border)' } : {}}
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-start justify-between gap-4 px-5 py-4 text-left group"
              aria-expanded={open === i}
            >
              <span className={`text-sm leading-snug transition-all ${
                open === i
                  ? 'text-ink-50 font-semibold'
                  : 'text-ink-200 font-medium group-hover:text-ink-50'
              }`}>
                {faq.question}
              </span>
              {/* Chevron — rotates 90° when open */}
              <svg
                className={`flex-shrink-0 w-4 h-4 mt-0.5 text-ink-400 transition-transform duration-200 ${
                  open === i ? 'rotate-90' : ''
                }`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {open === i && (
              <div className="px-5 pb-4">
                {/* Gold left accent on the answer block */}
                <div className="pl-3 border-l-2 border-gold-500 text-sm text-ink-300 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
