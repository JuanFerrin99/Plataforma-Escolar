const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var alumnos = new Schema({
    nombre: String, 
    apellido: String,
    dni: Number,
    fechaNacimiento: Date,
    telefono: Number,
    mail: String,
    titulos: [String],
    datosResidencia: Object,    /* pais: String, provincia: String, localidad: String, domicilio: String, codigoPostal: Number*/
    fechaIngreso: Date,
    usuario: Object,            /* username: String, password: String, rol: String */
    datosNacimiento: Object,    /* pais: String, localidad: String */
    carrera: Object             /* nombre: String, duracion: Number, materias: [Object], tipo: String */
});

module.exports = mongoose.model('Alumno', alumnos);

