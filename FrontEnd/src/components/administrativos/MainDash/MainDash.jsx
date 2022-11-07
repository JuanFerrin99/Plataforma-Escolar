import * as React from 'react';
import { useEffect, useState, Children } from "react";
import Cookies from "js-cookie";
import "./MainDash.css";
import Home from "../controlPages/Home"
import Inscripciones from "../controlPages/Inscripciones"
import Alumnos from "../controlPages/Alumnos"
import Profesores from "../controlPages/Profesores"
import Cursos from "../controlPages/Cursos"
import CerrarSesion from "../controlPages/CerrarSesion"
import Carreras from "../controlPages/Carreras"

export default function MainDash({index}) {
    const [paginas, setPaginas] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3001/secretarios/filtro/${Cookies.get("mail")}`, { credentials: "include" })
            .then(response => response.json())
            .then(secretario => {
                setPaginas([<Home dni={secretario.dni} />, <Inscripciones />, <Alumnos/>, <Profesores />, <Cursos />,<CerrarSesion/>])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (paginas[index])
}