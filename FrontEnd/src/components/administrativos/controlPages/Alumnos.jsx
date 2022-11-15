import React, { useEffect, useState } from 'react'
import { Card, Select, MenuItem, FormControl, InputLabel, CardActions, CardContent, Grid, Skeleton, Box, Button, TextField, IconButton, Divider } from "@mui/material";
import { handleDeleteTitulo, handleDeleteAlt, handleDelete, handleCreate, handleCreateTitulo, changeObjectHandler, changeHandlerComplex, changeHandler, onEnter } from "../../utils/administrativos"
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AlumnoCard from "../../cards/AlumnoCardSecretario";
import { fetchGet, fetchPatch, fetchPost } from '../../utils/Fetch'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AddIcon from '@mui/icons-material/AddRounded';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "../../../styles/administrativos/alumnos.css"
import MultipleInput from "../../utils/MultipleInput"
import { height } from '@mui/system';

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
	const [carrerasTodas, setCarrerasTodas] = useState([]);
	const [alumno, setAlumno] = useState({});
	const [isShown, setIsShown] = useState(false);
	const [entre1, setEntre1] = useState(false);
	const [entre2, setEntre2] = useState(false);
	const [loading, setLoading] = useState(true);
	const [diasSeleccionados, setDiasSeleccionados] = useState([]);
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
		nombre: '',
		apellido: '',
		dni: null,
		mail: '',
		telefono: null,
		fechaNacimiento: null,
		datosNacimiento: {
			pais: '',
			localidad: '',
		},
		fechaIngreso: null,
		carreras: [''],
		titulos: [],
		datosResidencia: {
			pais: '',
			provincia: '',
			localidad: '',
			domicilio: '',
			codigoPostal: null
		}
	});

	const handleChange = (event, key) => {
		setCreateValues(current => ({ ...current, [key]: event.target.value }));
	};
	const handleChangeNested = (event, firstKey, secondkey) => {
		setCreateValues(current => ({ ...current, [firstKey]: { ...current[firstKey], [secondkey]: event.target.value } }));
	};
	const handleChangeCheck = (event, key) => {
		const {
			target: { value },
		} = event;
		setCreateValues(current => ({ ...current, [key]: typeof value === 'string' ? value.split(',') : value }));
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
					console.log(carreras)
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
				<div style={{ height: "100%", width: '85%', margin: "0 7.5%" }}>

					<Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "3vh 0%", height: "auto" }}>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} id="outlined-basic" value={createValues.nombre} label="Nombre" onChange={(e) => handleChange(e, 'nombre')} variant="outlined" />
							</FormControl></div>

						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} id="outlined-basic" value={createValues.apellido} label="Apellido" onChange={(e) => handleChange(e, 'apellido')} variant="outlined" />
							</FormControl></div>

						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.dni} label="DNI" onChange={(e) => handleChange(e, 'dni')} variant="outlined" />
							</FormControl></div>

						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Stack spacing={3}>
										<DatePicker
											inputProps={{ min: 0, style: { marginLeft: '1vw' } }}
											disableFuture
											label="Fecha de nacimiento"
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
							</FormControl></div>
					</Box>

					<Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "3vh 0", height: "auto" }}>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>

							<FormControl>
								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.mail} label="Mail" onChange={(e) => handleChange(e, 'mail')} variant="outlined" />
							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>

							<FormControl>

								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.telefono} label="Telefono" onChange={(e) => handleChange(e, 'telefono')} variant="outlined" />
							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>

							<FormControl>

								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosNacimiento.pais} label="Pais de nacimiento" onChange={(e) => handleChangeNested(e, "datosNacimiento", 'pais')} variant="outlined" />

							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>

							<FormControl>

								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosNacimiento.localidad} label="Pais de localidad" onChange={(e) => handleChangeNested(e, "datosNacimiento", 'localidad')} variant="outlined" />

							</FormControl>
						</div>
					</Box>
					<Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "3vh 0", height: "auto" }}>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosResidencia.pais} label="pais" onChange={(e) => handleChangeNested(e, 'datosResidencia', 'pais')} variant="outlined" />
							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosResidencia.provincia} label="provincia" onChange={(e) => handleChangeNested(e, 'datosResidencia', 'provincia')} variant="outlined" />
							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosResidencia.localidad} label="localidad" onChange={(e) => handleChangeNested(e, 'datosResidencia', 'localidad')} variant="outlined" />
							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vwvw", float: "left" }}>
							<FormControl>
								<TextField id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosResidencia.domicilio} label="domicilio" onChange={(e) => handleChangeNested(e, 'datosResidencia', 'domicilio')} variant="outlined" />
							</FormControl>
						</div>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl>
								<TextField size={'small'} id="outlined-basic" sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }} value={createValues.datosResidencia.codigoPostal} label="codigoPostal" onChange={(e) => handleChangeNested(e, 'datosResidencia', 'codigoPostal')} variant="outlined" />
							</FormControl>
						</div>
					</Box>

					<Box sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "3vh 0", height: "auto" }}>
						<div style={{ width: 'auto', padding: "0 1.5vw", float: "left" }}>
							<FormControl sx={{ "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }}>
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Stack spacing={3}>
										<DatePicker
											disableFuture
											label="Fecha de ingreso"
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
						</div>
						<div style={{ width: '25%', padding: "0 1.5vw", float: "left" }}>
							<FormControl sx={{ width: "100% " }}>
								<InputLabel id="demo-simple-select-label">Carrera</InputLabel>
								<Select
									sx={{ width: "100% ", "& .MuiInputBase-root": { height: "auto", "padding": "0.6vw 0.5vw" } }}
									labelId="demo-simple-select-label"
									id="demo-simple-select"
									value={createValues.carrera}
									label="Carrera"
									onChange={(e) => handleChangeCheck(e, 'carreras')}>
									{carrerasTodas.map((carrera) => {
										return <MenuItem value={carrera.nombre}>{carrera.nombre}</MenuItem>
									}
									)}
								</Select>
							</FormControl>
						</div>
						<div>
							<MultipleInput valueSetter={setCreateValues} values={createValues.titulos} />
						</div>
					</Box>

					<div style={{ display: "flex", position: "relative", justifyContent: "center", width: "29vw", height: "25%" }}>
						<Button style={{ position: "absolute", bottom: 0, width: "20vw" }} variant="outlined" startIcon={<CreateIcon />} onClick={() => { handleCreateCurso() }}>
							Crear
						</Button>
					</div>
				</div>
			)
		}
		const alumnosComponent = alumnos.map((alumno, i) => {
			return <AlumnoCard key={alumno._id} setAlumno={setAlumno} alumno={alumno} />
		})

		const alumnosSkeleton = new Array(20).fill(<Variants />)

		const handleCreateClick = () => {

			fetchGet(`carreras/`)
				.then(response => response.json())
				.then(carreras => {
					setCarrerasTodas(carreras)
				})
				.catch(error => {
					console.log(error)
				})

			setCardStyle(current => ({ ...current, height: "auto", width: "60vw", borderRadius: "0.5%", }))
			setChecked(false)
		}
		const handleCreateCurso = () => {
			const carreraElegida = carrerasTodas.find(elem => elem.nombre === createValues.carreras[0])
			const alumnoBase =
			{
				"nombre": createValues.nombre,
				"apellido": createValues.apellido,
				"dni": createValues.dni,
				"fechaNacimiento": `${createValues.fechaNacimiento.$y}-${(`0`+ createValues.fechaNacimiento.$M).slice(-2)}-${(`0` + createValues.fechaNacimiento.$D).slice(-2)}`,
				"telefono": createValues.telefono,
				"mail": createValues.mail,
				"titulos": createValues.titulos,
				"datosResidencia": {
					"pais": createValues.datosResidencia.pais,
					"provincia": createValues.datosResidencia.provincia,
					"localidad": createValues.datosResidencia.localidad,
					"domicilio": createValues.datosResidencia.domicilio,
					"codigoPostal": createValues.datosResidencia.codigoPostal
				},
				"fechaIngreso": `${createValues.fechaIngreso.$y}-${(`0`+ createValues.fechaIngreso.$M).slice(-2)}-${(`0` + createValues.fechaIngreso.$D).slice(-2)}`,
				"rol": "alumno",
				"datosNacimiento": {
					"pais": createValues.datosNacimiento.pais,
					"localidad": createValues.datosNacimiento.localidad
				},
				"cursosActivos": [],
				"carrera": [
					{
						"nombre": carreraElegida.nombre,
						"duracion": carreraElegida.duracion,
						"materias": carreraElegida.materias,
						"tipo": carreraElegida.tipo
					}
				]

			}
			fetchPost(`alumnos/`, alumnoBase)
				.then(res => {
					setIsShown(false);
					setChecked(true)
					setCardStyle(current => ({ ...current, height: "6vh", width: "6vh", borderRadius: "20%" }))
				})
				.catch(err => console.log(err))
		}
		//*--------------------------------------------return.-----------------------------
		return (
			<div style={{ paddingTop: "3%", paddingLeft: "3%", width: "auto" }}>
				<div>
					<Grid width={"auto"} container spacing={1}>
						{loading ? alumnosSkeleton : alumnosComponent}
					</Grid>
				</div>
				<div style={{ paddingLeft: "2%", paddingBottom: "1%" }}>
					<Card sx={cardStyle}>
						{!checked ? <CardContent sx={{ width: '100%', padding: "0" }}>{createAlumnoComponent()}</CardContent> :
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
				<IconButton sx={{float:"left"}} color="primary" aria-label="ir para atras" onClick={() => { setAlumno({}) }}>
					<ArrowBackRoundedIcon fontSize='large' />
				</IconButton>
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
