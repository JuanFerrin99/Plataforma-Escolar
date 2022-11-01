import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Grid, Skeleton, Box, Button, TextField, IconButton} from "@mui/material";
import { handleDeleteTitulo, handleDeleteAlt, handleDelete, handleCreate, handleCreateTitulo, changeObjectHandler, changeHandlerComplex, changeHandler, onEnter} from "../../utils/administrativos"
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
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

export default function Profesors() {
	const [loading, setLoading] = useState(true);
	const [profesores, setProfesores] = useState([]);
	const [profesor, setProfesor] = useState({});
	const [titulos, setTitulos] = useState([]);
	const [cursos, setCursos] = useState([]);
	const [isShown, setIsShown] = useState(false);
	const [entre, setEntre] = useState(false);

	useEffect(() => {
		fetchGet(`profesores`)
			.then(profesores => {
				setProfesores(profesores)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, []);

	useEffect(() => {
		if (Object.keys(profesor).length > 0 && !entre) {
			setEntre(true)
			fetch(`http://localhost:3001/cursos/`, { credentials: 'include' })
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

	const handleClick = () => {//todo crear endpoint put en ves de patch
		let a = Object.assign({}, profesor)
		delete a._id
		fetch(`http://localhost:3001/profesores/${profesor._id}/`, {
			credentials: "include",
			method: 'PATCH',
			headers: {
				'Accept': 'application/json, text/plain, */*',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(a)

		})
			.then(res => {
				setIsShown(false);
			})
			.catch(error => {
				console.log(error)
			})
	}
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
				go back button aca
				<div><TextField id="standard-basic" defaultValue={profesor.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "nombre",setProfesor, setIsShown)} label="Nombre" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.apellido} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "apellido",setProfesor, setIsShown)} label="Apellido" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.dni} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "dni",setProfesor, setIsShown)} label="DNI" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.fechaNacimiento} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaNacimiento",setProfesor, setIsShown)} label="Fecha de Nacimiento" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.telefono} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "telefono",setProfesor, setIsShown)} label="Telefono" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.mail} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "mail",setProfesor, setIsShown)} label="Mail" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.rol} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "rol",setProfesor, setIsShown)} label="Rol" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={profesor.fechaIngreso} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "fechaIngreso",setProfesor, setIsShown)} label="Fecha de ingreso" variant="standard" /></div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>Datos de residencia</p>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.pais} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "pais",setProfesor, setIsShown)} label="Pais de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.provincia} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "provincia",setProfesor, setIsShown)} label="Provincia de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.localidad} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "localidad",setProfesor, setIsShown)} label="Localidad de residencia" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.domicilio} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "domicilio",setProfesor, setIsShown)} label="Domicilio" variant="standard" /></div>
					<div><TextField id="standard-basic" defaultValue={profesor.datosResidencia.codigoPostal} onKeyPress={e => onEnter(e)} onBlur={e => changeObjectHandler(e, "datosResidencia", "codigoPostal",setProfesor, setIsShown)} label="Codigo postal" variant="standard" /></div>
				</div>
				<div style={{ backgroundColor: "lightgray" }}>
					<p>titulos</p>
					{titulos.map((titulo, i) => {
						return (
							<div>
								<TextField id="standard-basic" defaultValue={titulo} onKeyPress={e => onEnter(e)}  onBlur={e => changeHandlerComplex(e, "titulos", setTitulos,titulo,setProfesor, setIsShown,titulos)} label={`Titulo ${i + 1}`} variant="standard" />
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteTitulo(titulo, setIsShown,titulos, setProfesor, setTitulos) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>
						)
					})
					}
					<IconButton color="primary" aria-label="crear fila" onClick={() => { handleCreateTitulo(setProfesor, setTitulos,setIsShown, titulos) }}>
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