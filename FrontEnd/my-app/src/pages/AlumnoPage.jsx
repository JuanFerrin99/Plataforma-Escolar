import { Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import AlumnoCard from "../components/AlumnoCard";
import Chart from "../components/Chart";

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
    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/alumnos/?nombre")
            .then(response => response.json())
            .then(alumnosAPI => {
                setAlumnos(alumnosAPI)
                setLoading(false)

            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const alumnosComponent = alumnos.map((alumno, i) => {
        return <AlumnoCard key={alumno._id} id={alumno._id} />
    })

    const alumnosSkeleton = new Array(20).fill(<Variants />)


    return (
        <div>
            <br /><br />
            <Grid container spacing={3}>
                {loading ? alumnosSkeleton : alumnosComponent}
            </Grid>
            <Chart/>
            <Container>
                <Outlet />
            </Container>

        </div>
    )

}