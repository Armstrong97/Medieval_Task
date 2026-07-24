import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/features/auth/AuthProvider'

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
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-neutral-950">
      <div className="w-full max-w-sm rounded-lg border border-neutral-200 p-6 dark:border-neutral-800">
        <h1 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          Productividad RPG
        </h1>

        <div className="mt-4 flex gap-1 rounded-md bg-neutral-100 p-1 dark:bg-neutral-900">
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
                mode === tab.key
                  ? 'bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-100'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3">
          <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
              placeholder="tu@email.com"
            />
          </label>

          {mode !== 'magic-link' && (
            <label className="flex flex-col gap-1 text-sm text-neutral-700 dark:text-neutral-300">
              Contraseña
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-neutral-900 outline-none focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                placeholder="••••••••"
              />
            </label>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-1 rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white transition-opacity disabled:opacity-60 dark:bg-neutral-100 dark:text-neutral-900"
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
            className={`mt-3 text-sm ${
              message.kind === 'error'
                ? 'text-amber-700 dark:text-amber-400'
                : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </div>
  )
}
