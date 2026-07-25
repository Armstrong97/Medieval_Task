import sharp from 'sharp'
import { mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const publicDir = join(__dirname, '..', 'public', 'icons')
mkdirSync(publicDir, { recursive: true })

const anySvg = join(__dirname, 'icon-any.svg')
const maskableSvg = join(__dirname, 'icon-maskable.svg')

await Promise.all([
  sharp(anySvg).resize(192, 192).png().toFile(join(publicDir, 'icon-192.png')),
  sharp(anySvg).resize(512, 512).png().toFile(join(publicDir, 'icon-512.png')),
  sharp(anySvg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png')),
  sharp(maskableSvg).resize(512, 512).png().toFile(join(publicDir, 'icon-512-maskable.png')),
])

console.log('Iconos generados en public/icons/')
