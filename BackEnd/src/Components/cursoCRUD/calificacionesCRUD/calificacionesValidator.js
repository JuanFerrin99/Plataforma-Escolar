const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../../utils/validationUtils")


module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("id debe ser alfanumerico"),
    verifyValidation
]
module.exports.notaIdValidator = [
    param("notaId")
        .isAlphanumeric().withMessage("notaId debe ser alfanumerico"),
    verifyValidation
]
module.exports.dniValidator = [
    param("dni")
        .isInt().withMessage("dni debe ser un int"),
    verifyValidation
]


module.exports.agregarCalificacionValidator = [
    body("calificacion")
        .isObject().withMessage("Calificacion debe ser un objeto"),
    verifyValidation
]
module.exports.modificarCalificacionValidator = [
    body("nota")
        .isInt().withMessage("Nota debe ser un int"),
    verifyValidation
]