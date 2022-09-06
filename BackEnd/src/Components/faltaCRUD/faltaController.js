const express = require('express');
const router = express.Router();
const Falta = require("./faltaSchema.js");
const { default: mongoose } = require('mongoose');

//---------------------------------------- POST /faltas/ ------------------------------------------------------------------

module.exports.agregarFalta = (req, res) => {
    const { fecha, tipo, motivo, justificado } = req.body;

    const falta = new Falta({
        fecha,
        tipo,
        motivo,
        justificado,
    });

    falta.save()
        .then((falta) => {
            res.status(201).json(falta)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })

}

//------------------------------------  DELETE /faltas/id ------------------------------------------------------------------

module.exports.eliminarFalta = (req, res) => {
    return Falta.deleteOne({ _id: req.params.id })
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

//-------------------------------------------------- PATCH /faltas/id ------------------------------------------------------

module.exports.modificarFalta = (req, res) => {
    return Falta.findOneAndUpdate({ _id: req.params.id }, { fecha: req.body.fecha, tipo: req.body.tipo, motivo: req.body.motivo, justificado: req.body.justificado} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro la falta"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//-------------------------------------------- GET /faltas/id --------------------------------------------------------------

module.exports.getFalta = (req, res) => {
    return Falta.findOne({_id: req.params.id})
        .then((falta) => {
            if(falta == undefined){
                res.status(404).json({error: "No se encontro la falta"})
            }
            else{
                res.status(200).json(falta)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}