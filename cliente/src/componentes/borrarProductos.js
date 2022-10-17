import { useState } from "react";
const axios = require("axios");

const BorrarProductos = () => {
    const [estado, setEstado] = useState(false);
    const [numero, setNumero] = useState(0);
    const [ids, setIds] = useState([])
    const [resultadoDelBorrado, setResultado] = useState([]);

    const agregarNumero = () => {
        setIds([
            ...ids,
            numero,
        ])
        // crear context para poder mostrarle al admin los ids q va agregado
    }    
    
    const borrarProductos = async () => {
        let arr = [];
        ids.map(async (id) => {
            try {
                await axios({
                    url: `http://localhost:8080/borrar/true/${id}`,
                    method: "DELETE",
                    data: id
                }).then((response) => {
                    arr.push(response.data);
                }).finally(() => {
                    next()
                })
            } catch (err) {
                console.error(err);
            }
        })
        
        const next = () => {
            setResultado(arr)        
            setEstado(true)
        }
    }

    if (estado) {
        return (
            <div>
                {
                    resultadoDelBorrado.map((resultado) => {
                        return (
                            <div key={resultado.idBorrado}>
                                <p>{resultado.idBorrado}</p>
                                {
                                    resultado.retorno === "Producto borrado" ? 
                                    <p className="succes">{resultado.retorno}</p> :
                                    <p className="failed">{resultado.retorno}</p>
                                }
                            </div>
                            );
                    })
                }
            </div>
            )
    } else if (!estado) {
        return (
            <div>
                {
                    ids.length === 0 ? <p>0</p> :
                    <p>{ids.join(" , ")}</p>
                }
                
                <input 
                type="text"
                placeholder="Dame ids para borrar"
                onKeyPress={(e) =>{e.key === "Enter" && agregarNumero()}}
                onChange={(e) => setNumero(e.target.value)}
                />
                <button onClick={borrarProductos}>Borrar productos</button>
            </div>
            )
    }
}
export default BorrarProductos;