// Los assets que llegaron de Imagen 3 vienen a 2048x2048 sin comprimir
// (4.8-7.7 MB cada uno) — inviable para una PWA offline-first (el build
// falla directo, el límite de precache de vite-plugin-pwa es 2 MB por
// archivo, y aunque no fallara, 37 MB de íconos rompería el requisito de
// carga rápida del spec original). Se re-comprimen acá a un tamaño real de
// uso en la UI, sobreescribiendo los originales.
import sharp from 'sharp'

const TARGETS = [
  { path: 'public/assets/rpg/weapons/dagger.png', size: 256 },
  { path: 'public/assets/rpg/weapons/sword.png', size: 256 },
  { path: 'public/assets/rpg/weapons/greatsword.png', size: 256 },
  { path: 'public/assets/rpg/bosses/dragon.png', size: 512 },
  { path: 'public/assets/rpg/bosses/lich.png', size: 512 },
  { path: 'public/assets/rpg/loot/chest.png', size: 256 },
  { path: 'public/assets/rpg/nav/combat.png', size: 256 },
  { path: 'public/assets/rpg/nav/inbox.png', size: 256 },
  { path: 'public/assets/rpg/nav/strategy.png', size: 256 },
  { path: 'public/assets/rpg/nav/grimoire.png', size: 256 },
  { path: 'public/assets/rpg/nav/calendar.png', size: 256 },
  { path: 'public/assets/rpg/nav/progress.png', size: 256 },
  { path: 'public/assets/rpg/nav/followups.png', size: 256 },
]

for (const { path, size } of TARGETS) {
  const buffer = await sharp(path)
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer()
  await sharp(buffer).toFile(path)
  console.log(`${path} -> ${(buffer.length / 1024).toFixed(0)} KB`)
}
