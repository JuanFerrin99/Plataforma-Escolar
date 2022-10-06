import * as React from 'react';
import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AlumnoCard from "../components/AlumnoCard";

const columns = [
    { field: 'Apellido', headerName: 'Apellido', width: 130 },
    { field: 'Nombre', headerName: 'Nombre', width: 130 },
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
    const [fechasAsistencia, setFechasAsistencia] = useState([]);
    const [diasCursados, setDiasCursados] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPressed, setIsPressed] = useState(false);
    const [isPressedAsistencia, setIsPressedAsistencia] = useState(false);
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState("");
    const location = useLocation()
    const id = location.state.idCurso // id del curso que se esta mostrando

    useEffect(() => {
        fetch(`http://localhost:3001/cursos/${id}/`)
            .then(response => response.json())
            .then(curso => {
                setAlumnos(curso.alumnos)
                setFechasAsistencia(curso.fechasAsistencia)
                setDiasCursados(curso.diasCursados)
                setRows([])
                setDate(new Date)
                curso.alumnos.forEach((element) => {
                    setRows((oldState) => [...oldState, { "id": element.dni, "Apellido": element.apellido, "Nombre": element.nombre }])
                })
                setLoading(false)
            }
            )
            .catch(error => {
                console.log(error)
            })
    }, []);

    const diaCorrecto = () => {
        return diasCursados.includes(new Date.getDay())
    }

    const asitenciaNoTomada = () => {
        return fechasAsistencia.includes(`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`)
    }
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
        const onRowsSelectionHandler = (ids) => {
            if (isPressedAsistencia == true) {
                //if (diaCorrecto() && asitenciaNoTomada()) {
                    ids.map((id) => rows.find((row) => row.id === id)).forEach((alumno)=>{
                        useEffect(() => {
                            fetch("http://localhost:3001/inasistencias/", {
                                method: 'POST',
                                headers: {
                                  'Accept': 'application/json, text/plain, */*',
                                  'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({})
                              }).then(res => res.json())
                                .then(res => console.log(res));
                        }, []);
                    })
                    setIsPressedAsistencia(true)
                //}
                //else (console.log("no se puede tomar asistencia"))//! mostrar en pantalla
            }
            else return
        };

        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                />
                <button onClick={() => { setIsPressedAsistencia(true) }}>Tomar asistencia</button>
            </div>
        );
    }

}


