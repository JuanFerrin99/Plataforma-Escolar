const express = require('express');
const router = express.Router();
const Profesor = require("./profesorSchema.js");
const { default: mongoose } = require('mongoose');

//--------------------------------------- POST /profesores/ ------------------------------------------------------------------

module.exports.agregarProfesor = (req, res) => {
    const { nombre, apellido, dni, fechaNacimiento, telefono, mail, titulos, datosResidiencia, fechaIngreso, usuario, inasistencias, cursos} = req.body;

    const profesor = new Profesor({
    nombre, 
    apellido, 
    dni, 
    fechaNacimiento, 
    telefono,
    mail, 
    titulos, 
    datosResidiencia, 
    fechaIngreso, 
    usuario, 
    inasistencias, 
    cursos
    });

    profesor.save()
        .then((profesor) => {
            res.status(201).json(profesor)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })

}

//------------------------------------  DELETE /profesores/id ------------------------------------------------------------------

module.exports.eliminarProfesor = (req, res) => {
    return Profesor.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro al profesor" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------- PATCH /profesores/id----------------------------------------------------------------------

module.exports.modificarProfesor = (req, res) => {
    return Profesor.findOneAndUpdate({ _id: req.params.id },{ nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni, fechaNacimiento: req.body.fechaNacimiento, telefono: req.body.telefono, mail: req.body.mail, titulos: req.body.titulos, datosResidiencia: req.body.datosResidiencia, fechaIngreso: req.body.fechaIngreso, usuario: req.body.usuario, inasistencias: req.body.inasistencias, cursos: req.body.cursos} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro al profesor"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------------- GET /profesores/id ------------------------------------------------------------

module.exports.getProfesor = (req, res) => {
    return Profesor.findOne({_id: req.params.id})
        .then((profesor) => {
            if(profesor == undefined){
                res.status(404).json({error: "No se encontro al profesor"})
            }
            else{
                res.status(200).json(profesor)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}