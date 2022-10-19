const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarSecretario, modificarSecretario, eliminarSecretario, getSecretario, getSecretarioMail } = require('./secretarioController');
const { agregarValidator, idValidator, modificacionValidator } = require("./secretarioValidator");

//router.use(verificarAuth)

// 1 POST /secretarios/
router.post('/', verificarRol(["admin"]), agregarValidator, agregarSecretario);

// 2 DELETE /secretarios/:id
router.delete('/:id', verificarRol(["admin"]), idValidator, eliminarSecretario);

// 3 PATCH /secretarios/:id
router.patch('/:id', verificarRol(["admin"]), idValidator, modificacionValidator, modificarSecretario);

// 4 GET /secretarios/:id
router.get('/:id', idValidator, getSecretario);

// 5 GET filtro mail /secretario/:mail
router.get('/:mail', idValidator, getSecretarioMail);

module.exports = router;
