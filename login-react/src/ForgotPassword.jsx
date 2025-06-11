import { useState } from 'react'
import './MainPage.css'
import {useNavigate} from 'react-router-dom'

function ForgotPassword(){
    const navigate = useNavigate();
    return(
    <>
    <h1>Olvide contraseña</h1> 
     <button type="button" className="register-back-btn" 
     onClick={() => {
        navigate("/");
     }}>Volver al Login</button> 
    </>
    )
}
export default ForgotPassword