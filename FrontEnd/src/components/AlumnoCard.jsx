import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';


export default function alumnoCard({ id, nombre, añoDeEstreno }) {
    return (
        <Grid item xs={4}>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {id}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {nombre}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {añoDeEstreno}
                    </Typography>
                    
                </CardContent>
                <CardActions>
                    <Button LinkComponent={Link} to={`/${id}`} size="small">Ir a pelicula</Button>
                </CardActions>
            </Card>
        </Grid>
    );
}
