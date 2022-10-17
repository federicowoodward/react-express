const carrito = require('../controladores/carrito.js');
const express = require("express")
const server = express();

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

server.post(`/`, (req, res) => {
    res.status(201).send({ "retorno" : carrito.crearCarrito()})
})
server.delete(`/:id`, (req, res) => {
    let id = req.params.id;
    res.status(200).send({ "retorno" : carrito.borrarCarrito(id)})
})
server.get(`/:id/productos`, async (req, res) => {
    let id = req.params.id;
    // res.status(200).send({ "retorno" : "aaa"})
    res.status(200).send({ "retorno" : await carrito.listarProductos(id)})
})
server.post(`/:id/productos`, async (req, res) => {
    let idCarrito = req.params.id;
    // recibe [] con los ids a buscar en productos para agregar. ej [1,2,3]
    let idProductos = req.body;
    res.status(201).send({ "retorno" : await carrito.agregarProductos(idProductos, idCarrito)})
})
server.delete(`/:id/productos/:idProd`, (req, res) => {
    let idCarrito = req.params.id;
    let idProd = req.params.idProd;
    res.status(200).send({ "retorno" : carrito.borrarProductoPorId( idCarrito ,idProd)})
})

module.exports = server;