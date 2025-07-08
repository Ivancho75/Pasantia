
import { useMutation } from "@tanstack/react-query";
import { fetchCredenciales } from "../services/credenciales";

export function useCredenciales() {
  return useMutation({
    mutationFn: ({ email, password }) => fetchCredenciales({ email, password })
  });
}

