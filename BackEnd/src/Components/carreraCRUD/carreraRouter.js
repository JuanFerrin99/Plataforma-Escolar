const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./carreraValidator");
const { agregarCarrera, eliminarCarrera, modificarCarrera, getCarrera } = require("./carreraController");

//router.use(verificarAuth)

// 1 POST /carreras/
router.post('/', agregarValidator, agregarCarrera);

// 2 DELETE /carreras/:id
router.delete('/:id', idValidator, eliminarCarrera);

// 3 PATCH /carreras/:id
router.patch('/:id', idValidator, modificacionValidator, modificarCarrera);

// 4 GET /carreras/:id
router.get('/:id', idValidator, getCarrera);

module.exports = router;