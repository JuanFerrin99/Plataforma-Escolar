const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("id debe ser alfanumerico"),
    verifyValidation
]
module.exports.finalIdValidator = [
    param("finalId")
        .isAlphanumeric().withMessage("finalId debe ser alfanumerico"),
    verifyValidation
]


module.exports.agregarFinalValidator = [
    body("final")
        .isObject().withMessage("Final debe ser un objeto"),
    verifyValidation
]
module.exports.modificarFinalValidator = [
    body("id")
        .optional({ nullable: true })
        .isInt().withMessage("id debe ser un int"),
    body("fecha")
        .optional({ nullable: true })
        .isString().withMessage("Fecha debe ser un string"),
    body("fechasInscripcion")
        .optional({ nullable: true })
        .isObject().withMessage("FechasInscripcion debe ser un objeto"),
    body("alumnosInscriptos")
        .optional({ nullable: true })
        .isArray().withMessage("AlumnosInscriptos debe ser un array"),
    body("alumnosInscriptos.*")
        .isObject().withMessage("AlumnosInscriptos debe ser un array de objetos"),
    verifyValidation
]