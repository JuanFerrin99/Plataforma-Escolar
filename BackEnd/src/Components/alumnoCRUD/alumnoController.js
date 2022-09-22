const express = require('express');
const router = express.Router();
const Alumno = require("./alumnoSchema.js");
const { default: mongoose } = require('mongoose');

//--------------------------------------- POST /alumnos/ ------------------------------------------------------------------

module.exports.agregarAlumno = (req, res) => {
    const { nombre, apellido, dni, fechaNacimiento, telefono, mail, titulos, datosResidiencia, fechaIngreso, rol, datosNacimiento, cursosActivos, carrera} = req.body;

    const alumno = new Alumno({
    nombre, 
    apellido, 
    dni, 
    fechaNacimiento, 
    telefono,
    mail, 
    titulos, 
    datosResidiencia, 
    fechaIngreso, 
    rol, 
    datosNacimiento,
    cursosActivos, 
    carrera
    });

    alumno.save()
        .then((alumno) => {
            res.status(201).json(alumno)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })

}

//------------------------------------  DELETE /alumnos/id ------------------------------------------------------------------

module.exports.eliminarAlumno = (req, res) => {
    return Alumno.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro al alumno" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------- PATCH /alumnos/id----------------------------------------------------------------------

module.exports.modificarAlumno = (req, res) => {
    return Alumno.findOneAndUpdate({ _id: req.params.id },{ nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni, fechaNacimiento: req.body.fechaNacimiento, telefono: req.body.telefono, mail: req.body.mail, titulos: req.body.titulos, datosResidiencia: req.body.datosResidiencia, fechaIngreso: req.body.fechaIngreso, rol: req.body.rol, datosNacimiento: req.body.datosNacimiento, cursosActivos: req.body.cursosActivos, carrera: req.body.carrera} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro al alumno"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------------- GET /alumnos/id ------------------------------------------------------------

module.exports.getAlumno = (req, res) => {
    return Alumno.findOne({_id: req.params.id})
        .then((alumno) => {
            if(alumno == undefined){
                res.status(404).json({error: "No se encontro al alumno"})
            }
            else{
                res.status(200).json(alumno)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

module.exports.getAlumnoEmail = (req, res) => {
    return Alumno.findOne({mail: req.params.email})
        .then((alumno) => {
            if(alumno == undefined){
                res.status(404).json({error: "No se encontro al alumno"})
            }
            else{
                res.status(200).json(alumno)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}