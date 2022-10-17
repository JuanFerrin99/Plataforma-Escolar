const express = require('express');
const router = express.Router();
const Curso = require("../cursoSchema.js.js");
const { default: mongoose } = require('mongoose');

//------------------------------------ POST /cursos/:id/evaluaciones

module.exports.agregarEvaluacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $push: { evaluaciones: req.body.evaluacion } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se agrego la evaluacion")
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

// ----------------------------- PATCH /cursos/:id/evaluaciones/:evaluacionId

module.exports.modificarEvaluacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id, "evaluaciones.id": parseInt(req.params.evaluacionId) }, { $set: { "evaluaciones.$.tipo": req.body.tipo, "evaluaciones.$.fecha": req.body.fecha } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se modifico la evaluacion")
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

// --------------------------- DELETE /cursos/:id/evaluaciones/:evaluacionId

module.exports.eliminarEvaluacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $pull: { evaluaciones: { id: parseInt(req.params.evaluacionId) } } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se elimino la evaluacion")
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