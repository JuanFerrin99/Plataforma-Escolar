const express = require('express');
const router = express.Router();
const Curso = require("../cursoSchema.js.js");
const { default: mongoose } = require('mongoose');


//----------------------------------------- POST /cursos/:id/finales

module.exports.agregarFinal = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $push: { finales: req.body.final } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se agrego el final")
            }
            else {
                res.status(404).json({ error: "No se encontro el curso" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

// ---------------------------------- PATCH /cursos/:id/finales/:finalnId

module.exports.modificarFinal = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id, "finales.id": parseInt(req.params.finalId) }, { $set: { "finales.$.fecha": req.body.fecha, "finales.$.fechasInscripcion": req.body.fechaInscipcion, "finales.$.alumnosInscriptos": req.body.alumnosInscripctos } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se modifico el final")
            }
            else {
                res.status(404).json({ error: "No se encontro el curso" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

// --------------------------------- DELETE /cursos/:id/finales/:finalId

module.exports.eliminarFinal = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $pull: { finales: { id: parseInt(req.params.finalId) } } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se elimino el final")
            }
            else {
                res.status(404).json({ error: "No se encontro el curso" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}