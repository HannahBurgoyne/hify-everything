import { createRoot } from 'react-dom/client'
import Home from './components/Home.tsx' // Import your Home component
import App from './components/App.tsx'

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById('app') as HTMLElement
  createRoot(rootElement).render(<App />) // Render your Home component
})
