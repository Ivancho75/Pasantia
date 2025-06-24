import './App.css'
import {useForm} from 'react-hook-form'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

function App() {
  const { register, handleSubmit } = useForm();

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

    return position === null ? null : (
      <Marker position={position} />
    );
  }

  const [location, setLocation] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
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
            <input
              id="desde"
              {...register("desde")}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              id="hasta"
              {...register("hasta")}
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="calle" className="block text-gray-700 mb-1">Calle*</label>
            <p className='text-blue-400 text-sm'>Si no posee altura especifique sus entrecalles</p>
            <input 
              id="calle"
              {...register("calle")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Calle"
            />
            <input
              id="alturaCalle"
              {...register("alturaCalle")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Altura Calle"
            />
            <input
              id="entreCalle1"
              {...register("entreCalle1")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entre Calle 1"
            />
            <input
              id="entreCalle2"
              {...register("entreCalle2")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Entre Calle 2"
            />
            <input
              id="lotes"
              {...register("lotes")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            <input
              id="datosChofer"
              {...register("datosChofer")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del Chofer"
            />
            <input
            id='DNIChofer'
              {...register("DNIChofer")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="DNI del Chofer"
            />
            <input
              id='patente'
              {...register("patente")}
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Patente del Camión"
            />
            </div>
            <div className='space-y-2'>
              <label htmlFor='logistica' className="block text-gray-700 mb-1">Logística*</label>
              {/* Cambiar a tipo desplegable */}
              <input
                id="tipoVolquete"
                {...register("tipoVolquete")}
                type="text"     
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Tipo de Volquete"
              />
              <input
              id='volqueteNumero'
                {...register("volqueteNumero")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Volquete N°"
              />
              <input
                id='destinoFinal'
                {...register("destinoFinal")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Destino final del material"
              />
              </div>
              <div className='space-y-2'>
                <label htmlFor='datosSolicitante' className="block text-gray-700 mb-1">Datos Solicitante</label>
                <input
                  id='nombreSolicitante'
                  {...register("nombreSolicitante")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
