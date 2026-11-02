import { useState } from 'react'
import { CircleUserRound, LogOut } from 'lucide-react'
import { useAuth } from '@/features/auth/AuthProvider'
import { useAiEnabled, useSetAiEnabled } from '@/features/ai/hooks'

export function ProfileMenu() {
  const { session, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const aiEnabled = useAiEnabled()
  const setAi = useSetAiEnabled()

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        title="Mi Perfil"
        aria-label="Mi Perfil"
        className="flex items-center text-fg-muted transition-colors hover:text-fg"
      >
        <CircleUserRound className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="modal-panel panel-rune absolute right-0 z-50 mt-2 w-64 rounded-lg border border-border bg-surface p-2 shadow-xl">
            <div className="border-b border-border px-2 pb-2">
              <p className="text-sm font-medium text-fg">Mi Perfil</p>
              {session?.user.email && (
                <p className="mt-0.5 truncate font-mono text-xs text-fg-muted">
                  {session.user.email}
                </p>
              )}
            </div>
            <label className="mt-1 flex cursor-pointer items-start gap-2 rounded-md px-2 py-1.5 hover:bg-surface-2">
              <input
                type="checkbox"
                checked={aiEnabled}
                disabled={setAi.isPending}
                onChange={(e) => setAi.mutate(e.target.checked)}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
              />
              <span className="text-sm text-fg">
                Asistente IA
                <span className="mt-0.5 block text-xs leading-snug text-fg-muted">
                  Envía a Google (Gemini) el título, la clase, el tamaño y las fechas de tus misiones para sugerirte cosas. No envía tu email. En modo de prueba (nivel gratuito) Google puede usar estos datos para mejorar sus productos.
                </span>
                {setAi.isError && <span className="mt-0.5 block text-xs text-warn-fg">No se pudo guardar el cambio.</span>}
              </span>
            </label>
            <button
              type="button"
              onClick={() => void signOut()}
              className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-warn-fg"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </>
      )}
    </div>
  )
}
