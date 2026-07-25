export function Logomark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 512 512" fill="none" className={className} aria-hidden="true">
      <rect width="512" height="512" rx="96" className="fill-surface-2" />
      <rect x="120" y="280" width="64" height="132" rx="14" fill="#7c3aed" />
      <rect x="224" y="210" width="64" height="202" rx="14" fill="#2563eb" />
      <rect x="328" y="120" width="64" height="292" rx="14" fill="#059669" />
    </svg>
  )
}
