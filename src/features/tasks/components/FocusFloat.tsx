import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, PictureInPicture2 } from 'lucide-react'
import { useCompleteTask, useInProgressTasks } from '@/features/tasks/hooks'
import { useCategories } from '@/features/projects/hooks'

// La Document Picture-in-Picture API todavía no está en los tipos de DOM de TS.
interface DocumentPictureInPictureApi {
  requestWindow(options?: { width?: number; height?: number }): Promise<Window>
}

function getPipApi(): DocumentPictureInPictureApi | undefined {
  return (window as { documentPictureInPicture?: DocumentPictureInPictureApi })
    .documentPictureInPicture
}

const MAX_TASKS = 3

// El documento de la ventana PiP nace vacío: se le copian todas las hojas de
// estilo de la app (tokens de index.css incluidos, así hereda paleta, fuentes
// y modo oscuro vía prefers-color-scheme) y un <base> para que las URLs
// relativas de assets (fuentes autohospedadas) sigan resolviendo.
function copyStylesInto(pipWindow: Window) {
  const base = pipWindow.document.createElement('base')
  base.href = window.location.origin + '/'
  pipWindow.document.head.appendChild(base)

  for (const styleSheet of Array.from(document.styleSheets)) {
    try {
      const cssText = Array.from(styleSheet.cssRules)
        .map((rule) => rule.cssText)
        .join('\n')
      const style = pipWindow.document.createElement('style')
      style.textContent = cssText
      pipWindow.document.head.appendChild(style)
    } catch {
      if (styleSheet.href) {
        const link = pipWindow.document.createElement('link')
        link.rel = 'stylesheet'
        link.href = styleSheet.href
        pipWindow.document.head.appendChild(link)
      }
    }
  }
}

function FocusFloatContent() {
  const { data: inProgress } = useInProgressTasks()
  const { data: categories } = useCategories()
  const completeTask = useCompleteTask()

  const tasks = (inProgress ?? []).slice(0, MAX_TASKS)

  return (
    <div className="flex h-full flex-col gap-2 p-3">
      <p className="font-display text-xs font-semibold uppercase tracking-wide text-fg-muted">
        En progreso
      </p>
      {tasks.length === 0 ? (
        <p className="text-sm text-fg-muted">Nada en progreso. ¡Bien ahí!</p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {tasks.map((task) => {
            const category = categories?.find((c) => c.id === task.category_id)
            return (
              <li
                key={task.id}
                className="flex items-center gap-2 rounded-md border border-border bg-surface p-2"
                style={
                  category ? { borderLeft: `3px solid ${category.color_hex}` } : undefined
                }
              >
                <span className="min-w-0 flex-1 truncate text-sm text-fg" title={task.title}>
                  {task.title}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    completeTask.mutate({ id: task.id, project_id: task.project_id })
                  }
                  title="Completar"
                  aria-label={`Completar ${task.title}`}
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-accent-fg transition-all duration-150 hover:shadow-[0_0_10px_rgba(217,169,74,0.5)] active:scale-90"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

/**
 * Ventana flotante de foco (Document Picture-in-Picture): mini-ventana
 * siempre-encima y redimensionable con las tareas "En progreso" (máx. 3) y su
 * check de completar. Persiste al cambiar de app/ventana; el navegador exige
 * un gesto del usuario para abrirla, por eso es un botón y no automática al
 * minimizar. Solo disponible en Chrome/Edge de escritorio — el botón no se
 * renderiza si la API no existe.
 */
export function FocusFloatButton() {
  const [pipWindow, setPipWindow] = useState<Window | null>(null)

  if (!getPipApi()) return null

  async function toggle() {
    if (pipWindow) {
      pipWindow.close()
      return
    }
    const api = getPipApi()
    if (!api) return
    const win = await api.requestWindow({ width: 320, height: 220 })
    copyStylesInto(win)
    win.addEventListener('pagehide', () => setPipWindow(null))
    setPipWindow(win)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => void toggle()}
        title={pipWindow ? 'Cerrar ventana de foco' : 'Ventana flotante de foco'}
        aria-label="Ventana flotante de foco"
        className={`transition-colors ${
          pipWindow
            ? 'text-accent drop-shadow-[0_0_6px_rgba(217,169,74,0.5)]'
            : 'text-fg-muted hover:text-fg'
        }`}
      >
        <PictureInPicture2 className="h-5 w-5" />
      </button>
      {pipWindow && createPortal(<FocusFloatContent />, pipWindow.document.body)}
    </>
  )
}
