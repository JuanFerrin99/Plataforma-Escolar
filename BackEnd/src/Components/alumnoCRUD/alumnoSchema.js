const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var alumnos = new Schema({
    _id: Number, //
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
    datosNacimiento: Object,    /* pais: String, localidad: String */
    cursosActivos: [Object],    /* id: int, nombre: String */
    carrera: Object             /* nombre: String, duracion: Number, materias: [Object], tipo: String */
});

module.exports = mongoose.model('Alumno', alumnos);

