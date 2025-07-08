import axios from "axios";

export const fetchCalles = async () => {
  const response = await axios.get("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/commons/calles");
  return response.data;
};