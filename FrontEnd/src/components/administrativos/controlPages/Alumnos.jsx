import React, { useEffect, useState } from 'react'
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
	const [carreras, setCarreras] = useState([]);
	const [alumno, setAlumno] = useState({});
	const [isShown, setIsShown] = useState(false);
	const [entre1, setEntre1] = useState(false);
	const [entre2, setEntre2] = useState(false);
	const [loading, setLoading] = useState(true);

	const focusInCurrentTarget = ({ relatedTarget, currentTarget }) => {
		if (relatedTarget === null) return false;
		
		var node = relatedTarget.parentNode;
			  
		while (node !== null) {
		  if (node === currentTarget) return true;
		  node = node.parentNode;
		}
	  
		return false;
	  }
	const onEnter = (event) => {
		if (event.code === "Enter") {
			document.activeElement.blur()
		}
	}
	const changeHandler = (event, firstKey) => {
		let valorUpdateado = { [firstKey]: event.target.value }
		setAlumno(current => ({ ...current, ...valorUpdateado }))
		setIsShown(true);
	}

	const changeHandlerComplex = (value, firstKey, setter) => {
		if (!focusInCurrentTarget(value)) {
			let valorUpdateado = { [firstKey]: [...titulos, value] }
			setAlumno(current => ({ ...current, ...valorUpdateado }))
			setIsShown(true);
			setter(current => [...current, value])		
		  }

	}

	const changeObjectHandler = (event, firstKey, secondKey) => {
		setAlumno(current => {
			let copia = current
			let res = {}
			copia[firstKey][secondKey] = event.target.value
			return ({ ...current, ...copia[firstKey] })
		})
		setIsShown(current => true);
	}
	const handleClick = () =>{//todo crear endpoint put en ves de patch
		let a = Object.assign({}, alumno)
		delete a._id 
        fetch(`http://localhost:3001/alumnos/${alumno._id}/`, {
            credentials: "include",
            method: 'PATCH',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
			
            body: JSON.stringify(a)

        })
            .then(res => {
                setIsShown(current => false);
            })
            .catch(error => {
                console.log(error)
            })
	}
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

	useEffect(() => {
		if (Object.keys(alumno).length > 0 && !entre1) {
			setEntre1(true)
			fetch(`http://localhost:3001/cursos/`, { credentials: 'include' })
				.then(response => response.json())
				.then(cursos => {
					cursos.forEach(curso => {
						if (alumno.cursosActivos.includes(curso._id)) {
							setCursosActivos(current => [...current, { nombre: `${curso.materia} ${curso.periodo.año}`, id: curso._id }])
						}
					})
				})
				.catch(error => {
					console.log(error)
				})
		}
	}, [alumno]);

	useEffect(() => {
		if (Object.keys(alumno).length > 0 && !entre2) {
			setEntre2(true)
			fetch(`http://localhost:3001/carreras/`, { credentials: 'include' })
				.then(response => response.json())
				.then(carreras => {
					alumno.carrera.forEach(carreraAlumno => {
						carreras.forEach((carrera) => {
							if (carrera._id === carreraAlumno.id) {
								setCarreras(current => [...current, { nombre: carrera.nombre, id: carrera._id, materiasAprobadas: carreraAlumno.materiasAprobadas }])
							}
						})

					})
				})
				.catch(error => {
					console.log(error)
				})
		}
	}, [alumno]);

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
	else {//todo boton para atars
		return (
			<Box id="info">
				goback button aca
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


				<div style={{ backgroundColor: "lightgray" }}>
					<p>Datos de nacimiento</p>
					<div><TextField id="standard-basic" defaultValue={alumno.datosNacimiento.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosNacimiento", "pais")} label="Pais de nacimiento" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosNacimiento.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosNacimiento", "localidad")} label="Localidad de nacimiento" variant="standard" /></div>
				</div>


				<div style={{ backgroundColor: "lightgray" }}>
					<p>Datos de residencia</p>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "pais")}label="Pais de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.provincia} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "provincia")}label="Provincia de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "localidad")}label="Localidad de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.domicilio} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "domicilio")}label="Domicilio" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.codigoPostal} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "codigoPostal")}label="Codigo postal" variant="standard" /></div>
				</div>

				<div style={{ backgroundColor: "lightgray" }} onBlur={e => changeHandlerComplex(e, "titulos", setTitulos)}>
					<p>titulos</p>
					{alumno.titulos.map((titulo, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={titulo} onKeyPress={e => onEnter(e)}  label={`Titulo ${i + 1}`} variant="standard" />
							</div>
						)
					})
					}
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>cursos activos</p>
					{cursosActivos.map((cursoActivo, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={cursoActivo.nombre} inputProps={{ readOnly: true }} label={`Curso ${i + 1}`} variant="standard" />
							</div>
						)
					})
					}
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>Carrera</p>
					{carreras.map((carrera, i) => {

						return (
							<div>
								<TextField id="standard-basic" defaultValue={carrera.nombre} inputProps={{ readOnly: true }} label={`Carrera ${i + 1}`} variant="standard" />
								{carrera.materiasAprobadas.map((materia, i) => {
									return (
										<TextField id="standard-basic" defaultValue={materia} inputProps={{ readOnly: true }} label={`materia aprobadas ${i + 1}`} variant="standard" />

									)
								})}
							</div>
						)
					})
					}
				</div>

				{isShown && <Button variant="contained" onClick={handleClick}>Guardar cambios</Button>}

			</Box>
		);
	}
}
