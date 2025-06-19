import { useNavigate } from 'react-router-dom';


export default function Ajedrez() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-b from-blue-100 to-white py-10">
            <button
                onClick={() => navigate('/')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-8 rounded-full shadow transition-all duration-200"
            >
                Volver
            </button>
        </div>
    );
}