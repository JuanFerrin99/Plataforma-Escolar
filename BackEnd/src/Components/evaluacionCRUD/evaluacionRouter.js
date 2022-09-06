const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./evaluacionValidator");
const { agregarEvaluacion, eliminarEvaluacion, modificarEvaluacion, getEvaluacion } = require("./evaluacionController");

//router.use(verificarAuth)

// 1 POST /evaluaciones/
router.post('/', agregarValidator, agregarEvaluacion);

// 2 DELETE /evaluaciones/:id
router.delete('/:id', idValidator, eliminarEvaluacion);

// 3 PATCH /evaluciones/:id
router.patch('/:id', idValidator, modificacionValidator, modificarEvaluacion);

// 4 GET /evaluaciones/:id
router.get('/:id', idValidator, getEvaluacion);


module.exports = router;