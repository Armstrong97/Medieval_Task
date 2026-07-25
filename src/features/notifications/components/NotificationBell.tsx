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
        className="relative text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
        aria-label="Notificaciones"
      >
        <Bell className="h-5 w-5" />
        {unread.length > 0 && (
          <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-medium text-white">
            {unread.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg border border-neutral-200 bg-white p-2 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
            {unread.length === 0 ? (
              <p className="p-3 text-sm text-neutral-400 dark:text-neutral-500">
                Sin notificaciones pendientes.
              </p>
            ) : (
              <ul className="flex flex-col gap-1">
                {unread.map((notification) => {
                  const Icon = TYPE_ICON[notification.type]
                  const task = tasks?.find((t) => t.id === notification.task_id)
                  return (
                    <li
                      key={notification.id}
                      className="flex items-start gap-2 rounded-md p-2 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                    >
                      <Icon
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          notification.type === 'overdue'
                            ? 'text-amber-600'
                            : 'text-neutral-400 dark:text-neutral-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (task) setEditingTask(task)
                          setOpen(false)
                        }}
                        className="flex-1 text-left text-sm text-neutral-700 dark:text-neutral-300"
                      >
                        {notification.message}
                      </button>
                      <button
                        type="button"
                        onClick={() => dismiss.mutate(notification.id)}
                        className="shrink-0 text-neutral-300 hover:text-neutral-600 dark:text-neutral-600 dark:hover:text-neutral-300"
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
