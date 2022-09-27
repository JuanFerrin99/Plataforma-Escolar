import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import TableInasistencia from "../components/utils/TableInasistencia/Table"
import { getThemeProps } from '@mui/system';
import { circularProgressClasses } from '@mui/material';

export default function CursoCard({ }) {
    const [inasistencias, setInasistencias] = useState(true);
    const [notas, setNotas] = useState(true);
    const location = useLocation()
    const id = location.state.idCurso
    const dni = location.state.dni

    const GetPropsValues = () => {
        useEffect(() => {
            fetch(`http://localhost:3001/inasistencias/${dni}/${id}`)
                .then(response => response.json())
                .then(res => {
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
                    for( let i = 0; curso.alumnos.length; i++){
                        if (curso.alumnos.dni == dni ){
                            setNotas(curso.alumnos.evaluaciones)
                        }
                    }
                })  
                .catch(error => {
                    console.log(error)
                })
        }, []);
        return {"inasistencias":inasistencias,"notas":notas}
    }

    return (
        <div>
            <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
                Inscribirse final
            </Button>
            <TableInasistencia rows ={GetPropsValues()}/>
            <TableInasistencia />
        </div>
    );
}

