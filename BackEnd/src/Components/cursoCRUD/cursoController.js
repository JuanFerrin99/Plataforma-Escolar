const express = require('express');
const router = express.Router();
const Curso = require("./cursoSchema.js");
const { funcionEmit } = require('../../../bin/www')
const { default: mongoose } = require('mongoose');

//------------------------------------------------ POST /cursos/ -----------------------------------------------------------

module.exports.agregarCurso = (req, res) => {
    const { materia, profesor, alumnos, evaluaciones, finales, periodo, fechasAsistencia, estado } = req.body;

    const curso = new Curso({
        materia,
        profesor,
        alumnos,
        evaluaciones,
        finales,
        periodo,
        fechasAsistencia,
        estado
    })

    curso.save()
        .then((curso) => {
            res.status(201).json(curso)
            funcionEmit(profesor.mail, curso)
        })
        .catch(error => {
            res.status(500).json({ error: "Ocurrio un error" })
            console.log(error)
        })
}

//---------------------------------------------- DELETE /cursos/id ---------------------------------------------------------

module.exports.eliminarCurso = (req, res) => {
    return Curso.deleteOne({ _id: req.params.id })
        .then((result) => {
            if (result.deletedCount == 1) {
                res.status(200).json(req.params.id)
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

//----------------------------------------------- PATCH /cursos/id ---------------------------------------------------------

module.exports.modificarCurso = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { materia: req.body.materia, profesor: req.body.profesor, alumnos: req.body.alumnos, evaluaciones: req.body.evaluaciones, finales: req.body.finales, periodo: req.body.periodo, fechasAsistencia: req.body.fechasAsistencia, estado: req.body.estado }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
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

//-------------------------------------------- GET /cursos/id --------------------------------------------------------------

module.exports.getCurso = (req, res) => {
    return Curso.findOne({ _id: req.params.id })
        .then((curso) => {
            if (curso == undefined) {
                res.status(404).json({ error: "No se encontro el curso" })
            }
            else {
                res.status(200).json(curso)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//-------------------------------------------- GET /cursos/ --------------------------------------------------------------

module.exports.getCursos = (req, res) => {
    return Curso.find({})
        .then((cursos) => {
            if (cursos == undefined) {
                res.status(404).json({ error: "No se encontraron los cursos" })
            }
            else {
                res.status(200).json(cursos)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//--------------------------------------------- RESTFUL ISH ----------------------------------------------------
//------------------------------------------ POST /cursos/:id -----------------------------------------------------

module.exports.agregarFechaAsistencia = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $push: { fechasAsistencia: req.body.fechasAsistencia } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se actualizaron las asistencias")
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