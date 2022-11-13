import React, { useEffect, useState } from 'react';
import Cookies from "js-cookie";
import { fetchGet } from '../../utils/Fetch';
import "./MainDash.css";
    import Home from "../controlPages/Home"
    import Inscripciones from "../controlPages/Inscripciones"
    import Alumnos from "../controlPages/Alumnos"
    import Profesores from "../controlPages/Profesores"
    import Cursos from "../controlPages/Cursos"
    import CerrarSesion from "../controlPages/CerrarSesion"
    import Carreras from "../controlPages/Carreras"
    import Inasistencias from "../controlPages/Inasistencias"


export default function MainDash({index}) {
    const [paginas, setPaginas] = useState([]);
    useEffect(() => {
        fetchGet(`secretarios/filtro/${Cookies.get("mail")}`)
            .then(response => response.json())
            .then(secretario => {
                setPaginas([<Home dni={secretario.dni} />, <Inscripciones />, <Alumnos/>, <Profesores />, <Cursos />, <Carreras/>, <Inasistencias/>, <CerrarSesion/>])
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (paginas[index])
}