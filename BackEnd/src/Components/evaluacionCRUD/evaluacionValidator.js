const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("tipo")
        .isString().withMessage("Tipo debe ser un string")
        .isLength({min: 5, max:7}).withMessage("Tipo debe tener entre 5 y 7 caracteres"),
    body("fecha")
        .isISO8601({}).withMessage("Fecha debe tener formato yyyy-mm-dd"),
    body("periodoInscripcion")
        .isObject().withMessage("Periodo de inscripcion debe ser un objeto"),
    body("alumnos")
        .isArray().withMessage("Alumnos debe ser un array"),
    body("alumnos.*")
        .isObject({}).withMessage("Alumnos debe ser un array de objetos"),
    verifyValidation
]

module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("El id debe ser alfanumerico"),
    verifyValidation
]

module.exports.modificacionValidator = [
    body("tipo")
        .optional({nullable: true})
        .isString().withMessage("Tipo debe ser un string")
        .isLength({min: 5, max: 7}).withMessage("Tipo debe tener entre 5 y 7 caracteres"),
    body("fecha")
        .optional({nullable: true})
        .isISO8601().withMessage("Fecha debe tener formato yyyy-mm-dd"),
    body("periodoInscripcion")
        .optional({nullable: true})
        .isInt({min:1}).withMessage("Periodo de inscripcion debe ser un objeto"),
    body("alumnos")
        .optional({nullable: true})
        .isArray().withMessage("Alumnos debe ser un array"),
    body("alumnos.*")
        .isObject({}).withMessage("Alumnos debe ser un array de objetos"),
    verifyValidation
]
