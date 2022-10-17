const controladores = require("../controladores/controladores");
const express = require("express")
const server = express()

server.use(express.json())
server.use(express.urlencoded({ extended: true }))

let admin = "true"
server.get('/',async (req, res) =>{
    res.status(201).send(await controladores.verTodos())
})

server.get('/:id',async (req, res) => {
    let id = req.params.id
    let response = undefined
    response = await controladores.verPorId(id)

    if (admin === "true") {
        if (response === null) {
            res.status(400).send( {"respuesta": "Este id no existe!"})
        } else {
            res.status(201).send( {"respuesta": response})
        }
    } else {
        res.status(401).send({ "respuesta" : "No tienes permiso para realizar esta accion."})
    }
})

server.post('/', async (req, res) => {
    let item = req.body
    if (admin === "true") {
        res.status(201).send( {"idCreado": controladores.crearProducto(item)})
    } else {
        res.status(401).send({ "idCreado" : "No tienes permiso para realizar esta accion."})
    }
})
server.put('/:id', (req, res) => {
    let id = req.params.id
    let item = req.body
    if (admin === "true") {
        res.status(200).send({ "retorno" : controladores.remplazarItem(item, id), "idRemplazado": id})
    } else {
        res.status(401).send({ "retorno" : "No tienes permiso para realizar esta accion."})
    }
})
server.delete('/:id', (req, res) => {
    let id = req.params.id
    if (admin === "true") {
        res.status(200).send({"retorno": controladores.borrarPorId(id), "idBorrado": id})
    } else {
        res.status(401).send({ "retorno" : "No tienes permiso para realizar esta accion."})
    }
})

module.exports= server;