import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'
import { Logomark } from '@/components/ui/Logomark'
import { AmbientBackground } from '@/components/ui/AmbientBackground'

type Mode = 'magic-link' | 'password-in' | 'password-up'

export function LoginPage() {
  const { session, loading: sessionLoading } = useAuth()
  const [mode, setMode] = useState<Mode>('magic-link')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<{ kind: 'info' | 'error'; text: string } | null>(null)

  if (!sessionLoading && session) {
    return <Navigate to="/inbox" replace />
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSubmitting(true)
    setMessage(null)

    try {
      if (mode === 'magic-link') {
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: window.location.origin },
        })
        if (error) throw error
        setMessage({ kind: 'info', text: 'Revisa tu correo — te mandamos un enlace para entrar.' })
      } else if (mode === 'password-in') {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessage({ kind: 'info', text: 'Cuenta creada — revisa tu correo si pide confirmación, luego inicia sesión.' })
      }
    } catch (err) {
      setMessage({
        kind: 'error',
        text: err instanceof Error ? err.message : 'Algo no salió bien, probá de nuevo.',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-dvh items-center justify-center bg-bg p-4">
      <AmbientBackground />
      <div className="relative w-full max-w-sm rounded-lg border border-border bg-surface p-6 shadow-xl">
        <div className="flex items-center gap-2.5">
          <Logomark className="h-9 w-9" />
          <h1 className="font-display text-lg font-semibold tracking-tight text-fg">
            Productividad RPG
          </h1>
        </div>

        <div className="mt-5 flex gap-1 rounded-md bg-surface-2 p-1">
          {(
            [
              { key: 'magic-link', label: 'Enlace mágico' },
              { key: 'password-in', label: 'Contraseña' },
              { key: 'password-up', label: 'Crear cuenta' },
            ] as const
          ).map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => {
                setMode(tab.key)
                setMessage(null)
              }}
              className={`flex-1 rounded px-2 py-1.5 text-sm font-medium transition-colors ${
                mode === tab.key ? 'bg-surface text-fg shadow-sm' : 'text-fg-muted hover:text-fg'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-fg-muted">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-fg outline-none focus:border-accent"
              placeholder="tu@email.com"
            />
          </label>

          {mode !== 'magic-link' && (
            <label className="flex flex-col gap-1 text-sm text-fg-muted">
              Contraseña
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-border bg-surface-2 px-3 py-1.5 text-fg outline-none focus:border-accent"
                placeholder="••••••••"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-fg transition-all duration-150 hover:shadow-[0_4px_24px_rgba(240,195,100,0.45)] hover:-translate-y-px active:scale-[0.97] disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {submitting
              ? 'Un momento…'
              : mode === 'magic-link'
                ? 'Enviar enlace'
                : mode === 'password-in'
                  ? 'Entrar'
                  : 'Crear cuenta'}
          </button>
        </form>

        {message && (
          <p
            className={`mt-3 text-sm ${message.kind === 'error' ? 'text-warn-fg' : 'text-fg-muted'}`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  )
}
