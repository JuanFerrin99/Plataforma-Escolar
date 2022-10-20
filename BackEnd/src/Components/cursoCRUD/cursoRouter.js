const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');

const { idValidator, agregarValidator, modificacionValidator } = require("./cursoValidator");
const { agregarCurso, eliminarCurso, modificarCurso, getCurso, getCursos, agregarFechaAsistencia } = require("./cursoController");

//router.use(verificarAuth)

// 1 POST /cursos/
router.post('/', verificarRol(["secretario", "admin"]), agregarValidator, agregarCurso);

// 2 DELETE /cursos/:id
router.delete('/:id', verificarRol(["secretario", "admin"]), idValidator, eliminarCurso);

// 3 PATCH /cursos/:id
router.patch('/:id', verificarRol(["profesor", "secretario", "admin"]), idValidator, modificacionValidator, modificarCurso);

// 4 GET /cursos/:id
router.get('/:id', idValidator, getCurso)

// 5 GET /cursos/
router.get('/', getCursos)

// ---------------------------------------------- Tomar Asistencia -----------------------------------------------
// POST /cursos/:id
router.post('/:id', verificarRol(["profesor"]), idValidator, modificacionValidator, agregarFechaAsistencia)


module.exports = router;