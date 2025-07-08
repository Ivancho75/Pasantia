import { useQuery } from "@tanstack/react-query";
import { fetchCalles } from "../services/calles";

export const useCalles = () => {
  return useQuery({
    queryKey: ["calles"],
    queryFn: fetchCalles,
    //staleTime: 1000 * 60 * 5, 
  });
};
