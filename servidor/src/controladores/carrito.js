const fs = require('fs');
const moment = require('moment');
// POST: '/' - Crea un carrito y devuelve su id.
// DELETE: '/:id' - Vacía un carrito y lo elimina.
const controladores = require("../controladores/controladores.js");

let carritos = undefined;
let urlArchivo = `./carritos.txt`
try { 
    let read = JSON.parse(fs.readFileSync(urlArchivo, "utf8"));
    carritos = read.carritos
}
catch {
    carritos = [];
    fs.writeFileSync(urlArchivo, JSON.stringify([]))
}
// console.log(carritos)

exports.crearCarrito = () => {
    let carrito = {
        "timestamp": moment().format("yyyy-MM-ddd HH:mm:ss a"),
        "productos": [],
    }
    //  para evitar creaccion de doble carrito al mismo cliente generar el if con local storage del lado del cliente
    let id = carritos.length > 0 ? parseInt(carritos[carritos.length-1].id) + 1 : 1;
    carrito.id = id;
    carritos.push(carrito);
    let bandera = true
    try {
        fs.writeFileSync(urlArchivo, JSON.stringify({carritos}, null, "\t"))
    } catch (e) {
        bandera = false;
        console.error(e)
    }
    if (bandera) {
        return id;
    } else {
        return "fallo"
    }
}

exports.borrarCarrito = (id) => {
    if (carritos.some(carrito => carrito.id === Number(id))) {
        const resultado = carritos.filter(carrito => carrito.id !== Number(id))
        carritos = resultado
        let bandera = true
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify({carritos}, null , "\t"))
        } catch (e) {
            bandera = false
            console.log(e)
        }
        if (bandera) {return"Carrito borrado"}
    } else {
        return"Este carrito no existe!"
    }
}
exports.listarProductos = async (id) => {
    let retorno = undefined
    await carritos.map((carrito) => {
        if ( carrito.id === Number(id)) {
            retorno = carrito.productos
        } 
    })
    return retorno
}
exports.agregarProductos = async (idProductos, idCarrito) => {
    let resultado = []
    if (!carritos.some(carrito => carrito.id == Number(idCarrito))) {
        return "Este carrito no existe!"
    }
    await idProductos.map((idBusqueda => {
        let producto = controladores.verPorId(idBusqueda)
        // idProductos.shift()
        if (producto === null) {
            resultado.push("Este producto no existe! ID: " + idBusqueda)
        } else {
            carritos.map((carrito) => {
                carrito.productos.push(producto)
                try {
                    fs.writeFileSync(urlArchivo, JSON.stringify({carritos}, null , "\t"))
                    resultado.push("Producto agregado! NOMBRE: " + producto.nombre)
                } catch (e) {
                    return "Fallo de base de datos: " + e
                }
            })
        }
    }))
    return resultado;
}
exports.borrarProductoPorId = (carritoID, productoID) => {
    const carritoIDx = carritos.findIndex(c => c.id == carritoID),
    itemIdx = carritoIDx !== -1 ? carritos[carritoIDx].productos.findIndex(i => i.id == productoID) : null;
    if (itemIdx > -1) {
        (x = carritos[carritoIDx].productos.splice(itemIdx, 1))
    } else {
        return "Este producto o carrito no existe!"
    }
    try {
        fs.writeFileSync(urlArchivo, JSON.stringify({carritos}, null , "\t"))
        return "Producto borrado!"
    } catch (e) {
        return e
    }
}