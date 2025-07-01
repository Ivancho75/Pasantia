import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



function Registro() {
    const [show, setShow] = React.useState(true);

    if (!show) return null;

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
                    <button
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                        onClick={() => setShow(false)}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Registro;