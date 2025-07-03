import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Registro() {
    const [show, setShow] = React.useState(true);

    if (!show) return null;

    const handleClose = () => {
        setShow(false);
        // Resetea el formulario si existe uno
         const form = document.querySelector("form");
        if (form) form.reset();
        setTimeout(() => {
            window.location.reload();
        },100);     // Para arreglar tema de las validaciones luego de haber creado el primer form
    };
    

    return (
        <div className="fixed inset-0 z-[1000]" style={{ background: "rgba(0,0,0,0.5)" }}>
            <div className="flex items-center justify-center min-h-screen w-full">
                <div
                    style={{
                        background: "#fff",
                        padding: "2rem",
                        borderRadius: "8px",
                        minWidth: "300px",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
                    }}
                    className="w-full max-w-md flex flex-col items-center"
                >
                    <h2 className="text-2xl font-semibold mb-4 text-green-500 text-center">Registro exitoso</h2>
                    <p className=" font-semibold mb-4 text-center">Tu volquete está en camino, muchas gracias!</p>
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={handleClose}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registro;