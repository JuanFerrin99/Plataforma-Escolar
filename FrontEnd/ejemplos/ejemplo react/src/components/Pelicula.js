import { Button } from "@mui/material";
import { useLocation, useParams } from "react-router-dom";

export default function Pelicula() {

    let params = useParams();
    let location = useLocation();

    console.log(location)

    return (
        <>
            <div>Id de la pelicula: {params.id}</div>
            <Button variant="contained" color='error'>Ver pelicula</Button>
        </>
    )
}