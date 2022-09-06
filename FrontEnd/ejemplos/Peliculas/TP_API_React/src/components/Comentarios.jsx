import axios from "axios";;

export default function AñadirComentario(id, comentarios) {
    const body = {
        comentarios: [comentarios]
    }

    const options = {
        withCredentials: true
    }
    console.log(body)
    axios.post(`http://localhost:3001/peliculas/${id}/comentarios`, body, options)
        .then(body => {
            return console.log(body)
        })
        .catch(e => console.log(e));
} 