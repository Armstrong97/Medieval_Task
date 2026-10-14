import { useState, type FormEvent } from 'react'
import { FolderOpen, Pencil } from 'lucide-react'
import { showToast } from '@/components/ui/toast-store'
import { useCategories, useCreateProject, useProjects, useUpdateProject } from '@/features/projects/hooks'
import { ProjectBossCard } from '@/features/projects/components/ProjectBossCard'
import { BOSS_AVATARS } from '@/utils/rpgAssets'
import type { Category, Project } from '@/types/database.types'

const BOSS_LABELS: Record<keyof typeof BOSS_AVATARS, string> = {
  dragon_default: 'Dragón',
  lich_default: 'Liche',
}

function ProjectRow({ project, category }: { project: Project; category?: Category }) {
  const update = useUpdateProject()
  const [editing, setEditing] = useState(false)
  const [confirmArchive, setConfirmArchive] = useState(false)
  const [name, setName] = useState(project.name)
  const [bossTitle, setBossTitle] = useState(project.boss_title)
  const [bossAvatar, setBossAvatar] = useState(project.boss_avatar)

  function save() {
    const trimmed = name.trim()
    if (!trimmed) return
    update.mutate(
      { id: project.id, patch: { name: trimmed, boss_title: bossTitle.trim() || project.boss_title, boss_avatar: bossAvatar } },
      { onSuccess: () => { setEditing(false); showToast({ title: 'Proyecto actualizado' }) } },
    )
  }

  function archive() {
    update.mutate(
      { id: project.id, patch: { status: 'archived' } },
      { onSuccess: () => showToast({ title: 'Proyecto archivado', detail: project.name }) },
    )
  }

  return (
    <li className="space-y-2">
      <ProjectBossCard project={project} category={category} />

      {editing ? (
        <div className="space-y-3 rounded-xl border border-border bg-surface p-4">
          <label className="block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Nombre
            <input value={name} onChange={(e) => setName(e.target.value)} className="input-parchment mt-1 w-full rounded-lg px-3 py-2.5 text-base normal-case text-fg" />
          </label>
          <label className="block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Título del jefe
            <input value={bossTitle} onChange={(e) => setBossTitle(e.target.value)} className="input-parchment mt-1 w-full rounded-lg px-3 py-2.5 text-base normal-case text-fg" />
          </label>
          <label className="block font-mono text-xs uppercase tracking-widest text-fg-muted">
            Jefe
            <select value={bossAvatar} onChange={(e) => setBossAvatar(e.target.value)} className="parchment-select mt-1 w-full rounded-lg p-2.5 text-base normal-case">
              {Object.entries(BOSS_LABELS).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={save} disabled={!name.trim() || update.isPending} className="btn-prime flex-1 rounded-lg py-3 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50">
              Guardar
            </button>
            <button type="button" onClick={() => setEditing(false)} className="rounded-lg border border-border px-4 py-3 font-mono text-xs font-bold uppercase text-fg-muted">
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-2">
          <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-1.5 rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg">
            <Pencil className="h-3.5 w-3.5" aria-hidden="true" /> Editar
          </button>
          {confirmArchive ? (
            <>
              <button type="button" onClick={archive} disabled={update.isPending} className="rounded-lg bg-accent px-3 py-2.5 font-mono text-xs font-black uppercase text-accent-fg">
                Sí, archivar
              </button>
              <button type="button" onClick={() => setConfirmArchive(false)} className="rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase text-fg-muted">
                No
              </button>
            </>
          ) : (
            <button type="button" onClick={() => setConfirmArchive(true)} className="rounded-lg px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-fg-muted transition-colors hover:text-fg">
              Archivar
            </button>
          )}
        </div>
      )}
    </li>
  )
}

export function ProjectsPage() {
  const { data: projects, isLoading } = useProjects()
  const { data: categories } = useCategories()
  const createProject = useCreateProject()
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')

  function handleCreate(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !categoryId) return
    createProject.mutate(
      { name: name.trim(), categoryId },
      { onSuccess: () => { setName(''); showToast({ title: 'Proyecto creado' }) } },
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 md:px-8">
      <header className="mb-8">
        <h1 className="flex items-center gap-3 font-display text-3xl font-black uppercase tracking-widest text-accent">
          <FolderOpen className="h-8 w-8" aria-hidden="true" /> Proyectos
        </h1>
        <p className="mt-1 font-mono text-xs text-fg-muted">
          Cada proyecto es un jefe: terminar sus misiones baja su vida. Toca uno para entrar a su sala.
        </p>
      </header>

      <form onSubmit={handleCreate} className="mb-8 grid gap-3 rounded-2xl border border-border bg-surface/60 p-4 sm:grid-cols-[1fr_auto_auto]">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del nuevo proyecto" aria-label="Nombre del nuevo proyecto" className="input-parchment rounded-xl px-4 py-3 text-base text-fg" />
        <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)} aria-label="Clase del proyecto" className="parchment-select rounded-xl p-3 text-base">
          <option value="" disabled>Clase</option>
          {categories?.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <button type="submit" disabled={!name.trim() || !categoryId || createProject.isPending} className="btn-prime rounded-xl px-6 py-3 font-mono text-xs font-black uppercase tracking-widest disabled:opacity-50">
          Crear
        </button>
      </form>

      {isLoading ? (
        <p className="py-8 text-center font-mono text-xs text-fg-muted">Cargando proyectos…</p>
      ) : !projects || projects.length === 0 ? (
        <p className="py-8 text-center font-mono text-sm text-fg-muted">
          Aún no tienes proyectos. Crea uno arriba, o desde la Mesa de Estrategia al ordenar una captura.
        </p>
      ) : (
        <ul className="space-y-5">
          {projects.map((project) => (
            <ProjectRow key={project.id} project={project} category={categories?.find((c) => c.id === project.category_id)} />
          ))}
        </ul>
      )}
    </div>
  )
}
