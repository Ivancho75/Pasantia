import { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx';


export default function Register() {
    const [form, setForm] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setError('');
        setSuccess('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.username || !form.email || !form.password || !form.confirmPassword) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        if (form.password !== form.confirmPassword) {
            setError('Las contraseñas no coinciden.');
            return;
        }
    };

    return (
        <>
            <title>Register</title>
            <form
                className="register-form"
                onSubmit={e => {
                    handleSubmit(e);
                    // Solo abrir el modal si los campos están completos y no hay error
                    if (
                        form.username &&
                        form.email &&
                        form.password &&
                        form.confirmPassword &&
                        form.password === form.confirmPassword
                    ) {
                        setIsModalOpen(true);
                        setSuccess('Te has registrado correctamente.');
                    }
                }}
            >
                <h2 className="register-title">Registro de Cuenta</h2>
                {error && <div className="register-error">{error}</div>}
                {success && <div className="register-success">{success}</div>}
                <div className="register-field">
                    <label htmlFor="username">Usuario:</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className="register-input"
                        autoComplete="username"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="register-input"
                        autoComplete="email"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="register-input"
                        autoComplete="new-password"
                    />
                </div>
                <div className="register-field">
                    <label htmlFor="confirmPassword">Confirmar contraseña:</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className="register-input"
                        autoComplete="new-password"
                    />
                </div>
                <div className="register-actions">
                    <button type="submit" className="register-btn">
                        Registrarse
                    </button>
                    <button
                        type="button"
                        className="register-back-btn"
                        onClick={() => {
                            navigate('/');
                        }}
                    >
                        Volver al Login
                    </button>
                </div>
            </form>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Registro Exitoso</h2>
                <p>Te has registrado correctamente.</p>
                <button
                    onClick={() => {
                        setIsModalOpen(false);
                        navigate('/');
                    }}
                >
                    Cerrar
                </button>
            </Modal>
        </>
    );
}



