import './App.css';
import { useState } from "react";
import ItemListContainer from "./componentes/itemListContainer.js";
// import { BrowserRouter, Routes } from "react-router-dom";
// import Chat from "./componentes/chat.js";
import AdminLog from './componentes/adminLog.js';
function App() {
  const [correo, setCorreo] = useState("")
  const [registrado, setRegistrado] = useState(false)

  const registrar = (e) => {
    e.preventDefault()
    if(correo !== ""){
      setRegistrado(true)
    }
  }

  return (
        <>
            <div className="App">
                    
                <ItemListContainer/>
                {
                    !registrado && 
                    
                    <form onSubmit={registrar}>
                      <label htmlFor=''>Introduzca su correo</label>
                      <input value={correo} onChange={e => setCorreo(e.target.value)}/>
                      <button>Ir al chat</button>
                    </form>
                }
                {/* {
                    registrado && 
                    <Chat correo={correo} />
                } */}
                <AdminLog />
            </div>
        </>
  );
}

export default App;
