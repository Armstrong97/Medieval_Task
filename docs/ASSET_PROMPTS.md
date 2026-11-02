# Prompts de assets — rediseño "Hyrule" (Fase 5)

Guía para regenerar en Gemini los 15 assets (13 existentes + 2 nuevos: `projects` y `chains`) de `public/assets/rpg/` en paleta verde/rúnica. Pendiente descrito en `pendings.md`.

## Flujo

1. Pega la **guía de estilo** al inicio de cada conversación nueva en Gemini (o reutiliza el mismo chat para que el set quede coherente).
2. Pega el prompt de cada asset. Si el resultado no encaja, pide ajustes en el mismo chat en vez de empezar de cero.
3. Guarda cada imagen en `assets-raw/<carpeta>/<nombre>.png` (mismo nombre que la tabla de abajo). Esa carpeta no se commitea.
4. Avísame y yo optimizo (`scripts/optimize-rpg-assets.mjs`), quito el fondo y los integro.

## Guía de estilo (común a todos)

```
Estilo para un set de íconos de videojuego de fantasía, ilustración digital pintada a mano, aspecto limpio y legible a tamaño pequeño.
Paleta: verdes bosque y verde hoja (#7ccf6a) como color dominante, detalles rúnicos en cian (#4fd1c5), metal piedra-verdosa y madera oscura. Oro (#d9a94a) SOLO en objetos de recompensa.
Mundo: naturaleza antigua y ruinas cubiertas de musgo, tecnología rúnica misteriosa, atmósfera de valle al amanecer. Símbolos propios y genéricos (runas, hojas, semillas, espirales). Sin morado.
Composición: un solo objeto centrado, vista de frente o ligeramente en tres cuartos, silueta clara, contorno definido, iluminación suave con un brillo rúnico cian sutil.
Fondo: color liso verde muy oscuro (#0b1410), sin degradados ni escenario, sin texto, sin marco, sin marca de agua, sin personajes humanos.
Formato: imagen cuadrada 1:1.
NO uses: Trifuerza, Espada Maestra, símbolos o diseños reconocibles de Nintendo/Zelda, ni la escritura Hylian.
```

## Armas (`weapons/`, se muestran a 256 px)

La arma indica el tamaño de la misión: daga = pequeña, espada = mediana, mandoble = grande. Deben leerse como una progresión de tamaño y poder.

| Archivo | Prompt |
|---|---|
| `dagger.png` | `Una daga corta con hoja en forma de hoja de árbol, de metal verdoso, empuñadura de madera envuelta en cuerda, un único brillo rúnico cian en el filo. Sencilla y ágil.` |
| `sword.png` | `Una espada de una mano con hoja de piedra-metal verdosa grabada con una línea de runas cian, guarda con forma de dos hojas abiertas, empuñadura de cuero oscuro. Equilibrada y elegante.` |
| `greatsword.png` | `Un mandoble enorme a dos manos, hoja ancha de metal antiguo cubierta de musgo en la base, runas cian brillantes recorriendo toda la hoja y un detalle de oro en el pomo, guarda grande con forma de raíces. Imponente y pesado.` |

## Jefes (`bosses/`, se muestran a 512 px)

| Archivo | Prompt |
|---|---|
| `dragon.png` | `Un dragón ancestral de escamas verde oscuro con raíces y musgo creciendo sobre su lomo, ojos cian brillantes, alas plegadas, cuernos como ramas retorcidas. Mirada amenazante pero majestuosa. Busto o cuerpo completo centrado.` |
| `lich.png` | `Un liche guardián del bosque: figura encapuchada con túnica verde descolorida, rostro de calavera cubierto de enredaderas, ojos de fuego cian, báculo rematado en un cristal rúnico. Misterioso y solemne, no gore.` |

## Botín (`loot/`, 256 px)

Es una recompensa: aquí SÍ va el oro.

| Archivo | Prompt |
|---|---|
| `chest.png` | `Un cofre del tesoro de madera oscura con herrajes de oro viejo, una runa cian brillando en la cerradura, musgo en las esquinas, tapa ligeramente abierta con luz dorada saliendo de dentro.` |

## Íconos del menú (`nav/`, 256 px)

Se ven pequeños dentro del menú lateral y la barra móvil: siluetas muy simples y de alto contraste, sin detalle fino.

| Archivo | Para qué sirve | Prompt |
|---|---|---|
| `combat.png` | Combate | `Dos espadas cruzadas de metal verdoso con un destello rúnico cian en el cruce.` |
| `inbox.png` | Bandeja de captura | `Una bandeja o cesta de madera con un pergamino enrollado y una semilla brillante en cian cayendo dentro.` |
| `strategy.png` | Mesa de Estrategia | `Una mesa de piedra con un mapa pequeño y fichas de runas dispuestas encima, brillo cian suave.` |
| `grimoire.png` | Grimorio (todas las misiones) | `Un libro antiguo de tapas de cuero verde oscuro con una hoja grabada en la portada y runas cian en el borde, entreabierto.` |
| `calendar.png` | Calendario | `Un disco de piedra tallado con símbolos de fases solares y lunares y una aguja rúnica cian, como un reloj de sol antiguo.` |
| `progress.png` | Progreso | `Un brote que crece de una piedra rúnica, con tres hojas ascendentes y un destello dorado en la punta.` |
| `followups.png` | Follow-ups | `Un ave mensajera pequeña de plumas verdes con un pergamino atado a la pata, en vuelo.` |
| `projects.png` | Proyectos (nuevo; cada proyecto es un «jefe de mazmorra») | `Una entrada de mazmorra de piedra cubierta de musgo y raíces, con una puerta en arco entreabierta que deja ver un resplandor cian y una runa sobre el dintel.` |
| `chains.png` | Cadenas (nuevo; pasos que se desbloquean) | `Tres eslabones de piedra rúnica conectados en cadena, el primero encendido en cian y los siguientes apagados, con una pequeña hoja brotando entre los eslabones.` |

## Después (no incluido en esta tanda)

- **Avatares de clase** (6 clases, idealmente 4 variantes por rango): depende de que este set esté aprobado. Clases: Nigromante, Bárbaro, Mago, Pícaro, Clérigo y Druida. Se redactarán aparte.

## Checklist al recibir las imágenes

- Misma paleta y mismo "peso" visual en todo el set (los de `nav/` entre sí, las armas entre sí).
- Sin marca de agua ni sparkle de Gemini en la esquina (los originales actuales lo traen abajo a la derecha).
- Sin elementos de Nintendo/Zelda.
- Se leen bien a 256 px sobre el fondo claro y el oscuro de la app.
