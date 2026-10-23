import { useState } from 'react'
import { Check, ChevronDown, Lock, LockOpen, Plus, Settings2, X } from 'lucide-react'
import type { StageSettings } from '@/features/chains/stages'
import type { LinkEvent, UnlockMode } from '@/types/database.types'

export interface ComposerStep {
  key: string
  title: string
  state?: 'done' | 'locked' | 'open'
}

export interface ComposerStage {
  key: string
  steps: ComposerStep[]
  settings: StageSettings
}

const fieldCls =
  'rounded-lg border border-glass/10 bg-shade/30 px-2 py-1 font-mono text-xs text-fg outline-none focus:border-accent'

// Compositor de etapas: cada fila es una etapa que se despierta cuando termina
// la anterior; los pasos de una misma fila van "a la vez". Escribir + Enter
// añade una etapa nueva ("luego"). Todo lo demás (disparador, todas/cualquiera,
// plazo) vive detrás del engranaje de cada etapa, con valores por defecto.
export function StageComposer({
  rootTitle,
  stages,
  busy,
  onAdd,
  onRename,
  onRemove,
  onSettings,
}: {
  rootTitle: string
  stages: ComposerStage[]
  busy?: boolean
  onAdd: (stageIndex: number | null, title: string) => void
  onRename: (stageIndex: number, stepKey: string, title: string) => void
  onRemove: (stageIndex: number, stepKey: string) => void
  onSettings: (stageIndex: number, patch: Partial<StageSettings>) => void
}) {
  const [newTitle, setNewTitle] = useState('')
  const [addingTo, setAddingTo] = useState<number | null>(null)
  const [addTitle, setAddTitle] = useState('')
  const [settingsOpen, setSettingsOpen] = useState<number | null>(null)

  function submitNew() {
    const t = newTitle.trim()
    if (!t) return
    onAdd(null, t)
    setNewTitle('')
  }

  function submitParallel() {
    const t = addTitle.trim()
    if (t && addingTo !== null) onAdd(addingTo, t)
    setAddTitle('')
    setAddingTo(null)
  }

  return (
    <div className="space-y-1.5">
      <p className="truncate font-mono text-xs text-fg-muted/70">
        <span className="text-accent">●</span> {rootTitle || 'Esta misión'}
      </p>

      {stages.map((stage, i) => (
        <div key={stage.key} className="space-y-1.5">
          <ChevronDown className="ml-1 h-4 w-4 text-fg-muted/40" aria-hidden="true" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-glass/10 font-mono text-xs font-bold text-fg-muted">
              {i + 1}
            </span>

            {stage.steps.map((step) => (
              <div
                key={step.key}
                className="flex min-w-0 flex-1 basis-40 items-center gap-1.5 rounded-xl border border-glass/10 bg-shade/30 pl-2.5"
              >
                {step.state === 'done' ? (
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent" aria-label="Hecho" />
                ) : step.state === 'open' ? (
                  <LockOpen className="h-3.5 w-3.5 shrink-0 text-accent" aria-label="Despierto" />
                ) : (
                  <Lock className="h-3.5 w-3.5 shrink-0 text-gold" aria-label="Dormido" />
                )}
                <input
                  key={step.title}
                  defaultValue={step.title}
                  aria-label="Nombre del paso"
                  onBlur={(e) => {
                    const v = e.target.value.trim()
                    if (v && v !== step.title) onRename(i, step.key, v)
                    else e.target.value = step.title
                  }}
                  onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.blur()}
                  className="min-w-0 flex-1 bg-transparent py-2 text-sm text-fg outline-none"
                />
                <button
                  type="button"
                  onClick={() => onRemove(i, step.key)}
                  aria-label={`Quitar paso: ${step.title}`}
                  className="flex h-9 w-9 shrink-0 items-center justify-center text-fg-muted/50 hover:text-fg"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}

            {addingTo === i ? (
              <input
                autoFocus
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') submitParallel()
                  if (e.key === 'Escape') {
                    setAddTitle('')
                    setAddingTo(null)
                  }
                }}
                onBlur={submitParallel}
                placeholder="Otro paso a la vez…"
                className={`${fieldCls} min-w-0 flex-1 basis-40 py-2`}
              />
            ) : (
              <button
                type="button"
                onClick={() => setAddingTo(i)}
                className="flex items-center gap-1 rounded-lg px-2 py-2 font-mono text-xs text-fg-muted hover:text-fg"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" /> a la vez
              </button>
            )}

            <button
              type="button"
              onClick={() => setSettingsOpen(settingsOpen === i ? null : i)}
              aria-label={`Ajustes de la etapa ${i + 1}`}
              aria-expanded={settingsOpen === i}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-fg-muted/60 hover:text-fg"
            >
              <Settings2 className="h-4 w-4" />
            </button>
          </div>

          {settingsOpen === i && (
            <div className="ml-8 flex flex-wrap items-center gap-x-4 gap-y-2 rounded-xl border border-glass/5 bg-shade/20 p-3 font-mono text-xs text-fg-muted">
              <label className="flex items-center gap-1.5">
                Se despierta
                <select
                  value={stage.settings.event}
                  onChange={(e) => onSettings(i, { event: e.target.value as LinkEvent })}
                  className={fieldCls}
                >
                  <option value="task_done">al completar el paso anterior</option>
                  <option value="follow_up_resolved">cuando respondan (follow-up)</option>
                </select>
              </label>
              {(i === 0 ? false : stages[i - 1].steps.length > 1) && (
                <label className="flex items-center gap-1.5">
                  Espera a
                  <select
                    value={stage.settings.mode}
                    onChange={(e) => onSettings(i, { mode: e.target.value as UnlockMode })}
                    className={fieldCls}
                  >
                    <option value="all">todos los anteriores</option>
                    <option value="any">cualquiera</option>
                  </select>
                </label>
              )}
              <label className="flex items-center gap-1.5">
                Plazo
                <input
                  type="number"
                  min={0}
                  defaultValue={stage.settings.days ?? ''}
                  placeholder="—"
                  onBlur={(e) =>
                    onSettings(i, { days: e.target.value === '' ? null : Math.max(0, Number(e.target.value)) })
                  }
                  className={`${fieldCls} w-14`}
                />
                días al despertar
              </label>
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2 pt-1">
        <Plus className="ml-1 h-4 w-4 shrink-0 text-fg-muted/50" aria-hidden="true" />
        <input
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submitNew()}
          disabled={busy}
          placeholder={stages.length === 0 ? 'Luego… (escribe el siguiente paso y Enter)' : 'Luego…'}
          className="min-w-0 flex-1 rounded-lg border border-dashed border-glass/10 bg-transparent px-3 py-2.5 text-sm text-fg outline-none focus:border-accent disabled:opacity-50"
        />
      </div>
    </div>
  )
}
