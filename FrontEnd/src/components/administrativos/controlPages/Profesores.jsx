import React,{ useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Grid, Skeleton, Box, Button, TextField } from "@mui/material";
import ProfesorCard from "../../cards/ProfesorCardSecretario";
import { fetchGet } from "../../utils/Fetch"

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

export default function profesors() {
	const [profesores, setProfesores] = useState([]);
	const [profesor, setProfesor] = useState({});
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		fetchGet(`/profesores/`)
			.then(profesores => {
				console.log(profesores)
				setProfesores(profesores)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, []);


	const profesoresComponent = profesores.map((profesor, i) => {
		return <ProfesorCard key={profesor._id} setProfesor={setProfesor} profesor={profesor} />
	})

	const profesoresSkeleton = new Array(20).fill(<Variants />)

	// * Vista base
	if (Object.keys(profesor).length === 0) {
		return (
			<div>
				<Grid width={"100vw"} container spacing={3}>
					{loading ? profesoresSkeleton : profesoresComponent}
				</Grid>
			</div>
		)
	}

	// * Vista profesor
	else {
		return (
			<Box id="info">
				goback button aca
				<div><TextField id="standard-basic" defaultValue={profesor.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "nombre")} label="Nombre" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "apellido")} label="Apellido" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "dni")} label="DNI" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.fechaNacimiento} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaNacimiento")} label="Fecha de Nacimiento" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.telefono} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "telefono")} label="Telefono" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "mail")} label="Mail" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.rol} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "rol")} label="Rol" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.fechaIngreso} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaIngreso")} label="Fecha de ingreso" variant="standard" /></div>

				{isShown && <Button variant="contained" onClick={handleClick}>Guardar cambios</Button>}

			</Box>
		)

	}
}
