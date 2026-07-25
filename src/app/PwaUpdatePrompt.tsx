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
      <div className="flex items-center gap-3 rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-sm shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
        <span className="text-neutral-700 dark:text-neutral-300">
          {needRefresh ? 'Hay una versión nueva disponible.' : 'Lista para usar sin conexión.'}
        </span>
        {needRefresh && (
          <button
            type="button"
            onClick={() => updateServiceWorker(true)}
            className="rounded-md bg-neutral-900 px-2.5 py-1 text-xs font-medium text-white dark:bg-neutral-100 dark:text-neutral-900"
          >
            Actualizar
          </button>
        )}
        <button
          type="button"
          onClick={close}
          className="text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"
          aria-label="Cerrar"
        >
          ×
        </button>
      </div>
    </div>
  )
}
