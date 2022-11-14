const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var inasistencias = new Schema({
    fecha: String,
    tipo: String,
    motivo: String,
    justificado: String,
    curso: String,
    materia: String,
    apellido: String,
    nombre: String,
    dni: Number,
    rol: String
});

module.exports = mongoose.model('Inasistencia', inasistencias);