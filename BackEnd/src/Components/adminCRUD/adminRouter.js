const express = require('express');
const router = express.Router();
const { verificarAuth } = require('../../auth/authController');
const { agregarAlumno, eliminarAlumno, modificarAlumno, getAlumno, getAlumnoEmail } = require('./adminController');
const { agregarValidator, idValidator, mailValidator, modificacionValidator } = require("./adminValidator");

//router.use(verificarAuth)

// 1 POST /admins/
router.post('/', agregarValidator, agregarAdmin);

// 2 DELETE /admins/:id
router.delete('/:id', idValidator, eliminarAdmin);

// 3 PATCH /admins/:id
router.patch('/:id', idValidator, modificacionValidator, modificarAdmin);

// 4 GET /admins/:id
router.get('/:id', getAlumno);

// 5 GET filtroEmail /admins/:mail
router.get('/filtro/:mail', mailValidator, getAdminMail);


module.exports = router;
