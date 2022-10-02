import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import AlumnoCard from "./AlumnoCard";

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

export default function Alumnos() {

    const [alumnos, setAlumnos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("http://localhost:3001/users")
            .then(response => response.json())
            .then(alumnosDeLaAPI => {

                setAlumnos(alumnosDeLaAPI)
                setLoading(false)

            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    const alumnosComponent = alumnos.map((alumno, i) => {
        return <AlumnoCard key={alumno._id} id={alumno._id} nombre={alumno.nombre} apellido={alumno.apellido} cursos={alumno.cursos} />
    })

    const alumnosSkeleton = new Array(20).fill(<Variants />)
    

    return (
        <Grid container spacing={2}>
            {loading ? alumnosSkeleton : alumnosComponent}
        </Grid>
    )

}