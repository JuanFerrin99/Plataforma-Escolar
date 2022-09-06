import { useEffect } from "react";

export default function DeletePelicula (props) {
    useEffect(() => {
        fetch(`http://localhost:3001/peliculas/${props.id}`, { withCredentials: true, method: 'DELETE' })
            .then(() => {
                return window.location.href = '/';
            })
            .catch(error => {
                console.log(error)
            })
    });
}
