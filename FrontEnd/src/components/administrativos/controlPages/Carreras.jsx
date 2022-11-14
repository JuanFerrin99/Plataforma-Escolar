import React, { useEffect, useState } from 'react'
import { Card, ListItemText, Checkbox, OutlinedInput, Box, Select, FormControl, MenuItem, InputLabel, Typography, CardActions, CardContent, Grid, Skeleton, Fade, Button, TextField, IconButton } from "@mui/material";
import { handleDeleteMateria, handleCreateMateria, changeObjectHandler, changeHandlerComplex, changeHandler, onEnter } from "../../utils/administrativos"
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import CarreraCard from "../../cards/CarreraCardSecretario";
import { fetchGet, fetchPatch, fetchPost } from "../../utils/Fetch"
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import AddIcon from '@mui/icons-material/AddRounded';
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

export default function Carreras() {
	const [loading, setLoading] = useState(true);
	const [carreras, setCarreras] = useState([]);
	const [carrera, setCarrera] = useState({});
	const [isShown, setIsShown] = useState(false);
	const [materiasPosibles, setMateriasPosibles] = useState([]);
	const [materiasSeleccionadas, setMateriasSeleccionadas] = useState([]);
	const [materias, setMaterias] = useState([]);
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
		nombre: "",
		duracion: 0,
		tipo: "",
		materias: [],
	});

	const handleChange = (event, key) => {
		setCreateValues(current => ({ ...current, [key]: event.target.value }));
	};
	const handleChangeCheck = (event) => {
		const {
			target: { value },
		} = event;
		setMateriasSeleccionadas(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value,
		)
		setCreateValues(current => ({ ...current, "materias": typeof value === 'string' ? value.split(',') : value }));
	};


	useEffect(() => {
		fetchGet(`carreras`)
			.then(response => response.json())
			.then(carreras => {
				setCarreras(carreras)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, []);


	const handleClick = () => {
		let a = Object.assign({}, carrera)
		delete a._id
		fetchPatch(`carreras/${carrera._id}/`, a)
			.then(res => {
				setIsShown(false);
			})
			.catch(err => console.log(err))
	}

	
	// * ----------------------------------------------------------Vista base
	
	if (Object.keys(carrera).length === 0) {
		const carrerasComponent = carreras.map((carrera, i) => {
			return <CarreraCard key={carreras._id} carrera={carrera} setCarrera={setCarrera} setMaterias={setMaterias} setCarreras={setCarreras} />
		})
		const carrerasSkeleton = new Array(20).fill(<Variants />)

		const handleCreateClick = () => {
			fetchGet(`materias/`)
				.then(response => response.json())
				.then(materias => {
					setMateriasPosibles(materias.map(mat => mat.nombre))
					setLoading(false)
				})
				.catch(err => console.log(err))

			setCardStyle(current => ({ ...current, height: "60vh", width: "32vw", borderRadius: "0.5%", }))
			setChecked(false)
		}
		const handleCreateCurso = () => {
			console.log(createValues.materias)
			let carreraBase =
			{
				nombre: createValues.nombre,
				duracion: createValues.duracion,
				tipo: createValues.tipo,
				materias: createValues.materias,
			}
			fetchPost(`carreras/`, carreraBase)
				.then(res => {
					setIsShown(false);
				})
				.catch(err => console.log(err))
			setChecked(true)
			setCardStyle(current => ({ ...current, height: "6vh", width: "6vh", borderRadius: "20%" }))
		}

		const createCursoComponent = () => {//todo gettear todas las materias del back en ves de hardcodearlas
			return (
				<div style={{ height: "100%", width: '100%' }}>

					<Box sx={{ width: "30vw", margin: " 7% 0% 2.5%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
						<div><TextField id="standard-basic" onBlur={e => (setCreateValues(current => ({ ...current, "nombre": e.target.value })))} label="Nombre" variant="standard" /></div>
						</FormControl>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
						<div><TextField id="standard-basic" onBlur={e => (setCreateValues(current => ({ ...current, "duracion": e.target.value })))} label="Duracion" variant="standard" /></div>
						</FormControl>
					</Box>

					<Box sx={{ width: "30vw", margin: "3% 0%", float: "left" }}>
						<FormControl sx={{ width: '12vw', margin: "0 3%" }}>
							<InputLabel id="demo-simple-select-label">Tipo</InputLabel>
							<Select
								labelId="demo-simple-select-label"
								id="demo-simple-select"
								value={createValues.tipo}
								label="Tipo"
								onChange={(e) => handleChange(e, 'tipo')}
							>
								<MenuItem value={"carrea"}>Carrera</MenuItem>
								<MenuItem value={"curso"}>Curso</MenuItem>
							</Select>
						</FormControl>
						<FormControl sx={{ width: '100%', margin: "0 3%" }}>
							<InputLabel id="demo-multiple-checkbox-label">Dias</InputLabel>
							<Select
								labelId="demo-multiple-checkbox-label"
								id="demo-multiple-checkbox"
								multiple
								value={createValues.materias}
								onChange={handleChangeCheck}
								input={<OutlinedInput label="Tag" />}
								renderValue={(selected) => selected.join(', ')}
								MenuProps={MenuProps}
							>
								{materiasPosibles.map((materia) => (	
									<MenuItem key={materia} value={materia}>
										<Checkbox checked={materiasSeleccionadas.indexOf(materia) > -1} />
										<ListItemText primary={materia} />
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
				</div>
			)
		}
		return (
			<div>
				<div>
					<Grid width={"85.5vw"} container spacing={3}>
						{loading ? carrerasSkeleton : carrerasComponent}
					</Grid>
				</div>
				<div style={{ paddingLeft: "2%" }}>
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

	// * Vista profesor

	else {
		return (
			<Box id="info">
								<IconButton sx={{float:"left"}} color="primary" aria-label="ir para atras" onClick={() => { setCarrera({}) }}>
					<ArrowBackRoundedIcon fontSize='large' />
				</IconButton>
				<div><TextField id="standard-basic" defaultValue={carrera.nombre} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "nombre", setCarrera, setIsShown)} label="Nombre" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={carrera.duracion} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "duracion", setCarrera, setIsShown)} label="Duracion" variant="standard" /></div>
				<div><TextField id="standard-basic" defaultValue={carrera.tipo} onKeyPress={e => onEnter(e)} onBlur={e => changeHandler(e, "tipo", setCarrera, setIsShown)} label="Tipo" tipoiant="standard" /></div>

				<div style={{ backgroundColor: "lightgray" }}>
					<p>materias</p>
					{materias.map((materia, i) => {
						return (
							<div>
								<TextField key={materia} id="standard-basic" defaultValue={materia} onKeyPress={e => onEnter(e)} onBlur={e => changeHandlerComplex(e, "materias", setMaterias, materia, setCarrera, setIsShown, materias)} label={`Materia ${i + 1}`} variant="standard" />
								<IconButton color="primary" aria-label="borrar" onClick={() => { handleDeleteMateria(materia, setIsShown, materias, setCarrera, setMaterias) }}>
									<ClearIcon fontSize='small' ></ClearIcon>
								</IconButton>
							</div>
						)
					})
					}
					<IconButton color="primary" aria-label="crear fila" onClick={() => { handleCreateMateria(setCarrera, setMaterias, setIsShown, materias) }}>
						<CreateIcon fontSize='small' />
					</IconButton>
				</div>
				{isShown && <Button variant="contained" onClick={handleClick}>Guardar cambios</Button>}

			</Box>
		)

	}
} 