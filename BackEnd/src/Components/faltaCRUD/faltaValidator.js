const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("fecha")
        .isISO8601({}).withMessage("La fecha debe tener formato yyyy-mm-dd"),
    body("tipo")
        .isString().withMessage("El tipo debe ser un string"),
    body("motivo")
        .isString().withMessage("El motivo debe ser un string"),
    body("justificado")
        .isBoolean().withMessage("La caracterestica justificado debe ser un boolean"),
    verifyValidation
]

module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("El id debe ser alfanumerico"),
    verifyValidation
]

module.exports.modificacionValidator = [
    body("fecha")
        .optional({nullable: true})
        .isISO8601().withMessage("La fecha debe tener formato yyyy-mm-dd"),
    body("tipo")
        .optional({nullable: true})
        .isString().withMessage("El tipo debe ser un string"),
    body("motivo")
        .optional({nullable: true})
        .isString().withMessage("El motivo debe ser un string"),
    body("justificado")
        .optional({nullable: true})
        .isBoolean().withMessage("La caracteristica justificado debe ser un boolean"),
    verifyValidation
]
