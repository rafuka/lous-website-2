/** Yin/Yang-inspired monogram: two halves in balance, each holding the other. */
export function Mark({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <defs>
        <mask id="mark-cut">
          <rect width="32" height="32" fill="white" />
          <circle cx="16" cy="23.5" r="1.8" fill="black" />
        </mask>
      </defs>
      <circle cx="16" cy="16" r="15" fill="none" stroke="currentColor" strokeWidth="1" />
      <path
        d="M16 1 A15 15 0 0 1 16 31 A7.5 7.5 0 0 1 16 16 A7.5 7.5 0 0 0 16 1 Z"
        fill="currentColor"
        mask="url(#mark-cut)"
      />
      <circle cx="16" cy="8.5" r="1.8" fill="currentColor" />
    </svg>
  );
}
