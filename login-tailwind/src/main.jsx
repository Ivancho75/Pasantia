import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Rutas from './Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas />
  </StrictMode>,
)
