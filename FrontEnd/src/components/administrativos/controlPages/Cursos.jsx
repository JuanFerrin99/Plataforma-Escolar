import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Grid, Skeleton, Box, Button, TextField, IconButton } from "@mui/material";
import { getDay, handleDeleteAlt, handleDelete, handleCreate, handleDeleteTitulo, changeObjectHandler, handleDeleteAlumnos, changeHandleDia, onEnter } from "../../utils/administrativos"
import { fetchGet, fetchPatch } from "../../utils/Fetch"
import CursosCard from "../../cards/CursoCard";

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

export default function Cursos() {
	const [cursos, setCursos] = useState([]);
	const [curso, setCurso] = useState({});
	const [isShown, setIsShown] = useState(false);
	const [loading, setLoading] = useState(true);

	//* Fetch Principal
	useEffect(() => {
			fetchGet(`cursos/`)
				.then(cursos => {
					setCursos(cursos)
					setLoading(false)
				})
				.catch(err => console.log(err))
	}, []);

	const handleClick = () => {
		let a = Object.assign({}, curso)
		delete a._id
		fetchPatch(`cursos/${curso._id}/`, a)
			.then(res => {
				setIsShown(false);
			})
			.catch(err => console.log(err))
	}
	//*------------------------------------Vista Base--------------------------------------------

	if (Object.keys(curso).length === 0) {
		const cursosComponent = cursos.map((curso, i) => {
			return <CursosCard key={curso._id} setCurso={setCurso} curso={curso} />
		})
		const cursosSkeleton = new Array(20).fill(<Variants />)
		return (
			<div>
				<Grid width={"100vw"} container spacing={3}>
					{loading ? cursosSkeleton : cursosComponent}
				</Grid>
			</div>
		)
	}
	//*------------------------------------Vista Curso--------------------------------------------
	/*
	finales + - m 
	*/
	else {
		return (
			<div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>Profesor</p>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "nombre", setCurso, setIsShown)} label="Nombre" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "apellido", setCurso, setIsShown)} label="Apellido postal" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "dni", setCurso, setIsShown)} label="DNI" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "mail", setCurso, setIsShown)} label="Mail" variant="standard" /></div>
				</div>

				<div style={{ backgroundColor: "lightgray" }}>
					<p>Alumnos</p>
					{curso.alumnos.map((alumno, i) => {
						return (
							<div>
								<div><TextField id="standard-basic" defaultValue={alumno.nombre} label="Nombre" variant="standard" /></div>
								<div><TextField id="standard-basic" defaultValue={alumno.apellido} label="Apellido postal" variant="standard" /></div>
								<div><TextField id="standard-basic" defaultValue={alumno.dni} label="DNI" variant="standard" /></div>
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteAlumnos(setIsShown, alumnos, alumno.dni, setCurso) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>
							
						)
					})
					}
				</div>

				<div style={{ backgroundColor: "lightgray" }}>
					<p>Periodo</p>
					<div><TextField id="standard-basic" defaultValue={curso.periodo.año} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "periodo", "año", setCurso, setIsShown)} label="Año" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.periodo.cuatrimestre} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "periodo", "cuatrimestre", setCurso, setIsShown)} label="Cuatrimestre" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.periodo.horario} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "periodo", "horario", setCurso, setIsShown)} label="Horario" variant="standard" /></div>
					<div style={{ backgroundColor: "lightgray" }}>
						<p>Horario</p>
						{curso.periodo.dias.map((dia, i) => {
							return (
								<div>
									<TextField id="standard-basic" defaultValue={getDay(dia)} onKeyPress={e => onEnter(e)} onBlur={e => changeHandleDia(e, "periodo", "dias", dia, setCurso, curso.periodo.dias, setIsShown)} label={`Dia ${i + 1}`} variant="standard" />
								</div>
							)
						})
						}
					</div>
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>Finales</p>
					{curso.finales.map((final, i) => {
						return (
							<div>
								<p>Final {i + 1}</p>
								<TextField id="standard-basic" defaultValue={final.fecha} inputProps={{ readOnly: true }} label={`Fecha`} variant="standard" />
								<TextField id="standard-basic" defaultValue={final.inicio} inputProps={{ readOnly: true }} label={`Inicio`} variant="standard" />
								<TextField id="standard-basic" defaultValue={final.final} inputProps={{ readOnly: true }} label={`Final`} variant="standard" />
								<div style={{ backgroundColor: "lightgray" }}>
									<p>Horario</p>
									{final.alumnosInscriptos.map((alumno, i) => {
										return (
											<div>
												<p>Alumno {i + 1}</p>
												<TextField id="standard-basic" defaultValue={alumno.dni} label={`DNI`} variant="standard" />
												<TextField id="standard-basic" defaultValue={alumno.nota} label={`nota`} variant="standard" />
											</div>
										)
									})
									}
								</div>
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteAlumnos(setIsShown, alumnos, alumno.dni, setCurso) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>
						)
					})
					}
				</div>

				{isShown && <Button variant="contained" onClick={handleClick}>Guardar cambios</Button>}
			</div>
		)

	}
}
