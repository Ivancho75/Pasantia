import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'//
import App from './App.jsx'
import Rutas from './Routes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Rutas />
  </StrictMode>,
)
