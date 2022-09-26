const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var profesores = new Schema({
    nombre: String,
    apellido: String,
    dni: Number,
    fechaNacimiento: Date,
    telefono: Number,
    mail: String,
    titulos: [String],
    datosResidencia: Object,    /* pais: String, provincia: String, localidad: String, domicilio: String, codigoPostal: Number*/
    fechaIngreso: Date,
    rol: String,
    cursos: [Object]
});

module.exports = mongoose.model('Profesor', profesores);

