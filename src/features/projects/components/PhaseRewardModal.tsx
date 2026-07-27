import { useEffect, useRef } from 'react'
import { LOOT_ICONS } from '@/utils/rpgAssets'

const AUTO_DISMISS_MS = 4000

export function PhaseRewardModal({
  phase,
  xp,
  onDone,
}: {
  phase: number
  xp: number
  onDone: () => void
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const isDefeat = phase === 0

  useEffect(() => {
    const timer = window.setTimeout(onDone, AUTO_DISMISS_MS)
    return () => window.clearTimeout(timer)
  }, [onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg/85 p-6 backdrop-blur-md"
      onClick={onDone}
      role="status"
    >
      <div
        ref={stageRef}
        onClick={(e) => e.stopPropagation()}
        className="modal-panel relative w-full max-w-sm rounded-3xl border-2 border-accent bg-surface p-8 text-center shadow-[0_0_100px_rgba(217,169,74,0.3)]"
      >
        <div className="gold-shimmer-bg pointer-events-none absolute inset-0 rounded-3xl opacity-30" />

        <div className="mb-4 flex justify-center">
          {isDefeat ? (
            <span className="animate-bounce text-6xl">🏆</span>
          ) : (
            <img
              src={LOOT_ICONS.chest_phase}
              alt="Cofre de fase"
              className="h-16 w-16 animate-bounce object-contain drop-shadow-[0_0_12px_rgba(217,169,74,0.6)]"
            />
          )}
        </div>

        <h2 className="mb-1 font-display text-2xl font-black uppercase tracking-tighter text-accent">
          {isDefeat ? '¡JEFE DERROTADO!' : '¡GOLPE CRÍTICO!'}
        </h2>
        <p className="mb-6 font-display text-xs tracking-widest text-fg-muted uppercase">
          {isDefeat ? 'PROYECTO CONQUISTADO' : `FASE ${phase}% ROTA`}
        </p>

        <div className="mb-6 rounded-2xl border border-border bg-black/40 p-4">
          <p className="mb-1 font-mono text-[10px] uppercase text-fg-muted/60">
            Tesoro Desbloqueado
          </p>
          <p className="font-mono text-xl font-black text-sky-400">+{xp} XP EXTRA</p>
        </div>

        <button
          type="button"
          onClick={onDone}
          className="btn-prime w-full rounded-xl py-3.5 font-display text-xs font-black uppercase tracking-widest"
        >
          Reclamar Botín
        </button>
      </div>
    </div>
  )
}
