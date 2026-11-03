// Interruptores de «Efectos» (movimiento decorativo), por grupo. Se guardan por dispositivo y se aplican
// como `data-fx-off="<grupos apagados>"` en <html>; el CSS apaga cada grupo con `[data-fx-off~='<grupo>']`.
export type FxGroup = 'transitions' | 'vine' | 'world' | 'art' | 'game'

export const FX_GROUPS: { key: FxGroup; label: string; hint: string }[] = [
  { key: 'transitions', label: 'Transiciones y entradas', hint: 'Cambio de pantalla y animaciones de bienvenida.' },
  { key: 'vine', label: 'Enredadera del menú', hint: 'Crece al abrir el Menú del Héroe.' },
  { key: 'world', label: 'Mundo vivo', hint: 'Hojas, brasas, niebla, antorchas y destellos.' },
  { key: 'art', label: 'Fondos en movimiento', hint: 'Deriva lenta y parallax; apagado, quedan fijos.' },
  { key: 'game', label: 'Animaciones de combate', hint: 'Golpe final, vida que se rompe y jefe.' },
]

const KEY = 'questly_fx_off'
const OLD_KEY = 'questly_fx' // versión anterior: un solo interruptor 'on' / 'off'
const ALL = FX_GROUPS.map((g) => g.key)

export function disabledGroups(): FxGroup[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw !== null) return (JSON.parse(raw) as string[]).filter((k): k is FxGroup => (ALL as string[]).includes(k))
    return localStorage.getItem(OLD_KEY) === 'off' ? ALL : []
  } catch {
    return []
  }
}

function apply(off: FxGroup[]) {
  document.documentElement.dataset.fxOff = off.join(' ')
}

export function setDisabledGroups(off: FxGroup[]) {
  apply(off)
  try {
    localStorage.setItem(KEY, JSON.stringify(off))
  } catch {
    // sin localStorage: solo no se recuerda
  }
}

// ¿Está apagado este grupo ahora mismo? (lee el atributo: barato, apto para eventos frecuentes)
export function groupOff(group: FxGroup): boolean {
  return (document.documentElement.dataset.fxOff ?? '').split(' ').includes(group)
}

export function initEffects() {
  apply(disabledGroups())
}
