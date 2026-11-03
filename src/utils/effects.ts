// Interruptor de «Efectos» (movimiento decorativo). Se guarda por dispositivo y se aplica como
// data-fx en <html>; el CSS apaga las animaciones decorativas con [data-fx='off'].
const KEY = 'questly_fx'

export function effectsEnabled(): boolean {
  try {
    return localStorage.getItem(KEY) !== 'off'
  } catch {
    return true
  }
}

export function setEffects(on: boolean) {
  document.documentElement.dataset.fx = on ? 'on' : 'off'
  try {
    localStorage.setItem(KEY, on ? 'on' : 'off')
  } catch {
    // sin localStorage: solo no se recuerda
  }
}

export function initEffects() {
  document.documentElement.dataset.fx = effectsEnabled() ? 'on' : 'off'
}
