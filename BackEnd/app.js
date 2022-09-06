var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken");

/*-------------------------------------routes-------------------------------------*/
var routeCarrera = require('./src/Components/carreraCRUD/carreraRouter')
var routeCurso = require('./src/Components/cursoCRUD/cursoRouter')
var routeFalta = require('./src/Components/faltaCRUD/faltaRouter');
var routeMateria = require('./src/Components/materiaCRUD/materiaRouter');
var routeEvaluacion = require('./src/Components/evaluacionCRUD/evaluacionRouter')

var routeAlumno = require('./src/Components/alumnoCRUD/alumnoRouter')
var routeProfesor = require('./src/Components/profesorCRUD/profesorRouter')
var routeSecretario = require('./src/Components/secretarioCRUD/secretarioRouter')

/*--------------------------------------auth-------------------------------------*/
var AuthRouter = require('./src/auth/authRouter.js');
var firebase = require("./config/configFireBase")

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login/', AuthRouter);

app.use('/alumnos/', routeAlumno)
app.use('/profesores/', routeProfesor)
app.use('/secretario/', routeSecretario)

app.use('/carreras/', routeCarrera)
app.use('/cursos/', routeCurso)
app.use('/faltas/', routeFalta);
app.use('/materias/', routeMateria);
app.use('/evaluaciones/', routeEvaluacion);

module.exports = app;