import { useState } from 'react'
import { format } from 'date-fns'
import { Sparkles } from 'lucide-react'
import { useAiEnabled, useSuggestChain } from '@/features/ai/hooks'
import { DEFAULT_STAGE, type DraftStage } from '@/features/chains/stages'

// «Sugerir etapas con IA»: propone lo que viene después de una misión y deja
// ver la propuesta antes de aplicarla. Nada se crea hasta que el usuario acepta.
export function SuggestStages({
  rootTitle,
  rootDescription,
  onApply,
}: {
  rootTitle: string
  rootDescription?: string | null
  onApply: (stages: DraftStage[]) => void
}) {
  const aiEnabled = useAiEnabled()
  const suggest = useSuggestChain()
  const [proposal, setProposal] = useState<DraftStage[] | null>(null)

  if (!aiEnabled) return null

  function handleSuggest() {
    suggest.mutate(
      { title: rootTitle.trim(), description: rootDescription?.trim() || undefined, today: format(new Date(), 'yyyy-MM-dd') },
      {
        onSuccess: (stages) =>
          setProposal(
            stages.map((s) => ({
              ...DEFAULT_STAGE,
              id: crypto.randomUUID(),
              days: s.days,
              steps: s.steps.map((title) => ({ id: crypto.randomUUID(), title })),
            })),
          ),
      },
    )
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleSuggest}
        disabled={suggest.isPending || !rootTitle.trim()}
        className="flex items-center gap-1.5 rounded-lg border border-rune/30 px-3 py-2 font-mono text-xs font-bold uppercase tracking-wider text-rune transition-colors hover:bg-rune/10 disabled:opacity-50"
      >
        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
        {suggest.isPending ? 'Pensando…' : 'Sugerir etapas con IA'}
      </button>
      {suggest.isError && (
        <p role="alert" className="font-mono text-xs font-medium text-warn-fg">
          {suggest.error.message}
        </p>
      )}
      {proposal && (
        <div className="space-y-2 rounded-lg border border-rune/20 bg-rune/5 p-3">
          <p className="font-mono text-xs uppercase tracking-widest text-fg-muted/60">Propuesta</p>
          <ol className="space-y-1.5">
            {proposal.map((s, i) => (
              <li key={s.id} className="font-mono text-xs text-fg">
                <span className="text-fg-muted">Etapa {i + 1}{s.days ? ` · ~${s.days} d` : ''}</span>
                <ul className="ml-3 list-disc">
                  {s.steps.map((st) => (
                    <li key={st.id}>{st.title}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onApply(proposal)
                setProposal(null)
              }}
              className="rounded-lg border border-border bg-glass/5 px-3 py-1.5 font-mono text-xs font-bold text-fg hover:bg-glass/10"
            >
              Usar estas etapas
            </button>
            <button
              type="button"
              onClick={() => setProposal(null)}
              className="rounded-lg px-3 py-1.5 font-mono text-xs font-bold text-fg-muted hover:text-fg"
            >
              Descartar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
