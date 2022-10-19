const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');

const { idValidator, dniValidator, modificarFinalValidator } = require("./finalAlumnoValidator");
const { modificarFinal } = require("./finalAlumnoController");

router.use(verificarRol(["profesor", "admin"]))

// PATCH /cursos/:id/:dni
router.patch('/:id/:dni', idValidator, dniValidator, modificarFinalValidator, modificarFinal)


module.exports = router;