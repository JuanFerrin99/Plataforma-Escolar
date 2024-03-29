const { body, query, param } = require("express-validator");
const { verifyValidation } = require("../../utils/validationUtils")


module.exports.agregarValidator = [
    body("nombre")
        .isString().withMessage("Nombre debe ser un string")
        .isLength({min:1}).withMessage("Nombre no puede quedar vacio"),
    body("apellido")
        .isString().withMessage("Apellido debe ser un string")
        .isLength({min:1}).withMessage("Apellido no puede quedar vacio"),
    body("dni")
        .isInt({min:1, max: 99999999}).withMessage("Dni debe ser un int y estar comprendido entre 1 y 99999999"),
    body("fechaNacimiento")
        .isString().withMessage("FechaNacimiento debe ser un string"),
    body("telefono")
        .isInt().withMessage("Telefono debe ser un int"),
    body("mail")
        .isEmail().withMessage("Mail debe tener formato de mail valido"),
    body("titulos")
        .isArray({min:1}).withMessage("Titulos debe ser un array y tener minimo un elemento"),
    body("titulos.*")
        .isString().withMessage("Titulos debe ser un array de strings"),
    body("datosResidencia")
        .isObject().withMessage("Datos de residencia debe ser un objeto con los campos pais, provincia, localidad, domicilio y codigo postal"),
    body("fechaIngreso")
        .isString().withMessage("FechaIngreso debe ser un string"),
    body("rol")
        .isString().withMessage("Rol debe ser un string"),
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
        .isLength({min:1}).withMessage("Nombre no puede quedar vacio"),
    body("apellido")
        .optional({nullable: true})
        .isString().withMessage("Apellido debe ser un string")
        .isLength({min:1}).withMessage("Apellido no puede quedar vacio"),
    body("dni")
        .optional({nullable: true})
        .isInt({min:1, max: 99999999}).withMessage("Dni debe ser un int y estar comprendido entre 1 y 99999999"),
    body("fechaNacimiento")
        .optional({nullable: true})
        .isString().withMessage("FechaNacimiento debe ser un string"),
    body("telefono")
        .optional({nullable: true})
        .isInt().withMessage("Telefono debe ser un int"),
    body("mail")
        .optional({nullable: true})
        .isEmail().withMessage("Mail debe tener formato de mail valido"),
    body("titulos")
        .optional({nullable: true})
        .isArray({min:1}).withMessage("Titulos debe ser un array y tener minimo un elemento"),
    body("titulos.*")
        .isString().withMessage("Titulos debe ser un array de strings"),
    body("datosResidencia")
        .optional({nullable: true})
        .isObject().withMessage("Datos de residencia debe ser un objeto con los campos pais, provincia, localidad, domicilio y codigo postal"),
    body("fechaIngreso")
        .optional({nullable: true})
        .isString().withMessage("FechaIngreso debe ser un string"),
    body("rol")
        .optional({nullable: true})
        .isString().withMessage("Rol debe ser un string"),
    verifyValidation
]
