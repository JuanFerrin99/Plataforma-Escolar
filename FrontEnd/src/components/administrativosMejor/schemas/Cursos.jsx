import React, {useState} from 'react'

export function Alumnos() {
    const [id, setId] = useState("");
	const [nombre, setNombre] = useState("");
	const [apellido, setApellido] = useState("");
	const [dni, setDni] = useState(0);
	const [fechaNacimiento, setFechaNacimiento] = useState("");
	const [telefono, setTelefono] = useState(0);
	const [mail, setMail] = useState("");
	const [titulos, setTitulos] = useState([]);
	const [pais, setPais] = useState("");
    const [provincia, setProvincia] = useState("");
    const [localidad, setLocalidad] = useState("");
    const [domicilio, setDomicilio] = useState("");
    const [codigoPostal, setCodigoPoastal] = useState(0);
    const [fechaIngreso, setFechaIngreso] = useState("");
    const [rol, setRol] = useState("");
    const [paisNacimiento, setPaisNacimiento] = useState("");
    const [localidadNacimiento, setlocalidadNacimiento] = useState("");
    const [cursosActivos, setCursosActivos] = useState("");
    const [carreras, setCarreras] = useState("");

    const alumno = {
        "_id": id,
        "nombre": nombre,
        "apellido": apellido,
        "dni": dni,
        "fechaNacimiento": fechaNacimiento,
        "telefono": telefono,
        "mail": mail,
        "titulos": titulos,//[""]
        "datosResidencia": {
            "pais": pais,
            "provincia": provincia,
            "localidad": localidad,
            "domicilio": domicilio,
            "codigoPostal": codigoPostal
        },
        "fechaIngreso": fechaIngreso,
        "rol": rol,
        "datosNacimiento": {
            "pais": paisNacimiento,
            "localidad": localidadNacimiento
        },
        "cursosActivos": cursosActivos,
        /*[{ "id": "",
            "nombre":"",}]*/
        "carreras": carreras
            /*[{"id": "",
            "materiasAprobadas": []}]*/   
    }
    module.exports = {
        alumno, 
            setId,
            setNombre,
            setApellido,
            setDni,
            setFechaNacimiento,
            setTelefono,
            setMail,
            setTitulos,
            setPais,
            setProvincia,
            setLocalidad,
            setDomicilio,
            setCodigoPoastal,
            setFechaIngreso,
            setRol,
            setPaisNacimiento,
            setlocalidadNacimiento,
            setCursosActivos,
            setCarreras,
            setApellido, 
    }
}

 