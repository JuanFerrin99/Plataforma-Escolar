import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { Link } from 'react-router-dom';


export default function alumnoCard({ setAlumno, alumno}) {
    return (
        <Grid item xs={3} margin={2.5}>
            <Card sx={{ minWidth: 300 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {alumno.nombre}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {alumno.apellido}
                    </Typography>   

                </CardContent>
                <CardActions>
                    <Button onClick={()=>{setAlumno(alumno)}} size="small">Ir a alumno</Button>
                </CardActions>
            </Card>
        </Grid>

    );
}
