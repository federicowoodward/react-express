const servidor = require('./src/app.js')
const PORT = process.env.PORT || 8080

servidor.listen(PORT, () => {
    console.log("________________________________________________")
    console.log("")
    console.log(`             listening on port ${PORT}`)
    console.log(`________________________________________________`)
    console.log("rs to reload:")
})
.on("error", (err) => {console.log(err)})