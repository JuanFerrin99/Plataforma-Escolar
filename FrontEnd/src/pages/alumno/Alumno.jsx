import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CursoCard from "../../components/cards/CursoCard";
import "../../styles/pages/AlumnoPage.css";
import Cookies from "js-cookie";
import { fetchGet } from '../../components/utils/Fetch'

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
    const [dni, setDni] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchGet(`alumnos/filtro/${Cookies.get("mail")}`)
            .then(response => response.json())
            .then(alumno => {
                setCursos(alumno.cursosActivos)
                setDni(alumno.dni)
                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, [])


    const cursosComponent = cursos.map((curso, i) => {
        return <CursoCard key={curso.id} nombre={curso.nombre} id={curso.id} dni={dni} />
    })

    const cursosSkeleton = new Array(20).fill(<Variants />)

    return (
        <div>
            <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
                Inscribirse materia
            </Button>
            <Grid container spacing={3}>
                {loading ? cursosSkeleton : cursosComponent}
            </Grid>
            <Container>
                <Outlet />
            </Container>
        </div>
    )
}