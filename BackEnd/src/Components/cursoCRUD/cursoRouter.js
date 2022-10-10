const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./cursoValidator");
const { agregarCurso, eliminarCurso, modificarCurso, getCurso, getCursoAlumno, getCursos, agregarFechaAsistencia } = require("./cursoController");

//router.use(verificarAuth)

// 1 POST /cursos/
router.post('/', agregarValidator, agregarCurso);

// 2 DELETE /cursos/:id
router.delete('/:id', idValidator, eliminarCurso);

// 3 PATCH /cursos/:id
router.patch('/:id', idValidator, modificacionValidator, modificarCurso);

// 4 GET /cursos/:id
router.get('/:id', idValidator, getCurso)

// 5 GET /cursos/:id/:dni
router.get('/:id/:dni', idValidator, getCursoAlumno)

// 6 GET /cursos/
router.get('/', getCursos)

// 7 POST /cursos/:id(de la evaluacion?)
router.post('/:id', idValidator, modificacionValidator, agregarFechaAsistencia)


module.exports = router;