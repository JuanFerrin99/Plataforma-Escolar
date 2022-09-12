const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController');
const { agregarProfesor, eliminarProfesor, modificarProfesor, getProfesor } = require('./profesorController');
const { agregarValidator, idValidator, modificacionValidator } = require("./profesorValidator");

//router.use(verificarAuth)

// 1 POST /profesores/
router.post('/', agregarValidator, agregarProfesor);

// 2 DELETE /profesores/:id
router.delete('/:id', idValidator, eliminarProfesor);

// 3 PATCH /profesores/:id
router.patch('/:id', idValidator, modificacionValidator, modificarProfesor);

// 4 GET /profesores/:id
router.get('/:id', idValidator, getProfesor);

module.exports = router;