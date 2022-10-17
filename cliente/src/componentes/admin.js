import { useState, memo } from 'react';
import BorrarProducto from "./borrarProductos.js";
const axios = require('axios');

const Admin = ({nombre}) => {
    const [item, setItem] = useState([])
    const [status, setStatus] = useState("")

  
    const nuevoProducto = async () => {
        try {
            await axios({
                url: "http://localhost:8080/crearProducto/true",
                method: "POST",
                data: item
            }).then((response) => {
                setStatus(response.data.idCreado)
            })
        } catch (err) {
            console.error(err);
        }
    }
    
    const generarItem = (e) => {
        e.preventDefault()
        setItem({
            ...item,
            [e.target.name]: e.target.value
        });
    }

    const crearOtro = () => {
        setItem([])
        window.location.reload(false);
    }
    return (
        <div>

            <p>hola: {nombre}</p>
            <section>
                <h2>Crear producto:</h2>
                <form id="form">
                    <input name="nombre" placeholder="Alt" type="text" onChange={(e) => generarItem(e)}/>
                    <input name="descripcion" placeholder="Descripcion" type="text" onChange={(e) => generarItem(e)}/>
                    <input name="codigo" placeholder="Codigo del producto" type="text" onChange={(e) => generarItem(e)}/>
                    <input name="fotoUrl" placeholder="Url de la foto" type="text" onChange={(e) => generarItem(e)}/>
                    <input name="precio" placeholder="Precio" type="text" onChange={(e) => generarItem(e)}/>
                    <input name="stock" placeholder="Stock" type="text" onChange={(e) => generarItem(e)}/>
                </form>
                {   
                    status === ""?
                    <button onClick={nuevoProducto}>Crear producto</button> 
                    :
                    status === "No tienes permiso para realizar esta accion."?
                    <p>No tiene permiso para realizar esta accion.</p>
                    :
                    !isNaN(status) ?
                    <div>
                        <p>Producto creado, id proporcionado: {status}</p>
                        <button onClick={crearOtro}>Crear otro</button> 
                    </div>
                    : 
                    <div>
                        <p>{status}</p> 
                        <p>Este producto ya existe!</p> 
                        <button onClick={nuevoProducto}>Reintentar</button> 
                    </div>
                }
            </section>
            <BorrarProducto/>
        </div>
        )
}

export default memo(Admin);