import { Button, Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Chau() {

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <p>Chau </p>
            </Grid>
            <Grid item xs={10}>
                <Button LinkComponent={Link} to='/hola' state={{ rutaOrigen: 'Chau' }} variant='contained' color='secondary'>Ir a Hola</Button>
            </Grid>
        </Grid>
    )

}