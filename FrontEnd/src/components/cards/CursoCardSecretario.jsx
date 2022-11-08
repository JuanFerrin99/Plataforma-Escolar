import * as React from 'react';
import { Card, CardActions, CardContent, Grid, Button, IconButton, Typography } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
import { fetchDelete } from "../utils/Fetch"

export default function cursoCard({ curso, setCurso, setCursos }) {
    //!mover boton de borrar a a la derecah de manera mas reponsive (tipo float right)
    return (
        <Grid Grid item xs={2.5} margin={"1%"} >
            <Card sx={{ width:"15vw", height:"18vh"}}>
                <CardContent sx={{padding:"3%"}}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {curso.periodo.año}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {curso.materia}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button onClick={() => { setCurso(curso) }} size="small">Ir a curso</Button>
                    <IconButton color="primary"  aria-label="borrar" onClick={() => {
                        setCursos(current => {
                            let copy = current.slice()
                            copy.splice(copy.indexOf(curso), 1)
                            fetchDelete(`cursos/${curso._id}`)
                                .then(res => {
                                    setCurso([])
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
