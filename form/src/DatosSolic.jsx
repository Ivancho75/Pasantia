import {useForm, FormProvider, useFormContext} from "react-hook-form"


function DatosSolic (){
    const { register, formState: { errors } } = useFormContext()
    return(
             <div>
                <label htmlFor='datosSolicitante' className="block text-blue-900 font-semibold mb-2">Datos Solicitante</label>
                <input
                  id='nombreSolicitante'
                  {...register("nombreSolicitante")}
                  type="text"
                  className="w-full sm:w-80 px-3 py-2 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50"
                  placeholder="Nombre del Solicitante"
                />
              </div>
    )
}
export default DatosSolic