const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../../auth/authController.js');

const { idValidator, evaluacionIdValidator, agregarEvaluacionValidator, modificarEvaluacionValidator } = require("./evaluacionesValidator");
const { agregarEvaluacion, modificarEvaluacion, eliminarEvaluacion } = require("./evaluacionesController");

router.use(verificarRol(["profesor", "admin"]))

// POST /cursos/:id/evaluaciones
router.post('/:id/evaluaciones', idValidator, agregarEvaluacion)

// PATCH /cursos/:id/evaluaciones/:evaluacionId
router.patch('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, modificarEvaluacionValidator, modificarEvaluacion)

// DELETE /cursos/:id/evaluaciones/:evaluacionId
router.delete('/:id/evaluaciones/:evaluacionId', idValidator, evaluacionIdValidator, eliminarEvaluacion)


module.exports = router;