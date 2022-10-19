const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarProfesor, eliminarProfesor, modificarProfesor, getProfesor, getProfesorMail } = require('./profesorController');
const { agregarValidator, idValidator, mailValidator, modificacionValidator } = require("./profesorValidator");


// 1 POST /profesores/
router.post('/', verificarRol(["admin"]), agregarValidator, agregarProfesor);

// 2 DELETE /profesores/:id
router.delete('/:id', verificarRol(["admin"]), idValidator, eliminarProfesor);

// 3 PATCH /profesores/:id
router.patch('/:id', verificarRol(["secretario", "admin"]), idValidator, modificacionValidator, modificarProfesor);

// 4 GET /profesores/:id
router.get('/:id', idValidator, getProfesor);

// 5 GET filtro mail /profesores/:mail
router.get('/filtro/:mail', mailValidator, getProfesorMail);

module.exports = router;
