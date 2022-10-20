import * as React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import TableInasistencia from "../../components/utils/TableInasistenciaInmodificable/Table"
import TableNotas from "../../components/utils/TableNotas/Table"
import TableFinales from "../../components/utils/TableFinales/Table"

export default function CursoCard() {
    const [inasistencias, setInasistencias] = useState([]);
    const [notas, setNotas] = useState([]);
    const [finales, setFinales] = useState([]);
    const location = useLocation()
    const id = location.state.idCurso // id curso
    const dni = location.state.dni // dni alumno

    useEffect(() => {
        fetch(`http://localhost:3001/inasistencias/${dni}/${id}`,{credentials:"include"})//todo esto pero en todos los feteches
            .then(response => response.json())
            .then(res => {
                let id = 0
                res.map(inasistencia => inasistencia.id = id++)
                setInasistencias(res)
            })
            .catch(error => {
                console.log(error)
            })
        }, []);
        useEffect(() => {
            fetch(`http://localhost:3001/cursos/${id}`)
            .then(response => response.json())
            .then(curso => {
                setNotas([])
                setFinales(curso.finales)
                curso.alumnos.forEach((element, i) => {
                    if (element.dni === dni) {
                        setNotas((oldState) => [...oldState, ...element.calificaciones])
                    }
                }
                )
            }
            )
            .catch(error => {
                console.log(error)
            })
        }, []);
//? tuve que dejar table notas al principio porque es el unico que tiene el go back button cosa que habria que arreglar 
//todo el goBack boton deberia esta afuera de la table
    return (
        <div>
            <TableNotas notas={notas} idCurso={id} dniAlumno = {dni}/>
            <TableFinales finales={finales} idCurso={id} dniAlumno = {dni}/>
            <TableInasistencia inasistencia={inasistencias} idCurso={id} dniAlumno = {dni}/>{/* el nombre deberia estar en plural pero hay que cambiar todo */}

        </div>
    );
}

