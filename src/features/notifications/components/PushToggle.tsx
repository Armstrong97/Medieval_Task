import { useEffect, useState } from 'react'
import { BellRing, BellOff } from 'lucide-react'
import {
  getPushSubscriptionState,
  isPushSupported,
  subscribeToPush,
  unsubscribeFromPush,
} from '@/features/notifications/push'

export function PushToggle() {
  const [subscribed, setSubscribed] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supported = isPushSupported()

  useEffect(() => {
    if (supported) getPushSubscriptionState().then(setSubscribed)
  }, [supported])

  if (!supported) return null

  async function toggle() {
    setBusy(true)
    setError(null)
    try {
      if (subscribed) {
        await unsubscribeFromPush()
        setSubscribed(false)
      } else {
        await subscribeToPush()
        setSubscribed(true)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'No se pudo cambiar el estado del push.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="border-t border-neutral-100 p-2 dark:border-neutral-800">
      <button
        type="button"
        onClick={toggle}
        disabled={busy}
        className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-xs text-neutral-500 hover:bg-neutral-50 disabled:opacity-60 dark:text-neutral-400 dark:hover:bg-neutral-800"
      >
        {subscribed ? <BellOff className="h-3.5 w-3.5" /> : <BellRing className="h-3.5 w-3.5" />}
        {subscribed ? 'Desactivar notificaciones push' : 'Activar notificaciones push'}
      </button>
      {error && <p className="px-2 text-xs text-amber-700 dark:text-amber-400">{error}</p>}
    </div>
  )
}
