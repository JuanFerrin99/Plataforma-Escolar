const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var evaluaciones = new Schema({
    tipo: String,
    fecha: Date,
    periodoInscripcion: Object, //Fecha de inicio - fecha final
    alumnos: [Object]
});

module.exports = mongoose.model('Evaluacion', evaluaciones);