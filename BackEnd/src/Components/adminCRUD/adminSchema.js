const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var admins = new Schema({
    nombre: String,
    apellido: String,
    mail: String,
    instance: Object,  /* Instancia de si mismo */
});

module.exports = mongoose.model('Admin', admins);

