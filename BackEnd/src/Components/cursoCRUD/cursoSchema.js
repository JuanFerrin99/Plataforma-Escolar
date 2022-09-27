const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var cursos = new Schema({
    nombre: String,
    materia: String,
    profesor: Object,  /* nombre: String, apellido: String, dni: int */
    alumnos: [Object], /* nombre: String, apellido: String, dni: int, evaluaciones: Object */
    evaluaciones: [Object], /* id: int, tipo: String, fecha: Date, periodoDeInscripcion: Object */
    periodo: Object, /* año: int, cuatrimestre: String , horario: String */
    estado: String
});

module.exports = mongoose.model('Curso', cursos);