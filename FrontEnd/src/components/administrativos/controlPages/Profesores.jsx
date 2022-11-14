import React, { useEffect, useState } from 'react'
import { Card, Select, MenuItem, FormControl, InputLabel, CardActions, CardContent, Grid, Skeleton, Box, Button, TextField, IconButton, Stack } from "@mui/material";
import { handleDeleteTitulo, handleCreateTitulo, changeObjectHandler, changeHandlerComplex, changeHandler, onEnter } from "../../utils/administrativos"
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers/';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { fetchGet, fetchPatch, fetchPost } from '../../utils/Fetch'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import ProfesorCard from "../../cards/ProfesorCardSecretario";
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/AddRounded';
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

export default function Profesors() {
	const [loading, setLoading] = useState(true);
	const [profesores, setProfesores] = useState([]);
	const [profesor, setProfesor] = useState({});
	const [titulos, setTitulos] = useState([]);
	const [cursos, setCursos] = useState([]);
	const [isShown, setIsShown] = useState(false);
	const [entre, setEntre] = useState(false);
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


	useEffect(() => {
		fetchGet(`profesores`)
			.then(response => response.json())
			.then(profesores => {
				setProfesores(profesores)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, []);

	useEffect(() => {
		if (Object.keys(profesor).length > 0 && !entre) {
			setEntre(true)
			fetchGet(`cursos`)
				.then(response => response.json())
				.then(cursos => {
					setTitulos(profesor.titulos)
					cursos.forEach(curso => {
						if (profesor.cursos.some(c => c.id === curso._id)) {
							setCursos(current => [...current, { nombre: `${curso.materia} ${curso.periodo.año}`, id: curso._id }])
						}
					})
				})
				.catch(error => {
					console.log(error)
				})
		}

	}, [profesor]);
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

	const handleClick = () => {//todo crear endpoint put en ves de patch
		let a = Object.assign({}, profesor)
		delete a._id
		fetchPatch(`profesores/${profesor._id}/`, a)
			.then(res => {
				setIsShown(false);
			})
			.catch(error => {
				console.log(error)
			})
	}

	//*---------------------------------------Vista base-------------------------------
	if (Object.keys(profesor).length === 0) {
		const createProfesorComponent = () => {
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
						<div>
							<MultipleInput valueSetter={setCreateValues} values={createValues.titulos} />
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

					<div style={{ display: "flex",  justifyContent: "center", width: "auto", height: "25%" }}>
						<Button style={{  bottom: 0, width: "auto" }} variant="outlined" startIcon={<CreateIcon />} onClick={() => { handleCreateCurso() }}>
							Crear
						</Button>
					</div>
				</div>
			)
		}
		const profesoresComponent = profesores.map((profesor, i) => {
			return <ProfesorCard key={profesor._id} setProfesor={setProfesor} profesor={profesor} />
		})
		const profesoresSkeleton = new Array(20).fill(<Variants />)

		const handleCreateClick = () => {
			setCardStyle(current => ({ ...current, height: "auto", width: "70vw", borderRadius: "0.5%", }))
			setChecked(false)
		}
		const handleCreateCurso = () => {
			const carreraElegida = [].find(elem => elem.nombre === createValues.carreras[0])
			const profesorBase =
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
				"rol": "profesor",
				"cursos": []

			}
			console.log(profesorBase)
			fetchPost(`profesores/`, profesorBase)
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
						{loading ? profesoresSkeleton : profesoresComponent}
					</Grid>
				</div>
				<div style={{ paddingLeft: "2%", paddingBottom: "1%" }}>
					<Card sx={cardStyle}>
						{!checked ? <CardContent sx={{ width: '100%', padding: "0" }}>{createProfesorComponent()}</CardContent> :
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
	// * Vista profesor

	else {
		return (
			<Box id="info">
								<IconButton sx={{float:"left"}} color="primary" aria-label="ir para atras" onClick={() => { setProfesor({}) }}>
					<ArrowBackRoundedIcon fontSize='large' />
				</IconButton>
				<div><TextField id="standard-basic" defaultValue={profesor.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "nombre", setProfesor, setIsShown)} label="Nombre" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "apellido", setProfesor, setIsShown)} label="Apellido" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "dni", setProfesor, setIsShown)} label="DNI" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.fechaNacimiento} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaNacimiento", setProfesor, setIsShown)} label="Fecha de Nacimiento" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.telefono} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "telefono", setProfesor, setIsShown)} label="Telefono" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "mail", setProfesor, setIsShown)} label="Mail" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.rol} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "rol", setProfesor, setIsShown)} label="Rol" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.fechaIngreso} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaIngreso", setProfesor, setIsShown)} label="Fecha de ingreso" variant="standard" /></div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>Datos de residencia</p>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "pais", setProfesor, setIsShown)} label="Pais de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.provincia} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "provincia", setProfesor, setIsShown)} label="Provincia de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "localidad", setProfesor, setIsShown)} label="Localidad de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.domicilio} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "domicilio", setProfesor, setIsShown)} label="Domicilio" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.codigoPostal} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "codigoPostal", setProfesor, setIsShown)} label="Codigo postal" variant="standard" /></div>
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>titulos</p>
					{titulos.map((titulo, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={titulo} onKeyPress={e => onEnter(e)} onBlur={e => changeHandlerComplex(e, "titulos", setTitulos, titulo, setProfesor, setIsShown, titulos)} label={`Titulo ${i + 1}`} variant="standard" />
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteTitulo(titulo, setIsShown, titulos, setProfesor, setTitulos) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>
						)
					})
					}
					<IconButton color="primary" aria-label="crear fila" onClick={() => { handleCreateTitulo(setProfesor, setTitulos, setIsShown, titulos) }}>
						<CreateIcon fontSize='small' />
					</IconButton>
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>Cursos</p>
					{cursos.map((cursoActivo, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={cursoActivo.nombre} inputProps={{ readOnly: true }} label={`Curso ${i + 1}`} variant="standard" />
							</div>
						)
					})
					}
				</div>
				{isShown && <Button variant="contained" onClick={handleClick}>Guardar cambios</Button>}
			</Box>
		)
	}
} 