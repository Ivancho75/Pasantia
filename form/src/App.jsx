import './App.css'
import { set, useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Volquete1 from './assets/volquete1.jpg';
import Volquete2 from './assets/volquete2.jpg';
import Logistica from './Logistica.jsx';
import Localización from './Localización.jsx';
import FechaEntrega from './FechaEntrega.jsx';
import DatosChofer from './DatosChofer.jsx';
import DatosSolic from './DatosSolic.jsx'
import CalleAltura from './CalleAltura.jsx';

function App() {
  const methods = useForm();
  const { register, handleSubmit, formState: { errors } } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  // Fondo de pantalla con imagen de volquete y overlay
  return (
    <FormProvider {...methods}>
      <div
        className="min-h-screen flex items-center justify-center py-10 relative"
        style={{
          backgroundImage: `url(${Volquete1})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-sm z-0"></div>
        <div className="relative z-10 w-full max-w-3xl">
          <div className="bg-white/90 p-10 rounded-2xl shadow-2xl w-full border border-blue-200">
            <h2 className="text-3xl font-extrabold mb-8 text-center text-blue-700 tracking-tight drop-shadow">Formulario de Volquetes</h2>
            <form
              onSubmit={handleSubmit((data) => {
                onSubmit({ ...data, localizacion: location });
              })}
              className="space-y-8"
            >
              {/* Fecha de Entrega */}
               <FechaEntrega />
              {/* Calle y Altura */}
              <CalleAltura />
              {/* Localización */}
              <Localización />
              {/* Datos Chofer */}
              <DatosChofer />
              {/* Logística */}
              <Logistica />
              {/* Datos Solicitante */}
              <DatosSolic />
              {/* Botón */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white py-3 rounded-lg font-bold text-lg shadow hover:from-blue-700 hover:to-blue-500 transition"
              >
                Cargar credenciales
              </button>
            </form>
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default App
