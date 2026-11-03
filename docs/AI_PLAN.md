# Plan: asistente IA de Questly (Fase 11)

Objetivo: que la app sugiera y aprenda del uso del usuario, sin quitarle el control. **La IA solo sugiere; toda escritura pasa por una acción explícita del usuario.** La app funciona igual con la IA apagada o caída.

## Principios

- **No se entrena nada.** El "aprendizaje" son (a) estadísticas del historial calculadas en SQL y (b) ejemplos reales del propio usuario que se pasan como contexto en cada petición. El LLM solo redacta/decide con ese contexto.
- **Sin culpa.** El prompt del sistema prohíbe tono de reproche, urgencia artificial y lenguaje punitivo (misma regla de diseño que el resto de la app).
- **Mínimo de datos.** Se envían títulos, clase, tamaño y fechas. Nunca email, ni nombres de aliados de follow-up.
- **Opt-in.** Interruptor «Asistente IA» en el perfil, apagado por defecto, con una línea clara de qué se envía.

## Arquitectura

```
Cliente ──(JWT del usuario)──> Edge Function `assistant` ──> Gemini API
                                   │  GEMINI_API_KEY (secret)
                                   └──> Postgres con el JWT del usuario (RLS)
```

- La key de Gemini vive solo como secret de la función (`supabase secrets set GEMINI_API_KEY=...`). Nunca en `VITE_*`.
- La función **no usa `service_role`**: lee con el JWT del usuario, así que RLS limita lo que puede ver.
- Server-side: verifica sesión, que el usuario tenga la IA activada (`ai_settings.enabled`) y descuenta cuota (`ai_consume_quota`, función SQL atómica) antes de llamar a Gemini.
- Modelo configurable con el secret `GEMINI_MODEL` (por defecto `gemini-3.5-flash-lite`; verificar en AI Studio cuál está vigente).

## Seguridad

| Riesgo | Medida |
|---|---|
| Key expuesta | Solo secret de la Edge Function |
| Acceso a datos ajenos | JWT del usuario + RLS; la función nunca usa `service_role` |
| Inyección de prompt (títulos/notas son datos no confiables) | Datos delimitados y marcados como datos; salida con esquema JSON; la IA no ejecuta acciones |
| Salida maliciosa/rota | Validación estricta en servidor (ids contra lista permitida, enums, longitudes) antes de devolver |
| Abuso / costo | Cuota diaria por usuario (`ai_usage`), tope de tamaño de entrada, timeout |
| Fuga por errores | Nunca se devuelve el cuerpo de error de Gemini; se registra solo en el servidor |
| Privacidad | Opt-in, datos mínimos. **Nivel gratuito de la API: Google puede usar lo enviado para mejorar sus productos; no usar datos sensibles reales hasta pasar a nivel de pago** |

## Fases

0. **Base** (hecha en código): migración (`ai_settings`, `ai_usage`, `ai_consume_quota`), Edge Function `assistant`, cliente (`src/features/ai/`), interruptor en el perfil.
1. **Triage asistido y micro-pasos** (hecha en código): «Sugerir con IA» en la Mesa de Estrategia (clase, proyecto, arma y plazo, con motivo breve, usando las últimas decisiones del usuario como ejemplos) y «Sugerir micro-pasos» en el editor de misiones.
2. **Cadenas desde un objetivo** (hecha en código): «Sugerir etapas con IA» propone lo que viene después de una misión (2-5 etapas, 1-3 pasos cada una, plazos en días) con vista previa antes de aplicar; en la Mesa de Estrategia (borrador) y en el editor (solo si la misión aún no tiene cadena). **Captura en lenguaje natural**: descartada como función aparte, porque «Sugerir con IA» de la Mesa ya entiende fechas escritas en el título.
3. **Patrones y recomendaciones** (hecha en código, ver HANDOFF §21): estadísticas calculadas en SQL (`ai_user_stats`) e interpretadas por la IA en la tarjeta «Tu ritmo» de Progreso, con aviso de misiones atascadas («¿las partimos?»). Pendiente de esta fase: «Elegir por mí» inteligente y el resumen semanal automático; segunda ronda posible con `pgvector` para tareas parecidas.
4. **Asistente conversacional** con herramientas, solo si lo anterior demuestra valor (cada acción de escritura pediría confirmación).

## Pasos manuales (Fase 0 y 1)

1. SQL Editor de Supabase: correr `supabase/migrations/20261101000001_fase11_asistente_ia.sql`.
2. Crear una API key en Google AI Studio y: `npx supabase secrets set GEMINI_API_KEY=<key> --project-ref dlztajgoljayfmqjdqio` (opcional: `GEMINI_MODEL`).
3. `npx supabase functions deploy assistant --project-ref dlztajgoljayfmqjdqio`.
4. En la app: Perfil → activar «Asistente IA».

## Pendiente conocido

- Pasar a nivel de pago antes de usar datos reales sensibles.
- Cuota diaria fija (60 llamadas por usuario) definida en `index.ts`; ajustar con uso real.

## Costo estimado por usuario (2026-11-04)

Modelo `gemini-3.5-flash-lite`, nivel de pago, estándar: **US$ 0.30 por 1M tokens de entrada y US$ 2.50 por 1M de salida** (página oficial de precios de AI Studio; verificar antes de decidir precios, cambian). Descuentos que no aplican: lotes (-50%, no sirve para llamadas interactivas) y caché de contexto (nuestro prefijo fijo es de unos 500 tokens, demasiado corto para compensar el almacenamiento).

Tokens medidos sobre los prompts reales (entrada / salida, usuario con «Sobre mí» de ~300 caracteres, 6 clases, 4 proyectos y 15 ejemplos): triage 1 641 / 190, micro-pasos 581 / 120, etapas de cadena 610 / 200, «Tu ritmo» 1 253 / 330.

| Perfil | Llamadas/mes | Costo/mes |
|---|---|---|
| Ligero (~2 capturas/día) | ~41 | US$ 0.04 |
| **Promedio (~5 capturas/día)** | **~120** | **US$ 0.11** |
| Intenso (~12 capturas/día) | ~336 | US$ 0.31 |
| Tope diario (120 triages cada día) | 3 600 | US$ 3.48 |

Referencia: ~US$ 0.93 por cada 1 000 llamadas; la mitad del costo es salida. **El perfil de uso es un supuesto**: medirlo con `select avg(calls), max(calls) from ai_usage` tras unas semanas de uso real. No incluye Supabase, correo ni hosting. El triage automático por carta es ~70 % de las llamadas.
