import { useEffect, useRef, useState } from 'react'

// El API de Web Speech todavía no tiene tipos oficiales en lib.dom — se
// declara acá el mínimo necesario en vez de sumar una dependencia solo
// para los tipos.
interface MinimalSpeechRecognitionEvent {
  results: { [index: number]: { [index: number]: { transcript: string } } }
}

interface MinimalSpeechRecognition extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  onresult: ((event: MinimalSpeechRecognitionEvent) => void) | null
  onend: (() => void) | null
  onerror: (() => void) | null
}

type SpeechRecognitionConstructor = new () => MinimalSpeechRecognition

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor
    webkitSpeechRecognition?: SpeechRecognitionConstructor
  }
}

export function useSpeechDictation(onResult: (text: string) => void) {
  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null)
  const [listening, setListening] = useState(false)
  const supported =
    typeof window !== 'undefined' && !!(window.SpeechRecognition ?? window.webkitSpeechRecognition)

  useEffect(() => {
    return () => recognitionRef.current?.stop()
  }, [])

  function start() {
    const Ctor = window.SpeechRecognition ?? window.webkitSpeechRecognition
    if (!Ctor) return
    const recognition = new Ctor()
    recognition.lang = 'es-ES'
    recognition.continuous = false
    recognition.interimResults = false
    recognition.onresult = (event) => {
      const text = event.results[0]?.[0]?.transcript ?? ''
      if (text) onResult(text)
    }
    recognition.onend = () => setListening(false)
    recognition.onerror = () => setListening(false)
    recognitionRef.current = recognition
    recognition.start()
    setListening(true)
  }

  function stop() {
    recognitionRef.current?.stop()
    setListening(false)
  }

  return { supported, listening, start, stop }
}
