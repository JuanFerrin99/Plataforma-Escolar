import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import { isLogged } from "../utils/cookieUtils";
import { Grid } from "@mui/material";
import PeliculaCard from "../components/PeliculaCard";



function Cargando() {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

export default function Filtro() {
    const isLoggedIn = isLogged()
    const location = useLocation()
    const [pelicula, setPelicula] = useState();
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const nombre = searchParams.get("nombre")

    useEffect(() => {
        fetch(`http://localhost:3001/peliculas/?nombre=${nombre}`, { withCredentials: true })
        .then(response => response.json())
        .then(data => {
            setPelicula(data)
            setLoading(false)

        })
        .catch(error => {
            console.log(error)
        })
    });
    if(loading) {
        return (
            <Cargando />
            )
        }
        
        const peliculasComponent = pelicula.map((pelicula, i) => {
            return <PeliculaCard key={pelicula._id} id={pelicula._id} nombre={pelicula.nombre} añoDeEstreno={pelicula.añoDeEstreno} />
        })
        
        const peliculasSkeleton = new Array(20).fill(<Cargando />)
        
        if(!isLoggedIn) {
            return <Navigate to="/login" state={{paginaAnterior: location}} replace /> 
        }
        
        return (
            <div>
            <br /><br />
            <Grid container spacing={3}>
                {loading ? peliculasSkeleton : peliculasComponent}
            </Grid>
            <Container>
                <Outlet />
            </Container>
        </div>
    )

}