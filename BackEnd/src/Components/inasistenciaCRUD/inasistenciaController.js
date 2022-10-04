const express = require('express');
const router = express.Router();
const Inasistencia = require("./inasistenciaSchema.js");
const { default: mongoose } = require('mongoose');
const inasistencia = require('./inasistenciaSchema.js');

const errorHandler = (res) => (error) => { 
    console.log(error)                                   
    res.status(500).json({ error: "Ocurrio un error" })
}

//---------------------------------------- POST /inasistencias/ ------------------------------------------------------------------

module.exports.agregarInasistencia = (req, res) => {
    const { fecha, tipo, motivo, justificado, curso, materia, persona } = req.body;

    const inasistencia = new Falta({
        fecha,
        tipo,
        motivo,
        justificado,
        curso, 
        materia,
        persona
    });

    inasistencia.save()
        .then((inasistencia) => {
            res.status(201).json(inasistencia)
        })
        .catch(errorHandler(res))

}

//------------------------------------  DELETE /inasistencias/id ------------------------------------------------------------------

module.exports.eliminarInasistencia = (req, res) => {
    return Inasistencia.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1)
            return res.status(200).json(req.params.id)
            
        res.status(404).json({ error: "No se encontro la inasistencia" })
    })
    .catch(errorHandler(res))
}

//-------------------------------------------------- PATCH /inasistencias/id ------------------------------------------------------

module.exports.modificarInasistencia = (req, res) => {
    return Inasistencia.findOneAndUpdate({ _id: req.params.id }, { fecha: req.body.fecha, tipo: req.body.tipo, motivo: req.body.motivo, justificado: req.body.justificado, curso: req.body.curso, materia: req.body.materia, persona: req.body.persona } ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro la inasistencia"})
            }
        })
        .catch(errorHandler(res))
}

//-------------------------------------------- GET /inasistencias/id --------------------------------------------------------------

module.exports.getInasistencia = (req, res) => {
    return Inasistencia.findOne({_id: req.params.id})
        .then((falta) => {
            if(falta == undefined){
                res.status(404).json({error: "No se encontro la inasistencia"})
            }
            else{
                res.status(200).json(falta)
            }
        })
        .catch(errorHandler(res))
}

//-------------------------------------------- GET /inasistencias/filtro/:dni --------------------------------------------------------------

module.exports.getInasistenciaDni = (req, res) => {
    return Inasistencia.find({ dni : req.params.dni })
        .then((inasistencias) => {
            if(inasistencias == undefined){
                res.status(404).json({error: "No se encontraron inasistencias"})
            }
            else{
                res.status(200).json(inasistencias)
            }
        })
        .catch(errorHandler(res))
}


//-------------------------------------------- GET /inasistencias/:dni/:id --------------------------------------------------------------

module.exports.getInasistenciaAlumnoCurso = (req, res) => {
    return Inasistencia.find({ curso : req.params.id, dni: req.params.dni})
        .then((inasistencias) => {
            if(inasistencias == undefined){
                res.status(404).json({error: "No se encontraron inasistencias "})
            }
            else{
                res.status(200).json(inasistencias)
            }
        })
        .catch(errorHandler(res))
}

