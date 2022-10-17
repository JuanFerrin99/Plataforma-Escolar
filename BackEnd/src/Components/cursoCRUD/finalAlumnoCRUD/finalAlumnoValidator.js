const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../../utils/validationUtils")


module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("id debe ser alfanumerico"),
    verifyValidation
]
module.exports.dniValidator = [
    param("dni")
        .isInt().withMessage("dni debe ser un int"),
    verifyValidation
]


module.exports.modificarFinalValidator = [
    body("id")
        .optional({ nullable: true })
        .isInt().withMessage("id debe ser un int"),
    body("nota")
        .optional({ nullable: true })
        .isInt().withMessage("Nota debe ser un int"),
    verifyValidation
]