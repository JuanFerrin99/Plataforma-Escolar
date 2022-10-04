import * as React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AlumnoCard from "../components/AlumnoCard";

const columns = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
];

const rows = [
    {id: 1,lastName: 'Snow', firstName: 'Jon'},
    {id: 2,lastName: 'Snoaw', firstName: 'Jon'},
    {id: 3,lastName: 'Snsow', firstName: 'Jon'},
    {id: 4,lastName: 'Snogw', firstName: 'Jon'},
    {id: 5,lastName: 'Sndow', firstName: 'Jon'},
    {id: 6,lastName: 'Snonw', firstName: 'Jon'},
    {id: 7,lastName: 'Snocvw', firstName: 'Jon'},
  ];
function Variants() {
    return (
        <Grid item xs={4}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Skeleton variant="rectangular" width={210} height={10} />
                    <br />
                    <Skeleton variant="rectangular" width={210} height={10} />
                    <br />
                    <Skeleton variant="rectangular" width={100} height={5} />
                    <br />
                    <Skeleton variant="rectangular" width={100} height={5} />
                    <br />
                    <Skeleton variant="rectangular" width={100} height={5} />
                </CardContent>
                <CardActions>
                    <Skeleton variant="rectangular" width={50} height={2} />
                </CardActions>
            </Card>
        </Grid>
    );
}


export default function CursoCard({ }) {
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const location = useLocation()
    const id = location.state.idCurso // id del curso que se esta mostrando

    useEffect(() => {
        fetch(`http://localhost:3001/cursos/${id}/`)
            .then(response => response.json())
            .then(curso => {
                setAlumnos(curso.alumnos)
                setLoading(false)
            }
            )
            .catch(error => {
                console.log(error)
            })
    }, []);

    const alumnosComponent = alumnos.map((alumno, i) => {
        return <AlumnoCard key={alumno._id} id={id} nombre={alumno.nombre} apellido={alumno.apellido} dni={alumno.dni} />
    })

    const alumnosSkeleton = new Array(20).fill(<Variants />)
    if (isPressed === false) {
        return (
            <div>
                MATERIA
                <Button id="botonAsistencia" variant="contained" onClick={() => { setIsPressed(true) }} endIcon={<AddIcon />}>
                    Tomar asistencia
                </Button>
                <Button id="botonParciales" variant="contained" endIcon={<AddIcon />}>
                    Parciales
                </Button>
                <Grid container spacing={3}>
                    {loading ? alumnosSkeleton : alumnosComponent}
                </Grid>
                <Container>
                    <Outlet />
                </Container>
            </div>
        );
    }
    else {
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
        );
    }

}


