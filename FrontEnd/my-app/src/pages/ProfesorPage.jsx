import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AlumnoCard from "../components/AlumnoCard";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
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

export default function Peliculas() {
    const [peliculas, setPeliculas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/peliculas/?nombre")
            .then(response => response.json())
            .then(peliculasAPI => {
                setPeliculas(peliculasAPI)
                setLoading(false)

            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const peliculasComponent = peliculas.map((pelicula, i) => {
        return <AlumnoCard key={pelicula._id} id={pelicula._id} nombre={pelicula.nombre} añoDeEstreno={pelicula.añoDeEstreno} />
    })

    const peliculasSkeleton = new Array(20).fill(<Variants />)


    return (
        <div>
            <br /><br />
            <Grid container spacing={3}>
                {loading ? peliculasSkeleton : peliculasComponent}
            </Grid>
            <Chart/>
            <Container>
                <Outlet />
            </Container>

        </div>
    )

}