export default function AdPlaceholder({ id, className = '' }) {
  return (
    <div
      id={id}
      className={`w-full min-h-[90px] rounded-xl flex items-center justify-center ${className}`}
      style={{ border: '1px dashed var(--border-2)' }}
      aria-hidden="true"
    >
      <span className="text-2xs uppercase tracking-widest text-ink-400 font-medium">Advertisement</span>
    </div>
  );
}
