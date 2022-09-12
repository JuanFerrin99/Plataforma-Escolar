const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursos = new Schema({
    materia: String,
    profesor: Object, /* nombre: String, apellido: String. dni: int */
    alumnos: [Object],
    evaluaciones: [Object], /* id: int, tipo: String, fecha: Date, periodoDeInscripcion: Object */
    periodo: Object, /* horario: String, datos: String */
    estado: String
});

module.exports = mongoose.model('Curso', cursos);