import { useNavigate } from 'react-router-dom';
import React from 'react';
import basket from './assets/basket.jpg';
import nba from './assets/logonba.jpg';  //Traigo logos
import liga from './assets/logoliga.png';


export default function Basket() {
    const navigate = useNavigate();

    //  React.useEffect(() => {
    //       //Elimino el scroll de la página
    //     document.body.style.overflow = 'hidden';
    //      return () => {
    //          document.body.style.overflow = '';
    //      };
    //  }, []);

    // Secciones
    const secciones = [
        { nombre: "Resultados", ruta: "/resultados" },
        { nombre: "Calendario", ruta: "/calendario" },
        { nombre: "Estadísticas", ruta: "/estadisticas" },
        { nombre: "Jugadores", ruta: "/jugadores" }
    ];

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

            {/* Contenido principal */}
            <main className="flex-1 flex flex-col items-center justify-center p-8 space-y-10">
                {/* Banner principal */}
                <section className="w-full max-w-4xl bg-gradient-to-r from-blue-700 to-blue-400 rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-8 mb-8">
                    <img
                        src={basket}
                        alt="Basketball"
                        className="w-40 h-40 object-cover rounded-full border-4 border-white shadow-lg"
                    />
                    <div>
                        <h1 className="text-4xl font-extrabold text-white mb-2 flex items-center gap-2">
                            <span role="img" aria-label="Basketball">🏀</span> Mundo Basket
                        </h1>
                        <p className="text-blue-100 text-lg">
                            Todo sobre la NBA, la Liga Nacional y el baloncesto internacional. Resultados, estadísticas, jugadores y mucho más en un solo lugar.
                        </p>
                    </div>
                </section>

                {/* Tarjetas de ligas */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                    {/* NBA */}
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center w-full">
                        <img
                            src={nba}
                            alt="NBA Logo"
                            className="w-20 h-20 mb-4"
                        />
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">NBA</h2>
                        <p className="mb-4">Últimos partidos destacados</p>
                        {/* Simulación de partidos recientes */}
                        <table className="min-w-full text-sm mb-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Equipo Local</th>
                                    <th className="px-4 py-2 text-left">Marcador</th>
                                    <th className="px-4 py-2 text-left">Equipo Visitante</th>
                                    <th className="px-4 py-2 text-left">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">Lakers</td>
                                    <td className="px-4 py-2">112 - 108</td>
                                    <td className="px-4 py-2">Warriors</td>
                                    <td className="px-4 py-2">12/06/2025</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Celtics</td>
                                    <td className="px-4 py-2">99 - 105</td>
                                    <td className="px-4 py-2">Heat</td>
                                    <td className="px-4 py-2">11/06/2025</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Bucks</td>
                                    <td className="px-4 py-2">120 - 115</td>
                                    <td className="px-4 py-2">Suns</td>
                                    <td className="px-4 py-2">10/06/2025</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={() => window.open('https://www.nba.com/games', '_blank')}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded transition"
                        >
                            Ver más partidos
                        </button>
                    </div>
                    <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
                        <img
                            src={liga}
                            alt="Liga Nacional Logo"
                            className="w-20 h-20 mb-4"
                        />
                        <h2 className="text-2xl font-bold text-blue-800 mb-2">Liga Nacional</h2>
                        <p>Partidos</p>
                        <table className="min-w-full text-sm mb-2">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 text-left">Equipo Local</th>
                                    <th className="px-4 py-2 text-left">Marcador</th>
                                    <th className="px-4 py-2 text-left">Equipo Visitante</th>
                                    <th className="px-4 py-2 text-left">Fecha</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="px-4 py-2">Ferro</td>
                                    <td className="px-4 py-2">80 - 79</td>
                                    <td className="px-4 py-2">Boca</td>
                                    <td className="px-4 py-2">24/06/2025</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Platense</td>
                                    <td className="px-4 py-2">90 - 85</td>
                                    <td className="px-4 py-2">Obras</td>
                                    <td className="px-4 py-2">23/06/2025</td>
                                </tr>
                                <tr>
                                    <td className="px-4 py-2">Atenas</td>
                                    <td className="px-4 py-2">79 - 85</td>
                                    <td className="px-4 py-2">San Lorenzo</td>
                                    <td className="px-4 py-2">22/06/2025</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={() => window.open('https://www.laliganacional.com.ar/', '_blank')}
                            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded transition"
                        >
                            Ver más partidos
                        </button>
                    </div>
                    
                </div>

                {/* Noticias destacadas */}
                <section className="w-full max-w-4xl mt-8">
                    <h3 className="text-xl font-bold text-blue-900 mb-4">Últimas Noticias</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-blue-50 rounded-lg p-4 shadow hover:cursor-pointer transition-transform transform hover:scale-105">
                            <h4 className="font-semibold text-blue-800 mb-1">Playoffs NBA 2025</h4>
                            <p className="text-blue-700 text-sm">Los equipos luchan por el anillo en una de las temporadas más competitivas de la historia.</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 shadow hover:cursor-pointer transition-transform transform hover:scale-105">
                            <h4 className="font-semibold text-blue-800 mb-1">Liga Nacional: Finales</h4>
                            <p className="text-blue-700 text-sm">Los mejores equipos argentinos se enfrentan por el título nacional.</p>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-4 shadow hover:cursor-pointer transition-transform transform hover:scale-105">
                            <h4 className="font-semibold text-blue-800 mb-1">Estrellas Internacionales</h4>
                            <p className="text-blue-700 text-sm">Jugadores argentinos brillan en ligas de Europa y la NBA.</p>
                        </div>
                    </div>
                </section>
            </main>

            <div className="flex justify-center pb-8" style={{ marginTop: '-10px' }}>
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
 


