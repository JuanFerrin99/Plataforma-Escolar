import React, { useEffect, useState } from 'react'
import { Card, Select,MenuItem,FormControl, InputLabel,CardActions, CardContent, Grid, Skeleton, Box, Button, TextField, IconButton, Divider } from "@mui/material";
import { handleDeleteTitulo, handleDeleteAlt, handleDelete, handleCreate, handleCreateTitulo, changeObjectHandler, changeHandlerComplex, changeHandler, onEnter } from "../../utils/administrativos"
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AlumnoCard from "../../cards/AlumnoCardSecretario";
import { fetchGet, fetchPatch, fetchPost } from '../../utils/Fetch'
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddIcon from '@mui/icons-material/AddRounded';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../../styles/administrativos/alumnos.css"
import MultipleInput from "../../utils/MultipleInput"

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
	const [diasSeleccionados, setDiasSeleccionados] = useState([]);
	const [checked, setChecked] = useState(false);
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
		nombre: "",
		apellido: "",
		dni: 0,
		mail: "",
		telefono: 0,
		fechaNacimiento: [],
		datosNacimiento: {
			pais: "",
			localidad: "",
		},
		fechaIngreso: "",
		carreras: [],
		titulos: [],
		datosResidencia: {
			pais: "",
			provincia: "",
			localidad: "",
			domicilio: "",
			codigoPostal: 0
		}
	});

	const handleChange = (event, key) => {
		setCreateValues(current => ({ ...current, [key]: event.target.value }));
	};
	const handleChangeNested = (event, firstKey, secondkey) => {
		setCreateValues(current => ({ ...current, [firstKey]:{...current.firstKey, [secondkey]:event.target.value} }));
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


	const handleClick = () => {
		let a = Object.assign({}, alumno)
		delete a._id
		fetchPatch(`alumnos/${alumno._id}/`, a)
			.then(res => {
				setIsShown(current => false);
			})
			.catch(error => {
				console.log(error)
			})
	}

	//* fetch base
	useEffect(() => {
		fetchGet(`alumnos/`)
			.then(response => response.json())
			.then(alumnos => {
				setAlumnos(alumnos)
				setLoading(false)
			})
			.catch(error => {
				console.log(error)
			})
	}, []);
	//* cursos
	useEffect(() => {
		if (Object.keys(alumno).length > 0 && !entre1) {
			setEntre1(true)
			fetchGet(`cursos/`)
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
	//* carreras
	useEffect(() => {
		if (Object.keys(alumno).length > 0 && !entre2) {
			setEntre2(true)
			fetchGet(`carreras/`)
				.then(response => response.json())
				.then(carreras => {
					setTitulos(alumno.titulos)
					alumno.carreras.forEach(carreraAlumno => {
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


	//*---------------------------------------Vista base-------------------------------

	if (Object.keys(alumno).length === 0) {
		const createAlumnoComponent = () => {
			return (
				<div style={{ height: "100%", width: '100%', overflow: "visible" }}>
					<Box sx={{ width: "30vw", margin: " 7% 0% 2.5%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Nombre</InputLabel>
							<TextField id="outlined-basic" value={createValues.nombre} label="Nombre" onChange={(e) => handleChange(e, 'nombre')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Apellido</InputLabel>
							<TextField id="outlined-basic" value={createValues.apellido} label="Apellido" onChange={(e) => handleChange(e, 'apellido')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">DNI</InputLabel>
							<TextField id="outlined-basic" value={createValues.dni} label="DNI" onChange={(e) => handleChange(e, 'dni')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Fecha de nacimiento</InputLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<DatePicker
										disableFuture
										label="Fecha de nacimiento<"
										openTo="year"
										views={['year', 'month', 'day']}
										value={createValues.fechaNacimiento}
										onChange={(newValue) => {
											setCreateValues(current => ({ ...current, fechaNacimiento: newValue }));
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</Stack>
							</LocalizationProvider>
						</FormControl>
					</Box>

					<Box sx={{ width: "30vw", margin: " 7% 0% 2.5%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Mail</InputLabel>
							<TextField id="outlined-basic" value={createValues.mail} label="Mail" onChange={(e) => handleChange(e, 'mail')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Telefono</InputLabel>
							<TextField id="outlined-basic" value={createValues.telefono} label="Telefono" onChange={(e) => handleChange(e, 'telefono')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Pais de nacimiento</InputLabel>
							<TextField id="outlined-basic" value={createValues.datosNacimiento.pais} label="Pais de nacimiento" onChange={(e) => handleChangeNested(e, "datosNacimiento",'pais')} variant="outlined" />

						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Localidad de nacimiento</InputLabel>
							<TextField id="outlined-basic" value={createValues.datosNacimiento.localidad} label="Pais de localidad" onChange={(e) => handleChangeNested(e, "datosNacimiento",'localidad')} variant="outlined" />

						</FormControl>
					</Box>

					<Box sx={{ width: "30vw", margin: " 7% 0% 2.5%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Fecha de ingreso</InputLabel>
							<LocalizationProvider dateAdapter={AdapterDayjs}>
								<Stack spacing={3}>
									<DatePicker
										disableFuture
										label="Fecha de ingreso<"
										openTo="year"
										views={['year', 'month', 'day']}
										value={createValues.fechaIngreso}
										onChange={(newValue) => {
											setCreateValues(current => ({ ...current, fechaIngreso: newValue }));
										}}
										renderInput={(params) => <TextField {...params} />}
									/>
								</Stack>
							</LocalizationProvider>
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Carrera</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={createValues.carreras}
								label="Materia"
								onChange={(e) => handleChangeCheck(e, 'carreras')}>
								{carreras.map((carrera) => (
									<MenuItem value={carrera.nombre}>{carrera.nombre}</MenuItem>
								))}
							</Select>
						</FormControl>
						<MultipleInput valueSetter = {setCreateValues} values= {createValues.titulos}/>
					</Box>					
					<Box sx={{ width: "30vw", margin: " 7% 0% 2.5%", float: "left" }}>
						<FormControl sx={{ width: '6vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Pais de residencia</InputLabel>{/*smoll*/}
							<TextField id="outlined-basic" value={createValues.datosResidencia.pais} label="pais" onChange={(e) => handleChangeNested(e, 'datosResidencia','pais')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Provincia de residencia</InputLabel>
							<TextField id="outlined-basic" value={createValues.datosResidencia.provincia} label="provincia" onChange={(e) => handleChangeNested(e, 'datosResidencia','provincia')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Localidad de residencia</InputLabel>
							<TextField id="outlined-basic" value={createValues.datosResidencia.localidad} label="localidad" onChange={(e) => handleChangeNested(e, 'datosResidencia','localidad')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Domicilio de residencia</InputLabel>
							<TextField id="outlined-basic" value={createValues.datosResidencia.domicilio} label="domicilio" onChange={(e) => handleChangeNested(e, 'datosResidencia','domicilio')} variant="outlined" />
						</FormControl>
						<FormControl sx={{ width: '6vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Codigo postal de residencia</InputLabel>{/*smoll*/}
							<TextField id="outlined-basic" value={createValues.datosResidencia.codigoPostal} label="codigoPostal" onChange={(e) => handleChangeNested(e, 'datosResidencia','codigoPostal')} variant="outlined" />
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
		const alumnosComponent = alumnos.map((alumno, i) => {
			return <AlumnoCard key={alumno._id} setAlumno={setAlumno} alumno={alumno} />
		})

		const alumnosSkeleton = new Array(20).fill(<Variants />)

		const handleCreateClick = () => {
			setCardStyle(current => ({ ...current, height: "70vh", width: "70vw", borderRadius: "0.5%", }))
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
		//*--------------------------------------------return.-----------------------------
		return (
			<div style={{ paddingTop: "3%", paddingLeft: "3%", width: "auto" }}>
				<div>
					<Grid width={"auto"} container spacing={1}>
						{loading ? alumnosSkeleton : alumnosComponent}
					</Grid>
				</div>
				<div style={{ paddingLeft: "2%", paddingBottom: "1%", overflow: "auto" }}>
					<Card sx={cardStyle}>
						{!checked ?
							<CardContent sx={{ height: "100%", width: '100%' }}>{createAlumnoComponent()}</CardContent>
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
	//* ---------------------------------------------------------Vista curso-------------------------------------------------------------------------
	else {//todo boton para atars
		return (
			<Box id="info">
				goback button aca
				<div><TextField id="standard-basic" defaultValue={alumno.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "nombre", setAlumno, setIsShown)} label="Nombre" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "apellido", setAlumno, setIsShown)} label="Apellido" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "dni", setAlumno, setIsShown)} label="DNI" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.fechaNacimiento} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaNacimiento", setAlumno, setIsShown)} label="Fecha de Nacimiento" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.telefono} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "telefono", setAlumno, setIsShown)} label="Telefono" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "mail", setAlumno, setIsShown)} label="Mail" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.rol} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "rol", setAlumno, setIsShown)} label="Rol" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={alumno.fechaIngreso} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaIngreso", setAlumno, setIsShown)} label="Fecha de ingreso" variant="standard" /></div>

				<div style={{ backgroundColor: "lightgray" }}>
					<p>Datos de nacimiento</p>
					<div><TextField id="standard-basic" defaultValue={alumno.datosNacimiento.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosNacimiento", "pais", setAlumno, setIsShown)} label="Pais de nacimiento" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosNacimiento.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosNacimiento", "localidad", setAlumno, setIsShown)} label="Localidad de nacimiento" variant="standard" /></div>
				</div>


				<div style={{ backgroundColor: "lightgray" }}>
					<p>Datos de residencia</p>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "pais", setAlumno, setIsShown)} label="Pais de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.provincia} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "provincia", setAlumno, setIsShown)} label="Provincia de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "localidad", setAlumno, setIsShown)} label="Localidad de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.domicilio} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "domicilio", setAlumno, setIsShown)} label="Domicilio" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={alumno.datosResidencia.codigoPostal} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "codigoPostal", setAlumno, setIsShown)} label="Codigo postal" variant="standard" /></div>
				</div>

				<div style={{ backgroundColor: "lightgray" }}>
					<p>titulos</p>
					{titulos.map((titulo, i) => {
						return (
							<div>
								<TextField key={titulo} id="standard-basic" defaultValue={titulo} onKeyPress={e => onEnter(e)} onBlur={e => changeHandlerComplex(e, "titulos", setTitulos, titulo, setAlumno, setIsShown, titulos)} label={`Titulo ${i + 1}`} variant="standard" />
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteTitulo(titulo, setIsShown, titulos, setAlumno, setTitulos) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>
						)
					})
					}
					<IconButton color="primary" aria-label="crear fila" onClick={() => { handleCreateTitulo(setAlumno, setTitulos, setIsShown, titulos) }}>
						<CreateIcon fontSize='small' />
					</IconButton>
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>cursos activos</p>
					{cursosActivos.map((cursoActivo, i) => {
						return (
							<div><TextField key={cursoActivo.nombre} id="standard-basic" defaultValue={cursoActivo.nombre} inputProps={{ readOnly: true }} label={`Curso ${i + 1}`} variant="standard" />
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteAlt(cursoActivo, "cursosActivos", setCursosActivos, setAlumno, cursosActivos, setIsShown) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>)
					})}

					{/*<IconButton color="primary" aria-label="crear fila" onClick={()=>{handleCreate("cursosActivos",setCursosActivos,cursosActivos)}}>
						<CreateIcon fontSize='small' />
					</IconButton>*/}
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
