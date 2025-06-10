import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Login.css'



function Login({onRegisterClick}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
 

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
       //Renderizo MainPage
       
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Invalid email or password');
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
          <a className='forgot-password'>Olvido su contraseña?</a>
          <div className='register'>
            <span>Tiene una cuenta?</span>
            <a onClick={onRegisterClick}>Registrate</a>  
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </>
  );
}

export default Login

