import React, {useState} from 'react'

export function Alumnos() {
    const [id, setId] = useState("");
	const [nombre, setNombre] = useState("");
	const [duracion, setDuracion] = useState(0);
	const [materias, setMaterias] = useState([23]);
	const [tipo, setTipo] = useState("");

    const carrera = {
			"_id": id,
			"nombre":nombre,
			"duracion": duracion,
			"materias": materias,//[""]
			"tipo": tipo
		}
    module.exports = {
        carrera, 
			setId,
			setNombre,
			setDuracion,
			setMaterias,
			setTipo,
    }
}

 