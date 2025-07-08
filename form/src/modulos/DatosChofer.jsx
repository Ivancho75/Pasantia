import {useForm, FormProvider, useFormContext} from "react-hook-form"


function DatosChofer (){
    const { register, formState: { errors } } = useFormContext()
    return(
             <div>
                <label htmlFor='datosChofer' className="block text-blue-900 font-semibold mb-2">Datos Chofer*</label>
                <div className="flex flex-col sm:flex-row gap-8">
                  <div className='flex flex-col'>
                    <input
                      id="datosChofer"
                      {...register("datosChofer")}
                      type="text"
                      className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                      placeholder="Nombre del Chofer"
                    />
                    {errors.datosChofer && (
                      <p className="text-red-500 text-xs mt-1">{errors.datosChofer.message}</p>
                    )}
                  </div>
                  <div className='flex flex-col'>
                    <input
                      id='DNIChofer'
                      {...register("DNIChofer")}
                      type="text"
                      inputMode="numeric"
                      pattern="\d{1,2}\.?\d{3}\.?\d{3}"
                      maxLength={10}
                      onInput={e => {
                        let value = e.target.value.replace(/\D/g, '').slice(0, 8);
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
                      className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                      placeholder="DNI del Chofer"
                    />
                    {errors.DNIChofer && (
                      <p className="text-red-500 text-xs mt-1">{errors.DNIChofer.message}</p>
                    )}
                  </div>
                </div>
                <input
                  id='patente'
                  {...register("patente")}
                  type="text"
                  className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 mt-2"
                  placeholder="Patente del Camión"
                  maxLength={7}
                />
                {errors.patente && (
                  <p className="text-red-500 text-xs mt-1">{errors.patente.message}</p>
                )}
              </div>
   
    )
}
export default DatosChofer