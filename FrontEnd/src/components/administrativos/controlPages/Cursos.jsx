import React, { useEffect, useState } from 'react'
import { Card, CardActions, CardContent, Grid, Skeleton } from "@mui/material";
import { fetchGet } from "../../utils/Fetch"
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

export default function Alumnos() {
	const [cursos, setCursos] = useState([]);
	const [curso, setCurso] = useState({});
	const [loading, setLoading] = useState(true);

	//* Fetch Principal
	useEffect(() => {
		fetchGet(`cursos`)
			.then(cursos => {
				setCursos(cursos)
				setLoading(false)
			})
			.catch(err => console.log(err))
	}, []);

	
	//*------------------------------------Vista Base--------------------------------------------

	if (Object.keys(curso).length === 0) {
		const cursosComponent = cursos.map((curso, i) => {
			return <CursosCard key={curso._id} setCurso={setCurso} curso={curso} />})
		const cursosSkeleton = new Array(20).fill(<Variants />)
		return (
			<div>
				<Grid width={"100vw"}container spacing={3}>
					{loading ? cursosSkeleton : cursosComponent}
				</Grid>
			</div>
		)
	}
	//*------------------------------------Vista Curso--------------------------------------------

	else {
		return (
			<div>
				
			</div>
		)

	}
}
