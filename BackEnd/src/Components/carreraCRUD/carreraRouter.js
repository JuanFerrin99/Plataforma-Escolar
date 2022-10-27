const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./carreraValidator");
const { agregarCarrera, eliminarCarrera, modificarCarrera, getCarrera, getCarreras } = require("./carreraController");

//router.use(verificarAuth)

// 1 POST /carreras/
router.post('/', verificarRol(["secretario", "admin"]), agregarValidator, agregarCarrera);

// 2 DELETE /carreras/:id
router.delete('/:id', verificarRol(["secretario", "admin"]), idValidator, eliminarCarrera);

// 3 PATCH /carreras/:id
router.patch('/:id', verificarRol(["secretario", "admin"]), idValidator, modificacionValidator, modificarCarrera);

// 4 GET /carreras/:id
router.get('/:id', idValidator, getCarrera);

// 5 GET /carreras/
router.get('/', getCarreras);

module.exports = router;