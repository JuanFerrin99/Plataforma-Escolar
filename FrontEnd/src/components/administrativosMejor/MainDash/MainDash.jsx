import * as React from 'react';
import { useEffect, useState, Children } from "react";
import "./MainDash.css";
import Home from "../controlPages/Home"
import Inscripciones from "../controlPages/Inscripciones"
import Alumnos from "../controlPages/Alumnos"
import Profesores from "../controlPages/Profesores"
import Cursos from "../controlPages/Cursos"
import CerrarSesion from "../controlPages/CerrarSesion"
import Carreras from "../controlPages/Carreras"
import Secretarios from "../controlPages/Alumnos"
import Faltas from "../controlPages/Profesores"
import Materias from "../controlPages/Cursos"

export default function MainDash({index}) {
    const [paginas, setPaginas] = useState([]);

    useEffect(() => {
        setPaginas([
        <Home dni={secretario.dni} />, 
        <Inscripciones />, 
        <Alumnos/>, 
        <Profesores />, 
        <Cursos />,
        <Carreras/>, 
        <CerrarSesion/>
    ])
    }, [])

    return (paginas[index])
}