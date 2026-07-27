// Genera PROJECT_SNAPSHOT.md en la raíz del proyecto: un único archivo con
// la estructura de carpetas + todo el código fuente relevante, para
// compartir con Gemini y mantener la arquitectura alineada entre las dos
// capas (Gemini = diseño, Claude = ejecución — ver HANDOFF.md sección 14).
//
// Usa `git ls-files` (trackeados) + `git ls-files --others --exclude-standard`
// (nuevos sin commitear, pero no ignorados) como fuente de verdad de qué
// archivos existen — así hereda gratis las exclusiones de .gitignore
// (node_modules, dist, dev-dist, .env.local, etc.) sin perderse el trabajo
// que todavía no se commiteó, y le aplica un segundo filtro para sacar
// binarios, lockfiles y specs pesadas en Markdown.
import { execSync } from 'node:child_process'
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { extname } from 'node:path'

const ROOT = process.cwd()
const OUTPUT = 'PROJECT_SNAPSHOT.md'

// Extensiones de texto/código que sí queremos volcar en el snapshot.
const TEXT_EXTENSIONS = new Set([
  '.ts', '.tsx', '.js', '.jsx', '.mjs', '.cjs',
  '.css', '.json', '.toml', '.sql', '.html',
])

// Nombres/rutas puntuales a excluir aunque tengan extensión de texto.
const EXCLUDE_EXACT = new Set([
  'package-lock.json',
  'PROJECT_SNAPSHOT.md',
])

// Prefijos de ruta a excluir por completo (config de editor/herramientas,
// no código de la app).
const EXCLUDE_PREFIXES = ['.claude/']

const LANG_BY_EXT = {
  '.ts': 'typescript',
  '.tsx': 'tsx',
  '.js': 'javascript',
  '.jsx': 'jsx',
  '.mjs': 'javascript',
  '.cjs': 'javascript',
  '.css': 'css',
  '.json': 'json',
  '.toml': 'toml',
  '.sql': 'sql',
  '.html': 'html',
}

// Combina trackeados + no-trackeados-pero-no-ignorados: con solo `git
// ls-files` se pierde cualquier archivo nuevo que todavía no se commiteó
// (en este proyecto, eso es bastante — módulos enteros de la Fase 7 seguían
// sin commit al generar esto). `--others --exclude-standard` respeta
// .gitignore igual que el tracking normal, así que node_modules/dist/etc.
// siguen afuera sin tener que reimplementar esa lógica a mano.
function listProjectFiles() {
  const tracked = execSync('git ls-files', { cwd: ROOT, encoding: 'utf-8' })
  const untracked = execSync('git ls-files --others --exclude-standard', {
    cwd: ROOT,
    encoding: 'utf-8',
  })
  const combined = new Set(
    [...tracked.split('\n'), ...untracked.split('\n')].filter(Boolean),
  )
  return [...combined]
}

function shouldInclude(relPath) {
  if (EXCLUDE_EXACT.has(relPath)) return false
  if (EXCLUDE_PREFIXES.some((prefix) => relPath.startsWith(prefix))) return false
  // .md explícitamente afuera (specs pesadas: HANDOFF.md, spec-app-*.md, etc).
  if (relPath.endsWith('.md')) return false
  return TEXT_EXTENSIONS.has(extname(relPath))
}

function buildTree(paths) {
  const root = {}
  for (const p of paths) {
    const parts = p.split('/')
    let node = root
    for (const part of parts) {
      node[part] ??= {}
      node = node[part]
    }
  }
  const lines = []
  function walk(node, prefix) {
    const entries = Object.keys(node).sort((a, b) => a.localeCompare(b))
    entries.forEach((name, i) => {
      const isLast = i === entries.length - 1
      lines.push(`${prefix}${isLast ? '└── ' : '├── '}${name}`)
      const childKeys = Object.keys(node[name])
      if (childKeys.length > 0) {
        walk(node[name], `${prefix}${isLast ? '    ' : '│   '}`)
      }
    })
  }
  walk(root, '')
  return lines.join('\n')
}

const allFiles = listProjectFiles()
const included = allFiles
  // git ls-files puede listar un archivo trackeado que se borró del disco
  // pero todavía no se commiteó la eliminación — se lo salta en silencio.
  .filter((p) => existsSync(`${ROOT}/${p}`))
  .filter(shouldInclude)
  .sort((a, b) => a.localeCompare(b))

const parts = []
parts.push('# Project Snapshot — Productividad RPG\n')
parts.push(
  `> Generado automáticamente con \`node scripts/generate-project-snapshot.mjs\` el ${new Date().toISOString().slice(0, 10)}. ` +
    'Incluye código fuente + config; excluye node_modules/dist/.env/binarios/specs en Markdown. ' +
    'No editar a mano — se regenera.\n',
)
parts.push('## Estructura de carpetas (archivos incluidos en este snapshot)\n')
parts.push('```\n' + buildTree(included) + '\n```\n')
parts.push('## Archivos\n')

for (const relPath of included) {
  const abs = `${ROOT}/${relPath}`
  const lang = LANG_BY_EXT[extname(relPath)] ?? ''
  let content
  try {
    content = readFileSync(abs, 'utf-8')
  } catch (err) {
    console.warn(`No se pudo leer ${relPath}:`, err.message)
    continue
  }
  parts.push(`### ${relPath}\n`)
  parts.push('```' + lang + '\n' + content.replace(/\n?$/, '\n') + '```\n')
}

writeFileSync(`${ROOT}/${OUTPUT}`, parts.join('\n'), 'utf-8')
console.log(`${OUTPUT} generado con ${included.length} archivos.`)
