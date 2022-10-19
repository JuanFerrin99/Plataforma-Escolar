const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');

const { idValidator, finalIdValidator, agregarFinalValidator, modificarFinalValidator } = require("./finalesValidator");
const { agregarFinal, modificarFinal, eliminarFinal } = require("./finalesController");

router.use(verificarRol(["profesor", "secretario", "admin"]))

// POST /cursos/:id/finales
router.post('/:id/finales', idValidator, agregarFinalValidator, agregarFinal)

// PATCH /cursos/:id/finales/:finalId
router.patch('/:id/finales/:finalId', idValidator, finalIdValidator, modificarFinalValidator, modificarFinal)

// DELETE /cursos/:id/finales/:finalId
router.delete('/:id/finales/:finalId', idValidator, finalIdValidator, eliminarFinal)


module.exports = router;