//*-------------------------------------------------------------------IMPORTS--------------------------------------------------------------------

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
                    res.status(500).json({"error": error})
                })
        })
        .catch((error) => {
            res.status(500).json({ "error": error })
        });
}

module.exports.login = (req, res, next) =>{
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
        .then((userCredential) => {
            if(userCredential.user.emailVerified != false){
                req.currentUserData = userCredential.user.reloadUserInfo.email;  //ver si guardar
                next()
            }
            else{
                res.status(400).json({"error": "Mail no verificado"})
            }
        })
        .catch((error) => {
            res.status(400).json({'error': error})
        });
}

module.exports.resetPassword = (req, res) =>{
    sendPasswordResetEmail(auth, req.body.email)
        .then(() =>{
            res.status(200)
        })
        .catch((error) => {
            res.status(500).json({"error": error})
        })
}

//-------------------------------------TOKEN------------------------------------

module.exports.createSessionToken = (req, res, next) => {
    console.log("Usuario: ", req.currentUserData)
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

    res.cookie("token", token, {...options, httpOnly: true})
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