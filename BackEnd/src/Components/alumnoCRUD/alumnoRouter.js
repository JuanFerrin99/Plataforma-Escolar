const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController');
const { agregarAlumno, eliminarAlumno, modificarAlumno, getAlumno, getAlumnoMail } = require('./alumnoController');
const { agregarValidator, idValidator, modificacionValidator } = require("./alumnoValidator");

//router.use(verificarAuth)

// 1 POST /alumnos/
router.post('/', agregarValidator, agregarAlumno);

// 2 DELETE /alumnos/:id
router.delete('/:id', idValidator, eliminarAlumno);

// 3 PATCH /alumnos/:id
router.patch('/:id', idValidator, modificacionValidator, modificarAlumno);

// 4 GET /alumnos/:id
router.get('/:id', idValidator, getAlumno);

// 5 GET filtro mail /alumnos/:mail
router.get('/:mail', idValidator, getAlumnoMail);


module.exports = router;
