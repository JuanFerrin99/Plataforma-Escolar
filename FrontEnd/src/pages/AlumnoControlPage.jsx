import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import TableInasistencia from "../components/utils/TableInasistenciav2/Table"
import TableNotas from "../components/utils/TableNotas/Table"

export default function CursoCard({}) {
    const [inasistencias, setInasistencias] = useState([]);
    const [notas, setNotas] = useState([]);
    const location = useLocation()
    const id = location.state.idCurso // id curso
    const dni = location.state.dni // dni alumno

    useEffect(() => {
        fetch(`http://localhost:3001/inasistencias/${dni}/${id}`)
            .then(response => response.json())
            .then(res => {
                let id = 0
                res.map((inasistencia)=>{
                    inasistencia.id = id++
                })
                setInasistencias(res)
            })
            .catch(error => {
                console.log(error)
            })
        }, []);
        useEffect(() => {
            fetch(`http://localhost:3001/cursos/${id}/${dni}`)
            .then(response => response.json())
            .then(curso => {
                setNotas([])
                curso.alumnos.forEach((element, i) => {
                    if (element.dni == dni) {
                        setNotas((oldState) => [...oldState, element.calificaciones])
                    }
                }
                )
            }
            )
            .catch(error => {
                console.log(error)
            })
        }, []);

    return (
        <div>
            <TableInasistencia inasistencia={inasistencias} />
        </div>
    );
}

