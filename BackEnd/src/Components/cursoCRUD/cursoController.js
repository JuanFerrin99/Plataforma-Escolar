const express = require('express');
const router = express.Router();
const Curso = require("./cursoSchema.js");
const { default: mongoose } = require('mongoose');

//------------------------------------------------ POST /cursos/ -----------------------------------------------------------

module.exports.agregarCurso = (req, res) => {
    const { nombre, materia, profesor, alumnos, evaluaciones, final, periodo, fechasAsistencia, estado } = req.body;

    const curso = new Curso({
        nombre,
        materia,
        profesor,
        alumnos,
        evaluaciones,
        final,
        periodo,
        fechasAsistencia,
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
    return Curso.findOneAndUpdate({ _id: req.params.id }, { nombre: req.body.nombre, materia: req.body.materia, profesor: req.body.profesor, alumnos: req.body.alumnos, evaluaciones: req.body.evaluaciones, final: req.body.final, periodo: req.body.periodo, fechasAsistencia: req.body.fechasAsistencia, estado: req.body.estado }, { new: true })
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

//-------------------------------------------- GET /cursos/id/dni --------------------------------------------------------------

module.exports.getCursoAlumno = (req, res) => {
    return Curso.findOne({ _id: req.params.id, dni: req.params.dni })
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

//-------------------------------------------- EVALUACIONES -----------------------------------------------------
//------------------------------------ POST /cursos/:id/evaluaciones

module.exports.agregarEvaluacion = (req, res) => {
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $push: { evaluaciones: req.body.evaluaciones } }, { new: true })
        .then((result) => {
            if (result) {
                res.status(200).json("Se agregaron las evaluaciones")
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
    return Curso.findOneAndUpdate({ _id: req.params.id }, { $pull: { evaluaciones: { id: parseInt(req.params.evaluacionId) } } }, {new:true})
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