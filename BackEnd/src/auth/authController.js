//*-------------------------------------------------------------------IMPORTS--------------------------------------------------------------------
const Alumno = require("../Components/alumnoCRUD/alumnoSchema")
const Profesor = require("../Components/profesorCRUD/profesorSchema")
const Secretario = require("../Components/secretarioCRUD/secretarioSchema")
const Admin = require("../Components/adminCRUD/adminSchema")

//------------------------EXPRESS--------------------------------------
const res = require("express/lib/response");
const { body } = require("express-validator");

//-------------------------TOKEN-------------------------

const { createToken, verifyToken } = require("../utils/tokenUtils")

//-----------------------------------------------FIREBASE----------------------------------------------------------------------------------------------

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail } = require("firebase/auth")
const { firebase } = require("../../config/configFireBase");
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

module.exports.login = (req, res, next) => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            //if (userCredential.user.emailVerified != false) {
            //Collection Alumno
            return Alumno.findOne({ mail: req.body.email })
                .then((alumno) => {
                    if (alumno == undefined) {
                        //Collection Profesores
                        return Profesor.findOne({ mail: req.body.email })
                            .then((profesor) => {
                                if (profesor == undefined) {
                                    //Collection Secretario
                                    return Secretario.findOne({ mail: req.body.email })
                                        .then((secretario) => {
                                            if (secretario == undefined) {
                                                //Collection Admin
                                                return Admin.findOne({ mail: req.body.email })
                                                    .then((admin) => {
                                                        if (admin == undefined) {
                                                            res.status(404).json({ error: "No se encontro al usuario" })
                                                        }
                                                        else {
                                                            req.currentUserData = admin
                                                            next()
                                                        }
                                                    })
                                                    .catch((error) => {
                                                        console.log(error)
                                                        res.status(500).json({ error: "Ocurrio un error" })
                                                    })
                                            }
                                            else {
                                                req.currentUserData = secretario
                                                next()
                                            }
                                        })
                                        .catch((error) => {
                                            console.log(error)
                                            res.status(500).json({ error: "Ocurrio un error" })
                                        })
                                }
                                else {
                                    req.currentUserData = profesor
                                    next()
                                }
                            })
                            .catch((error) => {
                                console.log(error)
                                res.status(500).json({ error: "Ocurrio un error" })
                            })
                    }
                    else {
                        req.currentUserData = alumno
                        next()
                    }
                })
                .catch((error) => {
                    res.status(500).json({ error: error })
                })
            /*}
            else {
                res.status(400).json({ "error": "Mail no verificado" })
            }*/
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
    res.cookie("isLogged", true, { ...options, httpOnly: true })
    res.cookie("mail", req.currentUserData.mail)
    res.cookie("rol", req.currentUserData.rol)

    res.status(200).json({
        code: 10,
        message: token
    })
}

module.exports.verificarRol = (roles) => async (req, res, next) => {
    try {
        const usuario = await verifyToken(req.cookies.token)
        if (roles.find((rol) => rol === usuario.body.rol)) {
            next()
        }
        else {
            res.status(401).json({ error: "Unauthorized" })
        }
    }
    catch (err) {
        res.status(401).json({ error: err })
    }
}