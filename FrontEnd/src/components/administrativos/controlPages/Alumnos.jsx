import React from 'react'
import { useEffect, useState } from "react";
import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import AlumnoCard from "../../cards/AlumnoCardSecretario";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import "./alumnos.css"

function Variants() {
	return (
		<Grid item xs={4}>
			<Card sx={{ minWidth: 275 }}>
				<CardContent>
					<Skeleton variant="rectangular" width={210} height={10} />
					<br />
					<Skeleton variant="rectangular" width={210} height={10} />
					<br />
					<Skeleton variant="rectangular" width={100} height={5} />
					<br />
					<Skeleton variant="rectangular" width={100} height={5} />
					<br />
					<Skeleton variant="rectangular" width={100} height={5} />
				</CardContent>
				<CardActions>
					<Skeleton variant="rectangular" width={50} height={2} />
				</CardActions>
			</Card>
		</Grid>
	);
}

export default function Alumnos() {
	const [alumnos, setAlumnos] = useState([]);
	const [alumno, setAlumno] = useState({});
	const [loading, setLoading] = useState(true);




	useEffect(() => {
		fetch(`http://localhost:3001/alumnos/`, { credentials: 'include' })
			.then(response => response.json())
			.then(alumnos => {
				setAlumnos(alumnos)
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);

	const alumnosComponent = alumnos.map((alumno, i) => {
		return <AlumnoCard key={alumno._id} setAlumno={setAlumno} alumno={alumno} />
	})

	const alumnosSkeleton = new Array(20).fill(<Variants />)

	if (Object.keys(alumno).length === 0) {
		return (
			<div>
				<Grid width={"100vw"} container spacing={3}>
					{loading ? alumnosSkeleton : alumnosComponent}
				</Grid>
			</div>
		)
	}
	else {
		return (
			<Box id="info">
				<div>
					<TextField id="standard-basic" value={alumno.nombre} label="Nombre" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.apellido} label="Apellido" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.dni}  label="DNI" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.fechaNacimiento}  label="Fecha de Nacimiento" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.telefono}  label="Telefono" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.mail}  label="Mail" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.rol}  label="Rol" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.fechaIngreso}  label="Fecha de ingreso" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosNacimiento.pais}  label="Pais de nacimiento" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosNacimiento.localidad}  label="Localidad de nacimiento" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosResidencia.pais}  label="Pais de residencia" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosResidencia.provincia}  label="Provincia de residencia" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosResidencia.localidad}  label="Localidad de residencia" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosResidencia.domicilio}  label="Domicilio" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" value={alumno.datosResidencia.codigoPostal}  label="Codigo postal" variant="standard" />
				</div>
				{alumno.titulos.map((titulo)=>{
									<div>
									<TextField id="standard-basic" value={alumno.datosResidencia.codigoPostal}  label="Codigo postal" variant="standard" />
								</div>
				})}
			</Box>
		);

	}
}
