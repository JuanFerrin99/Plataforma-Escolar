const express = require('express');
const AuthRouter = express.Router();
const { signUp, login, resetPassword, createSessionToken, sendLoginResponse } = require('../auth/authController.js');
const { loginValidator } = require('./authValidator.js');

// 1 POST /login/
AuthRouter.post("/", loginValidator, login, createSessionToken, sendLoginResponse)

// 2 POST /login/new
AuthRouter.post("/new", loginValidator, signUp)

// 3 POST /password/reset
AuthRouter.post("/password/reset", resetPassword)

module.exports = AuthRouter;
