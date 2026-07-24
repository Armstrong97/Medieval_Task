import { createBrowserRouter, Navigate } from 'react-router-dom'
import { Layout } from '@/app/Layout'
import { LoginPage } from '@/features/auth/components/LoginPage'
import { InboxPage } from '@/features/inbox/components/InboxPage'
import { TriagePage } from '@/features/triage/components/TriagePage'
import { KanbanPage } from '@/features/kanban/components/KanbanPage'
import { CalendarPage } from '@/features/calendar/components/CalendarPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/inbox" replace /> },
      { path: 'inbox', element: <InboxPage /> },
      { path: 'triage', element: <TriagePage /> },
      { path: 'kanban', element: <KanbanPage /> },
      { path: 'calendario', element: <CalendarPage /> },
    ],
  },
])
