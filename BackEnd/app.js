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
var routeInasistencia = require('./src/Components/inasistenciaCRUD/inasistenciaRouter');
var routeMateria = require('./src/Components/materiaCRUD/materiaRouter');
var routeCurso = require('./src/Components/cursoCRUD/cursoRouter')
    var routeCalificaciones = require('./src/Components/cursoCRUD/calificacionesCRUD/calificacionesRouter')
    var routeEvaluaciones = require('./src/Components/cursoCRUD/evaluacionesCRUD/evaluacionesRouter')
    var routeFinales = require('./src/Components/cursoCRUD/finalesCRUD/finalesRouter')
    var routeFinalAlumno = require('./src/Components/cursoCRUD/finalAlumnoCRUD/finalAlumnoRouter')

var routeAlumno = require('./src/Components/alumnoCRUD/alumnoRouter')
var routeProfesor = require('./src/Components/profesorCRUD/profesorRouter')
var routeSecretario = require('./src/Components/secretarioCRUD/secretarioRouter')

/*--------------------------------------auth-------------------------------------*/
var AuthRouter = require('./src/auth/authRouter.js');
var firebase = require("./config/configFireBase")

const corsOptions ={
    origin:corsAllowed, 
    credentials:true,      //! comprobar si esto es inseguro    
    optionSuccessStatus:200,
}

const app = express();

app.use(cors(corsOptions)) 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/login/', AuthRouter);

app.use('/alumnos/', routeAlumno)
app.use('/profesores/', routeProfesor)
app.use('/secretarios/', routeSecretario)

app.use('/carreras/', routeCarrera)
app.use('/inasistencias/', routeInasistencia);
app.use('/materias/', routeMateria);
app.use('/cursos/', routeCurso)
    app.use('/cursos/', routeCalificaciones)
    app.use('/cursos/', routeEvaluaciones)
    app.use('/cursos/', routeFinales)
    app.use('/cursos/', routeFinalAlumno)

module.exports = app;