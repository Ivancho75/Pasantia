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
    return(
             <div>
                <label htmlFor='Localización' className="block text-blue-900 font-semibold mb-2">Localización*</label>
                    <p className='text-blue-400 text-xs mb-2'>Arrastre el icono de ubicación (azul), o haga click sobre la calle y altura aproximada, o hacia la calle y entre calles de destino</p>
                        <div className="w-full h-64 rounded-lg overflow-hidden border border-blue-200 shadow">
                            <MapContainer
                                center={[-34.1682, -58.9593]}
                                zoom={13}
                                style={{ height: "100%", width: "100%" }}
                            >
                                <TileLayer
                                attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <LocationMarker onChange={setLocation} />
                                {location && <Marker position={location} />}
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