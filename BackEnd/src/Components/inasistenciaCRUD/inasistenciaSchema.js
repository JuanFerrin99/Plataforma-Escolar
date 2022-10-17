const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inasistencias = new Schema({
    fecha: String,
    tipo: String,
    motivo: String,
    justificado: String,
    curso: String,
    materia: String,
    persona: Object  /* nombre: String, apellido: String, dni: int */
});

module.exports = mongoose.model('Inasistencia', inasistencias);