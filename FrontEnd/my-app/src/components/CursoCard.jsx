import { Grid } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import VistaCurso from './VistaCurso';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

export default function cursoCard({ id, materia }) {
    var apretado = false

    function isPressed (){return apretado}

    function press(){apretado=true}

    const VistaCurso = () => {
        return (
            <div>
                <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
                    Inscribirse materia
                </Button>
                <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
                    Inscribirse materia
                </Button>
                <Button id="botonInscripcion" variant="contained" endIcon={<AddIcon />}>
                    Inscribirse materia
                </Button>
            </div>
        );
    }
    const Dashboard = () => {
        return (
            <Grid item xs={4}>
                <Card sx={{ minWidth: 300 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {id}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {materia}
                        </Typography>

                    </CardContent>
                    <CardActions>
                        <Button onClick={press()} size="small">Ir a curso</Button>
                    </CardActions>
                </Card>
            </Grid>
        );
    }
    return (
        <div>
            {
             ? VistaCurso : Dashboard}
        </div>
    );
}
