import * as React from 'react';
import { Card, CardActions, CardContent, Grid, Button, IconButton, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { fetchDelete } from "../utils/Fetch"
import Carreras from '../administrativos/controlPages/Carreras';

export default function cursoCard({ carrera, setCarrera, setCarreras, setMaterias}) {
    //!mover boton de borrar a a la derecah de manera mas reponsive (tipo float right)
    return (
        <Grid Grid item xs={2.5} margin={"1%"} >
            <Card sx={{ width:"100%", height:"100%"}}>

                <CardContent sx={{padding:"3%"}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {carrera.tipo}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {carrera.nombre}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button onClick={() => { setCarrera(carrera);setMaterias(carrera.materias) }} size="small">Ir a carrera</Button>
                    <IconButton color="primary"  aria-label="borrar" onClick={() => {
                        setCarreras(current => {
                            let copy = current.slice()
                            copy.splice(copy.indexOf(carrera), 1)
                            fetchDelete(`carreras/${carrera._id}`)
                                .then(res => {
                                    setCarrera([])
                                })
                                .catch(err => console.log(err))
                                return copy
                            })
                    }}>
                        <ClearIcon fontSize='small' ></ClearIcon>
                    </IconButton>
                </CardActions>
            </Card>
        </Grid>
    );
}
