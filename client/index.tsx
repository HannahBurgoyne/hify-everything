import { createRoot } from 'react-dom/client'
import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app') as HTMLElement
  createRoot(rootElement).render(<App />)
})
