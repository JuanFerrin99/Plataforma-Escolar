const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var carreras = new Schema({
    nombre: String,
    duracion: Number,
    materias: [Object],
    tipo: String
});

module.exports = mongoose.model('Carrera', carreras);