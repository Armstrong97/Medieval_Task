import { useState } from 'react'
import { Workflow } from 'lucide-react'
import { StageComposer, type ComposerStage } from '@/features/chains/components/StageComposer'
import { DEFAULT_STAGE, type DraftStage } from '@/features/chains/stages'

// Borrador de cadena para la Mesa de Estrategia: la misión aún no está
// guardada, así que las etapas viven en memoria y se crean al despachar.
// Plegado por defecto: no todas las misiones lo necesitan.
export function DraftChain({
  rootTitle,
  stages,
  onChange,
}: {
  rootTitle: string
  stages: DraftStage[]
  onChange: (stages: DraftStage[]) => void
}) {
  const [open, setOpen] = useState(false)

  const composerStages: ComposerStage[] = stages.map((s) => ({
    key: s.id,
    settings: s,
    steps: s.steps.map((st) => ({ key: st.id, title: st.title, state: 'locked' as const })),
  }))

  if (!open && stages.length === 0) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-1.5 self-start rounded-lg px-1 py-2 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg"
      >
        <Workflow className="h-3.5 w-3.5" aria-hidden="true" /> + Y después…
      </button>
    )
  }

  return (
    <div className="space-y-2 rounded-2xl border border-glass/5 bg-shade/20 p-4">
      <p className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-fg-muted/60">
        <Workflow className="h-3.5 w-3.5" aria-hidden="true" /> ¿Qué viene después?
      </p>
      <StageComposer
        rootTitle={rootTitle}
        stages={composerStages}
        onAdd={(i, title) => {
          const step = { id: crypto.randomUUID(), title }
          if (i === null) {
            onChange([...stages, { ...DEFAULT_STAGE, id: crypto.randomUUID(), steps: [step] }])
          } else {
            onChange(stages.map((s, idx) => (idx === i ? { ...s, steps: [...s.steps, step] } : s)))
          }
        }}
        onRename={(i, key, title) =>
          onChange(stages.map((s, idx) => (idx === i ? { ...s, steps: s.steps.map((st) => (st.id === key ? { ...st, title } : st)) } : s)))
        }
        onRemove={(i, key) =>
          onChange(
            stages
              .map((s, idx) => (idx === i ? { ...s, steps: s.steps.filter((st) => st.id !== key) } : s))
              .filter((s) => s.steps.length > 0),
          )
        }
        onSettings={(i, patch) => onChange(stages.map((s, idx) => (idx === i ? { ...s, ...patch } : s)))}
      />
    </div>
  )
}
