const express = require('express');
const AuthRouter = express.Router();
const { signUp, login, resetPassword, createSessionToken, sendLoginResponse } = require('../auth/authController.js');
const { loginValidator } = require('./authValidator.js');

AuthRouter.post("/", loginValidator, login, createSessionToken, sendLoginResponse)
AuthRouter.post("/new", loginValidator, signUp)
//AuthRouter.post("/logout", )
AuthRouter.post("/password/reset", resetPassword)

module.exports = AuthRouter;
