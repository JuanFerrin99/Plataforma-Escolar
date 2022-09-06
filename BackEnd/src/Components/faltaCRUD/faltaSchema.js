const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var faltas = new Schema({
    fecha: Date,
    tipo: String,
    motivo: String,
    justificado: Boolean
});

module.exports = mongoose.model('Falta', faltas);