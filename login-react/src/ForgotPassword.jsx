import { useState } from 'react'
import './ForgotPassword.css'
import {useNavigate} from 'react-router-dom'
import Modal from './Modal.jsx';    

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Por favor ingresa tu correo electrónico.');
            return;
        }
    };

    return (
        <>
            <h1>Olvidé mi contraseña</h1>
            {submitted ? (
                <div className="success-message">
                    Si el correo existe, recibirás instrucciones para restablecer tu contraseña.
                </div>
            ) : (
                <form
                    className="forgot-password-form"
                    onSubmit={e => {
                        handleSubmit(e);
                        if (email) {
                            setIsModalOpen(true);
                            setSubmitted(true);
                        }
                    }}
                >
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Ingresa tu correo"
                        autoComplete="email"
                    />
                    {error && <div className="error-message">{error}</div>}
                    <button type="submit" className="submit-btn">
                        Enviar instrucciones
                    </button>
                </form>
            )}
            <button
                type="button"
                className="register-back-btn"
                onClick={() => navigate("/")}
            >
                Volver al Login
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Se envió correo para restablecer contraseña</h2>
                <button
                    onClick={() => {
                        setIsModalOpen(false);
                        navigate("/");
                    }}
                >
                    Cerrar
                </button>
            </Modal>
        </>
    );
}
export default ForgotPassword