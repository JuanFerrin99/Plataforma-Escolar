import * as React from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";

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
    const location = useLocation()
    const id = location.state.idCurso // id del curso que se esta mostrando
    const dni = location.state.dni //dni de profesor

        useEffect(() => {
            fetch(`http://localhost:3001/cursos/${id}/`)
            .then(response => response.json())
            .then(curso => {
                setAlumnos(curso.alumnos)
            }
            )
            .catch(error => {
                console.log(error)
            })
        }, []);

        const cursosComponent = alumnos.map((alumno, i) => {
            return <AlumnoCard key={alumno.id} id={alumno.id} materia={alumno.nombre} dni={dni} />
        })
        
        const cursosSkeleton = new Array(20).fill(<Variants />)

        return (
            <div>
            <Button id="botonAsistencia" variant="contained" endIcon={<AddIcon />}>
                Tomar asistencia
            </Button>
            <Button id="botonParciales" variant="contained" endIcon={<AddIcon />}>
                Parciales
            </Button>
            <Grid container spacing={3}>
                {loading ? cursosSkeleton : cursosComponent}
            </Grid>
            <Container>
                <Outlet />
            </Container>
        </div>
    );
}

