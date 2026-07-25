import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/features/auth/AuthProvider'

export function ProtectedRoute() {
  const { session, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg text-sm text-fg-muted">
        Cargando…
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}
