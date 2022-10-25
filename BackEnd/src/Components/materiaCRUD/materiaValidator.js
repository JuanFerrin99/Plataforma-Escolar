const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("nombre")
        .isString().withMessage("Nombre debe ser un string")
        .isLength({min: 1, max:100}).withMessage("Nombre debe tener minimo un caracter y maximo 100"),
    body("duracion")
        .isString().withMessage("Duracion debe ser un string")
        .isLength({min: 5, max: 13}).withMessage("Duracion debe tener como minimo 5 caracteres y maximo 13"),
    body("correlativas")
        .optional({nullable: true})
        .isArray().withMessage("Correlativas debe ser un array"),
    body("final")
        .isString().withMessage("Final debe ser un string"),
    body("correlativas.*")
        .isString({}).withMessage("Correlativas deben ser un array de strings"),
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
        .isString().withMessage("Nombre debe ser un string")
        .isLength({min: 1, max: 100}).withMessage("Nombre debe tener como minimo un caracter y maximo 100"),
    body("duracion")
        .optional({nullable: true})
        .isString().withMessage("Duracion debe ser un string")
        .isLength({min: 5, max: 13}).withMessage("Duracion debe tener como minimo 5 caracteres y maximo 13"),
    body("correlativas")
        .optional({nullable: true})
        .isArray({min:1}).withMessage("Correlativas debe ser un array y tener al menos un elemento"),
    body("correlativas.*")
        .isString({}).withMessage("Correlativas deben ser un array de strings"),
    body("final")
        .optional({nullable: true})
        .isString().withMessage("Final debe ser un string"),
    verifyValidation
]
