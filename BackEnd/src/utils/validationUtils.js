const { validationResult, header } = require("express-validator")

module.exports.verifyValidation = (req, res, next) => {

    const errors = validationResult(req)

    if(errors.isEmpty())
        return next()

    
    res.status(400).json({
        code: 10,
        message: errors.array()
    })
}

const verifyValidationJWT = (req, res, next) => {

    const errors = validationResult(req)

    if(errors.isEmpty()) {
        return next()
    }
    
    res.status(401).json({
        code: 10,
        message: "El JWT debe estar en Header Authorization"
    })
}

module.exports.jwtValidator = [
    header("Authorization")
        .isString()
        .withMessage("Debe existir")
        .bail()
        .customSanitizer(value => value.split(" ")[1])
        .isJWT()
        .withMessage("Debe ser JWT"),
        verifyValidationJWT
]
