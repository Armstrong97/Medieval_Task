import type { TaskSize } from '@/types/database.types'

export const WEAPON_ICONS: Record<TaskSize, string> = {
  small: '/assets/rpg/weapons/dagger.png',
  medium: '/assets/rpg/weapons/sword.png',
  large: '/assets/rpg/weapons/greatsword.png',
}

export const BOSS_AVATARS = {
  dragon_default: '/assets/rpg/bosses/dragon.png',
  lich_default: '/assets/rpg/bosses/lich.png',
} as const

export function bossAvatarSrc(key: string): string {
  return (BOSS_AVATARS as Record<string, string | undefined>)[key] ?? BOSS_AVATARS.dragon_default
}

export const LOOT_ICONS = {
  chest_phase: '/assets/rpg/loot/chest.png',
} as const
