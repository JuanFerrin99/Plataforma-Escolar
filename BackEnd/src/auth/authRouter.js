const express = require('express');
const AuthRouter = express.Router();
const { signUp, login, resetPassword, createSessionToken } = require('../auth/authController.js');
const { loginValidator } = require('./authValidator.js');

AuthRouter.post("/password/reset", resetPassword)
AuthRouter.post("/new", loginValidator, signUp)
AuthRouter.post("/", loginValidator, login, createSessionToken)


module.exports = AuthRouter;
