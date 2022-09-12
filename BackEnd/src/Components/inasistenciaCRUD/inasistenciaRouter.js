const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./inasistenciaValidator");
const { agregarInasistencia, eliminarInasistencia, modificarInasistencia, getInasistencia } = require("./inasistenciaController");

//router.use(verificarAuth)

// 1 POST /inasistencias/
router.post('/', agregarValidator, agregarInasistencia);

// 2 DELETE /inasistencias/:id
router.delete('/:id', idValidator, eliminarInasistencia);

// 3 PATCH /inasistencias/:id
router.patch('/:id', idValidator, modificacionValidator, modificarInasistencia);

// 4 GET /inasistencias/:id
router.get('/:id', idValidator, getInasistencia);

module.exports = router;