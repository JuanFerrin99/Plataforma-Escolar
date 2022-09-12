const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController.js');
const { agregarValidator, idValidator, modificacionValidator } = require("./faltaValidator");
const { agregarFalta, eliminarFalta, modificarFalta, getFalta } = require("./faltaController");

//router.use(verificarAuth)

// 1 POST /faltas/
router.post('/', agregarValidator, agregarFalta);

//route
// 2 DELETE /faltas/:id
router.delete('/:id', idValidator, eliminarFalta);

// 3 PATCH /faltas/:id
router.patch('/:id', idValidator, modificacionValidator, modificarFalta);

// 4 GET /faltas/:id
router.get('/:id', idValidator, getFalta);

module.exports = router;