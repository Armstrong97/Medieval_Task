import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'
import { BrandMark } from '@/components/ui/BrandMark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'

const MIN_LENGTH = 8

// Destino del enlace del correo de recuperación. Supabase lee el token de la URL y abre una
// sesión temporal; aquí se elige la contraseña nueva. También sirve a quien ya está dentro
// (por ejemplo, entró con enlace mágico) para fijar o cambiar su contraseña.
export function ResetPasswordPage() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    if (password !== confirm) {
      setError('Las contraseñas no coinciden.')
      return
    }
    setSubmitting(true)
    const { error: updateError } = await supabase.auth.updateUser({ password })
    setSubmitting(false)
    if (updateError) {
      setError(
        updateError.code === 'same_password'
          ? 'Elige una contraseña distinta a la anterior.'
          : updateError.code === 'weak_password'
            ? 'Esa contraseña es muy débil. Prueba con una más larga o más variada.'
            : 'No se pudo cambiar la contraseña. Pide un enlace nuevo e inténtalo de nuevo.',
      )
      return
    }
    setDone(true)
    setTimeout(() => navigate('/', { replace: true }), 1500)
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-bg px-4 py-8 text-fg">
      <AmbientBackground />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center">
        <header className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="h-16 w-16">
              <BrandMark className="glyph-glow h-full w-full text-accent" />
            </div>
          </div>
          <h1 className="font-display text-3xl font-black tracking-tight text-accent sm:text-4xl">Nueva palabra secreta</h1>
        </header>

        <section className="grimoire-card w-full rounded-xl border border-border bg-surface p-6 sm:p-8">
          {loading ? (
            <p className="text-center font-mono text-xs text-fg-muted">Comprobando el enlace…</p>
          ) : !session ? (
            <div className="space-y-4 text-center">
              <p className="rounded-md border border-warn-border bg-warn-bg p-3 text-xs font-medium text-warn-fg">
                Este enlace ya no es válido o venció. Pide uno nuevo desde el inicio de sesión.
              </p>
              <Link to="/login" className="btn-prime inline-block w-full rounded-md py-3 font-display text-sm tracking-wider">
                Volver al inicio de sesión
              </Link>
            </div>
          ) : done ? (
            <p className="rounded-md border border-accent/40 bg-accent/10 p-3 text-center text-xs font-medium text-accent">
              ¡Listo! Tu contraseña se actualizó. Entrando…
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="new-password" className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                  Contraseña nueva
                </label>
                <input
                  id="new-password"
                  type="password"
                  required
                  minLength={MIN_LENGTH}
                  autoComplete="new-password"
                  placeholder={`Mínimo ${MIN_LENGTH} caracteres`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="confirm-password" className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                  Repite la contraseña
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  minLength={MIN_LENGTH}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                />
              </div>

              {error && (
                <p role="alert" className="rounded-md border border-warn-border bg-warn-bg p-3 text-center text-xs font-medium text-warn-fg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-prime w-full rounded-md py-3.5 font-display text-base tracking-wider disabled:opacity-60"
              >
                {submitting ? 'Guardando…' : 'Guardar contraseña'}
              </button>
            </form>
          )}
        </section>
      </main>
    </div>
  )
}
