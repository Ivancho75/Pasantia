import { useState } from 'react'
import './MainPage.css'
import { useNavigate } from 'react-router'



function MainPage(){
    const navigate = useNavigate()
    const [form, setForm] = useState({
        nombre: '',
        apellido: '',
        fechaNacimiento:'',
        sexo:'',
        documento:'',
        numero:'',
        email: '',
        confirmEmail:'',
        codArea: '',
        telefono: '',
        codArea2: '',
        celular:'',

    });
    const [enviado, setEnviado] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
        
    };

     //para mostrar el nombre del usuario
    const user = JSON.parse(localStorage.getItem("usuario"));

    return (
        <div className="mainpage-background">
            <div className="hacete-socio-container">
                <h1>Hacete Socio</h1>
                {enviado ? (
                    <div className="mensaje-exito">
                        <h2>¡Gracias por asociarte!</h2>
                        <button onClick={() => navigate("/")}>Volver al login</button>
                    </div>
                ) : (
                    <form className="hacete-socio-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nombre</label>
                            <input
                                type="text"
                                name="nombre"
                                value={form.nombre = user.usuario.username}
                                onChange={handleChange}
                                required
                                disabled
                            />
                            <label>Apellido</label>
                            <input
                                type="text"
                                name="apellido"
                                value={form.apellido}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Fecha de nacimiento</label>
                            <input
                                type="date"
                                name="fechaNacimiento"
                                value={form.fechaNacimiento}
                                onChange={handleChange}
                                required
                                 max={new Date().toISOString().split("T")[0]} // No permite fechas futuras
                            />
                            <label>Sexo</label>
                            <select name="sexo" value={form.sexo} onChange={handleChange} required>
                                <option value="" disabled selected>Sexo</option>
                                <option value="masculino">Masculino</option>
                                <option value="femenino">Femenino</option>
                                <option value="no binario">No binario</option>
                            </select>
                            <label>Documento</label>
                            <select name="documento" value={form.documento} onChange={handleChange} required>
                                <option value="" disabled selected>Documento</option>
                                <option value="c.i.">C.I</option>
                                <option value="dni">DNI</option>
                                <option value="l.c.">L.C.</option>
                                <option value="pas.">PAS.</option>
                            </select>
                            <label>Número</label>
                            <input
                                type="number"
                                name="numero"
                                value={form.numero}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email = user.usuario.email}
                                onChange={handleChange}
                                required
                                disabled
                            />
                            <label>Confirmar Email</label>
                            <input
                                type="email"
                                name="confirmEmail"
                                value={form.confirmEmail = user.usuario.email}
                                onChange={handleChange}
                                required
                                disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Cod. área</label>
                            <input
                                type="tel"
                                name="codArea"
                                value={form.codArea}
                                onChange={handleChange}
                                required
                            />
                             <label>Teléfono</label>
                            <input
                                type="tel"
                                name="telefono"
                                value={form.telefono}
                                onChange={handleChange}
                                required
                            />
                            <label>Cod. área</label>
                            <input
                                type="tel"
                                name="codArea2"
                                value={form.codArea2}
                                onChange={handleChange}
                                required
                            />
                            <label>Celular</label>
                            <input
                                type="tel"
                                name="celular"
                                value={form.celular}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn-asociate">
                            Asociate
                        </button>
                        <button type="button" className="btn-cerrar" onClick={() => navigate("/")}>
                            Volver al login
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
export default MainPage
