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
    body("fechaNacimiento")
        .isISO8601().withMessage("Fecha de nacimiento debe tener formato yyyy-mm-dd"),
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
        .isISO8601().withMessage("Fecha de ingreso debe tener formato yyyy-mm-dd"),
    body("rol")
        .isString().withMessage("Rol debe ser un string"),
    body("datosNacimiento")
        .isObject().withMessage("Datos de nacimiento debe ser un objeto con los campos pais y localidad"),
    body("cursosActivos")
        .isArray().withMessage("CursosActivos debe ser un array"),
    body("cursosActivos.*")
        .isObject().withMessage("CursosActivos debe ser un array de objetos"),
    body("carrera")
        .isObject().withMessage("Carrera debe ser un objeto con los campos nombre, duracion, materias y tipo"),
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
        .isISO8601().withMessage("Fecha de nacimiento debe tener formato yyyy-mm-dd"),
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
        .isISO8601().withMessage("Fecha de ingreso debe tener formato yyyy-mm-dd"),
    body("rol")
        .optional({nullable: true})
        .isString().withMessage("Rol debe ser un string"),
    body("datosNacimiento")
        .optional({nullable: true})
        .isObject().withMessage("Datos de nacimiento debe ser un objeto con los campos pais y localidad"),
    body("cursosActivos")
        .optional({nullable: true})
        .isArray().withMessage("CursosActivos debe ser un array"),
    body("cursosActivos.*")
        .isObject().withMessage("CursosActivos debe ser un array de objetos"),
    body("carrera")
        .optional({nullable: true})
        .isObject().withMessage("Carrera debe ser un objeto con los campos nombre, duracion, materias y tipo"),
    verifyValidation
]
