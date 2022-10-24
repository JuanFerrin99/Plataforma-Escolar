const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarAlumno, eliminarAlumno, modificarAlumno, getAlumno, getAlumnos, getAlumnoMail } = require('./alumnoController');
const { agregarValidator, idValidator, mailValidator, modificacionValidator } = require("./alumnoValidator");

//router.use(verificarAuth)

// 1 POST /alumnos/
router.post('/', verificarRol(["secretario", "admin"]), agregarValidator, agregarAlumno);

// 2 DELETE /alumnos/:id
router.delete('/:id', verificarRol(["admin"]), idValidator, eliminarAlumno);

// 3 PATCH /alumnos/:id
router.patch('/:id', verificarRol(["secretario", "admin"]), idValidator, modificacionValidator, modificarAlumno);

// 4 GET /alumnos/:id
router.get('/:id', idValidator, getAlumno);

// 5 GET /alumnos/
router.get('/alumnos', getAlumnos);

// 6 GET /filtroEmail /alumnos/:mail
router.get('/filtro/:mail', mailValidator, getAlumnoMail);


module.exports = router;
