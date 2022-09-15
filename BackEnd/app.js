var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require("jsonwebtoken");
var cors = require('cors');
var corsAllowed = ["http://localhost:3000"]

/*-------------------------------------routes-------------------------------------*/
var routeCarrera = require('./src/Components/carreraCRUD/carreraRouter')
var routeCurso = require('./src/Components/cursoCRUD/cursoRouter')
var routeInasistencia = require('./src/Components/inasistenciaCRUD/inasistenciaRouter');
var routeMateria = require('./src/Components/materiaCRUD/materiaRouter');

var routeAlumno = require('./src/Components/alumnoCRUD/alumnoRouter')
var routeProfesor = require('./src/Components/profesorCRUD/profesorRouter')
var routeSecretario = require('./src/Components/secretarioCRUD/secretarioRouter')

/*--------------------------------------auth-------------------------------------*/
var AuthRouter = require('./src/auth/authRouter.js');
var firebase = require("./config/configFireBase")

var app = express();

app.use(cors({
    origin:corsAllowed
}));
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
app.use('/inasistencias/', routeInasistencia);
app.use('/materias/', routeMateria);

module.exports = app;