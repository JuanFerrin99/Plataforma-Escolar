const express = require('express');
const router = express.Router();
const Curso = require("../cursoSchema.js");
const { default: mongoose } = require('mongoose');


// ------------------------------------------- PATCH /cursos/:id/:dni

module.exports.modificarFinal = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id, "alumnos.dni": parseInt(req.params.dni) }, { $set: { "alumnos.$.final.id": req.body.id, "alumnos.$.final.nota": req.body.nota } })
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