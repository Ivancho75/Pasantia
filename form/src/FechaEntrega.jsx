import {useForm, FormProvider, useFormContext} from "react-hook-form"


function FechaEntrega (){
    const { register, formState: { errors } } = useFormContext()
    return(
        <div>
              <label htmlFor="fechaEntrega" className="block text-blue-900 font-semibold mb-2">Fecha de Entrega*</label>
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
                    className="w-full sm:w-80 px-3 py-2 border border-blue-200 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
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
                    className="w-full sm:w-80 px-3 py-2 border border-blue-200 text-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  />
                  {errors.hasta && <p className="text-red-500 text-xs mt-1">{errors.hasta.message}</p>}
                </div>
              </div>
            </div>
   
    )
}
export default FechaEntrega