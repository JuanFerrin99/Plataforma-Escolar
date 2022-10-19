const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../../auth/authController.js');

const { idValidator, notaIdValidator, dniValidator, agregarCalificacionValidator, modificarCalificacionValidator } = require("./calificacionesValidator");
const { agregarCalificacion, modificarCalificacion, eliminarCalificacion } = require("./calificacionesController");

router.use(verificarRol(["profesor", "admin"]))

// POST /cursos/:id/alumnos/:dni/calificaciones
router.post('/:id/alumnos/:dni/calificaciones', idValidator, dniValidator, agregarCalificacionValidator, agregarCalificacion)

// PATCH /cursos/:id/alumnos/:dni/calificaciones/:notaId
router.patch('/:id/alumnos/:dni/calificaciones/:notaId', idValidator, dniValidator, notaIdValidator, modificarCalificacionValidator, modificarCalificacion)

// DELETE /cursos/:id/alumnos/:dni/calificaciones/:notaId
router.delete('/:id/alumnos/:dni/calificaciones/:notaId', idValidator, dniValidator, notaIdValidator, eliminarCalificacion)


module.exports = router;