import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import { useState } from 'react'
import Register from './Register.jsx'
import MainPage from './MainPage.jsx'


function App() {
  const [showRegister, setShowRegister] = useState(false)
 

  
  return showRegister ? (
    <Register onBack={() => setShowRegister(false)} />
  ) : (
    <Login 
      onRegisterClick={() => setShowRegister(true)} 
    />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
