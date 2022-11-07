const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("id debe ser alfanumerico"),
    verifyValidation
]


module.exports.agregarValidator = [
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
    body("finales")
        .isArray().withMessage("Finales debe ser un array"),
    body("finales.*")
        .isObject().withMessage("Finales debe ser un array de objetos"),
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
module.exports.modificacionValidator = [
    body("materia")
        .optional({ nullable: true })
        .isString().withMessage("Materia debe ser un string"),
    body("profesor")
        .optional({ nullable: true })
        .isObject().withMessage("Profesor debe ser un objeto"),
    body("alumnos")
        .optional({ nullable: true })
        .isArray().withMessage("Alumnos debe ser un array"),
    body("alumnos.*")
        .isObject({}).withMessage("Alumnos debe ser un array de objetos"),
    body("evaluaciones")
        .optional({ nullable: true })
        .isArray().withMessage("Evaluaciones debe ser un array"),
    body("evaluaciones.*")
        .isObject({}).withMessage("Evaluaciones debe ser un array de objetos"),
    body("finales")
        .optional({ nullable: true })
        .isArray().withMessage("Finales debe ser un array"),
    body("finales.*")
        .isObject({}).withMessage("Finales debe ser un array de objetos"),
    body("periodo")
        .optional({ nullable: true })
        .isObject().withMessage("Periodo debe ser un objeto"),
    body("fechasAsistencia")
        .optional({ nullable: true })
        .isArray().withMessage("FechasAsistencia debe ser un array"),
    body("fechasAsistencia.*")
        .isString().withMessage("FechasAsistencia debe ser un array de strings"),
    body("estado")
        .optional({ nullable: true })
        .isString().withMessage("Estado debe ser un string"),
    verifyValidation
]