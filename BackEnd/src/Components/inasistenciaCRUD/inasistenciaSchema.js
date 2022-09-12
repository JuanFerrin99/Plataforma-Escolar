const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inasistencias = new Schema({
    fecha: Date,
    tipo: String,
    motivo: String,
    justificado: Boolean,
    curso: Number,
    materia: String,
    persona: Object  /* nombre: String, apellido: String, dni: int */
});

module.exports = mongoose.model('Inasitencia', inasistencias);