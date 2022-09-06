import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, TextField } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { isLogged } from "../utils/cookieUtils";
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Comentarios from "../components/Comentarios"

export default function Pelicula(props) {
    const isLoggedIn = isLogged()
    const location = useLocation()
    const [pelicula, setPelicula] = useState({});
    const [comentarios, setComentarios] = useState([]);
    const [nuevoComentario, setNuevoComentario] = useState("");
    const { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:3001/peliculas/${id}`, { withCredentials: true })
            .then(response => response.json())
            .then(data => {
                setPelicula(data)
                setComentarios(data.comentarios)
            })
            .catch(error => {
                console.log(error)
            })
    },[]);


    const GetDirectores = () => {
        const directoresComponent = pelicula.directores?.map((director, i) => {
            return (
                <div key={i}>
                    Director: {director}
                </div>
            )
        })
        return directoresComponent
    }
    const GetElenco = () => {
        const ElencoComponent = pelicula.elenco?.map((elenco, i) => {
            return (
                <div key={i}>
                    Elenco: {elenco}
                </div>
            )
        })
        return ElencoComponent
    }
    const GetComentarios = () => {
        const comentariosComponent = comentarios.map((comentario, i) => {
            return (
                <div key={i}>
                    {comentario}
                    <br />
                </div>
            )
        })
        return comentariosComponent
    }

    const Img = styled('img')({
        margin: 'auto',
        display: 'block',
        maxWidth: '100%',
        maxHeight: '100%',
    });

    const handleDelete = () => {
        window.location.href = `/delete/${id}`
    }
    const HandleNuevoComentario = (e) => {
        if (e.key === 'Enter') {
            Comentarios(id,nuevoComentario)
        }
    }

    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ paginaAnterior: location }} replace />
    }


    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                marginTop: 3.5,
                maxWidth: 2000,
                flexGrow: 1,
                paddingBottom: 110  ,
                backgroundColor: (theme) =>
                    theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
            }}
        >

            <ButtonBase sx={{ width: 500, height: 500, float: "left" }}>
                <Img alt="complex" src={pelicula.url} />
            </ButtonBase>
            <Container maxWidth="sm" sx={{ float: "left" }}>
                <Typography sx={{ marginRight: 'auto', float: "left", display: "block", width: "100%", }} variant="h1" component="div">
                    {pelicula.nombre}
                </Typography>

                <Typography variant="subtitle1" sx={{ marginTop: "1%", display: "block", width: "100%", float: "left", fontSize: "25px" }} gutterBottom>
                    {pelicula.añoDeEstreno}
                </Typography>

                <GetDirectores sx={{ display: "block", width: "100%", float: "left" }} />

                <GetElenco sx={{ display: "block", width: "100%", float: "left" }} />


            </Container>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '25ch' }, marginLeft: "6.7%", width: "100%", float: "left" }} noValidate autoComplete="off">

                <TextField id="standard-basic" label="Aporta tu opinion!" variant="standard" onChange={(event) => setNuevoComentario(event.target.value)} onKeyDown={HandleNuevoComentario} />
                <GetComentarios sx={{ float: "left" }} />

                <IconButton onClick={handleDelete} sx={{ float: "right" }} aria-label="delete">
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Paper>
    );
}


