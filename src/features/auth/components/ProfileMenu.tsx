import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CircleUserRound, KeyRound, LogOut } from 'lucide-react'
import { useAuth } from '@/features/auth/AuthProvider'
import { useAiEnabled, useAiProfileContext, useSetAiEnabled, useSetAiProfileContext } from '@/features/ai/hooks'
import { ContextField } from '@/features/ai/components/ContextField'
import { effectsEnabled, setEffects } from '@/utils/effects'

export function ProfileMenu() {
  const { session, signOut } = useAuth()
  const [open, setOpen] = useState(false)
  const aiEnabled = useAiEnabled()
  const setAi = useSetAiEnabled()
  const savedProfile = useAiProfileContext()
  const setProfile = useSetAiProfileContext()
  const [profileDraft, setProfileDraft] = useState<string | null>(null)
  const profileText = profileDraft ?? savedProfile
  const [fx, setFx] = useState(effectsEnabled)

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
                checked={fx}
                onChange={(e) => {
                  setFx(e.target.checked)
                  setEffects(e.target.checked)
                }}
                className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]"
              />
              <span className="text-sm text-fg">
                Efectos
                <span className="mt-0.5 block text-xs leading-snug text-fg-muted">
                  Enredaderas, transiciones y movimiento decorativo. Apágalo si te distrae.
                </span>
              </span>
            </label>
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
                  Envía a Google (Gemini) el título, las notas o contexto, la clase, el tamaño y las fechas de tus misiones (y tu «Sobre mí», si lo escribes) para sugerirte cosas. No envía tu email. En modo de prueba (nivel gratuito) Google puede usar estos datos para mejorar sus productos.
                </span>
                {setAi.isError && <span className="mt-0.5 block text-xs text-warn-fg">No se pudo guardar el cambio.</span>}
              </span>
            </label>
            {aiEnabled && (
              <details className="mt-1 rounded-md px-2 py-1.5">
                <summary className="cursor-pointer select-none text-sm text-fg">Sobre mí (para el asistente)</summary>
                <div className="mt-2 space-y-1.5">
                  <ContextField
                    value={profileText}
                    onChange={setProfileDraft}
                    label="Sobre mí"
                    rows={4}
                    placeholder="Tu rutina y situación: horarios, estudios, cuándo tienes energía… No incluyas datos sensibles."
                  />
                  <button
                    type="button"
                    disabled={profileDraft === null || setProfile.isPending}
                    onClick={() => setProfile.mutate(profileText, { onSuccess: () => setProfileDraft(null) })}
                    className="rounded-lg border border-border bg-glass/5 px-3 py-1.5 font-mono text-xs font-bold text-fg hover:bg-glass/10 disabled:opacity-50"
                  >
                    {setProfile.isPending ? 'Guardando…' : profileDraft === null ? 'Guardado' : 'Guardar'}
                  </button>
                  {setProfile.isError && <p className="text-xs text-warn-fg">No se pudo guardar.</p>}
                </div>
              </details>
            )}
            <Link
              to="/restablecer"
              onClick={() => setOpen(false)}
              className="mt-1 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <KeyRound className="h-4 w-4" /> Cambiar contraseña
            </Link>
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
