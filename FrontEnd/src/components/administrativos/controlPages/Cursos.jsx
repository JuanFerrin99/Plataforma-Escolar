import React, { useEffect, useState } from 'react'
import { Card, ListItemText, Checkbox, OutlinedInput, Box, Select, FormControl, MenuItem, InputLabel, Typography, CardActions, CardContent, Grid, Skeleton, Fade, Button, TextField, IconButton } from "@mui/material";
import { getDay, changeObjectHandlerInArrayComplex, handleDeleteFinal, changeObjectHandlerInArray, handleCreateFinal, handleDeleteAlumnosFinal, changeObjectHandler, handleDeleteAlumnos, changeHandleDia, onEnter } from "../../utils/administrativos"
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/AddRounded';
import { fetchGet, fetchPatch, fetchPost } from "../../utils/Fetch"
import CursosCard from "../../cards/CursoCardSecretario";
import "../../../styles/administrativos/cursos.css"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import Cookies from "js-cookie";
import socket from '../../../components/utils/Socket'
socket.emit('connected', Cookies.get("mail"))


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: "15%",
		},
	},
};

const dias = [
	'Lunes',
	'Martes',
	'Miercoles',
	'Jueves',
	'Viernes',
	'Sabado',
	'Domingo'
];
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
	const [materias, setMaterias] = useState([]);
	const [profesores, setProfesores] = useState([]);
	const [diasSeleccionados, setDiasSeleccionados] = useState([]);
	const [isShown, setIsShown] = useState(false);
	const [loading, setLoading] = useState(true);
	const [checked, setChecked] = useState(true);
	const [cardStyle, setCardStyle] = useState({
		height: "6vh",
		width: "6vh",
		marginTop: "2vh",
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: "20%",
		transition: '0.35s'
	});
	const [createValues, setCreateValues] = useState({
		materia: "",
		profesor: "",
		duracion: "",
		dias: [],
		horario: "",
	});

	const handleChange = (event, key) => {
		setCreateValues(current => ({ ...current, [key]: event.target.value }));
	};
	const handleChangeCheck = (event) => {
		const {
			target: { value },
		} = event;
		setDiasSeleccionados(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		)
		setCreateValues(current => ({ ...current, "dias": typeof value === 'string' ? value.split(',') : value }));
	};

	//* Fetch Principal
	useEffect(() => {
		fetchGet(`cursos/`)
			.then(response => response.json())
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
	//*------------------------------------Vista Base--------------------------------------------`
	if (Object.keys(curso).length === 0) {
		const cursosComponent = cursos.map((curso, i) => {
			return <CursosCard key={curso._id} setCurso={setCurso} setCursos={setCursos} curso={curso} />
		})
		const cursosSkeleton = new Array(20).fill(<Variants />)

		const handleCreateClick = () => {
			fetchGet(`materias/`)
				.then(response => response.json())
				.then(materias => {
					setMaterias(materias)
					setLoading(false)
				})
				.catch(err => console.log(err))

			fetchGet(`profesores/`)
				.then(response => response.json())
				.then(profesores => {
					setProfesores(profesores)
					setLoading(false)
				})
				.catch(err => console.log(err))

			setCardStyle(current => ({ ...current, height: "60vh", width: "32vw", borderRadius: "0.5%", }))
			setChecked(false)
		}
		const handleCreateCurso = () => {
			const cursoBase =
			{
				"materia": createValues.materia,
				"profesor": {
					"nombre": createValues.profesor.nombre,
					"apellido": createValues.profesor.apellido,
					"dni": createValues.profesor.dni
				},
				"alumnos": [],
				"periodo": {
					"año": new Date().getFullYear(),
					"cuatrimestre": createValues.duracion,
					"horario": createValues.horario,
					"dias": [createValues.horario]
				},
				"estado": "Activa",
				"fechasAsistencia": [],
				"evaluaciones": [],
				"finales": [],
				"mail": createValues.profesor.mail
			}
			fetchPost(`cursos/`, cursoBase)
				.then(res => {
					setIsShown(false);
					fetchPatch(`profesores/${createValues.profesor._id}`, { cursos: [...createValues.profesor.cursos, { id: res._id, materia: cursoBase.materia }] })
						.then()
						.catch(err => console.log(err))
				})
				.catch(err => console.log(err))

			setChecked(true)
			setCardStyle(current => ({ ...current, height: "6vh", width: "6vh", borderRadius: "20%" }))
		}

		const createCursoComponent = () => {
			return (
				<div style={{ height: "100%", width: '100%', overflow: "visible" }}>

					<Box sx={{ width: "30vw", margin: " 7% 0% 2.5%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Materia</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={createValues.materia}
								label="Materia"
								onChange={(e) => handleChange(e, 'materia')}
							>
								{materias.map((materia) => (
									<MenuItem value={materia.nombre}>{materia.nombre}</MenuItem>
								))}
							</Select>
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Profesor</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={createValues.profesor}
								label="Profesor"
								onChange={(e) => handleChange(e, 'profesor')}
							>
								{profesores.map((profesor) => (
									<MenuItem value={profesor}>{`${profesor.apellido}, ${profesor.nombre}`}</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>

					<Box sx={{ width: "30vw", margin: "3% 0%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Duracion</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={createValues.duracion}
								label="Duracion"
								onChange={(e) => handleChange(e, 'duracion')}
							>
								<MenuItem value={"ambos"}>Anual</MenuItem>
								<MenuItem value={"primer"}>1er cuatrimestre</MenuItem>
								<MenuItem value={"segundo"}>2do cuatrimestre</MenuItem>
							</Select>
						</FormControl>

						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Horario</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={createValues.horario}
								label="Horario"
								onChange={(e) => handleChange(e, 'horario')}
							>
								<MenuItem value={"mañana"}>Mañana</MenuItem>
								<MenuItem value={"tarde"}>Tarde</MenuItem>
								<MenuItem value={"noche"}>Noche</MenuItem>
							</Select>
						</FormControl>
					</Box>
					<Box sx={{ width: "30vw", margin: "3% 0%", float: "left" }}>
						<FormControl sx={{ width: '25.8vw', margin: "0 3%" }}>
							<InputLabel id="demo-multiple-checkbox-label">Dias</InputLabel>
							<Select
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={createValues.dias}
								onChange={handleChangeCheck}
								input={<OutlinedInput label="Tag" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
							>
								{dias.map((dia) => (
									<MenuItem key={dia} value={dia}>
										<Checkbox checked={diasSeleccionados.indexOf(dia) > -1} />
										<ListItemText primary={dia} />
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Box>
					<div style={{ display: "flex", position: "relative", justifyContent: "center", width: "29vw", height: "25%" }}>
						<Button style={{ position: "absolute", bottom: 0, width: "20vw" }} variant="outlined" startIcon={<CreateIcon />} onClick={() => { handleCreateCurso() }}>
							Crear
						</Button>
					</div>
				</div >
			)
		}
		return (
			<div style={{ paddingTop: "3%", paddingLeft: "3%", width: "auto" }}>
				<div>
					<Grid width={"auto"} container spacing={1}>
						{loading ? cursosSkeleton : cursosComponent}
					</Grid>
				</div>
				<div style={{ paddingLeft: "2%", paddingBottom: "1%", overflow: "auto" }}>
					<Card sx={cardStyle}>
						{!checked ?
							<CardContent sx={{ height: "100%", width: '100%' }}>{createCursoComponent()}</CardContent>
							:
							<CardActions>
								<IconButton color="primary" aria-label="crear fila" onClick={() => handleCreateClick()}>
									<AddIcon style={{ fontSize: "2.5vw" }} />
								</IconButton>
							</CardActions>
						}
					</Card>
				</div>

			</div>
		)
	}
	//*------------------------------------Vista Curso--------------------------------------------

	if (Object.keys(curso).length > 0) {
		return (
			<div id="vistaGrande" style={{ height: "100%", width: '100%', fontSize: "18px" }}>
				<IconButton sx={{ float: "left" }} color="primary" aria-label="ir para atras" onClick={() => { setCurso({}) }}>
					<ArrowBackRoundedIcon fontSize='large' />
				</IconButton>
				<div style={{ backgroundColor: "lightCyan", width: '19%', float: 'left', marginTop: '2%', marginLeft: "2%" }}>
					<b>Profesor</b>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "nombre", setCurso, setIsShown)} label="Nombre" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "apellido", setCurso, setIsShown)} label="Apellido postal" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "dni", setCurso, setIsShown)} label="DNI" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={curso.profesor.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "profesor", "mail", setCurso, setIsShown)} label="Mail" variant="standard" /></div>
				</div>

				<div style={{ backgroundColor: "#222233", color: "#AACCFF", width: '19%', float: 'left', marginTop: '2%', marginLeft: "2%" }}>
					<b>Alumnos</b>
					{curso.alumnos.map((alumno) => {
						return (
							<div>
								<div><TextField sx={{ '& .MuiInput-underline:before': { borderBottomColor: '#F2F3F4' }, '& .MuiInput-underline:after': { borderBottomColor: '#AACCFF' }, input: { color: '#F2F3F4' }, label: { color: '#AACCFF' } }} key={alumno.nombre} id="standard-basic" defaultValue={alumno.nombre} label="Nombre" variant="standard" /></div>
								<div><TextField sx={{ input: { color: '#F2F3F4' }, label: { color: '#AACCFF' } }} key={alumno.apellido} id="standard-basic" defaultValue={alumno.apellido} label="Apellido postal" variant="standard" /></div>
								<div><TextField sx={{ input: { color: '#F2F3F4' }, label: { color: '#AACCFF' } }} key={alumno.dni} id="standard-basic" defaultValue={alumno.dni} label="DNI" variant="standard" /></div>
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteAlumnos(setIsShown, curso.alumnos, alumno.dni, setCurso) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>

						)
					})
					}
				</div>

				<div style={{ backgroundColor: "#107896", color: "#F2F3F4", width: '19%', float: 'left', marginTop: '2%', marginLeft: "2%" }}>
					<b>Periodo</b>
					<div><TextField sx={{ label: { color: '#F2F3F4' } }} id="standard-basic" defaultValue={curso.periodo.año} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "periodo", "año", setCurso, setIsShown)} label="Año" variant="standard" /></div>
					<div><TextField sx={{ label: { color: '#F2F3F4' } }} id="standard-basic" defaultValue={curso.periodo.cuatrimestre} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "periodo", "cuatrimestre", setCurso, setIsShown)} label="Cuatrimestre" variant="standard" /></div>
					<div><TextField sx={{ label: { color: '#F2F3F4' } }} id="standard-basic" defaultValue={curso.periodo.horario} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "periodo", "horario", setCurso, setIsShown)} label="Horario" variant="standard" /></div>
					<div style={{ backgroundColor: "lightCyan" }}>
						<b>Horario</b>
						{curso.periodo.dias.map((dia, i) => {
							return (
								<div>
									<TextField key={getDay(dia)} id="standard-basic" defaultValue={getDay(dia)} onKeyPress={e => onEnter(e)} onBlur={e => changeHandleDia(e, "periodo", "dias", dia, setCurso, curso.periodo.dias, setIsShown)} label={`Dia ${i + 1}`} variant="standard" />
								</div>
							)
						})
						}
					</div>
				</div>
				<div style={{ backgroundColor: "lightCyan", width: '19%', float: 'left', marginTop: '2%', marginLeft: "2%" }}>
					<b>Finales</b>
					{curso.finales.map((final, i) => {
						return (
							<div>
								<p>Final {i + 1}</p>
								<TextField id="standard-basic" defaultValue={final.fecha} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandlerInArray(e, "finales", "fecha", i, setCurso, setIsShown)} label={`Fecha`} variant="standard" />
								<TextField id="standard-basic" defaultValue={final.inicio} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandlerInArray(e, "finales", "inicio", i, setCurso, setIsShown)} label={`Inicio`} variant="standard" />
								<TextField id="standard-basic" defaultValue={final.final} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandlerInArray(e, "finales", "final", i, setCurso, setIsShown)} label={`Final`} variant="standard" />
								<div style={{ backgroundColor: "lightCyan" }}>
									<p>Alumnos inscriptos</p>
									{final.alumnosInscriptos.map((alumno, i) => {
										return (
											<div>
												<p>Alumno {i + 1}</p>
												<TextField key={alumno.dni} id="standard-basic" onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandlerInArrayComplex(e, "finales", "alumnosInscriptos", 'dni', i, setCurso, setIsShown)} defaultValue={alumno.dni} label={`DNI`} variant="standard" />
												<TextField key={alumno.nota} id="standard-basic" onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandlerInArrayComplex(e, "finales", "alumnosInscriptos", "nota", i, setCurso, setIsShown)} defaultValue={alumno.nota} label={`Nota`} variant="standard" />
												<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteAlumnosFinal(alumno, curso, final, setCurso, setIsShown) }}>
													<ClearIcon fontSize='small' ></ClearIcon>
												</IconButton>
											</div>
										)
									})
									}
								</div>
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteFinal(setCurso, curso.finales, setIsShown, i) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
								<IconButton color="primary" aria-label="crear fila" onClick={() => { handleCreateFinal(setCurso, setIsShown, curso.finales[curso.finales.length - 1].id) }}>
									<CreateIcon fontSize='small' />
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