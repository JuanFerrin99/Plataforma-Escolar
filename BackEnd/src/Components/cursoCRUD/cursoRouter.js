const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { idValidator, evaluacionIdValidator, agregarValidator, modificacionValidator, agregarEvaluacionValidator, modificarEvaluacionValidator } = require("./cursoValidator");
const { agregarCurso, eliminarCurso, modificarCurso, getCurso, getCursoAlumno, getCursos, agregarFechaAsistencia, agregarEvaluacion, modificarEvaluacion, eliminarEvaluacion } = require("./cursoController");

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

//-------------------------------------- Sector resful ish -------------------------------------------------

// POST /cursos/:id
router.post('/:id', idValidator, modificacionValidator, agregarFechaAsistencia)


//----------------------------------------- Evaluaciones
// POST /cursos/:id/evaluaciones
router.post('/:id/evaluaciones', idValidator, agregarEvaluacionValidator, agregarEvaluacion)

// PATCH /cursos/:id/evaluaciones/:evaluacionId
router.patch('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, modificarEvaluacionValidator, modificarEvaluacion)

// DELETE /cursos/:id/evaluaciones/:evaluacionId
router.delete('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, eliminarEvaluacion)

module.exports = router;