# Prompts de escenas — «Mundo vivo» (tanda 1: Combate, Inbox, Estrategia)

Cada pantalla tiene un fondo ilustrado en **dos capas**: `back` (el paisaje, lejos) y `front` (el marco cercano, en los bordes). La app las mueve con un parallax suave y les pone partículas encima. Aquí van los prompts para generarlas en Gemini. Las tandas 2 y 3 (Grimorio, Calendario, Progreso, Follow-ups, Proyectos, Cadenas) se hacen igual cuando lleguemos.

## Cómo se integran (lo que aprendimos con la tanda 1)

- **`back`** es un paisaje completo: se muestra **tenue (40 %)** y opaco detrás de todo. Puede ser luminoso; los bordes con viñeta a negro funcionan muy bien.
- **`front`** es un marco con el centro negro: yo convierto el **negro en transparencia real** (alfa = luminosidad), así que lo que no brilla no se ve. Evita siluetas oscuras: se volverían invisibles.
- Solo se ven en el **tema oscuro**; en el claro quedan únicamente las partículas.
- **16:9 horizontal**, lo importante hacia los lados; el centro despejado (ahí va el contenido). Se mueven con un parallax suave del ratón.
- Las convierto a `.webp` (≤ 200 KB cada una) en `public/assets/world/`.

## Flujo

1. Pega la **guía de estilo** en un chat nuevo de Gemini y, en el mismo chat, los 6 prompts (así el set queda coherente).
2. Si una imagen no encaja, pide el ajuste en el mismo chat.
3. Guarda cada una en `new_assets/world/` con el nombre de la tabla (`combat-back.png`, etc.) y avísame: yo las optimizo, las pongo en `public/assets/world/` y las integro.

## Guía de estilo (común)

```
Estilo para fondos de un videojuego de fantasía: ilustración digital pintada a mano, atmosférica y detallada, con profundidad (primer plano, plano medio, lejanía) y bruma luminosa.
Paleta: verdes bosque y verde hoja (#7ccf6a), runas y brillos en cian (#4fd1c5), toques de oro (#d9a94a) solo en luces cálidas (velas, brasas). Sin morado, sin rojo intenso.
Mundo: naturaleza antigua, ruinas de piedra cubiertas de musgo, tecnología rúnica misteriosa, ambiente nocturno de valle. Símbolos propios y genéricos (runas, hojas, espirales, constelaciones).
Técnica de color: FONDO NEGRO PURO (#000000) y todo lo visible con luz propia o luz de borde; nada de siluetas oscuras (se volverían invisibles). Los bordes de la imagen se desvanecen a negro.
Composición: 16:9 horizontal. Zona central tranquila y menos cargada (ahí va el contenido de una app); la riqueza visual hacia los lados y los bordes.
Sin texto, sin marco, sin marca de agua, sin personajes humanos, sin UI.
NO uses: Trifuerza, Espada Maestra, símbolos o diseños reconocibles de Nintendo/Zelda, ni escritura Hylian.
```

## Combate — arena de duelo (`combat-back`, `combat-front`)

| Archivo | Prompt |
|---|---|
| `combat-back.png` | `Una arena de duelo antigua al anochecer: un círculo de piedra cubierto de musgo con runas cian grabadas en el suelo que brillan tenuemente, columnas rotas alrededor, a lo lejos un bosque entre bruma luminosa y dos espadas gigantes cruzadas y clavadas en una colina lejana, con un destello cian en el cruce. Chispas doradas flotando en el aire. Centro despejado.` |
| `combat-front.png` | `Marco de primer plano para una arena de duelo: ramas retorcidas con hojas iluminadas por luz de borde verde y cian cayendo desde las dos esquinas superiores, y en las esquinas inferiores piedras musgosas, helechos y un estandarte de tela roto, todo con luz propia. El centro de la imagen completamente negro y vacío. Algunas brasas doradas flotando.` |

## Inbox — las ideas llegan (`inbox-back`, `inbox-front`)

| Archivo | Prompt |
|---|---|
| `inbox-back.png` | `Un claro de bosque nocturno donde las ideas llegan volando: pergaminos enrollados y faroles de papel luminosos que ascienden flotando hacia un cielo estrellado, un altar o buzón de piedra antigua con una runa cian en el centro lejano que los recibe, luciérnagas y luces fatuas cian, un árbol enorme con un hueco luminoso al fondo. Atmósfera serena y onírica. Centro despejado.` |
| `inbox-front.png` | `Marco de primer plano: faroles de papel y enredaderas colgando desde el borde superior, hongos luminosos cian y helechos en el borde inferior, hojas y plumas flotando cerca de la cámara, todo con luz propia. El centro completamente negro y vacío.` |

## Estrategia — mesa de mapas (`strategy-back`, `strategy-front`)

| Archivo | Prompt |
|---|---|
| `strategy-back.png` | `Una sala de estrategia antigua vista en ligero picado: una mesa circular de piedra con un mapa de un valle grabado en relieve, fichas con runas cian dispuestas sobre el mapa, líneas de constelaciones doradas y cian flotando en el aire sobre la mesa, velas cálidas en los bordes, anillos de astrolabio girando muy tenues al fondo. Todo con luz propia sobre negro puro. Centro despejado.` |
| `strategy-front.png` | `Marco de primer plano: arcos de astrolabio y anillos de runas flotando en las esquinas, pergaminos de mapa colgando del borde superior, velas con luz dorada en las esquinas inferiores, todo con luz de borde verde y cian. El centro completamente negro y vacío.` |
