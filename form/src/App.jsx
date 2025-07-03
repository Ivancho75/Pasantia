import './App.css'
import { set, useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useState, useEffect } from 'react';
import axios, { all } from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Volquete1 from './assets/volquete1.jpg';
import Volquete2 from './assets/volquete2.jpg';
import Logistica from './Logistica.jsx';
import Localización from './Localización.jsx';
import FechaEntrega from './FechaEntrega.jsx';
import DatosChofer from './DatosChofer.jsx';
import DatosSolic from './DatosSolic.jsx';
import CalleAltura from './CalleAltura.jsx';
import Credenciales from './credenciales.jsx';

import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';


function App() {
     const yesterday = new Date();
     yesterday.setDate(yesterday.getDate() - 1); // Traigo día anterior 

    const schema = yup.object().shape({
     desde: yup
    .date()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : new Date(originalValue);
    })
    .min(yesterday, 'La fecha debe ser mayor a la actual')
    .required('La fecha de entrega es requerida'),

     hasta: yup
     .date()
    .transform((value, originalValue) => {
      return originalValue === '' ? undefined : new Date(originalValue);
    })
    .min(yup.ref('desde'),'La fecha debe ser posterior a la de entrega')
    .required('La fecha de salida es requerida'),
    
     calle: yup.
     array().
     transform((value,originalValue) => {
      return originalValue === '' ? undefined : new Array(originalValue);
     })
     .required("La calle es requerida"),

     alturaCalle: yup
     .number()
     .transform((value,originalValue) => {
      return originalValue === '' ? undefined : new Number(originalValue);
     })
     .required("La altura es requerida"),

     datosChofer: yup
     .string()
     .required("El nombre es requerido"),

     DNIChofer: yup
     .string()
     .transform((value,originalValue) => {
      return originalValue === '' ? undefined : new String(originalValue);
     })
     .required("El DNI es requerido"),

     patente: yup
     .string()
     .transform((value,originalValue) => {
      return originalValue === '' ? undefined : new String(originalValue);
     })
     .required("La patente es requerida"),

     tipoVolquete: yup.
     array().
     transform((value,originalValue) => {
      return originalValue === '' ? undefined : new Array(originalValue);
     })
     .required("El tipo de volquete es requerido"),

     volqueteNumero: yup
     .number()
     .positive()
     .transform((value,originalValue) => {
      return originalValue === '' ? undefined : new Number(originalValue);
     })
     .required("El numero de volquete es requerido"),

     destinoFinal: yup
     .string().
     required("El destino final es requerido"),
   });

    const methods = useForm({
      resolver: yupResolver(schema),
      mode: 'all',   //Para validar en todo momento
    });
  //const methods = useForm()

  const { register, handleSubmit, formState: { errors } } = methods;
  

//Para probar funcionamiento
  // const onSubmit = (data) => {
  //   console.log(data);
  // };

   const [showCredenciales, setShowCredenciales] = useState(false);

  return (
    <FormProvider {...methods}>
      {/* Fondo de pantalla con imagen de volquete - overlay */}
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
              onSubmit={(e) => {
                e.preventDefault();
                setShowCredenciales(false); 
                // setTimeout(() => setShowCredenciales(true), 0);   Actualizar estado instantaneo
                handleSubmit(() => {setTimeout(() => setShowCredenciales(true), 0);})(e);
              }}
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
            {/* Modal Credenciales */}
            {showCredenciales && (
              <Credenciales onClose={() => setShowCredenciales(false)} />
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  )
}

export default App
