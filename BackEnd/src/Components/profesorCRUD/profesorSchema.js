const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profesores = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    fechaNacimiento: String,
    telefono: Number,
    mail: String,
    titulos: [String],
    datosResidencia: Object,    /* pais: String, provincia: String, localidad: String, domicilio: String, codigoPostal: Number*/
    fechaIngreso: String,
    rol: String,
    cursos: [Object]  /* id: String, materia: String */
});

module.exports = mongoose.model('Profesor', profesores);

