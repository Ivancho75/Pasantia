import {useForm, FormProvider, useFormContext} from "react-hook-form"
import { useState, useEffect } from 'react';
import axios from 'axios';

function CalleAltura() {
    const { register, formState: { errors } } = useFormContext()
    const [calles, setCalles] = useState([]);
 
    useEffect(() => {
      axios.get('http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/commons/calles')
        .then(response => {
          setCalles(response.data);
        })
        .catch(error => {
          console.error('Error fetching calles:', error);
       });
      }, []);

    return(
        <div>
                <label htmlFor="calle" className="block text-blue-900 font-semibold mb-2">Calle*</label>
                <p className='text-blue-400 text-xs mb-2'>Si no posee altura especifique sus entrecalles</p>
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
                      className="w-full sm:w-80 px-3 py-2 border border-blue-200 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
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
                      className="px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                      placeholder="Altura Calle"
                      onInput={e => {
                        e.target.value = e.target.value.replace(/[^0-9]/g, '');
                      }}
                      onKeyDown={e => {
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
                <div className="flex flex-col sm:flex-row gap-8 mt-2">
                  <select
                    id="entreCalle1"
                    {...register("entreCalle1")}
                    className="w-full sm:w-80 px-3 py-2 border border-blue-200 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
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
                    className="w-full sm:w-80 px-3 py-2 border border-blue-200 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
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
                  className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 mt-2"
                  placeholder="Lotes Country/ETC"
                />
              </div>
    )
}

export default CalleAltura