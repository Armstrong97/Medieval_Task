import { useSyncExternalStore } from 'react'
import { getToasts, subscribe } from '@/components/ui/toast-store'

export function Toaster() {
  const items = useSyncExternalStore(subscribe, getToasts)

  return (
    <div
      role="status"
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[60] flex flex-col items-center gap-2 px-4"
    >
      {items.map((toast) => (
        <div
          key={toast.id}
          className={`toast-pop rounded-xl border bg-surface px-5 py-3 text-center shadow-2xl ${
            toast.tone === 'reward' ? 'border-gold' : 'border-border-glow'
          }`}
        >
          <p
            className={`font-display text-base font-black ${
              toast.tone === 'reward' ? 'text-gold-bright' : 'text-fg'
            }`}
          >
            {toast.title}
          </p>
          {toast.detail && <p className="font-mono text-xs text-fg-muted">{toast.detail}</p>}
        </div>
      ))}
    </div>
  )
}
