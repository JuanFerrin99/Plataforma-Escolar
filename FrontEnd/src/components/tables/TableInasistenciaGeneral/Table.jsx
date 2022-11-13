import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import Pagination from '@mui/material/Pagination';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CreateIcon from '@mui/icons-material/Create';
import ClearIcon from '@mui/icons-material/Clear';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { fetchPatch, fetchDelete, fetchPost, fetchGet } from '../../utils/Fetch'

//*dibujo lindo de no hay rows
const StyledGridOverlay = styled('div')(({ theme }) => ({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	height: '100%',
	'& .ant-empty-img-1': {
		fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
	},
	'& .ant-empty-img-2': {
		fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
	},
	'& .ant-empty-img-3': {
		fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
	},
	'& .ant-empty-img-4': {
		fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
	},
	'& .ant-empty-img-5': {
		fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
		fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
	},
}));

//* pasa pagina custom
function CustomNoRowsOverlay() {
	return (
		<StyledGridOverlay>
			<svg
				width="120"
				height="100"
				viewBox="0 0 184 152"
				aria-hidden
				focusable="false"
			>
				<g fill="none" fillRule="evenodd">
					<g transform="translate(24 31.67)">
						<ellipse
							className="ant-empty-img-5"
							cx="67.797"
							cy="106.89"
							rx="67.797"
							ry="12.668"
						/>
						<path
							className="ant-empty-img-1"
							d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
						/>
						<path
							className="ant-empty-img-2"
							d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
						/>
						<path
							className="ant-empty-img-3"
							d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
						/>
					</g>
					<path
						className="ant-empty-img-3"
						d="M149.121 33.292l-6.83 2.65ax1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
					/>
					<g className="ant-empty-img-4" transform="translate(149.65 15.383)">
						<ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
						<path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
					</g>
				</g>
			</svg>
			<Box sx={{ mt: 1 }}>No Rows</Box>
		</StyledGridOverlay>
	);
}

export default function TableInasistencias(props) {
	const [snackbar, setSnackbar] = useState(null);
	const [faltas, setFaltas] = useState([]);
	const [cursos, setCursos] = useState([]);
	const [s, setS] = useState(true);
	const gridRef = useRef();


	useEffect(() => {
		if (s) { //toDO checkear que si al estar la coleccion esta vacia que no se quede cargando infinitamente y consuma mucho
			setFaltas(props.inasistencias)
			if (faltas.length === 0) { return undefined }
			else { setS(false) }
		}
	});

	useEffect(()=>{
		fetchGet('cursos')
			.then(response => response.json())
			.then(cursos =>setCursos(cursos))
			.catch(err => console.log(err))
	},[])

	//* Patch faltas
	const ProcessRowUpdate = (props) => {
	console.log(cursos.find(elem => elem.materia === props.materia))
		fetchPatch(`inasistencias/${props._id}`, {
			tipo: props.tipo,
			motivo: props.motivo,
			justificado: props.justificado,
			curso: cursos.find(elem => elem.materia === props.materia)._id,
			materia: props.materia,
			dni: props.dni,
			rol: props.rol
		})
			.then(res => { //toDo checkear si lo encontro o no y cambiar el mensaje
				setSnackbar({ children: 'User successfully saved', severity: 'success' });
			})
			.catch(error => {
				console.log(error)
			})
	}

	//* Delete faltas
	const renderDetailsButton = (params) => {
		return (
			<IconButton color="primary" aria-label="borrar" onClick={() => {
				fetchDelete(`inasistencias/${params.row._id}`) //toDo checkear si lo encontro o no y cambiar el mensaje
					.then(res => {
						if (res) {
							let rows = faltas.slice()
							rows = rows.filter(row => row._id !== params.row._id)
							setFaltas(rows)
							setSnackbar({ children: 'Inasistencia borrada', severity: 'error' });
						}
						else (alert("No se pudo borrar la inasistencia"))
					})
					.catch(error => {
						console.log(error)
					})
			}}>
				<ClearIcon
					fontSize="medium"
				//style={{ marginLeft: 16 }}
				>
				</ClearIcon>
			</IconButton>


		)
	}
	//* Post faltas
	const handleNewRow = () =>{ 
		 fetchPost('inasistencias', 		{
				"fecha": new Date().toJSON().slice(0, 10),
				"tipo": "",
				"motivo": "",
				"justificado": "",
				"curso": "",
				"materia": "",
				"dni": null,
				"rol": ""
			  }
			)
			.then(res => {
				setFaltas(current => [...current, {...res, _id:res._id}])
			})
	}
	//*snackbar error
	const handleProcessRowUpdateError = React.useCallback((error) => {
		setSnackbar({ children: error.message, severity: 'error' });
	}, []);

	//*cerrar snackbar
	const handleCloseSnackbar = () => setSnackbar(null);


	//*custom pagination
	function CustomPagination(newRow) {
		const apiRef = useGridApiContext();
		const page = useGridSelector(apiRef, gridPageSelector);
		const pageCount = useGridSelector(apiRef, gridPageCountSelector);
		return (
			//?import AddIcon from '@mui/icons-material/Add';
			<div style={{ width: "100%" }}>
				<div style={{ float: "right", padding: "8px" }}>
					<Pagination
						color="primary"
						count={pageCount}
						page={page + 1}
						onChange={(event, value) => apiRef.current.setPage(value - 1)}
					/>
				</div>

			</div>

		);
	}

	//* rows y columns
	const columns = [
		{ field: 'fecha', headerName: 'Fecha', flex: 1, editable: false },
		{ field: 'tipo', headerName: 'Tipo', flex: 1, editable: true },
		{ field: 'justificado', headerName: 'Justificado', flex: 1, editable: true },
		{ field: 'motivo', headerName: 'Motivo', flex: 1, editable: true },
		{ field: 'rol', headerName: 'Rol', flex: 1, editable: true },
		{ field: 'dni', headerName: 'Dni de ausente', flex: 1, editable: true },
		{ field: 'materia', headerName: 'Materia', flex: 1, editable: true },
		{ field: 'boton', headerName: '', suppressRowClickSelection: true, flex: 0.1, renderCell: (e) => { return renderDetailsButton(e) } }
	];
	//*  Return
	return (
		<div style={{ height: "100%", width: '100%' }}>

			<div style={{ width: '100%' }}>
				<IconButton color="primary" aria-label="ir para atras" onClick={() => { window.location.href = "/profesor/curso" }}>
					<ArrowBackRoundedIcon fontSize='large' />
				</IconButton>
				<IconButton color="primary" aria-label="crear fila" onClick={handleNewRow}>
					<CreateIcon fontSize='large' />
				</IconButton>
			</div>

			<div style={{ height: '100%' }}>
				<DataGrid
					ref={gridRef}
					rows={faltas}
					columns={columns}
					getRowId={(row) => row._id} 
					pageSize={10}
					enterMovesDown={true}
					processRowUpdate={ProcessRowUpdate}
					onProcessRowUpdateError={handleProcessRowUpdateError}
					components={{
						Pagination: CustomPagination,
						NoRowsOverlay: CustomNoRowsOverlay
					}}
					experimentalFeatures={{ newEditingApi: true }}
				/>
				{!!snackbar && (
					<Snackbar
						open
						anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
						onClose={handleCloseSnackbar}
						autoHideDuration={6000}
					>
						<Alert {...snackbar} onClose={handleCloseSnackbar} />
					</Snackbar>
				)}
			</div>

		</div>
	);
}