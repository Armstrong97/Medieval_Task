import { useEffect, useState } from 'react'
import { AlertTriangle, Bell, Calendar, Clock, Link2 } from 'lucide-react'
import {
  useDismissNotification,
  useNotifications,
  useSyncNotifications,
} from '@/features/notifications/hooks'
import { useTasksByIds } from '@/features/tasks/hooks'
import { TaskModal } from '@/features/tasks/components/TaskModal'
import { PushToggle } from '@/features/notifications/components/PushToggle'
import type { NotificationType, Task } from '@/types/database.types'

const TYPE_ICON: Record<NotificationType, typeof Bell> = {
  upcoming: Clock,
  due_today: Calendar,
  overdue: AlertTriangle,
  follow_up: Link2,
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const sync = useSyncNotifications()
  const { data: notifications } = useNotifications()
  const dismiss = useDismissNotification()

  useEffect(() => {
    sync.mutate()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const unread = notifications?.filter((n) => !n.dismissed_at) ?? []
  const { data: tasks } = useTasksByIds(unread.map((n) => n.task_id))

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="relative text-fg-muted hover:text-fg"
        aria-label="Notificaciones"
      >
        <Bell className="h-5 w-5" />
        {unread.length > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 font-mono text-[10px] font-medium text-accent-fg">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-border bg-surface p-2 shadow-xl">
            {unread.length === 0 ? (
              <p className="p-3 text-sm text-fg-muted">Sin notificaciones pendientes.</p>
            ) : (
              <ul className="flex flex-col gap-1">
                {unread.map((notification) => {
                  const Icon = TYPE_ICON[notification.type]
                  const task = tasks?.find((t) => t.id === notification.task_id)
                  return (
                    <li
                      key={notification.id}
                      className="flex items-start gap-2 rounded-md p-2 hover:bg-surface-2"
                    >
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          notification.type === 'overdue' ? 'text-warn-fg' : 'text-fg-muted'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (task) setEditingTask(task)
                          setOpen(false)
                        }}
                        className="flex-1 text-left text-sm text-fg"
                      >
                        {notification.message}
                      </button>
                      <button
                        type="button"
                        onClick={() => dismiss.mutate(notification.id)}
                        className="shrink-0 text-fg-muted/60 hover:text-fg"
                        aria-label="Descartar"
                      >
                        ×
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
            <PushToggle />
          </div>
        </>
      )}

      {editingTask && (
        <TaskModal
          task={editingTask}
          defaultProjectId={editingTask.project_id}
          defaultKanbanColumnId=""
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}
