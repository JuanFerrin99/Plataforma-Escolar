//*-------------------------------------------------------------------IMPORTS--------------------------------------------------------------------
const { axios } = require("axios")

/*-----------Sacar------------*/
const express = require('express');
const router = express.Router();
const Alumno = require("../Components/alumnoCRUD/alumnoSchema");
const { default: mongoose } = require('mongoose');

//-------------------------TOKEN-------------------------

const { createToken } = require("../utils/tokenUtils")
const { checkToken } = require("../utils/tokenUtils.js");

//-----------------------------------------------FIREBASE-----------------------------------------------

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } = require("firebase/auth")
const { firebase } = require("../../config/configFireBase");
const res = require("express/lib/response");
const { body } = require("express-validator");
const auth = getAuth(firebase)

//*---------------------------------------------------------------------CODE---------------------------------------------------------------------

//---------------------------------FIREBASE--------------------------------
module.exports.signUp = (req, res) => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            sendEmailVerification(userCredential.user)
                .then(() => {
                    res.status(200).json(userCredential.user)
                })
                .catch((error) => {
                    res.status(500).json({ "error": error })
                })
        })
        .catch((error) => {
            res.status(500).json({ "error": error })
        });
}

//!arreglar la basura de axios
/*axios.get(`http://localhost:3001/alumnos/${req.body.email}`)
    .then(body => {
        req.currentUserData = body;
        console.log(req.currentUserData)
    })
    .catch(e => console.log(e));*/

module.exports.login = (req, res, next) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            if (userCredential.user.emailVerified != false) {

                //!Sacar esto cuando funcione axios
                return Alumno.findOne({ mail: req.body.email })
                    .then((alumno) => {
                        if (alumno == undefined) {
                            res.status(404).json({ error: "No se encontro al alumno" })
                        }
                        else {
                            req.currentUserData = alumno
                            next()
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        res.status(500).json({ error: "Ocurrio un error" })
                    })
                //!Hasta aca
            }
            else {
                res.status(400).json({ "error": "Mail no verificado" })
            }
        })
        .catch((error) => {
            console.log(error)
            res.status(400).json({ 'error': error })
        });
}

module.exports.resetPassword = (req, res) => {
    sendPasswordResetEmail(auth, req.body.email)
        .then(() => {
            res.status(200)
        })
        .catch((error) => {
            res.status(500).json({ "error": error })
        })
}

//-------------------------------------TOKEN------------------------------------

module.exports.createSessionToken = (req, res, next) => {
    createToken(req.currentUserData, "7d")
        .then(token => {
            req.userToken = token
            next()
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                code: 5,
                message: "Ocurrio un error"
            })
        })
}

module.exports.sendLoginResponse = (req, res) => {
    const token = req.userToken;

    const options = {
        maxAge: 5000 * 1000
    }

    res.cookie("token", token, { ...options, httpOnly: true })
    res.cookie("isLogged", true, options)

    res.status(200).json({
        code: 10,
        message: token
    })
}

module.exports.verificarAuth = async (req, res, next) => {
    const authorizationHeader = req.headers.authorization;
    if (authorizationHeader != undefined) {
        const token = authorizationHeader.replace("Bearer ", "");
        const resultado = await checkToken(token)

        if (resultado == false) {
            res.status(401).json({ error: "Token invalido" });
        }
        else {
            next()
        }
    }
    else {
        res.status(401).json({ error: "Token no provisto" })
    }
}