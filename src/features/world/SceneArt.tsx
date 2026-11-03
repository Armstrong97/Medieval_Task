import { useState } from 'react'

// Capa ilustrada de una escena (docs/WORLD_PROMPTS.md): public/assets/world/<scene>-<layer>.webp.
// `back` es un paisaje completo (opaco, se muestra tenue); `front` es un marco con alfa real (el negro
// original ya es transparente). Si el archivo aún no existe, no se muestra nada (quedan las partículas).
export function SceneArt({ scene, layer }: { scene: string; layer: 'back' | 'front' }) {
  const [state, setState] = useState<'loading' | 'ok' | 'missing'>('loading')
  if (state === 'missing') return null
  return (
    <div className={`world-art-wrap world-art-${layer}`}>
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
