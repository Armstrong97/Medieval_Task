import { useEffect, useRef } from 'react'
import { LOOT_ICONS } from '@/utils/rpgAssets'

const AUTO_DISMISS_MS = 3400

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

    const stage = stageRef.current
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (stage && !reduceMotion) {
      const rect = { w: stage.clientWidth, h: stage.clientHeight }
      const particles: HTMLDivElement[] = []
      for (let i = 0; i < 26; i++) {
        const p = document.createElement('div')
        p.className = 'achievement-burst'
        const angle = (Math.PI * 2 * i) / 26 + Math.random() * 0.3
        const dist = 90 + Math.random() * 70
        const dx = Math.cos(angle) * dist
        const dy = Math.sin(angle) * dist
        p.style.left = `${rect.w / 2}px`
        p.style.top = `${rect.h / 2}px`
        stage.appendChild(p)
        p.animate(
          [
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 },
          ],
          { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.16,1,.3,1)', delay: 150 },
        )
        particles.push(p)
      }
      return () => {
        window.clearTimeout(timer)
        particles.forEach((p) => p.remove())
      }
    }

    return () => window.clearTimeout(timer)
  }, [phase, onDone])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onDone}
      role="status"
      aria-live="polite"
    >
      <div ref={stageRef} className="relative flex h-72 w-full max-w-sm items-center justify-center">
        <div className="achievement-modal relative rounded-2xl border border-gold bg-surface px-10 py-8 text-center">
          <div className="mx-auto mb-3.5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[radial-gradient(circle_at_35%_30%,var(--gold-bright),var(--gold)_60%,#7a5a1e_100%)] shadow-[inset_0_0_12px_rgba(0,0,0,0.35)]">
            {isDefeat ? (
              <span className="text-3xl">🏆</span>
            ) : (
              <img src={LOOT_ICONS.chest_phase} alt="Cofre de fase" className="h-11 w-11 object-contain" />
            )}
          </div>
          <div className="mb-1.5 font-mono text-[11px] uppercase tracking-[0.12em] text-gold-bright">
            {isDefeat ? 'Jefe derrotado' : `Fase ${phase}% rota`}
          </div>
          <div className="font-display text-2xl font-black tracking-wide text-fg">
            {isDefeat ? '¡Victoria!' : '¡Golpe crítico!'}
          </div>
          <p className="mt-1.5 text-sm text-fg-muted">+{xp} XP</p>
        </div>
      </div>
    </div>
  )
}
