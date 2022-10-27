import React, { useEffect, useState, useRef } from 'react'
import { Card, CardActions, CardContent, Grid, Skeleton, Box, Button, TextField } from "@mui/material";
import AlumnoCard from "../../cards/AlumnoCardSecretario";
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
	const [titulos, setTitulos] = useState([]);
	const [cursosActivos, setCursosActivos] = useState([]);
	const [alumno, setAlumno] = useState({});
	const [isShown, setIsShown] = useState(false);
	const [loading, setLoading] = useState(true);

	const onEnter = (event) => {
		if (event.code === "Enter") {
			document.activeElement.blur()
		}
	}

	const changeHandler = (event, firstKey) => {
		let valorUpdateado = { [firstKey]: event.target.value }
		setAlumno(current => ({ ...current, ...valorUpdateado }))
		setIsShown(current => !current);
	}

	const changeHandlerComplex = (value, firstKey, setter) => {
		let valorUpdateado = { [firstKey]: [...titulos, ...value] }
		setAlumno(current => ({ ...current, ...valorUpdateado }))
		setIsShown(current => !current);
		setter(current=>[...current, ...value])

	}

	const changeObjectHandler = (event, firstKey, secondKey) => {
		setAlumno(current => {
			let copia = current
			let res = {}
			copia[firstKey][secondKey] = event.target.value
			return ({ ...current, ...copia[firstKey] })
		})
		setIsShown(current => !current);
	}

	useEffect(() => {
		fetch(`http://localhost:3001/alumnos/`, { credentials: 'include' })
			.then(response => response.json())
			.then(alumnos => {
				setAlumnos(alumnos)
				setLoading(false)
					fetch(`http://localhost:3001/cursos/${alumnos.cursosActivos}`, { credentials: 'include' })
						.then(response => response.json())
						.then(cursos => {
							cursos.alumnos.forEach((alumno)=>{

							})
						})
						.catch(error => {
							console.log(error)
						})
				
			})
			.catch(error => {
				console.log(error)
			})
	}, []);




	useEffect(() => { console.log(alumno) }, [alumno])

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
					<TextField id="standard-basic" defaultValue={alumno.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "nombre")} label="Nombre" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "apellido")} label="Apellido" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "dni")} label="DNI" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.fechaNacimiento} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaNacimiento")} label="Fecha de Nacimiento" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.telefono} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "telefono")} label="Telefono" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "mail")} label="Mail" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.rol} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "rol")} label="Rol" variant="standard" />
				</div>
				<div>
					<TextField id="standard-basic" defaultValue={alumno.fechaIngreso} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaIngreso")} label="Fecha de ingreso" variant="standard" />
				</div>
				{() => {
					return (
						<div>
							<p>Datos de nacimiento</p>
							<div><TextField id="standard-basic" defaultValue={alumno.datosNacimiento.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosNacimiento", "pais")} label="Pais de nacimiento" variant="standard" /></div>
							<div><TextField id="standard-basic" defaultValue={alumno.datosNacimiento.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosNacimiento", "localidad")} label="Localidad de nacimiento" variant="standard" /></div>
						</div>
					)
				}}

				<div>
					<p>Datos de residencia</p>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.pais} onKeyPress={e => onEnter(e)} label="Pais de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.provincia} onKeyPress={e => onEnter(e)} label="Provincia de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.localidad} onKeyPress={e => onEnter(e)} label="Localidad de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.domicilio} onKeyPress={e => onEnter(e)} label="Domicilio" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.codigoPostal} onKeyPress={e => onEnter(e)} label="Codigo postal" variant="standard" /></div>
				</div>

				<div>

					{alumno.titulos.map((titulo, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={titulo} onBlur={e => changeHandlerComplex(e, "titulos", setTitulos)} onKeyPress={e => onEnter(e)} label={`Titulo ${i + 1}`} variant="standard" />
							</div>
						)
					})
					}
				</div>
				<div>

					{alumno.cursosActivos.map((curso, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={curso.nombre} inputProps={{ readOnly: true }} label={`Curso activo ${i + 1}`} variant="standard" />
							</div>
						)
					})
					}
				</div>
				<div>
					<p>Carrera</p>
					{alumno.carrera.materias.map((materia, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={materia.nombre} label={`Materia terminada ${i + 1}`} variant="standard" />
							</div>
						)
					})
					}
				</div>

				{isShown && <Button variant="contained">Guardar cambios</Button>}

			</Box>
		);
	}
}
