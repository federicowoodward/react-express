const express = require('express')
const app = express()
const routerProductos = require(`./routes/routesProducts.js`)
const routerCarrito = require(`./routes/routesCarrito.js`)
const { headersConfiguration } = require('./config/headers.js');
const cors = require('cors')

headersConfiguration();

app.use(`/api/productos`,cors(), routerProductos)
app.use(`/api/carrito`, cors(), routerCarrito)

module.exports = app;