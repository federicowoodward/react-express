const fs = require('fs');
const moment = require('moment');

let productos = undefined;
let urlArchivo = "./productos.txt";

try { 
    let read = JSON.parse(fs.readFileSync(urlArchivo, "utf8"));
    productos = read.productos
}
catch {
    productos = [];
    fs.writeFileSync(urlArchivo, JSON.stringify([]))
}


exports.verTodos = () => {
    return productos;
}

exports.verPorId = (id) => {
    let producto = productos.find(producto => producto.id == id);
    if (producto === undefined) {
        return null;
    } else {
        return producto;
    }
}

exports.crearProducto = (item) => {
    if (productos.some(producto => producto.codigo == item.codigo)) {
        return ("Hay otro producto con el mismo codigo, cambialo y vuelve a intentar.")
    } else {
        let id = productos.length> 0 ? parseInt(productos[productos.length-1].id) + 1 : 1;
        let timestamp =  moment().format("yyyy-MM-ddd HH:mm:ss a");
        item.id = id;
        item.timestamp = timestamp;
        productos.push(item);
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify({productos}, null , "\t"))
        } catch (e) {
            return e
        }
        return id;
    }
}

exports.borrarPorId = (id) => {
    if (productos.some(producto => producto.id === Number(id))) {
        const resultado = productos.filter(producto => producto.id !== Number(id))
        productos = resultado
        let bandera = true
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify({productos}, null , "\t"))
        } catch (e) {
            bandera = false
            return e
        }
        if (bandera) {return"Producto borrado"}
    } else {
        return"El item no existe!!"
    }
}

exports.remplazarItem = (item, id) => {
    if (productos.some(producto => producto.id === Number(id))) {
        let itemParaRemplazar = productos.find(el => el.id === Number(id))
        itemParaRemplazar.nombre = item.nombre
        itemParaRemplazar.codigo = item.codigo
        itemParaRemplazar.stock = item.stock
        itemParaRemplazar.foto = item.foto
        itemParaRemplazar.descripcion = item.descripcion
        itemParaRemplazar.precio = item.precio

        // esta seccion sirve para reconocer rapidamente cuando y cuantas veces fue actualizado el producto:
        if (itemParaRemplazar.timestampR === undefined) {
            itemParaRemplazar.timestampR = 1 + " " + moment().format("yyyy-MM-ddd HH:mm:ss a");
        } else {
            itemParaRemplazar.timestampR = Number(itemParaRemplazar.timestampR[0]) + 1 + " " + moment().format("yyyy-MM-dd HH")
        }

        let bandera = true
        try {
            fs.writeFileSync(urlArchivo, JSON.stringify({productos}, null, "\t"), "utf-8")
        } catch (e) {
            bandera = false
           return e
        }
        if (bandera) {
            return "Producto remplazado"  
        }
    } else {
        return "El item no existe!!"
    }
}