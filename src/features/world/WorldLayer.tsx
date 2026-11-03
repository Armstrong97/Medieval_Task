import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { CombatScene, InboxScene, StrategyScene } from '@/features/world/scenes'
import { groupOff } from '@/utils/effects'
import './world.css'

// Escena de fondo según la pantalla (fija, detrás del contenido; ver world.css). Las pantallas sin
// escena (y el Modo Foco, a propósito: menos estímulo) no montan nada. La escena nueva aparece con
// un fundido; la anterior se quita al instante.
function sceneFor(pathname: string) {
  if (pathname === '/') return { key: 'combat', Scene: CombatScene }
  if (pathname.startsWith('/inbox')) return { key: 'inbox', Scene: InboxScene }
  if (pathname.startsWith('/triage')) return { key: 'strategy', Scene: StrategyScene }
  return null
}

export function WorldLayer() {
  const scene = sceneFor(useLocation().pathname)
  const ref = useRef<HTMLDivElement>(null)

  // Parallax con el puntero (solo ratón/trackpad): --px/--py en [-1, 1]; cada capa se desplaza según su --k.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    function onMove(e: PointerEvent) {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = ref.current
        if (!el || groupOff('art')) return
        el.style.setProperty('--px', String((e.clientX / window.innerWidth) * 2 - 1))
        el.style.setProperty('--py', String((e.clientY / window.innerHeight) * 2 - 1))
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  if (!scene) return null
  return (
    <div ref={ref} key={scene.key} aria-hidden="true" className="world-scene pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <scene.Scene />
    </div>
  )
}
