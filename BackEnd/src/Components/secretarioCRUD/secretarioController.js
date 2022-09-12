const express = require('express');
const router = express.Router();
const Secretario = require("./secretarioSchema.js");
const { default: mongoose } = require('mongoose');

//--------------------------------------- POST /secretarios/ ------------------------------------------------------------------

module.exports.agregarSecretario = (req, res) => {
    const { nombre, apellido, dni, fechaNacimiento, telefono, mail, titulos, datosResidiencia, fechaIngreso, usuario} = req.body;

    const secretario = new Secretario({
    nombre, 
    apellido, 
    dni, 
    fechaNacimiento, 
    telefono,
    mail, 
    titulos, 
    datosResidiencia, 
    fechaIngreso, 
    usuario,
    });

    secretario.save()
        .then((secretario) => {
            res.status(201).json(secretario)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------  DELETE /secretarios/id ------------------------------------------------------------------

module.exports.eliminarSecretario = (req, res) => {
    return Secretario.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro al secretario" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------- PATCH /secretarios/id----------------------------------------------------------------------

module.exports.modificarSecretario = (req, res) => {
    return Secretario.findOneAndUpdate({ _id: req.params.id },{ nombre: req.body.nombre, apellido: req.body.apellido, dni: req.body.dni, fechaNacimiento: req.body.fechaNacimiento, telefono: req.body.telefono, mail: req.body.mail, titulos: req.body.titulos, datosResidiencia: req.body.datosResidiencia, fechaIngreso: req.body.fechaIngreso, usuario: req.body.usuario} ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro al secretario"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------------- GET /secretarios/id ------------------------------------------------------------

module.exports.getSecretario = (req, res) => {
    return Secretario.findOne({_id: req.params.id})
        .then((secretario) => {
            if(secretario == undefined){
                res.status(404).json({error: "No se encontro al secretario"})
            }
            else{
                res.status(200).json(secretario)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}