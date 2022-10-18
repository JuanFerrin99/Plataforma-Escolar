const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator, dniValidator } = require("./inasistenciaValidator");
const { agregarInasistencia, eliminarInasistencia, modificarInasistencia, getInasistencia,getInasistenciaAlumnoCurso,getInasistenciaDni } = require("./inasistenciaController");

//router.use(verificarIdentidad)

// 1 POST /inasistencias/
router.post('/', agregarValidator, agregarInasistencia);

// 2 DELETE /inasistencias/:id
router.delete('/:id', idValidator, eliminarInasistencia);

// 3 PATCH /inasistencias/:id
router.patch('/:id', idValidator, modificacionValidator, modificarInasistencia);

// 4 GET /inasistencias/:id
router.get('/:id', idValidator, getInasistencia);

// 5 GET /inasistencias/filtro/:dni
router.get('/filtro/:dni', verificarRol(["alumno", "profesor", "secretario"]), dniValidator, getInasistenciaDni);

// 6 GET /inasistencias/:dni/:id
router.get('/:dni/:id', dniValidator, idValidator, getInasistenciaAlumnoCurso);


module.exports = router;