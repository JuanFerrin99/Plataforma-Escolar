const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("materia")
        .isString().withMessage("El tipo debe ser un string"),
    body("profesor")
        .isObject().withMessage("El profesor debe ser un objeto"),
    body("alumnos")
        .isArray().withMessage("Alumnos debe ser un array"),
    body("alumnos.*")
        .isObject({}).withMessage("Alumnos debe ser un array de objetos"),
    body("evaluaciones")
        .isArray().withMessage("Evaluaciones debe ser una array"),
    body("evaluaciones.*")
        .isObject({}).withMessage("Evaluaciones debe ser un array de objetos"),
    body("periodo")
        .isObject().withMessage("Periodo debe ser una objeto"),
    body("estado")
        .isString().withMessage("Estado debe ser un string"),
    verifyValidation
]

module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("El id debe ser alfanumerico"),
    verifyValidation
]

module.exports.modificacionValidator = [
    body("materia")
        .optional({nullable: true})
        .isString().withMessage("Materia debe ser un string"),
    body("profesor")
        .optional({nullable: true})
        .isObject().withMessage("Profesor debe ser un objeto"),
    body("alumnos")
        .optional({nullable: true})
        .isArray().withMessage("Alumnos debe ser un array"),
    body("alumnos.*")
        .isObject({}).withMessage("Alumnos debe ser un array de objetos"),
    body("evaluaciones")
        .optional({nullable: true})
        .isArray().withMessage("Evaluaciones debe ser un array"),
    body("evaluaciones.*")
        .isObject({}).withMessage("Evaluaciones debe ser un array de objetos"),
    body("periodo")
        .optional({nullable: true})
        .isObject().withMessage("Periodo debe ser un objeto"),
    body("estado")
        .optional({nullable: true})
        .isString().withMessage("Estado debe ser un string"),
    verifyValidation
]
