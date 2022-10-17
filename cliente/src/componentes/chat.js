import { useState, useEffect, useRef, memo } from 'react';
import socket from './socket';
import "../App.css";
import "./chat.css";

const Chat = ({ correo }) => {
    const [mensaje, setMensaje] = useState("");
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        socket.emit("conectado", correo)
    }, [correo])

    useEffect(() => {
        socket.on("mensajes", mensaje => {
            if (mensaje.nombre === "Sistema") {
                let date = dateFunc()
                mensaje.date = date
            }
            if (mensaje.mensaje === "") {
                return
            } else {
                setMensajes([...mensajes, mensaje])
            }
        })
        return() => {socket.off()}
    }, [mensajes])
    
    const divRef = useRef(null);
    useEffect(() =>{
        divRef.current.scrollIntoView({ behavior: 'smooth'})
    })
    
    const sumbit = (e) => {
        let date = dateFunc()
        e.preventDefault()
        socket.emit("mensaje", correo, mensaje, date)
        setMensaje("")
    }

    const dateFunc = () => {
        let date = {};
        let dateGet = new Date();
        date.mes = dateGet.getMonth() + 1;
        date.dia = dateGet.getDate();
        date.año = dateGet.getFullYear();
        date.hora = dateGet.getHours();
        date.minutos = dateGet.getMinutes();
        date.segundos = dateGet.getSeconds();
        return date;
    }
    return (
        <div>
            <div className="chat">
                {mensajes.map((e, i) => 
                <div key={i} className="mensaje">
                    <h5 className="sistema">{e.nombre}</h5>
                    <h5 className="correo">{e.correo}</h5>
                    <div className="date">
                        <p><strong>[</strong>{e.date.mes}/</p>
                        <p>{e.date.dia}/</p>
                        <p>{e.date.año} </p>
                        <p>{e.date.hora}:</p>
                        <p>{e.date.minutos}:</p>
                        <p>{e.date.segundos}<strong>] :</strong></p>
                    </div>
                    <div className="texto">{e.mensaje}</div>
                </div>)}
                <div ref={divRef}></div>
            </div>
            <form onSubmit={sumbit}>
                <label htmlFor="">Escriba su mensaje</label>
                <textarea name="" id="" cols="30" rows="10" onChange={e => setMensaje(e.target.value)}>
                
                </textarea> 
                <button >Enviar</button>
            </form>
        </div>
        )
}

export default memo(Chat);