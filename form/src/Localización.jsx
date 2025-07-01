import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';



function Localización (){

  // Corrigo el icono de marker por defecto de Leaflet
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  });

  const initialPosition = { lat: -34.16326, lng: -58.95918 };

  function LocationMarker({ position, onChange }) {
    useMapEvents({
      click(e) {
      onChange(e.latlng);
      },
    });

    return position ? <Marker position={position} /> : null;
  }

  const [location, setLocation] = useState(initialPosition);

  return(
     <div>
      <label htmlFor='Localización' className="block text-blue-900 font-semibold mb-2">Localización*</label>
        <p className='text-blue-400 text-xs mb-2'>Arrastre el icono de ubicación (azul), o haga click sobre la calle y altura aproximada, o hacia la calle y entre calles de destino</p>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-blue-200 shadow">
            <MapContainer
              center={initialPosition}
              zoom={14.5}
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationMarker position={location} onChange={setLocation} />
            </MapContainer>
          </div>
             {location && (
               <div className='text-blue-500 text-xs mt-2'>
               Su geolocalización actual es: <span className="font-mono">{location.lat.toFixed(5)}, {location.lng.toFixed(5)}</span>
               </div>
             )}
    </div>
  )
}
export default Localización
