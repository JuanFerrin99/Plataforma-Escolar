import * as React from 'react';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import AlumnoCard from "../components/AlumnoCard";


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
    const [curso, setCurso] = useState({});
    const [alumnos, setAlumnos] = useState([]);

    const [rows, setRows] = useState([]);
    const [date, setDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [isPressedAsistencia, setIsPressedAsistencia] = useState(false);
    const [isPressedEvaluacion, setIsPressedEvaluacion] = useState(false);

    const location = useLocation()
    const id = location.state.idCurso  //id del curso que se esta mostrando
    let ausentes = []

    useEffect(() => {
        fetch(`http://localhost:3001/cursos/${id}/`)
            .then(response => response.json())
            .then(curso => {
                setCurso(curso)
                setAlumnos(curso.alumnos)
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
        return curso.periodo.dias.includes(date.getDay())
    }
    const asitenciaNoTomada = () => {
        return curso.fechasAsistencia.includes(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    }

    const alumnosComponent = alumnos.map((alumno, i) => {
        return <AlumnoCard key={alumno._id} id={id} nombre={alumno.nombre} apellido={alumno.apellido} dni={alumno.dni} />
    })
    const alumnosSkeleton = new Array(20).fill(<Variants />)



    if (isPressedAsistencia === false && isPressedEvaluacion === false) {
        return (
            <div>
                {curso.materia}
                <br />
                <br />
                <Button id="botonAsistencia" variant="contained" onClick={() => { setIsPressedAsistencia(true) }} endIcon={<AddIcon />}>
                    Tomar asistencia
                </Button>
                <Button id="botonParciales" variant="contained" onClick={() => { setIsPressedEvaluacion(true) }} endIcon={<AddIcon />}>
                    Parciales
                </Button>
                <br />
                <Grid container spacing={3}>
                    {loading ? alumnosSkeleton : alumnosComponent}
                </Grid>
                <Container>
                    <Outlet />
                </Container>
            </div>
        );
    }

    else if (isPressedEvaluacion === true) {//! Buscar forma de centar las cosas en sus celdas y de empujar algunos valoreas hacia la derecha para que no este tan amontonado
        const columns = [//!ver para que el final de la tabla se mueva al fondo siempre
            { field: 'fecha', headerName: 'Fecha', width: 260 },
            { field: 'tipo', headerName: 'Tipo', width: 130, editable: true, colSpan: 6 },
            { field: 'inscripcionInicio', headerName: 'Inicio de inscripcion', width: 160, editable: true },
            { field: 'inscripcionFin', headerName: 'Fin de inscripcion', width: 160, editable: true }
        ];
        function getFinal() {
            return {
                "id": curso.final.id,
                "fecha": `${curso.final.fechas[0]} - ${curso.final.fechas[0]}`,
                "tipo": "Final",
                "inscripcionInicio": curso.final.periodoInscripcion.inicio,
                "inscripcionFin": curso.final.periodoInscripcion.final
            }
        }
        return (
            <div style={{ height: 400, width: '100%' }}>
                <IconButton color="primary" aria-label="ir para atras" onClick={() => { window.location.href = "/profesor/curso" }}>
                    <ArrowBackRoundedIcon fontSize='large' />
                </IconButton>
                {console.log(curso.evaluaciones.concat(getFinal()))}
                <DataGrid
                    rows={curso.evaluaciones.concat(getFinal())}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => ausentes = ids}
                />
            </div>
        );
    }

    else if (isPressedAsistencia === true) {
        const columns = [
            { field: 'Apellido', headerName: 'Apellido', width: 130 },
            { field: 'Nombre', headerName: 'Nombre', width: 130 },
        ];
        const functionClick = () => {
            if (diaCorrecto() && !asitenciaNoTomada()) {
                ausentes.map((id) => rows.find((row) => row.id === id)).forEach((alumno) => {
                    fetch("http://localhost:3001/inasistencias/", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json, text/plain, */*',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ "fecha": `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`, "tipo": "Falta", "motivo": " ", "justificado": "Injustificada", "curso": id, "materia": curso.materia, "persona": { "nombre": alumno.nombre, "apellido": alumno.apellido, "dni": alumno.dni } })
                    })
                })
            }
            else {
                alert("No se pudo tomar asistencia")
            }
        }
        return (
            <div style={{ height: 400, width: '100%' }}>
                <IconButton color="primary" aria-label="ir para atras" onClick={() => { window.location.href = "/profesor/curso" }}>
                    <ArrowBackRoundedIcon fontSize='large' />
                </IconButton>
                <div style={{ height: "100%", width: '100%' }}>
                    <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={50}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    onSelectionModelChange={(ids) => ausentes = ids}
                />
                </div>

                <button onClick={() => { functionClick() }}>Tomar asistencia</button>
            </div>
        );

    }

}