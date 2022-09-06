const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController');
const { agregarSecretario, modificarSecretario, eliminarSecretario, getSecretario } = require('./secretarioController');
const { agregarValidator, idValidator, modificacionValidator } = require("./secretarioValidator");

//router.use(verificarAuth)

// 1 POST /secretarios/
router.post('/', agregarValidator, agregarSecretario);

// 2 DELETE /secretarios/:id
router.delete('/:id', idValidator, eliminarSecretario);

// 3 PATCH /secretarios/:id
router.patch('/:id', idValidator, modificacionValidator, modificarSecretario);

// 4 GET /secretarios/:id
router.get('/:id', idValidator, getSecretario);

module.exports = router;
