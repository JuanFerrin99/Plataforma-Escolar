import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"
import { Outlet } from "react-router-dom";
import { Button, Card, CardActions, CardContent, Grid, Skeleton, Container } from "@mui/material";
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector } from '@mui/x-data-grid';
import { styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import CreateIcon from '@mui/icons-material/Create';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import AlumnoCard from "../../components/cards/AlumnoCard";
import "../../styles/bordes.css"
import { fetchGet, fetchPost, fetchPatch, fetchDelete } from '../../components/utils/Fetch'

//*------------------------------------ Componentes a guardar en otros archivos

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


//dibujo lindo de no hay rows
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

export default function CursoCard() {
    const gridRef = useRef();
    const [curso, setCurso] = useState({});
    const [alumnos, setAlumnos] = useState([]);

    const [evaluaciones, setEvaluaciones] = useState([]);
    const [rows, setRows] = useState([]);
    const [date, setDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [isPressedAsistencia, setIsPressedAsistencia] = useState(false);
    const [isPressedEvaluacion, setIsPressedEvaluacion] = useState(false);
    const [snackbar, setSnackbar] = React.useState(null);

    const location = useLocation()
    const id = location.state.idCurso
    let ausentes = []

    //* Llamada principal

    useEffect(() => {
        fetchGet(`cursos/${id}/`)
            .then(response => response.json())
            .then(curso => {
                setCurso(curso)
                setAlumnos(curso.alumnos)
                setEvaluaciones(curso.evaluaciones)
                setRows([])
                setDate(new Date())

                curso.alumnos.forEach((element) => {
                    setRows((oldState) => [...oldState, { "id": element.dni, "Apellido": element.apellido, "Nombre": element.nombre }])
                })

                setLoading(false)
            })
            .catch(error => {
                console.log(error)
            })
    }, []);

    //* Create evaluaciones
    const handleNewRow = () => {
        let copia = evaluaciones.slice()
        let evaluacion = {
            id: copia[copia.length - 1].id + 1,
            fecha: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
            tipo: " ",
        }
        copia.push(evaluacion)

        fetchPost(`cursos/${id}/evaluaciones/`, { "evaluacion": evaluacion })
            .then(res => {
                alumnos.forEach((alumno) => {
                    fetchPost(`cursos/${id}/alumnos/${alumno.dni}/calificaciones`, { "calificacion": { "id": evaluacion.id, "nota": "-" } })
                        .catch(error => {
                            console.log(error)
                        })
                })
                setEvaluaciones(copia)
            })
            .catch(error => {
                console.log(error)
            })
    }

    //* Patch evaluaciones

    const ProcessRowUpdate = (props) => {
        fetchPatch(`cursos/${id}/evaluaciones/${props.id}`, { "fecha": props.fecha, "tipo": props.tipo })
            .then(res => { //toDo checkear si lo encontro o no y cambiar el mensaje
                setSnackbar({ children: 'User successfully saved', severity: 'success' });
            })
            .catch(error => {
                console.log(error)
            })
    }

    //* Delete evaluaciones

    const renderDetailsButton = (params) => {
        return (
            <IconButton color="primary" aria-label="borrar" onClick={() => {
                fetchDelete(`cursos/${id}/evaluaciones/${params.row.id}`)
                    .then(res => {
                        alumnos.forEach((alumno) => {
                            fetchDelete(`cursos/${id}/alumnos/${alumno.dni}/calificaciones/${params.row.id}`)
                                .catch(error => {
                                    console.log(error)
                                })
                        })
                        if (res) {
                            let rows = evaluaciones.slice()
                            rows = rows.filter(row => row.id !== params.row.id)
                            setEvaluaciones(rows)
                            setSnackbar({ children: 'Evaluacion borrada', severity: 'error' });
                        }
                        else (alert("No se pudo borrar la evaluacion"))
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


    const handleProcessRowUpdateError = React.useCallback((error) => {
        setSnackbar({ children: error.message, severity: 'error' });
    }, []);

    //custom pagination
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


    const alumnosComponent = alumnos.map((alumno, i) => {
        return <AlumnoCard key={alumno._id} id={id} nombre={alumno.nombre} apellido={alumno.apellido} dni={alumno.dni} />
    })
    const alumnosSkeleton = new Array(20).fill(<Variants />)

    //* Vista Base

    if (isPressedAsistencia === false && isPressedEvaluacion === false) {
        return (
            <div>
                {curso.materia}
                <br />
                <br />
                <Button id="botonAsistencia" variant="contained" onClick={() => { setIsPressedAsistencia(true) }} endIcon={<AddIcon />}>
                    Tomar asistencia
                </Button>
                <Button id="botonParciales" variant="contained" onClick={() => { setIsPressedEvaluacion(true) }} endIcon={<AddIcon />}>
                    Parciales
                </Button>
                <br />
                <Grid container spacing={3}>
                    {loading ? alumnosSkeleton : alumnosComponent}
                </Grid>
                <Container>
                    <Outlet />
                </Container>
            </div>
        );
    }

    //* Vista Evaluaciones

    else if (isPressedEvaluacion === true) {
        const columns = [
            { field: 'fecha', headerName: 'Fecha', flex: 1, headerAlign: 'center', editable: true },
            { field: 'tipo', headerName: 'Tipo', flex: 1, headerAlign: 'center', editable: true },
            { field: 'boton', headerName: '', suppressRowClickSelection: true, flex: 0.1, headerAlign: 'center', renderCell: (e) => { return renderDetailsButton(e) } }
        ];
        const columnsFinal = [
            { field: 'fecha', headerName: 'Fecha', flex: 1, headerAlign: 'center' },
            { field: 'inicio', headerName: 'Inicio de inscripcion', flex: 1, headerAlign: 'center' },
            { field: 'final', headerName: 'Fin de inscripcion', flex: 1, headerAlign: 'center' }
        ];


        const handleCloseSnackbar = () => setSnackbar(null);
        return (
            <div style={{ height: "100vh", width: '100%' }}>
                <div style={{ width: '100%' }}>
                    <IconButton color="primary" aria-label="ir para atras" onClick={() => { window.location.href = "/profesor/curso" }}>
                        <ArrowBackRoundedIcon fontSize='large' />
                    </IconButton>
                    <IconButton color="primary" aria-label="crear fila" onClick={() => { handleNewRow() }}>
                        <CreateIcon fontSize='large' />
                    </IconButton>
                </div>
                <div style={{ height: '46%' }}>
                    <DataGrid
                        //?customizar cartel de rows selected =  https://stackoverflow.com/questions/65668602/react-material-ui-grid-footer-change (no se como borrarlo igual)
                        ref={gridRef}
                        rows={evaluaciones}
                        columns={columns}
                        pageSize={10}
                        enterMovesDown={true}
                        processRowUpdate={ProcessRowUpdate} //todo checker con onkeypress cuando aprete enter y desfocusear (codigo en secretario)
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
                <div style={{ height: '45%', width: "100%", bottom: "0%", position: "fixed" }}>
                    <p style={{ textAlign: "center", fontSize: "18px", backgroundColor: "lightGrey" }}>Finales</p>

                    <DataGrid
                        rows={curso.finales}
                        columns={columnsFinal}
                        pageSize={10}
                        enterMovesDown={true}
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
    //* Vista Asistencias
    else if (isPressedAsistencia === true) {
        const columns = [
            { field: 'Apellido', headerName: 'Apellido', flex: 1 },
            { field: 'Nombre', headerName: 'Nombre', flex: 1 },
        ];
        const diaCorrecto = () => {
            return curso.periodo.dias.includes(date.getDay())
        }
        const asitenciaNoTomada = () => {
            return curso.fechasAsistencia.includes(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
        }
        const functionClick = () => {
            if (diaCorrecto() && !asitenciaNoTomada()) {
                ausentes.map((id) => rows.find((row) => row.id === id)).forEach((alumno) => {
                    fetchPost("inasistencias/", {
                        "fecha": `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`,
                        "tipo": "Falta",
                        "motivo": " ",
                        "justificado":  "Injustificada",
                        "curso": id,
                        "materia": curso.materia,
                        "nombre": alumno.Nombre, 
                        "apellido": alumno.Apellido, 
                        "dni": alumno.dni,
                        "rol": "alumno"
                    })
                })
                fetchPost(`cursos/${id}/`, {
                    "fechasAsistencia": [`${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`]
                })
                    .then(data => {
                        window.history.go(-1); return false;
                    })
            }
            else {
                alert("No se pudo tomar asistencia")
            }
        }
        return (
            <div style={{ height: "94.9vh", width: '100%' }}>
                <IconButton color="primary" aria-label="ir para atras" onClick={() => { window.location.href = "/profesor/curso" }}>
                    <ArrowBackRoundedIcon fontSize='large' />
                </IconButton>
                <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flexGrow: 1 }}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={50}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            onSelectionModelChange={(ids) => ausentes = ids}
                        />
                    </div>
                </div>
                <button onClick={() => { functionClick() }}>Tomar asistencia</button>
            </div>
        );
    }
}