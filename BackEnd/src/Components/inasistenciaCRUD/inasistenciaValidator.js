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
        .isString().withMessage("Justificado debe ser un string"),
    body("curso")
        .isInt().withMessage("Curso debe ser un int"),
    body("materia")
        .isString().withMessage("Materia deber ser un string"),
    body("persona")
        .isObject().withMessage("Persona debe ser un objeto"),
    verifyValidation
]

module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("Id debe ser alfanumerico"),
    verifyValidation
]

module.exports.dniValidator = [
    param("dni")
        .isInt().withMessage("Dni debe ser un int"),
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
        .isBoolean().withMessage("Justificado debe ser un string"),
    body("curso")
        .optional({nullable: true})
        .isInt().withMessage("Curso debe ser un int"),
    body("materia")
        .optional({nullable: true})
        .isString().withMessage("Materia deber ser un string"),
    body("persona")
        .optional({nullable: true})
        .isObject().withMessage("Persona debe ser un objeto"),
    verifyValidation
]
