import { Link } from 'react-router-dom'
import { Check, Pin, PinOff } from 'lucide-react'
import { TONE_CLASS, useStatusItems } from '@/app/statusItems'

// Visible solo en reposo expandido: al pasar el mouse, con el foco del teclado o si está fijada.
const REVEAL = 'opacity-0 group-hover:opacity-100 group-focus-within:opacity-100'

/**
 * Barra de estado ejecutiva (solo pantallas anchas): cinco indicadores de un
 * vistazo, cada uno lleva a su vista. Reposo calmado: lo que vale 0 se ve
 * apagado y el color solo aparece cuando algo pide atención (ámbar para lo
 * pasado de fecha, nunca rojo). Se expande al pasar el mouse o con el foco del
 * teclado; la chincheta la mantiene abierta. No hace consultas propias: usa los
 * hooks que ya mantiene React Query (ver statusItems.ts).
 */
export function StatusRail({ pinned, onTogglePinned }: { pinned: boolean; onTogglePinned: () => void }) {
  const { items, allClear } = useStatusItems()
  const labelVisibility = pinned ? 'opacity-100' : REVEAL

  return (
    <aside
      aria-label="Estado"
      className={`group fixed bottom-0 right-0 top-16 z-20 hidden flex-col overflow-hidden border-l border-border bg-bg/80 backdrop-blur-md transition-[width,box-shadow] duration-150 motion-reduce:transition-none lg:flex ${
        pinned
          ? 'w-56'
          : 'w-16 hover:w-56 hover:border-border-glow hover:bg-surface/95 hover:shadow-2xl focus-within:w-56 focus-within:bg-surface/95 focus-within:shadow-2xl'
      }`}
    >
      <div className="flex h-11 shrink-0 items-center justify-between px-3">
        <span className={`whitespace-nowrap font-mono text-xs uppercase tracking-widest text-fg-muted transition-opacity ${labelVisibility}`}>
          Estado
        </span>
        <button
          type="button"
          onClick={onTogglePinned}
          aria-pressed={pinned}
          aria-label={pinned ? 'Soltar barra de estado' : 'Mantener barra de estado expandida'}
          title={pinned ? 'Soltar' : 'Mantener expandida'}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors hover:bg-glass/10 ${
            pinned ? 'text-accent' : 'mx-auto text-fg-muted hover:text-fg group-hover:mx-0 group-focus-within:mx-0'
          }`}
        >
          {pinned ? <PinOff className="h-4 w-4" aria-hidden="true" /> : <Pin className="h-4 w-4" aria-hidden="true" />}
        </button>
      </div>

      <nav className="flex flex-col">
        {items.map((item) => (
          <Link
            key={item.key}
            to={item.to}
            state={item.state}
            className="flex min-h-14 items-center gap-3 px-3 py-2 transition-colors hover:bg-glass/5"
          >
            <span className="flex w-10 shrink-0 flex-col items-center gap-0.5">
              <item.icon className={`h-4 w-4 ${TONE_CLASS[item.tone]}`} aria-hidden="true" />
              <span className={`font-mono text-sm font-bold leading-none tabular-nums ${TONE_CLASS[item.tone]}`}>
                {item.value}
              </span>
            </span>
            <span className={`flex min-w-0 flex-col whitespace-nowrap transition-opacity ${labelVisibility}`}>
              <span className="font-display text-xs font-bold uppercase tracking-wider text-fg">{item.label}</span>
              <span className="font-mono text-xs text-fg-muted">{item.detail}</span>
            </span>
          </Link>
        ))}
      </nav>

      {allClear && (
        <div className="mt-auto flex items-center gap-3 px-3 py-4 text-accent">
          <Check className="mx-3 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className={`whitespace-nowrap font-mono text-xs transition-opacity ${labelVisibility}`}>Todo en orden</span>
        </div>
      )}
    </aside>
  )
}

/** Mismo resumen como tarjeta dentro del menú lateral, para pantallas sin barra (móvil/tablet). */
export function StatusSummaryCard({ onNavigate }: { onNavigate: () => void }) {
  const { items, allClear } = useStatusItems()

  return (
    <section aria-label="Estado" className="mx-4 mb-4 rounded-xl border border-border bg-surface-2/60 p-3 lg:hidden">
      <p className="mb-2 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-fg-muted">
        Estado
        {allClear && (
          <span className="flex items-center gap-1 normal-case tracking-normal text-accent">
            <Check className="h-3.5 w-3.5" aria-hidden="true" /> Todo en orden
          </span>
        )}
      </p>
      <ul>
        {items.map((item) => (
          <li key={item.key}>
            <Link
              to={item.to}
              state={item.state}
              onClick={onNavigate}
              className="flex min-h-11 items-center gap-3 rounded-lg px-1 transition-colors hover:bg-glass/5"
            >
              <item.icon className={`h-4 w-4 shrink-0 ${TONE_CLASS[item.tone]}`} aria-hidden="true" />
              <span className="flex-1 font-mono text-xs text-fg-muted">{item.label}</span>
              <span className={`font-mono text-sm font-bold tabular-nums ${TONE_CLASS[item.tone]}`}>{item.value}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
