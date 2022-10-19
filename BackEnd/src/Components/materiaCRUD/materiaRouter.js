const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./materiaValidator");
const { agregarMateria, eliminarMateria, modificarMateria, getMateria} = require("./materiaController");

// 1 POST /materias/
router.post('/', verificarRol(["secretario", "admin"]), agregarValidator, agregarMateria);

// 2 DELETE /materias/:id
router.delete('/:id', verificarRol(["secretario", "admin"]), idValidator, eliminarMateria);

// 3 PATCH /materias/:id
router.patch('/:id', verificarRol(["secretario", "admin"]), idValidator, modificacionValidator, modificarMateria);

// 4 GET /materias/:id
router.get('/:id', idValidator, getMateria);

module.exports = router;
