// Sonda de latencia de la API de Gemini, fuera de Supabase. Sirve para aislar
// por qué una petición tarda o falla (modelo, esquema de respuesta, razonamiento).
//
// Uso (PowerShell, en tu propia terminal, la key no debe quedar en el chat):
//   $env:GEMINI_API_KEY = "tu-key"
//   $env:GEMINI_MODEL = "gemini-3.5-flash-lite"   # opcional
//   node scripts/gemini-probe.mjs list                      # modelos disponibles en tu cuenta
//   $env:GEMINI_MODELS = "modelo-a,modelo-b"; node scripts/gemini-probe.mjs   # compara varios
const key = process.env.GEMINI_API_KEY
const models = (process.env.GEMINI_MODELS ?? process.env.GEMINI_MODEL ?? 'gemini-3.5-flash-lite').split(',').map((m) => m.trim())
if (!key) {
  console.error('Falta GEMINI_API_KEY en el entorno.')
  process.exit(1)
}

if (process.argv[2] === 'list') {
  const res = await fetch('https://generativelanguage.googleapis.com/v1beta/models?pageSize=200', { headers: { 'x-goog-api-key': key } })
  const data = await res.json()
  for (const m of data.models ?? []) {
    if (m.supportedGenerationMethods?.includes('generateContent')) console.log(m.name.replace('models/', ''))
  }
  process.exit(0)
}

const schema = {
  type: 'OBJECT',
  properties: { size: { type: 'STRING', enum: ['small', 'medium', 'large'] }, reason: { type: 'STRING' } },
  required: ['size', 'reason'],
}
const prompt = 'Tarea: "Pagar el recibo de la luz". ¿Es small, medium o large? Responde con una razón breve.'

const variants = [
  { name: 'A) texto plano, sin esquema', config: {} },
  { name: 'B) JSON con esquema (como la app)', config: { responseMimeType: 'application/json', responseSchema: schema } },
]

for (const model of models) for (const v of variants) {
  const started = Date.now()
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 2048, ...v.config },
      }),
      signal: AbortSignal.timeout(60_000),
    })
    const body = await res.text()
    const ms = Date.now() - started
    let usage = ''
    try {
      usage = JSON.stringify(JSON.parse(body).usageMetadata ?? {})
    } catch {
      // cuerpo no JSON: se muestra recortado abajo
    }
    console.log(`[${model}] ${v.name}\n  HTTP ${res.status} en ${ms} ms\n  usage: ${usage}\n  ${body.slice(0, 200).replace(/\s+/g, ' ')}\n`)
  } catch (err) {
    console.log(`[${model}] ${v.name}\n  FALLÓ tras ${Date.now() - started} ms: ${err instanceof Error ? err.name : err}\n`)
  }
}
