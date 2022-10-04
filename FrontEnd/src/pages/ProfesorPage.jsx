import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import TableInasistencia from "../components/utils/TableInasistencia/Table"
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CursoCard from "../components/CursoCard";
import "../styles/AlumnoPage.css";
import Cookies from "js-cookie";



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

export default function AlumnoPage() {
    const [cursos, setCursos] = useState([]);
    const [inasistencias, setInasistencias] = useState([]);
    const [dni, setDni] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:3001/profesores/filtro/${Cookies.get("mail")}`)
            .then(response => response.json())
            .then(profesor => {
                setDni(profesor.dni)
                setCursos(profesor.cursos)
                setLoading(false)
                fetch(`http://localhost:3001/inasistencias/filtro/${dni}/`)
                    .then(response => response.json())
                    .then(res => {
                        setInasistencias(res)
                    })
                    .catch(error => {
                        console.log(error)
                    })
                    
            }, [])

        })
        const cursosComponent = cursos.map((curso, i) => {
            return <CursoCard key={curso.id} id={curso.id} materia={curso.materia} dniAlumno={dni}/>
        })

        const cursosSkeleton = new Array(20).fill(<Variants />)
        return (
            <div>
                <TableInasistencia inasistencia = {inasistencias} />
                <br />
                <Grid container spacing={3}>
                    {loading ? cursosSkeleton : cursosComponent}
                </Grid>
                <Container>
                    <Outlet />
                </Container>

            </div>
        )

    }