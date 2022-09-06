const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController');
const { agregarValidator, idValidator, modificacionValidator } = require("./materiaValidator");
const { agregarMateria, eliminarMateria, modificarMateria, getMateria} = require("./materiaController");

//router.use(verificarAuth)

// 1 POST /materias/
router.post('/', agregarValidator, agregarMateria);

// 2 DELETE /materias/:id
router.delete('/:id', idValidator, eliminarMateria);

// 3 PATCH /materias/:id
router.patch('/:id', idValidator, modificacionValidator, modificarMateria);

// 4 GET /materias/:id
router.get('/:id', idValidator, getMateria);

module.exports = router;
