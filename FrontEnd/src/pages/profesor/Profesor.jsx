import { Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import TableInasistencia from "../../components/tables/TableInasistenciaInmodificable/Table"

import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CursoCard from "../../components/cards/CursoCard";
import Cookies from "js-cookie";
import "../../styles/pages/AlumnoPage.css";



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
        fetch(`http://localhost:3001/profesores/filtro/${Cookies.get("mail")}`,{credentials:"include"})
            .then(response => response.json())
            .then(profesor => {
                setDni(profesor.dni)
                setCursos(profesor.cursos)
                setLoading(false)
                fetch(`http://localhost:3001/inasistencias/filtro/${profesor.dni}/`,{credentials:"include"})
                    .then(response => response.json())
                    .then(res => {
                        setInasistencias(res)
                    })
                    .catch(error => {
                        console.log(error)
                    })


            })
    }, [])
    const cursosComponent = cursos.map((curso, i) => {
        return <CursoCard key={curso.id} id={curso.id} materia={curso.materia} dni={dni} />
    })

    const cursosSkeleton = new Array(20).fill(<Variants />)
    return (
        <div>
            <TableInasistencia inasistencia={inasistencias}/>
            <br />
            <p> flechita atras en alumnos no funciona</p>
            <Grid container spacing={3}>
                {loading ? cursosSkeleton : cursosComponent}
            </Grid>
            <Container>
                <Outlet />
            </Container>

        </div>
    )

}