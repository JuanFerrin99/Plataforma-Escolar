const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');

//PARAMS
const { idValidator, evaluacionIdValidator, finalIdValidator, notaIdValidator, dniValidator } = require("./cursoValidator");

//VALIDATORS
const { agregarValidator, modificacionValidator } = require("./cursoValidator");
const { agregarEvaluacionValidator, modificarEvaluacionValidator } = require("./cursoValidator");
const { agregarFinalValidator, modificarFinalValidator } = require("./cursoValidator");
const { agregarCalificacionValidator, modificarCalificacionValidator } = require("./cursoValidator");

//FUNCTIONS
const { agregarCurso, eliminarCurso, modificarCurso, getCurso, getCursoAlumno, getCursos, agregarFechaAsistencia } = require("./cursoController");
const { agregarEvaluacion, modificarEvaluacion, eliminarEvaluacion } = require("./cursoController");
const { agregarFinal, modificarFinal, eliminarFinal } = require("./cursoController");
const { agregarCalificacion, modificarCalificacion, eliminarCalificacion } = require("./cursoController");


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

//---------------------------------------- Sector restful-ish ----------------------------------------------

// POST /cursos/:id
router.post('/:id', idValidator, modificacionValidator, agregarFechaAsistencia)


//------------------------------------------- Evaluaciones
// POST /cursos/:id/evaluaciones
router.post('/:id/evaluaciones', idValidator, agregarEvaluacionValidator, agregarEvaluacion)

// PATCH /cursos/:id/evaluaciones/:evaluacionId
router.patch('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, modificarEvaluacionValidator, modificarEvaluacion)

// DELETE /cursos/:id/evaluaciones/:evaluacionId
router.delete('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, eliminarEvaluacion)


//--------------------------------------------- Finales
// POST /cursos/:id/finales
router.post('/:id/finales', idValidator, agregarFinalValidator, agregarFinal)

// PATCH /cursos/:id/finales/:finalId
router.patch('/:id/finales/:finalId', idValidator, finalIdValidator, modificarFinalValidator, modificarFinal)

// DELETE /cursos/:id/finales/:finalId
router.delete('/:id/finales/:finalId', idValidator, finalIdValidator, eliminarFinal)


//----------------------------------------- Calificaciones
// POST /cursos/:id/alumnos/:dni/calificaciones
router.post('/:id/alumnos/:dni/calificaciones', idValidator, dniValidator, agregarCalificacionValidator, agregarCalificacion)

// PATCH /cursos/:id/alumnos/:dni/calificaciones/:notaId
router.patch('/:id/alumnos/:dni/calificaciones/:notaId', idValidator, dniValidator, notaIdValidator, modificarCalificacionValidator, modificarCalificacion)

// DELETE /cursos/:id/alumnos/:dni/calificaciones/:notaId
router.delete('/:id/alumnos/:dni/calificaciones/:notaId', idValidator, notaIdValidator, dniValidator, eliminarCalificacion)


module.exports = router;