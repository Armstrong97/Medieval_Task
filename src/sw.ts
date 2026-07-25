/// <reference lib="webworker" />
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { NetworkFirst } from 'workbox-strategies'

declare const self: ServiceWorkerGlobalScope

cleanupOutdatedCaches()
precacheAndRoute(self.__WB_MANIFEST)

// Lecturas a Supabase: red primero, cae a cache si no hay conexión (modo
// lectura offline para kanban/calendario/progreso con lo último cargado).
registerRoute(
  ({ url, request }) => url.hostname.endsWith('.supabase.co') && request.method === 'GET',
  new NetworkFirst({ cacheName: 'supabase-reads', networkTimeoutSeconds: 5 }),
)

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting()
})

interface PushPayload {
  title: string
  body: string
  url?: string
}

self.addEventListener('push', (event) => {
  if (!event.data) return
  const data = event.data.json() as PushPayload
  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: '/icons/icon-192.png',
      badge: '/icons/icon-192.png',
      data: { url: data.url ?? '/' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const targetUrl = (event.notification.data as { url?: string } | undefined)?.url ?? '/'
  event.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clientList) => {
      const existing = clientList.find((c) => 'focus' in c) as WindowClient | undefined
      if (existing) return existing.focus()
      return self.clients.openWindow(targetUrl)
    }),
  )
})
