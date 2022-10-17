const joi = require('joi')

const verificationObject = joi.object({
    nombre: joi.string().required(),
    descripcion: joi.string().required(),
    codigo: joi.number().required(),
    fotoUrl: joi.string().required(),
    precio: joi.number().min(1).required(),
    precio: joi.number().min(1).required(),
})

exports.dataValidation = async (item) => {
    try {
        await verificationObject.validateAsync(item)
        console.log("ok")
        return "OK"
    } catch (err) {
        return(
            "Hay error en la data ingresada: " + err
        );
    }
}
