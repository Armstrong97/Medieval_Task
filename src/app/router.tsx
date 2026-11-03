import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { ProtectedRoute } from '@/app/ProtectedRoute'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { ResetPasswordPage } from '@/features/auth/components/ResetPasswordPage'
import { BattleHudPage } from '@/features/battle-hud/components/BattleHudPage'
import { BossEncounterPage } from '@/features/projects/components/BossEncounterPage'
import { InboxPage } from '@/features/inbox/components/InboxPage'
import { StrategyTablePage } from '@/features/triage/components/StrategyTablePage'
import { KanbanPage } from '@/features/kanban/components/KanbanPage'
import { CalendarPage } from '@/features/calendar/components/CalendarPage'
import { ProgressPage } from '@/features/gamification/components/ProgressPage'
import { ProjectsPage } from '@/features/projects/components/ProjectsPage'
import { FocusModePage } from '@/features/tasks/components/FocusModePage'
import { ChainsPage } from '@/features/chains/components/ChainsPage'
import { FollowUpsPage } from '@/features/followups/components/FollowUpsPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  // Fuera de ProtectedRoute: el enlace del correo llega aquí y Supabase abre la sesión desde la URL.
  {
    path: '/restablecer',
    element: <ResetPasswordPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { index: true, element: <BattleHudPage /> },
          { path: 'inbox', element: <InboxPage /> },
          { path: 'triage', element: <StrategyTablePage /> },
          { path: 'kanban', element: <KanbanPage /> },
          { path: 'calendario', element: <CalendarPage /> },
          { path: 'progreso', element: <ProgressPage /> },
          { path: 'follow-ups', element: <FollowUpsPage /> },
          { path: 'proyectos', element: <ProjectsPage /> },
          { path: 'cadenas', element: <ChainsPage /> },
          { path: 'foco/:taskId', element: <FocusModePage /> },
          { path: 'projects/:projectId/boss', element: <BossEncounterPage /> },
        ],
      },
    ],
  },
])
