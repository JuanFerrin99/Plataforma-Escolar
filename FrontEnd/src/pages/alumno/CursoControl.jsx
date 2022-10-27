import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import TableInasistencia from "../../components/tables/TableInasistenciaInmodificable/Table"
import TableNotas from "../../components/tables/TableNotasInmodificable/Table"

export default function CursoCard({ }) {
    const [materia, setMateria] = useState("")
    const [inasistencias, setInasistencias] = useState([])
    const [notas, setNotas] = useState([]);
    const location = useLocation()
    const id = location.state.idCurso
    const dni = location.state.dni

    useEffect(() => {
        fetch(`http://localhost:3001/inasistencias/${dni}/${id}`, {credentials: "include"})
            .then(response => response.json())
            .then(res => {
                setInasistencias(res)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);
    useEffect(() => {
        fetch(`http://localhost:3001/cursos/${id}`, {credentials: "include"})
            .then(response => response.json())
            .then(curso => {
                setMateria(curso.materia)
                setNotas([])
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
    return (
        <div>
            {materia}
            <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
                Inscribirse final
            </Button>
            <TableInasistencia inasistencia={inasistencias} />
            <TableNotas notas={notas} />
        </div>
    );
}

