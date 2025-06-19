import Routes from './Routes.jsx';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import goleador from './assets/goleador.jpg'; // traigo foto goleador

export default function Futbol() {
    const navigate = useNavigate();
    // Resultados recientes
    const resultados = [
        {
            equipoA: "Real Madrid",
            equipoB: "Borussia Dortmund",
            marcador: "2 - 0",
            torneo: "UEFA Champions League Final",
            fecha: "2025-06-01"
        },
        {
            equipoA: "Manchester City",
            equipoB: "Manchester United",
            marcador: "1 - 2",
            torneo: "FA Cup Final",
            fecha: "2025-05-25"
        },
        {
            equipoA: "Boca Juniors",
            equipoB: "River Plate",
            marcador: "1 - 1",
            torneo: "Liga Profesional Argentina",
            fecha: "2025-06-09"
        },
        {
            equipoA: "Boca Juniors",
            equipoB: "SL Benfica",
            marcador: "2 - 2",
            torneo: "Mundial de Clubes",
            fecha: "2025-06-16"
        },
        {
            equipoA: "Boca Juniors",
            equipoB: "River Plate",
            marcador: "1 - 1",
            torneo: "Liga Profesional Argentina",
            fecha: "2024-06-09"
        },
        {
            equipoA: "Boca Juniors",
            equipoB: "River Plate",
            marcador: "1 - 1",
            torneo: "Liga Profesional Argentina",
            fecha: "2024-06-09"
        },
        {
            equipoA: "Boca Juniors",
            equipoB: "River Plate",
            marcador: "1 - 1",
            torneo: "Liga Profesional Argentina",
            fecha: "2024-06-09"
        },
        {
            equipoA: "Boca Juniors",
            equipoB: "River Plate",
            marcador: "1 - 1",
            torneo: "Liga Profesional Argentina",
            fecha: "2024-06-09"
        }
    ];

    // Noticias 
    const noticias = [
        {
            titulo: "Real Madrid ficha a una joven promesa",
            resumen: "El club blanco ha anunciado la incorporación de un delantero de 17 años.",
            fecha: "2025-06-19"
        },
        {
            titulo: "Manchester City celebra su noveno título",
            resumen: "Los citizens festejaron con su afición tras una temporada histórica en la Premier League.",
            fecha: "2025-06-19"
        },
        {
            titulo: "Rosario Central presenta nuevo refuerzo",
            resumen: "El club argentino ha anunciado el regreso de su estrella despues de 15 años",
            fecha: "2025-06-18"
        }
    ];

    // Secciones
    const secciones = [
        { nombre: "Resultados", ruta: "/resultados" },
        { nombre: "Calendario", ruta: "/calendario" },
        { nombre: "Estadísticas", ruta: "/estadisticas" },
        { nombre: "Jugadores", ruta: "/jugadores" }
    ];

    React.useEffect(() => {
        // Elimino el scroll de la página
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen w-screen bg-gradient-to-b from-blue-100 to-white overflow-hidden">
            {/* Navegación de secciones */}
            <nav className="flex gap-4 px-8 py-4 bg-blue-50 shadow-md">
                {secciones.map(sec => (
                    <button
                        key={sec.nombre}
                        onClick={() => navigate(sec.ruta)}
                        className="bg-blue-200 hover:bg-blue-400 text-blue-900 font-semibold py-2 px-4 rounded-lg transition"
                    >
                        {sec.nombre}
                    </button>
                ))}
            </nav>

            <main className="flex flex-1 w-full max-w-7xl mx-auto gap-12 px-8 pb-8 pt-6">
                {/* Resultados */}
                <section className="flex-1 flex flex-col justify-center">
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-4 drop-shadow">
                        Últimos Resultados
                    </h1>
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-200 min-h-[420px] flex flex-col justify-between">
                        <table className="w-full text-left mb-4">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="py-2 px-3 rounded-tl-2xl">Equipo A</th>
                                    <th className="py-2 px-3">Marcador</th>
                                    <th className="py-2 px-3">Equipo B</th>
                                    <th className="py-2 px-3">Torneo</th>
                                    <th className="py-2 px-3 rounded-tr-2xl">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultados.map((res, idx) => (
                                    <tr
                                        key={res.equipoA + res.equipoB + res.fecha + idx}
                                        className={idx % 2 === 0 ? 'bg-blue-50' : 'bg-white'}
                                    >
                                        <td className="py-2 px-3 font-medium text-blue-900">{res.equipoA}</td>
                                        <td className="py-2 px-3 text-blue-800 font-semibold text-center">{res.marcador}</td>
                                        <td className="py-2 px-3 font-medium text-blue-900">{res.equipoB}</td>
                                        <td className="py-2 px-3 text-blue-700">{res.torneo}</td>
                                        <td className="py-2 px-3 text-blue-400 text-xs">{res.fecha}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="flex justify-end">
                            <button
                                onClick={() => navigate('/resultados')}
                                className="text-blue-700 hover:underline font-semibold"
                            >
                                Ver todos los resultados &rarr;
                            </button>
                        </div>
                    </div>
                </section>

                {/* Noticias */}
                <section className="flex flex-col justify-between w-[380px] max-w-sm">
                    <div>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">Últimas Noticias</h2>
                        <ul className="space-y-4">
                            {noticias.map(noticia => (
                                <li key={noticia.titulo} className="bg-blue-50 rounded-lg p-4 shadow border border-blue-100 hover:cursor-pointer transition-transform transform hover:scale-105 ">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-semibold text-blue-900">{noticia.titulo}</span>
                                        <span className="text-xs text-blue-400">{noticia.fecha}</span>
                                    </div>
                                    <p className="text-blue-700">{noticia.resumen}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-6">
                        <button
                            onClick={() => navigate('/noticias')}
                            className="bg-blue-200 hover:bg-blue-400 text-blue-900 font-semibold py-2 px-4 rounded-lg transition w-full"
                        >
                            Ver más noticias
                        </button>
                    </div>
                </section>
            </main>

            {/* Estadísticas destacadas */}
            <section className="w-full max-w-7xl mx-auto px-8 pb-8" style={{ marginTop: '-10px' }}>
                <div className="bg-blue-50 rounded-2xl shadow-md p-6 flex flex-col md:flex-row gap-8 justify-between items-center">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-blue-700 mb-2">Estadísticas Destacadas Última Semana</h3>
                        <ul className="list-disc list-inside text-blue-800 space-y-1">
                            <li>Máximo goleador: <span className="font-semibold">Erling Haaland (Manchester City)</span></li>
                            <li>Equipo revelación: <span className="font-semibold">Real Madrid</span></li>
                            <li>Partido con más goles: <span className="font-semibold">Barcelona 5 - 3 Sevilla</span></li>
                        </ul>
                    </div>
                    <div className="flex-1 flex justify-center">
                        <img
                            src={goleador}
                            alt="Fútbol"
                            className="rounded-xl shadow-lg w-50 h-40 object-cover"
                        />
                    </div>
                </div>
            </section>

            <div className="flex justify-center pb-8" style={{ marginTop: '-25px' }}>
                <button
                    onClick={() => navigate('/')}
                    className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded-full shadow transition-all duration-200"
                >
                    Volver
                </button>
            </div>
        </div>
    );
}
 
