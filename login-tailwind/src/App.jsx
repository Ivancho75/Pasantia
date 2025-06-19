import { useState } from 'react'
import './App.css'
import { useNavigate } from 'react-router-dom';
import futbol from './assets/futbol.jpg';



function App() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 flex flex-col items-center justify-center py-10 font-sans relative">
      {/* Imagen de fútbol a la izquierda */}
      <img
        src={futbol}
        alt="Fútbol"
        className="hidden md:block absolute left-0 top-0 h-full w-60 object-cover rounded-r-3xl shadow-xl"
        style={{ zIndex: 1 }}
      />
      {/* Imagen ciclistas a la derecha */}
      <img
        src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80"
        alt="Ciclismo"
        className="hidden md:block absolute right-0 top-0 h-full w-60 object-cover rounded-l-3xl shadow-xl"
        style={{ zIndex: 1 }}
      />
      <header className="mb-10 w-full flex flex-col items-center relative z-10">
        <div className="flex items-center gap-4">
          <h1 className="text-5xl font-extrabold text-white drop-shadow-lg tracking-wide uppercase">Web Ivancho Sports</h1>
        </div>
        <p className="text-xl text-amber-100 mt-3 font-medium tracking-wide">Tu portal de noticias deportivas</p>
        <nav className="mt-6 flex gap-6">
          <button onClick={() => navigate('/futbol')} className="text-white hover:text-yellow-200 font-semibold transition">Fútbol</button>
          <button onClick={() => navigate('/basket')} className="text-white hover:text-yellow-200 font-semibold transition">Baloncesto</button>
          <button onClick={() => navigate('/tenis')} className="text-white hover:text-yellow-200 font-semibold transition">Tenis</button>
          <button onClick={() => navigate('/boxeo')} className="text-white hover:text-yellow-200 font-semibold transition">Boxeo</button>
          <button onClick={() => navigate('/ajedrez')} className="text-white hover:text-yellow-200 font-semibold transition">Ajedrez</button>
        </nav>
      </header>
      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 justify-center relative z-10">
        <section
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-start hover:cursor-pointer transition-transform transform hover:scale-105 border-t-8 border-yellow-400"
          onClick={() => navigate('/futbol')}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">⚽</span>
            <h2 className="text-2xl font-bold text-amber-700">Fútbol</h2>
          </div>
          <p className="text-gray-700">Últimas noticias, resultados y análisis de las ligas más importantes del mundo.</p>
        </section>
        <section
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-start hover:cursor-pointer transition-transform transform hover:scale-105 border-t-8 border-orange-400"
          onClick={() => navigate('/basket')}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🏀</span>
            <h2 className="text-2xl font-bold text-amber-700">Baloncesto</h2>
          </div>
          <p className="text-gray-700">Cobertura de la NBA, Liga Nacional y torneos internacionales.</p>
        </section>
        <section
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-start hover:cursor-pointer transition-transform transform hover:scale-105 border-t-8 border-green-400"
          onClick={() => navigate('/tenis')}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🎾</span>
            <h2 className="text-2xl font-bold text-amber-700">Tenis</h2>
          </div>
          <p className="text-gray-700">Resultados en vivo, rankings y próximos torneos del circuito ATP y WTA.</p>
        </section>
        <section
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-start hover:cursor-pointer transition-transform transform hover:scale-105 border-t-8 border-red-400"
          onClick={() => navigate('/boxeo')}
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">🥊</span>
            <h2 className="text-2xl font-bold text-amber-700">Boxeo</h2>
          </div>
          <p className="text-gray-700">Noticias, resultados y análisis de los combates más importantes.</p>
        </section>
        <section
          className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-start hover:cursor-pointer transition-transform transform hover:scale-105 border-t-8 border-gray-500 md:col-span-2"
          onClick={() => navigate('/ajedrez')}
        >
          <div className="flex items-center content gap-3 mb-3">
            <span className="text-3xl">♟️</span>
            <h2 className="text-2xl font-bold text-amber-700 item">Ajedrez</h2>
          </div>
          <p className="text-gray-700">Análisis de las mejores partidas del mundo.</p>
        </section>
      </main>
    </div>
  )
}
 
export default App
