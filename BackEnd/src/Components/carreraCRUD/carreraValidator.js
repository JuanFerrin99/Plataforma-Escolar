const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("nombre")
        .isString().withMessage("Nombre debe ser un string"),
    body("duracion")
        .isInt().withMessage("Duracion debe ser un entero"),
    body("materias")
        .isArray({min: 1}).withMessage("Materias debe ser un array"),
    body("materias.*")
        .isString({}).withMessage("Materias debe ser un array de strings"),
    body("tipo")
        .isString({}).withMessage("Tipo debe ser un string"),
    verifyValidation
]

module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("El id debe ser alfanumerico"),
    verifyValidation
]

module.exports.modificacionValidator = [
    body("nombre")
        .optional({nullable: true})
        .isString().withMessage("Nombre debe ser un string"),
    body("duracion")
        .optional({nullable: true})
        .isInt().withMessage("Duracion debe ser un entero"),
    body("materias")
        .optional({nullable: true})
        .isArray().withMessage("Materias debe ser un array"),
    body("materias.*")
        .isString().withMessage("Materias debe ser un array de strings"),
    body("tipo")
        .optional({nullable: true})
        .isString().withMessage("Tipo debe ser un string"),
    verifyValidation
]
