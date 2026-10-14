import { Axe, BookOpen, Brain, Gamepad2, Leaf, Shield, type LucideIcon } from 'lucide-react'

// Un ícono vectorial por clase (categoría). Provisional hasta que existan
// avatares de clase ilustrados (ver pendings.md).
export const CLASS_ICONS: Record<string, LucideIcon> = {
  Concentrix: Brain,
  Delorean: Axe,
  Estudios: BookOpen,
  Hobbies: Gamepad2,
  Personal: Shield,
  Hogar: Leaf,
}
