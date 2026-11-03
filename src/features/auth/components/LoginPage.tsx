import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'
import { BrandMark } from '@/components/ui/BrandMark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'

type Mode = 'magic' | 'password' | 'signup' | 'reset'

export function LoginPage() {
  const { session, loading: sessionLoading } = useAuth()
  const [mode, setMode] = useState<Mode>('magic')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [heroName, setHeroName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ kind: 'info' | 'error'; text: string } | null>(null)

  if (!sessionLoading && session) {
    return <Navigate to="/" replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      if (mode === 'magic') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        setMessage({ kind: 'info', text: '¡Enlace de acceso enviado al pergamino de correo!' })
      } else if (mode === 'password') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/restablecer`,
        })
        if (error) throw error
        // Mismo mensaje exista o no la cuenta: no revela qué correos están registrados.
        setMessage({
          kind: 'info',
          text: 'Si ese correo tiene cuenta, te enviamos un enlace para crear una contraseña nueva. Revisa también el spam.',
        })
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { hero_name: heroName.trim() } },
        })
        if (error) throw error
        setMessage({
          kind: 'info',
          text: 'Tu leyenda comienza ahora. Cuenta creada — revisa tu correo si requiere confirmación.',
        })
      }
    } catch (err) {
      setMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Algo no salió bien en el hechizo, prueba de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-bg px-4 py-8 text-fg">
      <AmbientBackground />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Header Identidad Questly */}
        <header className="mb-8 text-center">
          <div className="mb-3 flex justify-center">
            <div className="h-16 w-16">
              <BrandMark className="glyph-glow h-full w-full text-accent" />
            </div>
          </div>
          <h1 className="font-display text-4xl font-black tracking-tight text-accent drop-shadow-[0_0_10px_rgb(var(--accent-rgb)/0.35)] sm:text-5xl">
            QUESTLY
          </h1>
          <p className="mt-1 font-display text-xs font-semibold uppercase tracking-[0.2em] text-fg-muted">
            Maneja tus misiones. Conquista el caos.
          </p>
        </header>

        {/* Grimoire Card Container */}
        <section className="grimoire-card w-full overflow-hidden rounded-xl border border-border bg-surface">
          {/* Tabs Selector */}
          <nav className="flex border-b border-border">
            {(
              [
                { key: 'magic', label: 'Enlace Mágico' },
                { key: 'password', label: 'Contraseña' },
                { key: 'signup', label: 'Crear Cuenta' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => {
                  setMode(tab.key)
                  setMessage(null)
                }}
                className={`flex-1 py-3.5 font-mono text-xs uppercase tracking-widest transition-all ${
                  mode === tab.key
                    ? 'tab-active font-semibold'
                    : 'text-fg-muted/60 hover:text-fg'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Form Content */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {mode === 'signup' && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                    Nombre de Héroe
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej: Galahad"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                  />
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                  {mode === 'password' ? 'Correo Electrónico' : 'Dirección de Correo'}
                </label>
                <input
                  type="email"
                  required
                  placeholder="caballero@reino.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                />
              </div>

              {(mode === 'password' || mode === 'signup') && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-xs font-bold uppercase tracking-widest text-accent/90">
                    Palabra Secreta
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-parchment w-full rounded-md px-4 py-2.5 text-sm text-fg"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-prime mt-2 w-full rounded-md py-3.5 font-display text-base tracking-wider disabled:opacity-60"
              >
                {submitting
                  ? 'Invocando…'
                  : mode === 'magic'
                    ? 'Enviar Enlace'
                    : mode === 'password'
                      ? 'Entrar a la Taberna'
                      : mode === 'reset'
                        ? 'Enviar enlace de recuperación'
                        : 'Forjar Destino'}
              </button>

              {mode === 'password' && (
                <button
                  type="button"
                  onClick={() => {
                    setMode('reset')
                    setMessage(null)
                  }}
                  className="text-center font-mono text-xs uppercase tracking-wider text-fg-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              )}
              {mode === 'reset' && (
                <button
                  type="button"
                  onClick={() => {
                    setMode('password')
                    setMessage(null)
                  }}
                  className="text-center font-mono text-xs uppercase tracking-wider text-fg-muted underline-offset-4 hover:text-fg hover:underline"
                >
                  Volver a iniciar sesión
                </button>
              )}

              {mode === 'magic' && (
                <p className="text-center font-mono text-xs uppercase tracking-wider text-fg-muted/50">
                  Sin contraseñas, solo magia.
                </p>
              )}
            </form>

            {message && (
              <div
                className={`mt-4 rounded-md border p-3 text-center text-xs font-medium ${
                  message.kind === 'error'
                    ? 'border-warn-border bg-warn-bg text-warn-fg'
                    : 'border-accent/40 bg-accent/10 text-accent'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </section>

        {/* Footer info */}
        <footer className="mt-8 text-center opacity-40 transition-opacity hover:opacity-100">
          <p className="font-mono text-xs tracking-tighter text-fg-muted">
            QUESTLY v4.0.1 — SOFTWARE DE GESTIÓN ÉPICA
          </p>
        </footer>
      </main>
    </div>
  )
}
