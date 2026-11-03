# Ideas

Ideas sueltas para evaluar más adelante. No son compromisos: lo acordado vive en `pendings.md`.

## Generación de imágenes con la API de Gemini (2026-11-01)

Usar la API de Gemini para generar imágenes dentro de la app (por ejemplo avatares personalizados) y guardarlas en Supabase.

- **Generar**: modelos de imagen de Gemini (Imagen / Gemini con salida de imagen) vía API de Google AI Studio; devuelve bytes en base64. Puede requerir facturación habilitada: revisar precios y límites vigentes.
- **API key**: nunca en el frontend ni en `VITE_*`. Va como secret de una Edge Function (mismo patrón que `VAPID_PRIVATE_KEY`).
- **Guardar**: Supabase Storage (bucket), no en una columna de Postgres. En la tabla solo la ruta (p. ej. `avatar_path text`). RLS en el bucket para que cada usuario vea y suba solo lo suyo; si son assets de catálogo, bucket público de solo lectura.
- **Flujo**: cliente → Edge Function `generate-image` (prompt) → Gemini → sube a Storage → devuelve la ruta → el cliente la muestra.
- **Alternativa más simple**: para el set fijo (armas, jefes, avatares de clase, ver `pendings.md`) basta un script local que genere una vez, optimice (`scripts/optimize-rpg-assets.mjs`) y deje los archivos en `public/assets/rpg/`. La generación en vivo solo vale la pena si el usuario genera imágenes dentro de la app.
- **Riesgos**: costo por uso, moderación de contenido, y respetar la restricción de IP del rediseño (nada de arte de Nintendo).

## Menú inspirado en una tableta rúnica (2026-11-01)

Menú con aspecto de dispositivo de pantalla cian con runas (inspirado en la tableta de BotW/TotK; **sin** nombre "Sheikah", ojo ni diseño exacto: ver restricción de IP en `pendings.md`).

- **Nivel A (bajo)**: restilizar el menú actual (marco de piedra, pantalla con brillo cian, runas en el ítem activo). CSS/SVG.
- **Nivel B (medio)**: hub a pantalla completa con cuadrícula de íconos rúnicos y animación de encendido; reemplaza el botón «Más» en móvil. Usa los íconos de `nav/` en regeneración.
- **Nivel C (medio-alto)**: escaneo al abrir, sonidos, registro de misiones.
- **Ojo TDAH**: Combate/Inbox/Estrategia/Grimorio siguen a un toque; la tableta es el hub del resto, no la única puerta.

## Movimiento con propósito: catálogo conceptual (2026-11-04)

Qué más podría moverse en la app, agrupado por el papel que cumple. Criterio: el movimiento que más sirve comunica **progreso** (lo decorativo constante cansa con TDAH); todo respeta «Efectos» y `prefers-reduced-motion`, y nada retrasa una acción rápida (capturar, completar).

- **Recompensa (por evento)**: orbe de XP que vuela a la barra o rango; subida de nivel/rango con más teatro (ya existe `AchievementCelebration`); cofre de loot que se abre y suelta el objeto; fases del jefe (75/50/25 %) con sacudida del cofre y grieta en la barra.
- **Progreso hecho mundo**: enredadera de la racha que crece un poco por día (se marchita sin culpa si se pierde y rebrota; reusa `growVine`); cadenas con eslabones que se encienden en secuencia y una chispa que viaja por el enlace; jefes de proyecto que respiran y se tambalean al bajar su vida.
- **Mundo vivo (constante, muy sutil)**: brisa en las hojas, luz de antorcha / runas que laten, rayos de luz y motas. **Empezado en el fondo de Combate (`CombatWorld`)**; falta extenderlo a Progreso e Inbox vacío si gusta.
- **Interacción y transición**: sello de lacre al despachar una carta en Estrategia; pergamino que se desenrolla al abrir el modal de misión; mazo con inercia y rebote; marcar una submisión como encender una runa; captura rápida que se «absorbe» en el Inbox.
- **Tiempo y urgencia**: reloj de arena o anillo rúnico en Modo Foco; brasas/llama que se acercan al plazo; misión vencida («Rescate») agrietada que se «repara» al reprogramarla.
- **Personajes**: héroe con respiración (idle) en Combate; compañero (brote/espíritu) que crece con el nivel y celebra; escena de duelo en el inicio (lo más caro: el arte).
- **Orden sugerido**: orbe de XP + enredadera de la racha → cadenas que se encienden + fases del jefe → sello de lacre → compañero.
- **Evitar**: animar fondos y listas largas de forma continua (cansa y gasta batería) y cualquier cosa que retrase una acción rápida.

## Más carácter gráfico y movimiento (2026-11-01)

**Estado (2026-11-04)**: hechos enredaderas del menú, transiciones, combate reactivo e interruptor «Efectos» (ver HANDOFF §24). Faltan enredaderas en marcos/login, tableta rúnica y personajes peleando.

Que la app se sienta viva, como un juego: personajes animados, enredaderas, transiciones.

- **Enredaderas** en menús y marcos: SVG con trazo que crece (`stroke-dashoffset`) y hojas que se mecen. Esfuerzo bajo. **Hecho en el menú; faltan marcos de tarjetas y login.**
- **Transiciones entre pantallas**: CSS o View Transitions API, sin librería. Bajo-medio. **Hecho (CSS).**
- **Combate reactivo** en el Battle HUD: el héroe embiste al completar una misión, el jefe parpadea al recibir daño, destello en el golpe final. Reusa arte existente. Medio. El movimiento refleja progreso real (gamificación, no decoración). **Hecho con el arma como protagonista; el héroe como personaje queda para cuando haya arte.**
- **Dos personajes peleando en el inicio**: lo caro es el arte (poses consistentes), no el código. Opciones: siluetas vectoriales animadas con CSS, Rive/Lottie, o spritesheets ilustrados. Alto; dejar para el final.
- **Límites**: interruptor de «Efectos» en el perfil (hecho) además de `prefers-reduced-motion`; animar solo `transform`/`opacity`; precache ≤ 2 MB por archivo.
- **Orden sugerido**: enredaderas y transiciones → combate reactivo → tableta (A y luego B) → personajes peleando.
