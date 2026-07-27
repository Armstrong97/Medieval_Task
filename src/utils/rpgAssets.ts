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

export const NAV_ICONS = {
  combat: '/assets/rpg/nav/combat.png',
  inbox: '/assets/rpg/nav/inbox.png',
  strategy: '/assets/rpg/nav/strategy.png',
  grimoire: '/assets/rpg/nav/grimoire.png',
  calendar: '/assets/rpg/nav/calendar.png',
  progress: '/assets/rpg/nav/progress.png',
  followups: '/assets/rpg/nav/followups.png',
} as const

export type NavIconKey = keyof typeof NAV_ICONS
