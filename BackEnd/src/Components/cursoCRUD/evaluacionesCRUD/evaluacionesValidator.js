const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../../utils/validationUtils")


module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("id debe ser alfanumerico"),
    verifyValidation
]
module.exports.evaluacionIdValidator = [
    param("evaluacionId")
        .isAlphanumeric().withMessage("evaluacionId debe ser alfanumerico"),
    verifyValidation
]


module.exports.agregarEvaluacionValidator = [
    body("evaluacion")
        .isObject().withMessage("Evaluacion debe ser un objeto"),
    verifyValidation
]
module.exports.modificarEvaluacionValidator = [
    body("tipo")
        .optional({ nullable: true })
        .isString().withMessage("Tipo debe ser un string"),
    body("fecha")
        .optional({ nullable: true })
        .isString().withMessage("Fecha debe ser un string"),
    verifyValidation
]