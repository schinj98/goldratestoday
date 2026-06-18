import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="bg-surface-1 min-h-[60vh] flex items-center justify-center">
      <div className="max-w-md mx-auto px-4 text-center">
        <div className="text-[#00d09c] text-7xl font-extrabold mb-4 mono">404</div>
        <h1 className="text-2xl font-bold text-ink-50 mb-3">Page Not Found</h1>
        <p className="text-ink-300 mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 btn-active px-5 py-2.5 text-sm"
        >
          ← Back to Home
        </Link>
      </div>
    </section>
  );
}
