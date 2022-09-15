import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CursoCard from "../components/CursoCard";
import "../styles/AlumnoPage.css";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/cursos/")
            .then(response => response.json())
            .then(cursosAPI => {
                setCursos(cursosAPI)
                setLoading(false)

            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const cursosComponent = cursos.map((curso, i) => {
        return <CursoCard key={curso._id} id={curso.id} materia={curso.materia} />
    })

    const cursosSkeleton = new Array(20).fill(<Variants />)


    return (
        <div>

            <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon/>}>
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