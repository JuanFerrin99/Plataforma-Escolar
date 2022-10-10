import * as React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import AddIcon from '@mui/icons-material/Add';
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
    const [materia, setMateria] = useState([]);
    const [alumnos, setAlumnos] = useState([]);
    const [diasCursados, setDiasCursados] = useState([]);
    const [fechasAsistencia, setFechasAsistencia] = useState([]);
    
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState("");
    const location = useLocation()
    const id = location.state.idCurso  //id del curso que se esta mostrando

    const [loading, setLoading] = useState(true);
    const [isPressed, setIsPressed] = useState(false);

    let ausentes = []

    useEffect(() => {
        fetch(`http://localhost:3001/cursos/${id}/`)
            .then(response => response.json())
            .then(curso => {
                setMateria(curso.materia)
                setAlumnos(curso.alumnos)
                setDiasCursados(curso.periodo.dias)
                setFechasAsistencia(curso.fechasAsistencia)
                
                setRows([])
                setDate(new Date())

                curso.alumnos.forEach((element) => {
                    setRows((oldState) => [...oldState, { "id": element.dni, "Apellido": element.apellido, "Nombre": element.nombre }])
                })
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);


    const diaCorrecto = () => {
        console.log(diasCursados.includes(date.getDay()))
        return diasCursados.includes(date.getDay())
    }
    const asitenciaNoTomada = () => {
        console.log(fechasAsistencia.includes(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`))
        return fechasAsistencia.includes(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    }

    const alumnosComponent = alumnos.map((alumno, i) => {
        return <AlumnoCard key={alumno._id} id={id} nombre={alumno.nombre} apellido={alumno.apellido} dni={alumno.dni} />
    })
    const alumnosSkeleton = new Array(20).fill(<Variants />)

    if (isPressed === false) {
        return (
            <div>
                {materia}
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
        const functionClick = () => {
            if (diaCorrecto() && !asitenciaNoTomada()) {
                ausentes.map((id) => rows.find((row) => row.id === id)).forEach((alumno) => {
                    fetch("http://localhost:3001/inasistencias/", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "fecha": `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`, "tipo": "Falta", "motivo": " ", "justificado": "Injustificada", "curso": id, "materia": materia, "persona": { "nombre": alumno.nombre, "apellido": alumno.apellido, "dni": alumno.dni } })
                    })
                    .then(res => res.json())
                    .then(res => console.log(res))
                })
            }
            else{
                alert("No se pudo tomar asistencia")
            }
        }
        return (
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => ausentes = ids}
                />
                <button onClick={() => { functionClick() }}>Tomar asistencia</button>
            </div>
        );
    }
}