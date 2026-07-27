import { useState } from 'react'
import { Flame, Shield } from 'lucide-react'
import { useCategories, useProjects } from '@/features/projects/hooks'
import {
  useCategoryXp,
  useClassRanks,
  useStreak,
  useTodayQuests,
} from '@/features/gamification/hooks'
import { ClassDetailModal } from '@/features/gamification/components/ClassDetailModal'
import { LootShowcase } from '@/features/gamification/components/LootShowcase'
import { ProjectBossCard } from '@/features/projects/components/ProjectBossCard'
import type { Category, QuestType } from '@/types/database.types'

// useTodayQuests solo devuelve daily_triage/daily_priority (ver fetchTodayQuests) —
// la tabla quests no tiene columna "title", así que se deriva acá.
const QUEST_TITLES: Record<QuestType, string> = {
  daily_triage: 'Vaciar el Inbox (Triage Diario)',
  daily_priority: 'Misión Prioritaria del Día',
  weekly_project: 'Proyecto Semanal',
}

export function ProgressPage() {
  const { data: streak } = useStreak()
  const { data: todayQuests } = useTodayQuests()
  const { data: categories } = useCategories()
  const { data: categoryXp } = useCategoryXp()
  const { data: classRanks } = useClassRanks()
  const { data: projects } = useProjects()

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)

  // Cálculo de nivel global acumulado
  const globalLevel = (categoryXp ?? []).reduce((acc, curr) => acc + curr.current_level, 0) || 1

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8">
      {/* Header Titular */}
      <header className="mb-10 flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/70">
            Estadísticas de Héroe
          </p>
          <h1 className="font-display text-3xl font-black uppercase tracking-widest text-fg md:text-4xl">
            Salón de Héroes
          </h1>
        </div>
        <div className="text-right">
          <span className="block font-mono text-[10px] uppercase text-fg-muted">Nivel Global</span>
          <span className="font-display text-3xl font-black text-accent">{globalLevel}</span>
        </div>
      </header>

      {/* Grid Principal en 2 Columnas Responsivas */}
      <main className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* COLUMNA IZQUIERDA (5 Cols): Azañas & Racha */}
        <div className="space-y-6 lg:col-span-5">
          {/* Tarjeta de Racha Activa */}
          <section className="card-stone-bg streak-glow-card rounded-2xl border-2 border-accent/40 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Flame className="h-10 w-10 text-accent animate-bounce" />
                <div>
                  <h2 className="font-display text-2xl font-bold text-accent">
                    {streak?.current_streak_days ?? 0} DÍAS
                  </h2>
                  <p className="font-mono text-[10px] uppercase text-fg-muted">
                    Racha de Fuego Activa
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-black/40 px-4 py-2 text-center">
                <span className="flex items-center gap-1 font-mono text-base font-bold text-sky-400">
                  <Shield className="h-4 w-4 fill-sky-400" />
                  {streak?.shields_available ?? 0}
                </span>
                <p className="font-mono text-[8px] uppercase text-fg-muted/60">Escudos</p>
              </div>
            </div>
          </section>

          {/* Quests Diarias */}
          <section className="card-stone-bg rounded-2xl p-6 space-y-4">
            <h3 className="font-display text-xs uppercase tracking-widest text-fg-muted/60">
              Misiones de Reconocimiento
            </h3>

            <div className="space-y-2.5">
              {todayQuests?.map((q) => (
                <div
                  key={q.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-black/30 p-3"
                >
                  <span className="font-display text-xs text-fg">{QUEST_TITLES[q.type]}</span>
                  <span
                    className={`font-mono text-[10px] font-bold ${
                      q.completed ? 'text-emerald-400' : 'text-accent animate-pulse'
                    }`}
                  >
                    {q.completed ? '✓ COMPLETO' : 'PENDIENTE'}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Jefes de Mazmorra Compactos */}
          <section className="space-y-3">
            <h3 className="font-display text-xs uppercase tracking-widest text-fg-muted/60">
              Jefes de Mazmorra (Proyectos)
            </h3>
            <div className="space-y-2">
              {projects?.slice(0, 2).map((p) => (
                <ProjectBossCard
                  key={p.id}
                  project={p}
                  category={categories?.find((c) => c.id === p.category_id)}
                />
              ))}
            </div>
          </section>
        </div>

        {/* COLUMNA DERECHA (7 Cols): Clases & Botín */}
        <div className="space-y-8 lg:col-span-7">
          {/* Grid de 6 Clases RPG */}
          <section className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {categories?.map((cat) => {
              const xpData = categoryXp?.find((x) => x.category_id === cat.id)
              const rank = classRanks?.find((r) => r.id === xpData?.current_rank_id)
              const level = xpData?.current_level ?? 1
              const percent = Math.min(100, Math.round(((xpData?.current_xp ?? 0) / 2000) * 100))

              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat)}
                  className="card-stone-bg card-rune-interactive cursor-pointer rounded-2xl p-4 transition-all"
                >
                  <span className="mb-2 block text-2xl">🔮</span>
                  <h4 className="truncate font-display text-xs font-bold uppercase tracking-widest text-fg">
                    {rank?.rank_name ?? cat.class_name}
                  </h4>
                  <p className="font-mono text-[9px] uppercase text-fg-muted/60 mb-3">
                    Nv. {level} · {cat.name}
                  </p>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                    <div
                      className="h-full transition-all duration-500"
                      style={{ width: `${percent}%`, backgroundColor: cat.color_hex }}
                    />
                  </div>
                </div>
              )
            })}
          </section>

          {/* Galería de Botín */}
          <section className="card-stone-bg rounded-2xl p-6">
            <h3 className="mb-4 font-display text-xs uppercase tracking-widest text-fg-muted/60">
              Insignias de la Orden
            </h3>
            <LootShowcase />
          </section>
        </div>
      </main>

      {/* Modal Pergamino de Clase */}
      {selectedCategory && (
        <ClassDetailModal
          category={selectedCategory}
          categoryXp={categoryXp?.find((x) => x.category_id === selectedCategory.id)}
          rank={classRanks?.find(
            (r) => r.id === categoryXp?.find((x) => x.category_id === selectedCategory.id)?.current_rank_id,
          )}
          onClose={() => setSelectedCategory(null)}
        />
      )}
    </div>
  )
}
