import { useState } from 'react'
import './Login.css'
import { useNavigate } from 'react-router-dom';
import Modal from './Modal.jsx'



function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch("http://testiis01.campana.gov.ar/Municipalidad.Campana.Api/api/auth/munidigital/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();
      if (data) {
        //Guardo datos
        localStorage.setItem("usuario", JSON.stringify(data));
        //Mostrar modal
        //prompt('Login correcto')
        // Renderizo MainPage
        navigate('/main');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      //setError('Invalid email or password');
      // Mostrar modal de error
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form className='login-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <a className='forgot-password'
          onClick={() => {
                navigate('/forgotPassword');
              }}
              style={{ cursor: 'pointer' }}>Olvido su contraseña?
          </a>
          <div className='register'>
            <span>Tiene una cuenta?</span>
            <a
              onClick={() => {
                navigate('/register');
              }}
              style={{ cursor: 'pointer' }}
            >
              Registrate
            </a>  
          </div> 
          <button type="submit">Login</button>
        </form>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Error</h2>
        <p>Usuario o contraseña inválidos</p>
        <button onClick={() => setIsModalOpen(false)} style={{ color: 'red' }}>Vuelva a intentar</button>
      </Modal>
    </>
  );
}

export default Login

