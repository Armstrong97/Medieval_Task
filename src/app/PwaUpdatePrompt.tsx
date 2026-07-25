import { useRegisterSW } from 'virtual:pwa-register/react'

export function PwaUpdatePrompt() {
  const {
    needRefresh: [needRefresh, setNeedRefresh],
    offlineReady: [offlineReady, setOfflineReady],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh && !offlineReady) return null

  function close() {
    setNeedRefresh(false)
    setOfflineReady(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center px-4">
      <div className="flex items-center gap-3 rounded-lg border border-border bg-surface px-4 py-2.5 text-sm shadow-xl">
        <span className="text-fg">
          {needRefresh ? 'Hay una versión nueva disponible.' : 'Lista para usar sin conexión.'}
        </span>
        {needRefresh && (
          <button
            type="button"
            onClick={() => updateServiceWorker(true)}
            className="rounded-md bg-accent px-2.5 py-1 text-xs font-medium text-accent-fg"
          >
            Actualizar
          </button>
        )}
        <button
          type="button"
          onClick={close}
          className="text-fg-muted hover:text-fg"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  )
}
