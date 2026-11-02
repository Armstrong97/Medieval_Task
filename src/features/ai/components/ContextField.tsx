import { Mic, Square } from 'lucide-react'
import { useSpeechDictation } from '@/utils/useSpeechDictation'

// Texto libre con dictado por voz, para dar contexto al asistente. El dictado
// va añadiendo frases al final (el reconocimiento escucha una frase por pulsación).
export function ContextField({
  value,
  onChange,
  placeholder,
  maxLength = 1000,
  rows = 3,
  label,
}: {
  value: string
  onChange: (value: string) => void
  placeholder: string
  maxLength?: number
  rows?: number
  label: string
}) {
  const dictation = useSpeechDictation((text) => onChange(`${value}${value && !value.endsWith(' ') ? ' ' : ''}${text}`.slice(0, maxLength)))

  return (
    <div className="space-y-1">
      <div className="relative">
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value.slice(0, maxLength))}
          rows={rows}
          aria-label={label}
          placeholder={dictation.listening ? 'Escuchando…' : placeholder}
          className="input-parchment w-full resize-none rounded-xl p-3 pr-11 text-sm text-fg"
        />
        {dictation.supported && (
          <button
            type="button"
            onClick={() => (dictation.listening ? dictation.stop() : dictation.start())}
            title={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
            aria-label={dictation.listening ? 'Detener dictado' : 'Dictar por voz'}
            className={`absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
              dictation.listening ? 'bg-red-600/20 text-red-400' : 'text-fg-muted hover:bg-glass/10 hover:text-fg'
            }`}
          >
            {dictation.listening ? <Square className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>
        )}
      </div>
      <p className="text-right font-mono text-xs text-fg-muted/60">
        {value.length}/{maxLength}
      </p>
    </div>
  )
}
