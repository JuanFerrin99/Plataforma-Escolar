import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function DeletePelicula(){
    const { id } = useParams();
    useEffect(() => {
        fetch(`http://localhost:3001/peliculas/${id}`, { withCredentials: true, method: "DELETE"})
            .then(response => response.json())
            .then(data => {
                console.log("Pelicula eliminada")
                window.location.href = `/`//navigate
            })
            .catch(error => {
                console.log(error)
            })
    });
} 