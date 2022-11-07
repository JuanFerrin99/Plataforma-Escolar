const express = require('express');
const router = express.Router();
const Materia = require("./materiaSchema.js");
const { default: mongoose } = require('mongoose');
const { findOne } = require('./materiaSchema.js');

//------------------------------------ POST /materias/ ------------------------------------------------------------------

module.exports.agregarMateria = (req, res) => {
    const { nombre, duracion, correlativas, final } = req.body

    const materia = new Materia({
    nombre,
    duracion,
    correlativas,
    final
    });

    materia.save()
        .then((materia) => {
            res.status(201).json(materia)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------  DELETE /materias/id ------------------------------------------------------------------

module.exports.eliminarMateria = (req, res) => {
    return Materia.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.nombre)
        }
        else{
            res.status(404).json({ error: "No se encontro la materia" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------- PATCH /materias/id----------------------------------------------------------------------

module.exports.modificarMateria = (req, res) => {
    return Materia.findOneAndUpdate({ _id: req.params.id },{ nombre: req.body.nombre, duracion: req.body.duracion, correlativas: req.body.correlativas, final: req.body.final} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.nombre)
            }
            else{
                res.status(404).json({error: "No se encontro la materia"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------------- GET /materias/id ------------------------------------------------------------

module.exports.getMateria = (req, res) => {
    return Materia.findOne({ _id: req.params.id })
        .then((materia) => {
            if(materia == undefined){
                res.status(404).json({error: "No se encontro la materia"})
            }
            else{
                res.status(200).json(materia)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}
//------------------------------------------- GET /materias/ ------------------------------------------------------------

module.exports.getMaterias = (req, res) => {
    return Materia.find()
        .then((materias) => {
            if(materias == undefined){
                res.status(404).json({error: "No se encontro la materia"})
            }
            else{
                res.status(200).json(materias)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}