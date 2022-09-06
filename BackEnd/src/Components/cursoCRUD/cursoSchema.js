const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursos = new Schema({
    materia: String,
    profesor: Object,
    alumnos: [Object],
    evaluaciones: [Object],
    periodo: Object,
    estado: String
});

module.exports = mongoose.model('Curso', cursos);