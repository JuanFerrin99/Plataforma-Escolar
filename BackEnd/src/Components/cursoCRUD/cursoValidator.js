const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("nombre")
        .isString().withMessage("Nombre debe ser un string"),
    body("materia")
        .isString().withMessage("Materia debe ser un string"),
    body("profesor")
        .isObject().withMessage("Profesor debe ser un objeto"),
    body("alumnos")
        .isArray().withMessage("Alumnos debe ser un array"),
    body("alumnos.*")
        .isObject({}).withMessage("Alumnos debe ser un array de objetos"),
    body("evaluaciones")
        .isArray().withMessage("Evaluaciones debe ser una array"),
    body("evaluaciones.*")
        .isObject({}).withMessage("Evaluaciones debe ser un array de objetos"),
    body("final")
        .isObject().withMessage("Final debe ser una objeto"),
    body("periodo")
        .isObject().withMessage("Periodo debe ser una objeto"),
    body("fechasAsistencia")
        .isArray().withMessage("FechasAsistencia debe ser una array"),
    body("fechasAsistencia.*")
        .isString().withMessage("FechasAsistencia debe ser un array de strings"),
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
    body("nombre")
        .optional({nullable: true})
        .isString().withMessage("Nombre debe ser un string"),
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
    body("final")
        .optional({nullable: true})
        .isObject().withMessage("Final debe ser un objeto"),
    body("periodo")
        .optional({nullable: true})
        .isObject().withMessage("Periodo debe ser un objeto"),
    body("fechasAsistencia")
        .optional({nullable: true})
        .isArray().withMessage("FechasAsistencia debe ser un array"),
    body("fechasAsistencia.*")
        .isString().withMessage("FechasAsistencia debe ser un array de strings"),
    body("estado")
        .optional({nullable: true})
        .isString().withMessage("Estado debe ser un string"),
    verifyValidation
]


module.exports.agregarEvaluacionValidator = [
    body("evaluaciones")
        .isObject().withMessage("Evaluaciones debe ser un objeto"),
    verifyValidation
]