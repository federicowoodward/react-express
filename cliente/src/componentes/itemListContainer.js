import { useState } from 'react';
import Item from "./item.js";
const axios = require('axios').default;

const ItemListContainer = () => {
    const [productosLista, setLista] = useState([])
    const [status, setStatus] = useState(false)
    const [estadoDeLaConsulta, setEstadoDeLaConsulta] = useState("")
    const [id, setIdParaBuscar] = useState("")
    const [buscadoPorId, setBuscadoPorId] = useState ([])
    
    function llamadoApi() {

        axios.get('http://localhost:8080/productos')
        .then(function (response) {
            if (response.data.length === 0) {
                setEstadoDeLaConsulta("No hay productos")
            } else {
                setLista(response.data);
            }
        })
        .catch(function (error) {
            if(error.message === 'Network Error') {
                setEstadoDeLaConsulta("Falla del servidor")
            }
        })
        .then(function () {
            setStatus(true)
        })
    }

    const generarItem = (e) => {
        setIdParaBuscar({
            ...id,
            [e.target.name]: e.target.value
        });
    }

    function llamadoApiPorId() {
        if (id === "") {
            alert("Dame un numero para buscar!")
            return;
        } 
        if (isNaN(id.id)) {
            alert("Tiene que ser numero!")
            return;
        }
        axios.get(`http://localhost:8080/productos/${id.id}`)
        .then(function (response) {
            if (response.data.length === 0) {
                setEstadoDeLaConsulta("No existe un producto con este id.")
            } else {
                setBuscadoPorId(response.data);
            }
        })
        .catch(function (error) {
            if(error.message === 'Network Error') {
                setEstadoDeLaConsulta("Falla del servidor")
            }
        })
        .then(function () {
            setStatus(true)
        })
    }
   

    if (!status) {
        return (
            <div>
                <button onClick={() => {llamadoApi()}}>Ver productos</button>
                <button onClick={() => {llamadoApiPorId()}}>Buscar por id</button>
                <input type="text" name="id" placeholder="introduccir id"  onChange={(e) => generarItem(e)}></input>
            </div>
        );
    }else if (status === true && id !== "") {
        return (
            <div>
                {
                    buscadoPorId.length === 0 ?  <p>{estadoDeLaConsulta}</p> :
                    <Item key={buscadoPorId.id} producto={buscadoPorId}/>
                }
            </div>
            )
    } else if (status) {
        return (
            <div>
                {   
                    productosLista.length === 0 ? <p>{estadoDeLaConsulta}</p> : 
                    productosLista.map(producto => {
                        return (
                            <Item key={producto.id} producto={producto}/>
                            );
                        })
                }
            </div>
        );
    }
}

export default ItemListContainer;