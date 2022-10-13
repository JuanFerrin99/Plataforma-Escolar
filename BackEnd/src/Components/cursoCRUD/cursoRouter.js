const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { idValidator, evaluacionIdValidator, notaIdValidator, dniValidator, agregarValidator, modificacionValidator, agregarEvaluacionValidator, modificarEvaluacionValidator, agregarCalificacionValidator, modificarCalificacionValidator } = require("./cursoValidator");
const { agregarCurso, eliminarCurso, modificarCurso, getCurso, getCursoAlumno, getCursos, agregarFechaAsistencia, agregarEvaluacion, modificarEvaluacion, eliminarEvaluacion, agregarCalificacion, modificarCalificacion } = require("./cursoController");

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

//-------------------------------------- Sector restful-ish -------------------------------------------------

// POST /cursos/:id
router.post('/:id', idValidator, modificacionValidator, agregarFechaAsistencia)


//----------------------------------------- Evaluaciones
// POST /cursos/:id/evaluaciones
router.post('/:id/evaluaciones', idValidator, agregarEvaluacionValidator, agregarEvaluacion)

// PATCH /cursos/:id/evaluaciones/:evaluacionId
router.patch('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, modificarEvaluacionValidator, modificarEvaluacion)

// DELETE /cursos/:id/evaluaciones/:evaluacionId
router.delete('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, eliminarEvaluacion)


//----------------------------------------- Calificaciones
// POST /cursos/:id/alumnos/:dni/calificaciones
router.post('/:id/alumnos/:dni/calificaciones', idValidator, dniValidator, agregarCalificacionValidator, agregarCalificacion)

// PATCH /cursos/:id/alumnos/:dni/calificaciones/:notaId
router.patch('/:id/alumnos/:dni/calificaciones/:notaId', idValidator, dniValidator, notaIdValidator, modificarCalificacionValidator, modificarCalificacion)

// DELETE /cursos/:id/alumnos/:dni/calificaciones/:notaId
//router.delete('/:id/alumnos/:dni/calificaciones/:notaId', idValidator, notaIdValidator, dniValidator, eliminarCalificacion)


module.exports = router;