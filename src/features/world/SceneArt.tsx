import { useState } from 'react'

// Capa ilustrada de una escena (docs/WORLD_PROMPTS.md): public/assets/world/<scene>-<layer>.webp.
// `back` es un paisaje completo (opaco, se muestra tenue); `front` es un marco con alfa real (el negro
// original ya es transparente). Si el archivo aún no existe, no se muestra nada (quedan las partículas).
// still: sin deriva ni parallax y exactamente centrada (la pantalla de acceso: una imagen simétrica debe
// verse alineada al centro, sin movimiento).
export function SceneArt({ scene, layer, still = false }: { scene: string; layer: 'back' | 'front'; still?: boolean }) {
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading')
  if (state === 'missing') return null
  return (
    <div className={`world-art-wrap world-art-${layer} ${still ? 'world-art-still' : ''}`}>
      <img
        src={`/assets/world/${scene}-${layer}.webp`}
        alt=""
        draggable={false}
        onLoad={() => setState('ok')}
        onError={() => setState('missing')}
        className={`world-art ${state === 'ok' ? 'is-loaded' : ''}`}
      />
    </div>
  )
}
