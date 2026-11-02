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

## Más carácter gráfico y movimiento (2026-11-01)

Que la app se sienta viva, como un juego: personajes animados, enredaderas, transiciones.

- **Enredaderas** en menús y marcos: SVG con trazo que crece (`stroke-dashoffset`) y hojas que se mecen. Esfuerzo bajo.
- **Transiciones entre pantallas**: CSS o View Transitions API, sin librería. Bajo-medio.
- **Combate reactivo** en el Battle HUD: el héroe embiste al completar una misión, el jefe parpadea al recibir daño, destello en el golpe final. Reusa arte existente. Medio. El movimiento refleja progreso real (gamificación, no decoración).
- **Dos personajes peleando en el inicio**: lo caro es el arte (poses consistentes), no el código. Opciones: siluetas vectoriales animadas con CSS, Rive/Lottie, o spritesheets ilustrados. Alto; dejar para el final.
- **Límites**: interruptor de «Efectos» en el perfil además de `prefers-reduced-motion`; animar solo `transform`/`opacity`; precache ≤ 2 MB por archivo.
- **Orden sugerido**: enredaderas y transiciones → combate reactivo → tableta (A y luego B) → personajes peleando.
