import { Skeleton } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListCursos from "./ListCursos";


function Cargando() {
    return (
      <Box sx={{ width: 300 }}>
        <Skeleton />
        <Skeleton animation="wave" />
        <Skeleton animation={false} />
      </Box>
    );
  }

export default function MiAlumno() {

    const params = useParams()
    const [alumno, setAlumno] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3001/users/miperfil`,{withCredentials: true})
        .then(response => {
            const alumnoDeLaAPI = response.data;
            setAlumno(alumnoDeLaAPI)
            setLoading(false)
        })
        .catch(error => {
            console.log(error)
        })
    }, []);

    if(loading) {
        return (
            <Cargando />
        )
    }

    return (
        <div>
            Estás viendo el perfil de {alumno.nombre} {alumno.apellido}
            <br />
            <ListCursos cursos={alumno.cursos} />
        </div>
    )

}