import {useForm, FormProvider, useFormContext} from "react-hook-form"


function Logistica (){
    const { register, formState: { errors } } = useFormContext()
    return(
             <div>
                <label htmlFor='logistica' className="block text-blue-900 font-semibold mb-2">Logística*</label>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className='flex flex-col'>
                    <select
                      id="tipoVolquete"
                      {...register("tipoVolquete")}
                      className="w-full sm:w-80 px-3 py-2 border border-blue-200 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                    >
                      <option value="">Tipo volquete</option>
                      <option value="aridos">Aridos</option>
                      <option value="ramas">Ramas</option>
                    </select>
                    {errors.tipoVolquete && (
                      <p className="text-red-500 text-xs mt-1">{errors.tipoVolquete.message}</p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <input
                      id='volqueteNumero'
                      {...register("volqueteNumero")}
                      type="text"
                      className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                      placeholder="Volquete N°"
                      maxLength={10}
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
                    {errors.volqueteNumero && (
                      <p className="text-red-500 text-xs mt-1">{errors.volqueteNumero.message}</p>
                    )}
                  </div>
                </div>
                <input
                  id='destinoFinal'
                  {...register("destinoFinal")}
                  type="text"
                  className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 mt-2"
                  placeholder="Destino final del material"
                />
                {errors.destinoFinal && (
                  <p className="text-red-500 text-xs mt-1">{errors.destinoFinal.message}</p>
                )}
              </div>
   
    )
}
export default Logistica