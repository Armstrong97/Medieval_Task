import type { ComponentType } from 'react'
import { Brain, Car, BookOpen, Gamepad2, Heart, Home, Sparkles, type LucideProps } from 'lucide-react'

const ICONS: Record<string, ComponentType<LucideProps>> = {
  brain: Brain,
  car: Car,
  'book-open': BookOpen,
  'gamepad-2': Gamepad2,
  heart: Heart,
  home: Home,
}

export function CategoryIcon({ iconName, ...props }: { iconName: string } & LucideProps) {
  const Icon = ICONS[iconName] ?? Sparkles
  return <Icon {...props} />
}
