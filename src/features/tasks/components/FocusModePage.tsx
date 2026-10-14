import { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, LogOut, PictureInPicture2 } from 'lucide-react'
import { useFocusFloat } from '@/features/tasks/FocusFloatContext'
import { useFocusSession } from '@/features/tasks/focusSessionContext'
import { FocusSessionView } from '@/features/tasks/components/FocusSessionView'

// Modo Foco dentro de la app: una sola misión, sus micro-pasos y un
// temporizador OPCIONAL (ceguera de tiempo). Funciona en móvil, a diferencia
// de la ventana flotante (solo Chrome/Edge de escritorio), que muestra esta
// misma sesión cuando está abierta. El botón de captura rápida sigue visible
// a propósito: anotar la idea que te distrae sin salir del foco.
export function FocusModePage() {
  const { taskId } = useParams()
  const navigate = useNavigate()
  const { supported: pipSupported, open: openPip } = useFocusFloat()
  const { begin, end } = useFocusSession()

  useEffect(() => {
    if (taskId) begin(taskId)
  }, [taskId, begin])

  if (!taskId) return null

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-8 px-4 py-8">
      <Link
        to="/"
        className="flex w-fit items-center gap-2 font-mono text-xs uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al Combate (el foco sigue activo)
      </Link>

      <FocusSessionView
        taskId={taskId}
        onCompleted={() => navigate('/')}
        fallback={
          <div className="py-12 text-center">
            <p className="mb-6 font-display text-lg text-fg">Esta misión ya no está activa.</p>
            <Link
              to="/"
              className="btn-prime inline-block rounded-full px-8 py-3 font-display text-xs font-bold uppercase tracking-widest"
            >
              Volver al Combate
            </Link>
          </div>
        }
      />

      <footer className="flex flex-col gap-3">
        {pipSupported && (
          <button
            type="button"
            onClick={() => void openPip()}
            className="flex items-center justify-center gap-2 rounded-xl border border-border py-3 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
          >
            <PictureInPicture2 className="h-4 w-4" aria-hidden="true" /> Ventana flotante
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            end()
            navigate('/')
          }}
          className="flex items-center justify-center gap-2 rounded-xl py-3 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" /> Salir del foco
        </button>
      </footer>
    </div>
  )
}
