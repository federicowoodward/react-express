import { useState } from 'react';
import Admin from './admin.js';

const AdminLog = () => {
    const [nombre, setNombre] = useState("")
    const [admin, setAdminRegistrado] = useState(false)

    const registrarAdmin = () => {
        if (nombre !== "") {
            setAdminRegistrado(true)
        }
        // futuro registro por back aca
    }

    return (
        <div>

            {
                !admin && 
                <form onSubmit={registrarAdmin}>
                    <label htmlFor=''>Introduzca su nombre</label>
                    <input value={nombre} onChange={e => setNombre(e.target.value)}/>
                    {/* <label htmlFor=''>Introduzca su contraseña</label> */}
                    {/* <input value={contraseña} onChange={e => setContraseña(e.target.value)}/> */}
                    <button>Entrar</button>
                </form>
            }
            {
                admin && 
                <Admin nombre={nombre}/>
            }
        </div>
    );
}

export default AdminLog;