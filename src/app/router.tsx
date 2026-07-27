import { createBrowserRouter } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { ProtectedRoute } from '@/app/ProtectedRoute'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { BattleHudPage } from '@/features/battle-hud/components/BattleHudPage'
import { BossEncounterPage } from '@/features/projects/components/BossEncounterPage'
import { InboxPage } from '@/features/inbox/components/InboxPage'
import { StrategyTablePage } from '@/features/triage/components/StrategyTablePage'
import { KanbanPage } from '@/features/kanban/components/KanbanPage'
import { CalendarPage } from '@/features/calendar/components/CalendarPage'
import { ProgressPage } from '@/features/gamification/components/ProgressPage'
import { FollowUpsPage } from '@/features/followups/components/FollowUpsPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
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
          { path: 'kanban/:projectId', element: <KanbanPage /> },
          { path: 'calendario', element: <CalendarPage /> },
          { path: 'progreso', element: <ProgressPage /> },
          { path: 'follow-ups', element: <FollowUpsPage /> },
          { path: 'projects/:projectId/boss', element: <BossEncounterPage /> },
        ],
      },
    ],
  },
])
