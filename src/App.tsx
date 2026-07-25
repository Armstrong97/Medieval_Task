import { RouterProvider } from 'react-router-dom'
import { Providers } from '@/app/providers'
import { router } from '@/app/router'
import { PwaUpdatePrompt } from '@/app/PwaUpdatePrompt'

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <PwaUpdatePrompt />
    </Providers>
  )
}

export default App
