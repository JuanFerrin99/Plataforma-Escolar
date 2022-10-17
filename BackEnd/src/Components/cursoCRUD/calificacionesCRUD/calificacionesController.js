const express = require('express');
const router = express.Router();
const Curso = require("./cursoSchema.js");
const { default: mongoose } = require('mongoose');


//------------------------------ POST /cursos/:id/alumno/:dni/calificaciones

module.exports.agregarCalificacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id, "alumnos.dni": parseInt(req.params.dni) }, { $push: { "alumnos.$.calificaciones": req.body.calificacion } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se agrego la calificacion")
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

// ------------------------ PATCH /cursos/:id/alumnos/:dni/calificaciones/:notaId

module.exports.modificarCalificacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id, "alumnos.dni": parseInt(req.params.dni), "calificaciones.id": parseInt(req.params.notaId) }, { $set: { "alumnos.$[i].calificaciones.$[j].nota": req.body.nota } }, {
        arrayFilters: [{
            "i.dni": parseInt(req.params.dni)
        }, {
            "j.id": parseInt(req.params.notaId)
        }]
    })
        .then((result) => {
            if (result) {
                res.status(200).json("Se modifico la calificacion")
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

module.exports.eliminarCalificacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id, "alumnos.dni": parseInt(req.params.dni) }, { $pull: { "alumnos.$.calificaciones": { id: parseInt(req.params.notaId) } } }, { new: true })
        .then((result) => {
            console.log(result)
            if (result) {
                res.status(200).json("Se elimino la calificacion")
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