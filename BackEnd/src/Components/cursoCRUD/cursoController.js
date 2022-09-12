const express = require('express');
const router = express.Router();
const Curso = require("./cursoSchema.js");
const { default: mongoose } = require('mongoose');

//------------------------------------------------ POST /cursos/ -----------------------------------------------------------

module.exports.agregarCurso = (req, res) => {
    const { materia, profesor, alumnos, evaluaciones, periodo, estado } = req.body;

    const curso = new Curso({
        materia,
        profesor, 
        alumnos, 
        evaluaciones,
        periodo,
        estado
    });

    curso.save()
        .then((curso) => {
            res.status(201).json(curso)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//---------------------------------------------- DELETE /cursos/id ---------------------------------------------------------

module.exports.eliminarCurso = (req, res) => {
    return Curso.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro el curso" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------------- PATCH /cursos/id ---------------------------------------------------------

module.exports.modificarCurso = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id },{ materia: req.body.materia, profesor: req.body.profesor, alumnos: req.body.alumnos, evaluaciones: req.body.evaluaciones, periodo: req.bod.periodo, estado: req.body.estado} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro el curso"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//-------------------------------------------- GET /cursos/id --------------------------------------------------------------

module.exports.getCurso = (req, res) => {
    return Curso.findOne({_id: req.params.id})
        .then((curso) => {
            if(curso == undefined){
                res.status(404).json({error: "No se encontro el curso"})
            }
            else{
                res.status(200).json(curso)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}