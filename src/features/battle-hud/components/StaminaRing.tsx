// Anillo de estamina: progreso de la racha hacia el próximo escudo (cada 7 días).
// Solo se llena; romper la racha no "vacía" nada visible aquí (diseño sin culpa).
const SHIELD_EVERY_DAYS = 7
const RADIUS = 26
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export function StaminaRing({ days }: { days: number }) {
  const inCycle = days > 0 && days % SHIELD_EVERY_DAYS === 0 ? SHIELD_EVERY_DAYS : days % SHIELD_EVERY_DAYS
  const offset = CIRCUMFERENCE * (1 - inCycle / SHIELD_EVERY_DAYS)

  return (
    <div
      className="relative h-20 w-20 shrink-0"
      role="img"
      aria-label={`Racha de ${days} días, ${inCycle} de ${SHIELD_EVERY_DAYS} para el próximo escudo`}
    >
      <svg viewBox="0 0 64 64" className="h-full w-full -rotate-90">
        <circle cx="32" cy="32" r={RADIUS} fill="none" stroke="var(--border)" strokeWidth="5" />
        <circle
          cx="32"
          cy="32"
          r={RADIUS}
          fill="none"
          stroke="var(--accent)"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)', filter: 'drop-shadow(0 0 4px rgb(var(--accent-rgb) / 0.6))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-black leading-none text-accent">{days}</span>
        <span className="font-mono text-xs uppercase text-fg-muted">días</span>
      </div>
    </div>
  )
}
