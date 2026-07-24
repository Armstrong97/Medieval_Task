import { useEffect, type PropsWithChildren } from 'react'

export function Modal({
  onClose,
  children,
}: PropsWithChildren<{ onClose: () => void }>) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-5 shadow-lg dark:bg-neutral-900"
      >
        {children}
      </div>
    </div>
  )
}
