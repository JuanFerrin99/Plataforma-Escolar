const express = require('express');
const router = express.Router();
const Evaluacion = require("./evaluacionSchema.js");
const { default: mongoose } = require('mongoose');

//------------------------------------ POST /evaluaciones/ ------------------------------------------------------------------

module.exports.agregarEvaluacion = (req, res) => {
    const { tipo, fecha, periodoInscripcion, alumnos } = req.body;

    const evaluacion = new Evaluacion({
    tipo,
    fecha,
    periodoInscripcion,
    alumnos
    });

    evaluacion.save()
        .then((evaluacion) => {
            res.status(201).json(evaluacion)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })

}

//------------------------------------  DELETE /evaluaciones/id ------------------------------------------------------------------

module.exports.eliminarEvaluacion = (req, res) => {
    return Evaluacion.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro la evaluacion" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------- PATCH /evaluaciones/id----------------------------------------------------------------------

module.exports.modificarEvaluacion = (req, res) => {
    return Evaluacion.findOneAndUpdate({ _id: req.params.id },{ tipo: req.body.tipo, fecha: req.body.fecha, periodoInscripcion: req.body.periodo, alumnos: req.body.alumnos} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro la evaluacion"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//-------------------------------------------- GET /evaluaciones/id --------------------------------------------------------------

module.exports.getEvaluacion = (req, res) => {
    return Evaluacion.findOne({_id: req.params.id})
        .then((evaluacion) => {
            if(evaluacion == undefined){
                res.status(404).json({error: "No se encontro la evaluacion"})
            }
            else{
                res.status(200).json(evaluacion)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

