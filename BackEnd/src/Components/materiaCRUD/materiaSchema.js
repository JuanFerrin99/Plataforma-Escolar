const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var materias = new Schema({
    nombre: String,
    duracion: String,
    correlativas: [String],
    final: Boolean
});


module.exports = mongoose.model('Materia', materias);