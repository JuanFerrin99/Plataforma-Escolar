const express = require('express');
const router = express.Router();
const Admin = require("./adminSchema.js");
const { default: mongoose } = require('mongoose');

//--------------------------------------- POST /admins/ ------------------------------------------------------------------

module.exports.agregarAdmin = (req, res) => {
    const { nombre, apellido, mail, rol} = req.body;

    const admin = new Admin({
    nombre, 
    apellido, 
    mail,
    rol
    });

    admin.save()
        .then((admin) => {
            res.status(201).json(admin)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })

}

//------------------------------------  DELETE /admins/id ------------------------------------------------------------------

module.exports.eliminarAdmin = (req, res) => {
    return Admin.deleteOne({ _id: req.params.id })
    .then((result) => {
        if(result.deletedCount == 1){
            res.status(200).json(req.params.id)
        }
        else{
            res.status(404).json({ error: "No se encontro al admin" })
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).json({ error: "Ocurrio un error" })
    })
}

//----------------------------------------- PATCH /admins/id----------------------------------------------------------------------

module.exports.modificarAdmin = (req, res) => {
    return Admin.findOneAndUpdate({ _id: req.params.id },{ nombre: req.body.nombre, apellido: req.body.apellido, mail: req.body.mail, rol: req.body.rol } ,{new: true})
        .then((result) => {
            if(result){
                res.status(200).json("Se realizaron los cambios a " + req.params.id)
            }
            else{
                res.status(404).json({error: "No se encontro al admin"})
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

//------------------------------------------- GET /admins/id ------------------------------------------------------------

module.exports.getAdmin = (req, res) => {
    return Admin.findOne({_id: req.params.id})
        .then((admin) => {
            if(admin == undefined){
                res.status(404).json({error: "No se encontro al admin"})
            }
            else{
                res.status(200).json(admin)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}

module.exports.getAdminMail = (req, res) => {
    return Admin.findOne({mail: req.params.mail})
        .then((admin) => {
            if(admin == undefined){
                res.status(404).json({error: "No se encontro al admin"})
            }
            else{
                res.status(200).json(admin)
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(500).json({ error: "Ocurrio un error" })
        })
}