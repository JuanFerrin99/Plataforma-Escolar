const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("nombre")
        .isString().withMessage("Nombre debe ser un string")
        .isLength({min:1}).withMessage("El nombre no puede quedar vacio"),
    body("apellido")
        .isString().withMessage("Apellido debe ser un string")
        .isLength({min:1}).withMessage("Apellido no puede quedar vacio"),
    body("dni")
        .isInt({min:1, max: 99999999}).withMessage("Dni debe ser un int y estar comprendido entre 1 y 99999999"),
        body("mail")
        .isEmail().withMessage("Mail debe tener formato de mail valido"),
    body("instance")
        .optional({nullable: true})
        .isObject().withMessage("Instance debe ser un objeto"),
    verifyValidation
]

module.exports.idValidator = [
    param("id")
        .isAlphanumeric().withMessage("Id debe ser alfanumerico"),
    verifyValidation
]

module.exports.mailValidator = [
    param("mail")
        .isEmail().withMessage("Email debe tener formato de email"),
    verifyValidation
]

module.exports.modificacionValidator = [
    body("nombre")
        .optional({nullable: true})
        .isString().withMessage("Nombre debe ser un string")
        .isLength({min:1}).withMessage("El nombre no puede quedar vacio"),
    body("apellido")
        .optional({nullable: true})
        .isString().withMessage("Apellido debe ser un string")
        .isLength({min:1}).withMessage("Apellido no puede quedar vacio"),
    body("dni")
        .optional({nullable: true})
        .isInt({min:1, max: 99999999}).withMessage("Dni debe ser un int y estar comprendido entre 1 y 99999999"),
        body("mail")
        .isEmail().withMessage("Mail debe tener formato de mail valido"),
    body("instance")
        .optional({nullable: true})
        .isObject().withMessage("Instance debe ser un objeto"),
    verifyValidation
]
