const { body } = require("express-validator");
const { verifyValidation } = require("../utils/validationUtils.js");

module.exports.loginValidator = [
    body("email")
        .isEmail().withMessage("El campo email es obligatorio y tiene que ser un mail"),
    body("password")
        //.isAlphanumeric().withMessage("El campo password debe ser un string")
        .isLength({min: 8}).withMessage("El campo password debe tener al menos 8 caracteres"),
    verifyValidation
];