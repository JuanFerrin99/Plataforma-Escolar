import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import TableInasistencia from "../components/utils/TableInasistencia/Table"
import { getThemeProps } from '@mui/system';

export default function CursoCard({}){
    const [props, setProps] = useState(true);
    const location  = useLocation()
    const id = location.state.idCurso

    const GetPropsValues = () => {
        useEffect(() => {
            fetch(`http://localhost:3001/cursos/${id}`)
            .then(response => response.json())
            .then(curso => {
                   
            })
            .catch(error => {
                console.log(error)
            })
        },[])
        useEffect(() => {
            fetch(`http://localhost:3001/cursos/${id}`)
            .then(response => response.json())
            .then(curso => {

            })
            .catch(error => {
                console.log(error)
            })
        },[])
    }

    return (
        <div>
        <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
            Inscribirse final
        </Button>
        <TableInasistencia rows= {GetPropsValues()}/>
        <TableInasistencia/>
    </div>
    );
}
