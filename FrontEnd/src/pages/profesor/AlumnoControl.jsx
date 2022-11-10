import * as React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import Cookies from "js-cookie";
import TableNotas from "../../components/tables/TableNotas/Table"
import TableFinales from "../../components/tables/TableFinales/Table"
import { fetchGet } from '../../components/utils/Fetch';


export default function CursoCard() {
    const [notas, setNotas] = useState([]);
    const [finales, setFinales] = useState([]);
    const location = useLocation()
    const id = location.state.idCurso // id curso
    const dni = location.state.dni // dni alumno

    useEffect(() => {
        let p = []
        fetchGet(`cursos/${id}`)
            .then(response => response.json())
            .then(curso => {
                setNotas([])
                setFinales(curso.finales)

                curso.alumnos.forEach((alumno) => {
                    if (alumno.dni === dni) {
                        const nuevasNotas = curso.evaluaciones.map((evaluacion) => {
                            let nuevaRow;
                            alumno.calificaciones.forEach((nota) => {
                                if (evaluacion.id === nota.id) {
                                    nuevaRow = { ...evaluacion, nota: nota.nota }
                                }
                            })
                            if (nuevaRow === undefined) return { ...evaluacion, nota: "-" }
                            else return nuevaRow
                        })

                        alumno.calificaciones.forEach((nota) => {
                            if (nota.id >= 10000){
                                nuevasNotas.push(nota)
                            }
                        })
                        setNotas(nuevasNotas)
                    }
                })
            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <div>
            <TableNotas notas={notas} idCurso={id} dniAlumno={dni} />
            <TableFinales finales={finales} idCurso={id} dniAlumno={dni} />
        </div>
    );
}