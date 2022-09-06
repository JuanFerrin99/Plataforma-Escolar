const mongoose = require('mongoose');

var Schema = mongoose.Schema;

var secretarios = new Schema({
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
    inasistencias: [Object]
});

module.exports = mongoose.model('Secretario', secretarios);

