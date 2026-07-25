import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { ProtectedRoute } from '@/app/ProtectedRoute'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { InboxPage } from '@/features/inbox/components/InboxPage'
import { TriagePage } from '@/features/triage/components/TriagePage'
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
          { index: true, element: <Navigate to="/inbox" replace /> },
          { path: 'inbox', element: <InboxPage /> },
          { path: 'triage', element: <TriagePage /> },
          { path: 'kanban', element: <KanbanPage /> },
          { path: 'kanban/:projectId', element: <KanbanPage /> },
          { path: 'calendario', element: <CalendarPage /> },
          { path: 'progreso', element: <ProgressPage /> },
          { path: 'follow-ups', element: <FollowUpsPage /> },
        ],
      },
    ],
  },
])
