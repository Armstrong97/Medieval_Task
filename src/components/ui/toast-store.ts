// Avisos efímeros globales. Store mínimo a nivel de módulo (sin Context ni
// librería): showToast() se puede llamar desde hooks de mutación fuera de React.
export type ToastTone = 'reward' | 'info'

export interface Toast {
  id: number
  title: string
  detail?: string
  tone: ToastTone
}

const DISMISS_MS = 3500
const MAX_VISIBLE = 3

let toasts: Toast[] = []

export function getToasts(): Toast[] {
  return toasts
}
let nextId = 1
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

export function showToast(input: { title: string; detail?: string; tone?: ToastTone }) {
  const toast: Toast = { id: nextId++, tone: 'info', ...input }
  toasts = [...toasts, toast].slice(-MAX_VISIBLE)
  emit()
  window.setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id)
    emit()
  }, DISMISS_MS)
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}
