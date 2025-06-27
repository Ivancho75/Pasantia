import './App.css'
import { set, useForm } from 'react-hook-form'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Volquete1 from './assets/volquete1.jpg';
import Volquete2 from './assets/volquete2.jpg';

function App() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [calles, setCalles] = useState([]);
  const [calleSeleccionada, setCalleSeleccionada] = useState('');

  useEffect(() => {
    axios.get('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/commons/calles')
      .then(response => {
        setCalles(response.data);
      })
      .catch(error => {
        console.error('Error fetching calles:', error);
      });
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  // Importa los componentes de Leaflet

  // Corrigo el icono de marker por defecto de Leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  // Componente para seleccionar ubicación en el mapa
  function LocationMarker({ onChange }) {
    const [position, setPosition] = useState(null);

    useMapEvents({
      click(e) {
        setPosition(e.latlng);
        onChange(e.latlng);
      },
    });


    const handleCalleChange = (e) => {
      setCalleSeleccionada(e.target.value);
    }

    return position === null ? null : (
      <Marker position={position} />
    );
  }

  const [location, setLocation] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Forms de volquetes</h2>
        <form
          onSubmit={handleSubmit((data) => {
            // Incluye la ubicación seleccionada en el mapa
            onSubmit({ ...data, localizacion: location });
          })}
          className="space-y-6"
        >
          <div className="space-y-2">
            <label htmlFor="fechaEntrega" className="block text-gray-700 mb-1">Fecha de Entega*</label>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className='flex flex-col'>
                <input
                  id="desde"
                  {...register("desde", {
                    required: {
                      value: true,
                      message: "La fecha de entrega es requerida"
                    }
                  })}
                  type="date"
                  className="w-full sm:w-80 px-3 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.desde && <p className="text-red-500 text-xs mt-1">{errors.desde.message}</p>}
              </div>
              <div className='flex flex-col'>
                <input
                  id="hasta"
                  {...register("hasta", {
                    required: {
                      value: true,
                      message: "La fecha de salida es requerida"
                    }
                  })}
                  type="date"
                  className="w-full sm:w-80 px-3 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.hasta && <p className="text-red-500 text-xs mt-1">{errors.hasta.message}</p>}
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="calle" className="block text-gray-700 mb-1">Calle*</label>
            <p className='text-blue-400 text-sm'>Si no posee altura especifique sus entrecalles</p>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className='flex flex-col'>
                <select
                  id="calle"
                  {...register("calle", {
                    required: {
                      value: true,
                      message: 'La calle es requerida'
                    }
                  })}
                  className="w-full sm:w-80 px-3 py-2 border border-gray-300  text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-0"
                >
                  <option value="">Calle</option>
                  {calles.map((calle) => (
                    <option key={calle.id} value={calle.descripcion}>
                      {calle.descripcion}
                    </option>
                  ))}
                </select>
                {errors.calle && (
                  <p className="text-red-500 text-xs mt-1">{errors.calle.message}</p>
                )}
              </div>
              <div className="flex flex-col w-full sm:w-80">
                <input
                  id="alturaCalle"
                  {...register("alturaCalle", {
                    required: {
                      value: true,
                      message: 'La altura es requerida.'
                    }
                  })}
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={5}
                  className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-0 no-spinner"
                  placeholder="Altura Calle"
                  onInput={e => {
                    // Solo números positivos, sin letras ni negativos
                    e.target.value = e.target.value.replace(/[^0-9]/g, '');
                  }}
                  onKeyDown={e => {
                    // Bloquea letras, negativos, e, E, +, -, y flechas arriba/abajo
                    if (
                      e.key === 'e' ||
                      e.key === 'E' ||
                      e.key === '+' ||
                      e.key === '-' ||
                      (e.key.length === 1 && isNaN(Number(e.key))) ||
                      e.key === 'ArrowUp' ||
                      e.key === 'ArrowDown'
                    ) {
                      e.preventDefault();
                    }
                  }}
                />
                {errors.alturaCalle && (
                  <p className="text-red-500 text-xs mt-1">{errors.alturaCalle.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <select
                id="entreCalle1"
                {...register("entreCalle1")}
                className="w-full sm:w-80 px-3 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-0"
              >
                <option value="">Entre calle 1</option>
                {calles.map((calle) => (
                  <option key={calle.id} value={calle.descripcion}>
                    {calle.descripcion}
                  </option>
                ))}
              </select>
              <select
                id="entreCalle2"
                {...register("entreCalle2")}
                className="w-full sm:w-80 px-3 py-2 border border-gray-300  text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-0"
              >
                <option value="">Entre calle 2</option>
                {calles.map((calle) => (
                  <option key={calle.id} value={calle.descripcion}>
                    {calle.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <input
              id="lotes"
              {...register("lotes")}
              type="text"
              className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
              placeholder="Lotes Country/ETC"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor='Localización' className="block text-gray-700 mb-1">Localización*</label>
            <p className='text-blue-400 text-sm'>Arrastre el icono de ubicación (azul), o haga click sobre la calle y altura aproximada, o hacia la calle y entre calles de destino</p>
            <div className="w-full h-64 rounded overflow-hidden border border-gray-300">
              <MapContainer
                center={[-34.1682, -58.9593]} // Campana, Buenos Aires
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker onChange={setLocation} />
                {/* Marcador fijo en la ubicación seleccionada */}
                {location && <Marker position={location} />}
              </MapContainer>
            </div>
            {location && (
              <div className='text-blue-400 text-sm'>
                Su geolocalizacion actual es: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
              </div>
            )}
          </div>
          <div className='space-y-2'>
            <label htmlFor='datosChofer' className="block text-gray-700 mb-1">Datos Chofer*</label>
            <div className="flex flex-col sm:flex-row gap-8">
              <div className='flez flex-col'>
              <input
                id="datosChofer"
                {...register("datosChofer", { required: {
                  value:true,
                  message: 'El nombre es requerido'
                }
                })}
                type="text"
                className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nombre del Chofer"
              />
              {errors.datosChofer && (
                  <p className="text-red-500 text-xs mt-1">{errors.datosChofer.message}</p>
                )}
              </div>
              <div className='flex flex-col'>
              <input
                id='DNIChofer'
                {...register("DNIChofer", {required:{
                  value: true,
                  message: 'El DNI es requerido'
                }
                })}
                type="text"
                inputMode="numeric"
                pattern="\d{1,2}\.?\d{3}\.?\d{3}"
                maxLength={10}
                //Validaciones sacadas de internet
                onInput={e => {
                  // Solo números, máximo 8 dígitos
                  let value = e.target.value.replace(/\D/g, '').slice(0, 8);
                  // Formatea como 43.520.369
                  if (value.length > 5) {
                    value = value.replace(/^(\d{1,2})(\d{3})(\d{3})$/, '$1.$2.$3');
                  } else if (value.length > 2) {
                    value = value.replace(/^(\d{1,2})(\d{3})$/, '$1.$2');
                  }
                  e.target.value = value;
                }}
                onKeyDown={e => {
                  if (
                    e.key === 'e' ||
                    e.key === 'E' ||
                    e.key === '+' ||
                    e.key === '-' ||
                    e.key === '.' ||
                    isNaN(Number(e.key)) && e.key !== 'Backspace' && e.key !== 'Tab' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight'
                  ) {
                    e.preventDefault();
                  }
                }}
                className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="DNI del Chofer"
              />
              {errors.DNIChofer && (
                  <p className="text-red-500 text-xs mt-1">{errors.DNIChofer.message}</p>
                )}
            </div>
            </div>
            <input
              id='patente'
              {...register("patente",{required: {
                value:true,
                message: 'La patente es requerida'
              }
              })}
              type="text"
              className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-0"
              placeholder="Patente del Camión"
              maxLength={7}
            />
            {errors.patente && (
                  <p className="text-red-500 text-xs mt-1">{errors.patente.message}</p>
                )}
          </div>
          <div className='space-y-2'>
            <label htmlFor='logistica' className="block text-gray-700 mb-1">Logística*</label>
            {/* Cambiar a tipo desplegable */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className='flex flex-col'>
              <select
                id="tipoVolquete"
                {...register("tipoVolquete", { required: {
                  value: true,
                  message: 'El tipo de volquete es requerido'
                }
                })}
                className="w-full sm:w-80 px-3 py-2 border border-gray-300 text-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Tipo volquete</option>
                <option value="chico">Aridos</option>
                <option value="mediano">Ramas</option>
              </select>
              {errors.tipoVolquete && (
                  <p className="text-red-500 text-xs mt-1">{errors.tipoVolquete.message}</p>
                )}
              </div>
              <div className='flex flex-col'>
              <input
                id='volqueteNumero'
                {...register("volqueteNumero", {required: {
                  value: true,
                  message: 'El número de volquete es requerido'
                }
                })}
                type="text"
                className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Volquete N°"
                maxLength={10}
                onInput={e => {
                  // Solo números positivos, sin letras ni negativos
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
                onKeyDown={e => {
                  // Bloquea letras, negativos, e, E, +, -, y flechas arriba/abajo
                  if (
                    e.key === 'e' ||
                    e.key === 'E' ||
                    e.key === '+' ||
                    e.key === '-' ||
                    (e.key.length === 1 && isNaN(Number(e.key))) ||
                    e.key === 'ArrowUp' ||
                    e.key === 'ArrowDown'
                  ) {
                    e.preventDefault();
                  }
                }}
              />
              {errors.volqueteNumero && (
                  <p className="text-red-500 text-xs mt-1">{errors.volqueteNumero.message}</p>
                )}
            </div>
            </div>
            <input
              id='destinoFinal'
              {...register("destinoFinal", { required: {
                value: true,
                message: 'El destino final es requerido'
              }
              })}
              type="text"
              className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-0"
              placeholder="Destino final del material"
            />
            {errors.destinoFinal && (
                  <p className="text-red-500 text-xs mt-1">{errors.destinoFinal.message}</p>
                )}
          </div>
          <div className='space-y-2'>
            <label htmlFor='datosSolicitante' className="block text-gray-700 mb-1">Datos Solicitante</label>
            <input
              id='nombreSolicitante'
              {...register("nombreSolicitante")}
              type="text"
              className="w-full sm:w-80 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del Solicitante"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Cargar credenciales
          </button>
        </form>
      </div>
    </div>
  )
}

export default App
