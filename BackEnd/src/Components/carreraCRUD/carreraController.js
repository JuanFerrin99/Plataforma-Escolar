const express = require('express');
const router = express.Router();
const Carrera = require("./carreraSchema.js");
const { default: mongoose } = require('mongoose');

//------------------------------------------------ POST /carreras/ -----------------------------------------------------------

module.exports.agregarCarrera = (req, res) => {
    const { nombre, duracion, materias, tipo } = req.body;

    const carrera = new Carrera({
        nombre,
        duracion, 
        materias, 
        tipo
    });

    carrera.save()
        .then((carrera) => {
            res.status(201).json(carrera)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//---------------------------------------------- DELETE /carreras/id ---------------------------------------------------------

module.exports.eliminarCarrera = (req, res) => {
    return Carrera.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro la carrera" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------------- PATCH /carreras/id ---------------------------------------------------------

module.exports.modificarCarrera = (req, res) => {
    return Carrera.findOneAndUpdate({ _id: req.params.id },{ nombre: req.body.nombre, duracion: req.body.duracion, materias: req.body.materias, tipo: req.body.tipo} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro la carrera"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//-------------------------------------------- GET /carreras/id --------------------------------------------------------------

module.exports.getCarrera = (req, res) => {
    return Carrera.findOne({_id: req.params.id})
        .then((carrera) => {
            if(carrera == undefined){
                res.status(404).json({error: "No se encontro la carrera"})
            }
            else{
                res.status(200).json(carrera)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}
//-------------------------------------------- GET /carreras --------------------------------------------------------------

module.exports.getCarreras = (req, res) => {
    return Carrera.find({})
        .then((carrera) => {
            if(carrera == undefined){
                res.status(404).json({error: "No se encontro la carrera"})
            }
            else{
                res.status(200).json(carrera)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}