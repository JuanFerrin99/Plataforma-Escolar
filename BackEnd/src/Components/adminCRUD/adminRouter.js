const express = require('express');
const router = express.Router();
const { verificarRol, verificarIdentidad } = require('../../auth/authController.js');
const { agregarAdmin, eliminarAdmin, modificarAdmin, getAdmin, getAdminMail } = require('./adminController');
const { agregarValidator, idValidator, mailValidator, modificacionValidator } = require("./adminValidator");

router.use(verificarRol(["admin"]))

// 1 POST /admins/
router.post('/', agregarValidator, agregarAdmin);

// 2 DELETE /admins/:id
router.delete('/:id', idValidator, eliminarAdmin);

// 3 PATCH /admins/:id
router.patch('/:id', idValidator, modificacionValidator, modificarAdmin);

// 4 GET /admins/:id
router.get('/:id', getAdmin);

// 5 GET filtroEmail /admins/:mail
router.get('/filtro/:mail', mailValidator, getAdminMail);


module.exports = router;
