import React, { useState } from "react";
import Registro from "./Registro.jsx";
import { useCredenciales } from "../hooks/useCredenciales.jsx";

function Credenciales() {
  const [usuario, setUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [showRegistro, setShowRegistro] = useState(false);
  const [error, setError] = useState("");

  const loginMutation = useCredenciales();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    loginMutation.mutate(
      { email: usuario, password: contrasena },
      {
        onSuccess: () => {
          setShowRegistro(true);
        },
        onError: (error) => {
          setError(error.message || "Error en el login");
        },
      }
    );
  };

  if (!showModal) return null;

  if (showRegistro) return <Registro onClose={() => setShowRegistro(false)} />;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[1000]"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "8px",
          minWidth: "300px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        }}
        className="w-full max-w-md"
      >
        <h1 className="text-violet-900 text-2xl font-bold mb-2">
          Ingrese sus credenciales
        </h1>
        <h2 className="text-gray-700 mb-4 text-base">
          Las credenciales son únicas por cada empresa de volquetes registrada.
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">
              Usuario:
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-medium mb-1">
              Contraseña:
              <input
                type="password"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                className="w-full mt-2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
            </label>
          </div>
          {error && (
            <div className="mb-4 text-red-600 font-medium">{error}</div>
          )}
          <div className="mb-4 flex items-center">
            <input type="checkbox" className="mr-2" />
            <label className="text-gray-700 select-none">
              Recordar credenciales
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <button
              type="submit"
              className="px-4 py-2 bg-violet-700 text-white rounded hover:bg-violet-800 transition"
              disabled={loginMutation.isLoading}
            >
              {loginMutation.isLoading ? "Cargando..." : "Enviar"}
            </button>
            <div className="flex-1"></div>
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
              onClick={() => setShowModal(false)}
            >
              Cerrar Modal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Credenciales;
